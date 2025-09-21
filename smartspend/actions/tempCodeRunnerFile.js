const user = await db.user.findUnique({
            where: { clerkUserId: userId},
        });
