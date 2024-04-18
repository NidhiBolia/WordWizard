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
import { useExitModal } from "@/store/UseExitModel";
import Link from "next/link";

export const ExitModel = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="mx-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/sad.png" height={100} width={100} alt="sad" />
          </div>
          <DialogTitle className="text-center fonr-bold text-2xl">
            Don't Go
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You are about to leave the lesson. Are you sure you want to leave?
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
              Keep Learning
            </Button>
            <Button
              onClick={close}
              variant="dangerOutline"
              className="w-full"
              size="lg"
            >
              <Link href="/learn">End Session</Link>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
