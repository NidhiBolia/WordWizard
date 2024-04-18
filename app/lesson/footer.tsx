import { useKey,useMedia } from "react-use";
import {CheckCircle,XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props={
    onCheck:()=>void;
    status:"correct"|"incorrect"|"unanswered"| "completed";
    disabled?:boolean;
    lessonId?:number;
}

export const Footer=({onCheck,status,disabled,lessonId}:Props)=>{
    useKey("Enter",onCheck,{},[onCheck]);
    const isMobile=useMedia("(max-width:1024px)");
return(
    <div className={cn("lg:-h[140px] h-[100px] border-t-2",status==="correct" && "border-transparent bg-green-100",
    status==="incorrect" && "border-transparent bg-red-100"
    )}>
        <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
            {status==="correct" && <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
                <CheckCircle size={isMobile?20:30} className="h-6 w-6 lg:w-10 mr-4"/>
                Nicely Done!
                </div>}
                {status==="incorrect" && <div className="text-red-500 font-bold text-base lg:text-2xl flex items-center">
                <XCircle size={isMobile?20:30} className="h-6 w-6 lg:w-10 mr-4"/>
                Retry
                </div>}
                {status==="completed" && <Button variant="default" size={isMobile?"sm":"lg"} onClick={()=>window.location.href=`/lesson/${lessonId}`}>Practice Again!</Button>}
        <Button disabled={disabled} className="ml-auto" onClick={onCheck} size={isMobile?"sm":"lg"} variant={status==="incorrect"?"danger":"secondary"}>
            {status==='unanswered'&&"Check"}
            {status==='correct'&& "Next" }
            {status==='incorrect'&& "Retry"}
            {status==='completed'&&"continue"}
            </Button>
        </div>
    </div>
)

}