import Link from "next/link";
import Image from "next/image";
import { courses } from "@/database/schema";
import {Button} from "@/components/ui/button";
import { InfinityIcon } from "lucide-react";
type Props = {
    activeCourse: typeof courses.$inferSelect;
    hearts:number;
    points:number;
    hasActiveCourse:boolean;
    };
  
export default function UserProgress({activeCourse,points,hearts,hasActiveCourse}:Props) {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button variant="sidebar">
            <Image src={activeCourse.imageSrc} alt={activeCourse.title}
            className="rounded-md border" width={35} height={35} />
        </Button>
      </Link>
      <Link href='/shop'>
        <Button variant="sidebar" className="text-orange-500  ">
            <Image src="/Points.png" alt="points" className="mr-2" width={18} height={18} />
            {points}
        </Button>
      </Link>
      <Link href='/shop'>
        <Button variant="sidebar" className="text-rose-500 ">
            <Image src="/heart.png" alt="Hearts" className="mr-2" width={18} height={18} />
            {hasActiveCourse?<InfinityIcon className="h-4 w-4 stroke-[3] text-rose-500" />:hearts}
        </Button>
      </Link>
    </div>
  )
}
