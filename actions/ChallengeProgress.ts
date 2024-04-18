"use server";
import { revalidatePath } from "next/cache";
import db from "@/database/drizzle";
import { eq, and } from "drizzle-orm";
import { getUserProgress } from "@/database/queries";
import { auth } from "@clerk/nextjs";
import { challenges, challengeProcess, userProgress } from "@/database/schema";
export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = await auth();
    
    if (!userId) {
        throw new Error("User not found");
    }
    const currentUserProgress = await getUserProgress();
    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }
    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });

    if (!challenge) {
        throw new Error("Challenge not found");
    }
    const lessonId = challenge.lessonId;
    const existingChallengeProgress = await db.query.challengeProcess.findFirst({
        where: and(
            eq(challengeProcess.userId, userId),
            eq(challengeProcess.challengeId, challengeId)
        ),
    });

    const isPractice = !!existingChallengeProgress;
    if (currentUserProgress.hearts === 0 && !isPractice) {
        return {error: "No hearts"};
    }
    if (isPractice) {
        await db
            .update(challengeProcess)
            .set({
                completed: true,
            })
            .where(eq(challengeProcess.id, existingChallengeProgress.id));

        await db
            .update(userProgress)
            .set({
                hearts: Math.min(currentUserProgress.hearts + 1, 5),
                points: currentUserProgress.points + 10,
            })
            .where(eq(userProgress.userId, userId));
        revalidatePath("/learn");
        revalidatePath("/lesson");
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
        revalidatePath(`/lesson/${lessonId}`);
        return;
    }
    await db.insert(challengeProcess).values({
        challengeId,
        userId,
        completed: true,
    });
    await db
        .update(userProgress)
        .set({
            points: currentUserProgress.points + 10,
        })
        .where(eq(userProgress.userId, userId));
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
};
