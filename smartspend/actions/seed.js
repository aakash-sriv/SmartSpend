"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function seedDemoData() {
    const user = await currentUser();

    if (!user || user.emailAddresses[0].emailAddress !== "dehet67222@nyfhk.com") {
        return { success: false, message: "Not authorized for seeding" };
    }

    // Get DB user directly (checkUser should have run in Header/Dashboard, but we verify)
    const dbUser = await db.user.findUnique({
        where: { clerkUserId: user.id },
    });

    if (!dbUser) {
        return { success: false, message: "User not found in database" };
    }

    try {
        // Check if fully seeded (account + transactions)
        const transactionCount = await db.transaction.count({
            where: { userId: dbUser.id },
        });

        const accountCount = await db.account.count({
            where: { userId: dbUser.id },
        });

        // If we have data and exactly one account, we are good.
        // TEMPORARILY DISABLED TO FORCE RE-SEED WITH NEW BUDGET (10000)
        // if (transactionCount > 10 && accountCount === 1) {
        //     return { success: true, message: "Data already seeded" };
        // }

        // Clean slate: If multiple accounts (duplicates) or no data, reset everything
        await db.transaction.deleteMany({ where: { userId: dbUser.id } });
        await db.account.deleteMany({ where: { userId: dbUser.id } });
        await db.budget.deleteMany({ where: { userId: dbUser.id } });

        // Use a transaction for atomicity
        await db.$transaction(async (tx) => {
            // 1. Create Account
            const account = await tx.account.create({
                data: {
                    name: "Demo Account",
                    type: "CURRENT",
                    balance: 5000.0,
                    isDefault: true,
                    userId: dbUser.id,
                },
            });

            // 2. Create/Update Budget (upsert to avoid unique constraint error)
            await tx.budget.upsert({
                where: {
                    userId: dbUser.id,
                },
                update: {
                    amount: 10000.0,
                },
                create: {
                    amount: 10000.0,
                    userId: dbUser.id,
                },
            });

            // 3. Generate Transactions
            const categories = {
                INCOME: ["salary", "freelance", "investments", "business", "rental", "other-income"],
                EXPENSE: [
                    "housing",
                    "transportation",
                    "groceries",
                    "utilities",
                    "entertainment",
                    "food",
                    "shopping",
                    "healthcare",
                    "education",
                    "personal",
                    "travel",
                    "insurance",
                    "gifts",
                    "bills",
                    "other-expense",
                ],
            };

            const transactions = [];
            const now = new Date();

            for (let i = 0; i < 100; i++) {
                const daysAgo = Math.floor(Math.random() * 90);
                const date = new Date(now);
                date.setDate(date.getDate() - daysAgo);

                const type = Math.random() > 0.2 ? "EXPENSE" : "INCOME";
                const category =
                    categories[type][Math.floor(Math.random() * categories[type].length)];
                const amount =
                    type === "EXPENSE"
                        ? Math.floor(Math.random() * 500) + 10
                        : Math.floor(Math.random() * 2000) + 1000;

                transactions.push({
                    type,
                    amount,
                    description: `${type === "INCOME" ? "Received" : "Paid for"} ${category}`,
                    date,
                    category,
                    status: "COMPLETED",
                    userId: dbUser.id,
                    accountId: account.id,
                    createdAt: date,
                    updatedAt: date,
                });
            }

            //Bulk insert
            await tx.transaction.createMany({
                data: transactions,
            });

            // 4. Update User Name
            await tx.user.update({
                where: { id: dbUser.id },
                data: { name: "Guest" }
            });
        });

        // revalidatePath removed - causes error when called during render
        // Dashboard will refresh automatically on navigation
        return { success: true, message: "Demo data seeded successfully" };
    } catch (error) {
        console.error("Error seeding demo data:", error);
        return { success: false, error: error.message };
    }
}
