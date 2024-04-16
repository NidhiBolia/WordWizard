import { cache} from "react";
import { eq } from "drizzle-orm";
import db from "./drizzle";
import { auth } from "@clerk/nextjs";
import { userProgress,units,courses, challengeProcess, lessons, challenges} from "./schema";



export const getUserProgress = cache(async () => {
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
    } 
);
export const getUnits = cache(async () => {
    const userProgress = await getUserProgress();
    const {userId}=await auth();
    if (!userId ||!userProgress?.activeCourseId) {
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId ),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProcess:{
                                    where:eq(
                                        challengeProcess.userId,
                                        userId,
                                ),
                            }
                        }
                    }
                }
            }
        }
    });
    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedChallenges = unit.lessons.map((lesson) => {
            if(lesson.challenges.length===0){
                return{...lesson,completed:false};
            }
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
   const data=await db.query.courses.findFirst({
    where:eq(courses.id,courseId),
   });
   return data;
});



export const getCourseProgress = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userProgress || !userProgress?.activeCourseId) {
        return null;
    }
    if(!userId){
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: ( eq(units.courseId, userProgress.activeCourseId)),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)], 
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProcess: {
                                where: eq(challengeProcess.userId,userId),
                            },
                        },
                    },
                },
            },
        },
    });
    const firstUncompletedLesson=unitsInActiveCourse.flatMap((unit)=>unit.lessons).find((lesson)=>{
        return lesson.challenges.some((challenge)=>{
            return !challenge.challengeProcess || challenge.challengeProcess.length===0
            || challenge.challengeProcess.some((process)=>process.completed===false)
        });
    });
    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
    };
});


const getLesson=cache(async(id?:number)=>{
    const {userId}=await auth();
    if(!userId){
        return null;
    }
    const courseProgress=await getCourseProgress(); 
    const lessonId= id||courseProgress?.activeLessonId;
    if(!lessonId){
        return null;
    }
    const data=await db.query.lessons.findFirst({
        where:eq(lessons.id,lessonId),
        with:{
            challenges:{
                orderBy:(challenges,{asc})=>[asc(challenges.order)],
                with:{
                    ChallengeOptions:true,
                    challengeProcess:{
                        where:eq(challengeProcess.userId,userId),
                    }
                }
            }
        }
    });
    if(!data || !data.challenges){
        return null;
    }
    const normalizeChallenges=data.challenges.map((challenge)=>{
        const completed=challenge.challengeProcess && challenge.challengeProcess.length>0 && challenge.challengeProcess.every((process)=>process.completed);
        return {...challenge,completed};
    })
    return {...data,challenges:normalizeChallenges};
})

export const getLessonPercentage=cache(async()=>{
    const courseProgress=await getCourseProgress();
    if(!courseProgress?.activeLessonId){
        return 0;
    }
    const lesson=await getLesson(courseProgress.activeLessonId);
    if(!lesson){
        return 0;
    }
    const completedChallenges=lesson.challenges.filter((challenge)=>challenge.completed);
    const percentage=Math.round((completedChallenges.length/lesson.challenges.length)*100
);
    return percentage;
})