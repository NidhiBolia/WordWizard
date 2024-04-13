import { cache} from "react";
import { eq } from "drizzle-orm";
import db from "./drizzle";
import { auth } from "@clerk/nextjs";
import { userProgress,units,courses, challengeProcess} from "./schema";
import { asc } from 'drizzle-orm';



export const getUserProgress = cache(async () => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return null;
        }

        const data = await db.query.userProgress.findFirst({
            where: eq(userProgress.userId, userId),
           with:{
                activeCourse:true,
           }
        });
        return data;
    } catch (error) {
        console.error("Error in getUserProgress:", error);
        return null;
    }
});
export const getUnits = cache(async () => {
    const userProgress = await getUserProgress();

    if (!userProgress?.activeCourse) {
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId ?? 0),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProcess: true
                        }
                    }
                }
            }
        }
    });
    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedChallenges = unit.lessons.map((lesson) => {
            const completedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProcess && challenge.challengeProcess.length > 0 
                && challenge.challengeProcess.every((progress) => progress.completed);
            });
            return {...lesson, completed:completedChallenges};
        });
        return { ...unit, lessons: lessonsWithCompletedChallenges };
    });
    return normalizedData;
});



export const getCourses=cache(async()=>{
    const data=await db.query.courses.findMany();
    return data;
}); 


export const getCourseById=cache(async(courseId:number)=>{
    const data= await db.select().from(courses).where(eq(courses.id,courseId));;
    return data;
});


// findFirst({
//     where:eq(userProgress.userId,userId),
//     with:{
//         activeCourse:true,
//     },
// });

// await db.select().from(courses).where(eq(courses.id,courseId));

// //  const allData = await db.select().from(userProgress).where(eq(userProgress.userId, userId));
    
//     const dataWithActiveCourse = allData.filter(entry => entry.activeCourse === true);
    
//     return dataWithActiveCourse;