import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
type Props={
    title:string;
    id:number;
    imageSrc:string;
    onClick:(id:number)=>void;
    disabled?:boolean;
    active?:boolean;
}

export const Card=({title,id,imageSrc,disabled,onClick,active}:Props)=>{
    return(
        <div onClick={()=>onClick(id)} className={cn("h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",disabled&&"pointer-events-none opacity-0")}>
           <div className="min-[24px] w-full flex items-center justify-end">
        {active&&(
            <div className="rounded-mg bg-yellow-300 flex items-center justify-center p-1.5  border-2">
                <Check className="text-black stroke-[4] h-4 w-4"/>
            </div>
        )}
           </div>
        <Image src={imageSrc} alt={title} height={70} width={93.33} className="rounded-lg drop-shadow-md border object-cover"/>
        <p className="text-neutral-700 text-center font-bold mt-3">{title}</p>
        </div>
    );
}
//onClick={()=>{!disabled&&onclick(active?0:1)}} className={`relative cursor-pointer rounded-md ${active?"border-2 border-rose-500":""} ${disabled?"opacity-50":""}`}
//title,imageSrc,onclick,disabled=false,active=false