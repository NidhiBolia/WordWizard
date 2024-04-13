"use server";

import { auth,currentUser } from "@clerk/nextjs";
import { getCourseById, getUserProgress } from "@/database/queries";
import db from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { userProgress } from "@/database/schema";
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