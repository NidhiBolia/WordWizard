"use client";
import Image from "next/image";
import { Footer } from "./footer";
import { ResultCard } from "./resultCard";
import { useState,useTransition } from "react";
import Confetti from "react-confetti";
import {toast} from "sonner";
import { reduceHearts } from "@/actions/UserProgress";
import { useRouter } from "next/navigation";
import { Header } from "./header";
import { ChallengeOptions, challenges } from "@/database/schema";
import { QuestionBubble } from "./QuestionBubble";
import { Challenge } from "./challenge";
import { upsertChallengeProgress } from "@/actions/ChallengeProgress";
import { useAudio,useWindowSize,useMount } from "react-use";
import { useHeartsModal } from "@/store/UseHeartsModel";
import { usePracticeModel } from "@/store/UsePracticeModel";
type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        ChallengeOptions: (typeof ChallengeOptions.$inferSelect)[];
    })[];
    userSubscription: any;
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const {open:openHeartsModal}=useHeartsModal();
    const {open:openPracticeModal}=usePracticeModel();
    useMount(()=>{
        if(initialPercentage===100){
            openPracticeModal();
        }
    })
    const { width, height } = useWindowSize();
    const router=useRouter();
    const [finishAudio]=useAudio({src:"/finish.mp3",autoPlay:true});
    const [correctAudio,_c,correctControls]=useAudio({src:"/correct.mp3"})
    const[incorrectAudio,_i,incorrectControls]=useAudio({src:"/incorrect.mp3"})
    const [pending,startTransition] = useTransition();
    const [lessonId]=useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(()=>{
        return initialPercentage===100?0:initialPercentage
    });
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex(
            (challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [selectedOption,setSelectedOption]=useState<number|undefined>();
    const[status,setStatus]=useState<"correct"|"incorrect"|"unanswered">("unanswered");
    const challenge = challenges[activeIndex];
    const options = challenge?.ChallengeOptions ?? [];
    const onNext=()=>{
        setActiveIndex((current)=>current+1);
    }
    const onselect=(id:number)=>{
        if(status!=="unanswered") return;
        setSelectedOption(id);
    }
    const onContinue=()=>{
        if(!selectedOption) return;
        if(status==="incorrect"){
            setStatus("unanswered");
            setSelectedOption(undefined);
            return;
        }
        if(status==="correct"){
            onNext();
            setStatus("unanswered");
            setSelectedOption(undefined);
            return;
        }
        const correctOption=options.find((option)=>option.correct);
        if(!correctOption){
            return;
        }
        if(correctOption.id===selectedOption){
            startTransition(()=>{
                upsertChallengeProgress(challenge.id)
                .then((response)=>{
                    if(response?.error === 'No hearts'){
                        openHeartsModal();
                        return;
                    }
                    correctControls.play();
                    setStatus("correct");
                    setPercentage((prev)=>prev+100/challenges.length);

                    if(initialPercentage===100){
                        setHearts((prev)=>Math.min(prev+1,5));
                    }
                })
                .catch(()=>console.error("Something went wrong"))
            })
        }else{
            startTransition(()=>{
                reduceHearts(challenge.id)
                .then((response)=>{
                    if(response?.error==="hearts"){
                        openHeartsModal();
                        return;
                    }
                    incorrectControls.play();
                    setStatus("incorrect");
                    if(!response?.error){
                        setHearts((prev)=>Math.max(prev-1,0))
                    }
                })
                .catch(()=>toast.error("Something went wrong"))
            })
        }
    }
    if(!challenge){
        return(
            <>
            {finishAudio}
            <Confetti width={width} height={height} recycle={false} numberOfPieces={500} tweenDuration={10000} />
              <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                <Image src="/finish.png" alt="Finish" className="hidden lg:block "height={50} width={50}/>
                <Image src="/finish.png" alt="Finish" className="block lg:hidden "height={40} width={40}/>
                <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                    Great Job!<br /> You have completed the lesson
                </h1>
                <div className="flex items-center gap-x-4 w-full">
                    <ResultCard variant="points" value={challenges.length*10}/>
                    <ResultCard variant="hearts" value={hearts}/>
                </div>
              </div>
              <Footer lessonId={lessonId} status="completed" onCheck={()=>router.push("/learn")}/>
            </>
        )
    }
    const title =
        challenge.type === "ASSIST"
            ? "Select the correct Meaning"
            : challenge.question;
    return (
        <>
        {incorrectAudio}
        {correctAudio}
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0  flex flex-col gap-y-12">
                    <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                        {title}
                        </h1>
                        <div >
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble question={challenge.question} />
                            )}
                            <Challenge
                                options={options}
                                onSelect={onselect}
                                status={status}
                                selectedOptions={selectedOption}
                                disabled={false}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer disabled={pending||!selectedOption} status={status} onCheck={onContinue} />
        </>
    );
};
