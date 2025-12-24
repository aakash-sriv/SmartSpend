import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const checkUser = async (clerkUser = null) => {
    const user = clerkUser || await currentUser();

    if (!user) {
        return null;
    }

    try {
        const loggedInUser = await db.user.upsert({
            where: {
                clerkUserId: user.id,
            },
            update: {
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            },
            create: {
                clerkUserId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            },
        });

        return loggedInUser;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};