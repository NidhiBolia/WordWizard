import Image from "next/image";
import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { getUserProgress } from "@/database/queries";
import { redirect } from "next/navigation";
import { Items } from "./items";
const ShopPage=async()=>{
    const userProgressData=await getUserProgress();
    if(!userProgressData||!userProgressData.activeCourse){
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
            <Image src="/shop.png" alt="shop" height={40} width={40}/>
            <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                Shop
            </h1>
            <p className="text-muted-foreground text-center text-lg mb-6">
                Spend your points on cool stuffs
            </p>
            <Items hearts={userProgressData.hearts} points={userProgressData.points} hasActiveCourse={false}/>
            </div>
            </FeedWrapper>
        </div>
    )
}
export default ShopPage;