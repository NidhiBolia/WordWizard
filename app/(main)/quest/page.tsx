import Image from "next/image";
import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { getUserProgress } from "@/database/queries";
import { redirect } from "next/navigation";
import { Progress } from "@/components/ui/progress";

const quests = [
    {
        title: "Earn 20 points",
        value: 20,
    },
    {
        title: "Earn 50 points",
        value: 50,
    },
    {
        title: "Earn 100 points",
        value: 100,
    },
    {
        title: "Earn 200 points",
        value: 200,
    },
];

const QuestPage = async () => {
    const userProgressData = await getUserProgress();
    if (!userProgressData || !userProgressData.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6 h-full">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgressData.activeCourse}
                    hearts={userProgressData.hearts}
                    points={userProgressData.points}
                    hasActiveCourse={false}
                />
            </StickyWrapper>
            <FeedWrapper > {/* Add flex-grow class */}
                <div className="w-full flex flex-col items-center">
                    <Image src="/quest.png" alt="Quest" height={40} width={40} />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Quests
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Complete quests by earning points
                    </p>
                    <ul className="w-full">
                        {quests.map((quest) => {
                            const progress = (userProgressData.points / quest.value) * 100;
                            return (
                                <div
                                    className="flex items-center w-full p-4 gap-x-4 border-t-2"
                                    key={quest.title}
                                >
                                    <Image src="/points.png" alt="points" height={50} width={50} />
                                    <div className="flex flex-col gap-y-2 w-full">
                                        <p className="text-neutral-700 text-xl font-bold">{quest.title}</p>
                                        <Progress value={progress} className="h-3" />
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default QuestPage;
