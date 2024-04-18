"use server";

import { auth,currentUser } from "@clerk/nextjs";
import { getCourseById, getUserProgress } from "@/database/queries";
import db from "@/database/drizzle";
import { eq,and } from "drizzle-orm";
import { challengeProcess, userProgress,challenges } from "@/database/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export const upsertUserProgress=async(courseId:number)=>{

    const {userId}=await auth();
    const user=await currentUser();

    if(!userId || !user){
        throw new Error("User not found");
    }
    const course=await getCourseById(courseId);

    if(!course){
        throw new Error("Course not found");
    }
    // if(!course.units.length || !course.units[0].lessons.length){
    //     throw new Error("Course is empty");
    // }

    const existingUserProgress=await getUserProgress();
    if(existingUserProgress){
        await db.update(userProgress).set({
            activeCourseId:courseId,
            userName:user.firstName||"User",
            userImageSrc:user.imageUrl||"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        });
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }
    await db.insert(userProgress).values({
        userId,
        activeCourseId:courseId,
        userName:user.firstName||"User",
        userImageSrc:user.imageUrl||"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    });
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
}

export const reduceHearts=async(challengeId:number)=>{
    const {userId}=await auth();
    if(!userId){
        throw new Error("User not found");
    }
    const currentUserProgress=await getUserProgress();
    const challenge=await db.query.challenges.findFirst({
        where:eq(challenges.id,challengeId),
    });
    if(!challenge){
        throw new Error("Challenge not found");
    }
    const lessonId=challenge.lessonId;
    const existingChallengeProgress= await db.query.challengeProcess.findFirst({
        where:and(
            eq(challengeProcess.userId,userId),
            eq(challengeProcess.challengeId,challengeId)
        ),
    })
    const isPractice=!!existingChallengeProgress;
    if(isPractice){
        return {error:"Practice"};
    }

    if(!currentUserProgress){
        throw new Error("User progress not found");
    }
    if(currentUserProgress.hearts===0){
        return {error:"Hearts"};
    }

    await db.update(userProgress).set({
        hearts:Math.max(currentUserProgress.hearts-1,0),    
    }).where(eq(userProgress.userId,userId));

    revalidatePath("/shop");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    
}

export const refillHearts=async()=>{
    const POINTS_TO_REFILL = 10;
    const currentUserProgress=await getUserProgress();
    if(!currentUserProgress){
        throw new Error("User progress not found");
    }
    if(currentUserProgress.hearts===5){
        return {error:"Hearts are fulled"};
    }
    if(currentUserProgress.points<POINTS_TO_REFILL){
        return {error:"Not enough points"};
    }
    await db.update(userProgress).set({
        hearts:5,
        points:currentUserProgress.points-POINTS_TO_REFILL,
    }).where(eq(userProgress.userId,currentUserProgress.userId));
    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
}