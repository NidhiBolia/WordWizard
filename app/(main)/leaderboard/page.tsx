import Image from "next/image";
import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { getTopTenUsers, getUserProgress } from "@/database/queries";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Avatar,AvatarImage } from "@/components/ui/avatar";
const LeaderboardPage=async()=>{
    const userProgressData=await getUserProgress();
    const leaderboard= await getTopTenUsers();
    if(!userProgressData||!userProgressData.activeCourse){
        redirect("/courses")
    }

    if(!leaderboard){
        redirect("/courses")
    }
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
           <StickyWrapper >
           <UserProgress activeCourse={userProgressData.activeCourse} hearts={userProgressData.hearts} 
           points={userProgressData.points} 
           hasActiveCourse={false}
           />
              </StickyWrapper>
            <FeedWrapper>
            <div className="w-full flex flex-col items-center">
            <Image src="/leaderboard.png" alt="LeaderBoard" height={40} width={40}/>
            <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                Leaderboard
            </h1>
            <p className="text-muted-foreground text-center text-lg mb-6">
                See where you stand among other learners in the community
            </p>
            <Separator className="mb-4 h-0.5 rounded-full"/>
            {leaderboard.map((userProgress, index) => (
            <div key={userProgress.userId} className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/500">
                <p className="font-bold text-lime-700 mr-4">{index+1}</p>
                <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                    <AvatarImage src={userProgress.userImageSrc} />
                </Avatar>
                <p className="font-bold text-neutral-800 flex-1">
                    {userProgress.userName}
                </p>
                <p className="text-muted-foreground">
                    {userProgress.points} points
                </p>
            </div>
        ))}

            </div>
            </FeedWrapper>
        </div>
    )
}
export default LeaderboardPage;