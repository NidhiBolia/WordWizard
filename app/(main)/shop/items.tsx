"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { refillHearts } from "@/actions/UserProgress";
import { toast } from "sonner";
type Props = {
    hearts: number;
    points: number;
    hasActiveCourse: boolean;
};

const POINTS_TO_REFILL = 10;

export const Items = ({
    hearts, points, hasActiveCourse
}: Props) => {
    const [pending, startTransition] = useTransition();

    const onRefillHearts = () => {
        if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
            return;
        }
        startTransition(() => {
            refillHearts().catch(()=>toast.error("Something went wrong"))
        });
    };

    return (
        <ul className="flex items-center w-full p-4 gap-x-4 border-t-2">
            <Image src="/heart.png" alt="heart" height={40} width={40} />
            <div className="flex-1">
                <p className="text-neutral-700 text-base lg:text-xl font-bold">
                    Refill Hearts
                </p>
            </div>
            <Button onClick={onRefillHearts} disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}>
                {hearts === 5 ? "Full" : (
                    <div className="flex items-center">
                        <Image src="/points.png" alt="Points" height={20} width={20} />
                        <p>{POINTS_TO_REFILL}</p>
                    </div>
                )}
            </Button>
        </ul>
    );
};
