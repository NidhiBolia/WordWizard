
import Image from "next/image"
import { cn } from "@/lib/utils"
type Props={
    value:number;
    variant:"points"|"hearts";
}

export const ResultCard=({value,variant}:Props)=>{
    const ImageSrc=variant==="hearts"?"/heart.png":"/points.png";
    return(
        <>
        <div className={cn("rounded-2xl border-2 w-full", variant==="points"&&"bg-orange-400 border-orange-400",
            variant==="hearts"&&"bg-red-400 border-red-400")} 
        >
            <div className={cn("p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
            variant==="hearts"&&"bg-red-500",
            variant==="points"&&"bg-orange-500"
            )}>
            {variant==="hearts"?"Hearts Left":"Total Points"}
            </div>
            <div className={cn("rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
                variant==="hearts"&&"text-red-500",
                variant==="points"&&"text-orange-500"
            )}>
                <Image alt="icon" src={ImageSrc} height={30} width={30} className="mr-1.5"/>
                {value}
            </div>
        </div>
        </>
    )

}