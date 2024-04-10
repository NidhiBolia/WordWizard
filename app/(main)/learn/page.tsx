import { StickyWrapper } from "@/components/StickyWrapper";
import { FeedWrapper } from "@/components/FeedWrapper";
import { Header } from "./header";
import UserProgress from "@/components/UserProgress";
const LearnPage=()=>{
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper >
            <UserProgress activeCourse={{title:"Spanish",imageSrc:"/vercel.svg"}} hearts={5} points={100} hasActiveCourse={false}/>
        </StickyWrapper>
        <FeedWrapper>
        <Header title="My title"/>
        </FeedWrapper>
        </div>
    )
}
export default LearnPage