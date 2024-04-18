import { X,InfinityIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useExitModal } from "@/store/UseExitModel";
type Props={
    hearts:number;
    percentage:number;
    hasActiveSubscription:boolean;
}
export const Header=({hearts,percentage,hasActiveSubscription}:Props)=>{
    const {open}=useExitModal();
    return(
        <header className="lg:pt-[10px] pt-[20px] px-10 gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
    <div className="flex items-center justify-between w-full"> 
        <X
            onClick={open}
            className="text-slate-500 hover:opacity-75 transition cursor-pointer"
        />
        <Progress value={percentage} />
        <div className="text-rose-500 flex items-center font-bold">
            <Image src="/heart.png" height={20} width={20} alt="heart" />
            {hasActiveSubscription ? (
                <>
                    <InfinityIcon className="h-6 w-6 stroke-[3]" />
                </>
            ) : (
                <>{hearts}</>
            )}
        </div>
    </div>
</header>
    )
}

