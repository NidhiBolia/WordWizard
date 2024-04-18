"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {usePracticeModel} from "@/store/UsePracticeModel";


export const PracticeModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModel();

    useEffect(() => setIsClient(true), []);
 
  if (!isClient) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="mx-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/heart.png" height={100} width={100} alt="heart" />
          </div>
          <DialogTitle className="text-center fonr-bold text-2xl">
            Practice Lesson
          </DialogTitle>
          <DialogDescription className="text-center text-base">
           Use Practice lessons to regain heart and points.You cannot loose hearts or points in practice lesson.    
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex  flex-col gap-y-4 w-full">
            <Button
              onClick={close}
              variant="primary"
              className="w-full"
              size="lg"
            >
              I Understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
