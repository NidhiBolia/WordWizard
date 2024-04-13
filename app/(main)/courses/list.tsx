"use client"
import { useRouter } from "next/navigation";
import { courses,userProgress } from "@/database/schema"
import { Card } from "./card";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/UserProgress";
type Props={
    courses:typeof courses.$inferSelect[];
    activeCourseId?:typeof userProgress.$inferSelect.activeCourseId;
};

export const List=({courses,activeCourseId}:Props)=>{
    const router=useRouter();
    const [pending,startTransition]=useTransition();
    const onClick = async (id: number) => {
        if (pending) {
            return;
        }
        if (id === activeCourseId) {
            router.push("/learn");
        }
        startTransition(async () => {
            await upsertUserProgress(id);
        });
    }
    return( 
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {courses.map((course)=>(
           <Card key={course.id} id={course.id} title={course.title} imageSrc={course.imageSrc} onClick={onClick} disabled={pending} active={course.id===activeCourseId}/>
        ))}
        </div>
    );
};