import { StickyWrapper } from "@/components/StickyWrapper";
import { FeedWrapper } from "@/components/FeedWrapper";
import { Header } from "./header";
import UserProgress from "@/components/UserProgress";
import { getUserProgress, getUnits, getCourseProgress, getLessonPercentage } from "@/database/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";
import { lessons } from "@/database/schema";
const LearnPage = async () => {
  
 
        const userProgressData = getUserProgress();
        const courseProgressData = getCourseProgress();
        const lessonPercentageData = getLessonPercentage();
        const unitsData = getUnits();

        const [userProgress, courseProgress, lessonPercentage, units] = await Promise.all([userProgressData, courseProgressData, lessonPercentageData, unitsData]);
        if (!userProgress || !userProgress.activeCourse) {
            redirect("/courses");
        }
        if (!courseProgress) {
            redirect("/courses");
        }
        return (
            <div className="flex flex-row-reverse gap-[48px] px-6">
                <StickyWrapper>
                    <UserProgress
                        activeCourse={userProgress.activeCourse}
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                        hasActiveCourse={false}
                    />
                </StickyWrapper>
                <FeedWrapper>
                    <Header title={userProgress.activeCourse.title} />
                    {units.map((unit) => (
                        <div key={unit.id} className="mb-10">
                            <Unit
                                id={unit.id}
                                order={unit.order}
                                description={unit.description}
                                title={unit.title}
                                lessons={unit.lessons}
                                activeLessons={courseProgress.activeLesson}
                                activeLessonsPercentage={lessonPercentage}
                            />
                        </div>
                    ))}
                </FeedWrapper>
            </div>
        );
    } 
export default LearnPage;