import { StickyWrapper } from "@/components/StickyWrapper";
import { FeedWrapper } from "@/components/FeedWrapper";
import { Header } from "./header";
import UserProgress from "@/components/UserProgress";
import { getUserProgress,getUnits } from "@/database/queries";
import { redirect } from "next/navigation";

const LearnPage=async()=>{
    const userProgress= await getUserProgress();
    const unitsData=await getUnits();


    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }   
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper >
            <UserProgress 
            activeCourse={userProgress.activeCourse} 
            hearts={userProgress.hearts} 
            points={userProgress.points} 
            hasActiveCourse={false}/>
        </StickyWrapper>
        <FeedWrapper>
        <Header title={userProgress.activeCourse.title}/>
        {unitsData.map((unit)=>(
            <div key={unit.id}>
                <h2 className="text-2xl font-semibold text-gray-800">{unit.title}</h2>
                <p className="text-gray-600">{unit.description}</p>
            </div>
        ))}
        </FeedWrapper>
        </div>
    )
}
export default LearnPage

// 