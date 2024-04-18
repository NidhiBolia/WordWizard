import { cn } from "@/lib/utils";
import { ChallengeOptions, challenges } from "@/database/schema"
import { Card } from "./card";
type props={
    options:typeof ChallengeOptions.$inferSelect[];
    onSelect:(id:number)=>void;
    status:"correct"|"incorrect"|"unanswered";
    selectedOptions?:number;
    disabled?:boolean;
    type:typeof challenges.$inferSelect["type"];
};

export const Challenge=({options,onSelect,status,selectedOptions,disabled,type}:props)=>{
    return(
<div className={cn("grid-gap-2", type === "ASSIST" && "grid-cols-1", type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]")}>     
  {options.map((option,i)=>(
        <div>
           <Card 
           key={option.id}
           id={option.id}
           text={option.text}
           imageSrc={option.imageSrc}
           shortcut={`${i+1}`}
           selected={selectedOptions===option.id}
           onClick={()=>onSelect(option.id)}
            status={status}
            audioSrc={option.audioSrc}
            disabled={disabled}
            type={type}
           />
        </div>
       ))}
        </div>  
    )
}