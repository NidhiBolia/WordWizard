import { getUserProgress,getLesson } from "@/database/queries";
import { Quiz } from "./quiz";
import {redirect} from "next/navigation";

const LessonPage=async()=> {
    const lesson=await getLesson();
    const userProgress= await getUserProgress();
    // const [lesson,userProgress]= await Promise.all([lessonData,userProgressData]);
    if(!lesson||!userProgress){
        redirect("/learn");
    }
    const initialPercentage=lesson.challenges.filter((challenge)=>challenge.completed).length/lesson.challenges.length*100;
  return (
    <Quiz
    initialLessonId={lesson.id}
    initialLessonChallenges={lesson.challenges}
    initialHearts={userProgress.hearts}
    initialPercentage={initialPercentage}
    userSubscription={null}
/>
  )
}
export default LessonPage;
