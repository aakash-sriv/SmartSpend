// "use server";

// import { db } from "@/lib/prisma";
// import { subDays } from "date-fns";

// const ACCOUNT_ID = "f2b8a8ca-f844-4fd1-87b1-c92976ddc69a";
// const USER_ID = "4c1f4507-1852-40a2-9775-bf0d0fab7a9e";

// // Categories with their typical amount ranges
// const CATEGORIES = {
//   INCOME: [
//     { name: "salary", range: [5000, 8000] },
//     { name: "freelance", range: [1000, 3000] },
//     { name: "investments", range: [500, 2000] },
//     { name: "other-income", range: [100, 1000] },
//   ],
//   EXPENSE: [
//     { name: "housing", range: [1000, 2000] },
//     { name: "transportation", range: [100, 500] },
//     { name: "groceries", range: [200, 600] },
//     { name: "utilities", range: [100, 300] },
//     { name: "entertainment", range: [50, 200] },
//     { name: "food", range: [50, 150] },
//     { name: "shopping", range: [100, 500] },
//     { name: "healthcare", range: [100, 1000] },
//     { name: "education", range: [200, 1000] },
//     { name: "travel", range: [500, 2000] },
//   ],
// };

// // Helper to generate random amount within a range
// function getRandomAmount(min, max) {
//   return Number((Math.random() * (max - min) + min).toFixed(2));
// }

// // Helper to get random category with amount
// function getRandomCategory(type) {
//   const categories = CATEGORIES[type];
//   const category = categories[Math.floor(Math.random() * categories.length)];
//   const amount = getRandomAmount(category.range[0], category.range[1]);
//   return { category: category.name, amount };
// }

// export async function seedTransactions() {
//   try {
//     // Generate 90 days of transactions
//     const transactions = [];
//     let totalBalance = 0;

//     for (let i = 90; i >= 0; i--) {
//       const date = subDays(new Date(), i);

//       // Generate 1-3 transactions per day
//       const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

//       for (let j = 0; j < transactionsPerDay; j++) {
//         // 40% chance of income, 60% chance of expense
//         const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
//         const { category, amount } = getRandomCategory(type);

//         const transaction = {
//           id: crypto.randomUUID(),
//           type,
//           amount,
//           description: `${
//             type === "INCOME" ? "Received" : "Paid for"
//           } ${category}`,
//           date,
//           category,
//           status: "COMPLETED",
//           userId: USER_ID,
//           accountId: ACCOUNT_ID,
//           createdAt: date,
//           updatedAt: date,
//         };

//         totalBalance += type === "INCOME" ? amount : -amount;
//         transactions.push(transaction);
//       }
//     }

//     // Insert transactions in batches and update account balance
//     await db.$transaction(async (tx) => {
//       // Clear existing transactions
//       await tx.transaction.deleteMany({
//         where: { accountId: ACCOUNT_ID },
//       });

//       // Insert new transactions
//       await tx.transaction.createMany({
//         data: transactions,
//       });

//       // Update account balance
//       await tx.account.update({
//         where: { id: ACCOUNT_ID },
//         data: { balance: totalBalance },
//       });
//     });

//     return {
//       success: true,
//       message: `Created ${transactions.length} transactions`,
//     };
//   } catch (error) {
//     console.error("Error seeding transactions:", error);
//     return { success: false, error: error.message };
//   }
// }

"use server";

import { db } from "@/lib/prisma";
import { subDays } from "date-fns";

// IMPORTANT: Replace these with your ACTUAL IDs from Supabase
// To get them, run this SQL in Supabase:
// SELECT id FROM "User" WHERE "clerkUserId" = 'your_clerk_user_id';
// SELECT id FROM "Account" WHERE "userId" = 'user_id_from_above';

const ACCOUNT_ID = "f2b8a8ca-f844-4fd1-87b1-c92976ddc69a";
const USER_ID = "4c1f4507-1852-40a2-9775-bf0d0fab7a9e";

// Categories with their typical amount ranges
const CATEGORIES = {
  INCOME: [
    { name: "salary", range: [5000, 8000] },
    { name: "freelance", range: [1000, 3000] },
    { name: "investments", range: [500, 2000] },
    { name: "other-income", range: [100, 1000] },
  ],
  EXPENSE: [
    { name: "housing", range: [1000, 2000] },
    { name: "transportation", range: [100, 500] },
    { name: "groceries", range: [200, 600] },
    { name: "utilities", range: [100, 300] },
    { name: "entertainment", range: [50, 200] },
    { name: "food", range: [50, 150] },
    { name: "shopping", range: [100, 500] },
    { name: "healthcare", range: [100, 1000] },
    { name: "education", range: [200, 1000] },
    { name: "travel", range: [500, 2000] },
  ],
};

// Helper to generate random amount within a range
function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Helper to get random category with amount
function getRandomCategory(type) {
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

export async function seedTransactions() {
  try {
    console.log("🌱 Starting seed process...");

    // Verify user exists in database
    const user = await db.user.findUnique({
      where: { id: USER_ID },
    });

    if (!user) {
      console.error("❌ User not found with ID:", USER_ID);
      return { 
        success: false, 
        error: `User not found. Please check if USER_ID "${USER_ID}" exists in your database.` 
      };
    }

    console.log("✅ User found:", user.email || user.name);

    // Verify account exists and belongs to user
    const account = await db.account.findUnique({
      where: { 
        id: ACCOUNT_ID,
      },
    });

    if (!account) {
      console.error("❌ Account not found with ID:", ACCOUNT_ID);
      return { 
        success: false, 
        error: `Account not found. Please check if ACCOUNT_ID "${ACCOUNT_ID}" exists in your database.` 
      };
    }

    if (account.userId !== USER_ID) {
      console.error("❌ Account doesn't belong to user");
      return { 
        success: false, 
        error: `Account ${ACCOUNT_ID} doesn't belong to user ${USER_ID}` 
      };
    }

    console.log("✅ Account found:", account.name);

    // Generate 90 days of transactions
    const transactions = [];
    let totalBalance = 0;

    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);

      // Generate 1-3 transactions per day
      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        // 40% chance of income, 60% chance of expense
        const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
        const { category, amount } = getRandomCategory(type);

        const transaction = {
          type,
          amount,
          description: `${
            type === "INCOME" ? "Received" : "Paid for"
          } ${category}`,
          date,
          category,
          status: "COMPLETED",
          userId: USER_ID,
          accountId: ACCOUNT_ID,
          createdAt: date,
          updatedAt: date,
        };

        totalBalance += type === "INCOME" ? amount : -amount;
        transactions.push(transaction);
      }
    }

    console.log(`📝 Generated ${transactions.length} transactions`);

    // Insert transactions in batches and update account balance
    await db.$transaction(async (tx) => {
      // Clear existing transactions
      const deleteResult = await tx.transaction.deleteMany({
        where: { 
          accountId: ACCOUNT_ID,
          userId: USER_ID,
        },
      });
      
      console.log(`🗑️  Deleted ${deleteResult.count} old transactions`);

      // Insert new transactions
      await tx.transaction.createMany({
        data: transactions,
      });

      console.log(`✨ Inserted ${transactions.length} new transactions`);

      // Update account balance
      await tx.account.update({
        where: { id: ACCOUNT_ID },
        data: { balance: totalBalance },
      });

      console.log(`💰 Updated balance to: ₹${totalBalance.toFixed(2)}`);
    });

    return {
      success: true,
      message: `✅ Successfully created ${transactions.length} transactions. Balance: ₹${totalBalance.toFixed(2)}`,
      transactionCount: transactions.length,
      finalBalance: totalBalance,
    };
  } catch (error) {
    console.error("❌ Error seeding transactions:", error);
    return { 
      success: false, 
      error: error.message || "Unknown error occurred"
    };
  }
}