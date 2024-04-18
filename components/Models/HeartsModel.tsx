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
import { useHeartsModal } from "@/store/UseHeartsModel";
import { useRouter } from "next/navigation";

export const HeartsModel = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();
    const router = useRouter();
    useEffect(() => setIsClient(true), []);
    const onClick=()=>{
        close();
        router.push("/store");
    }
  if (!isClient) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="mx-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/bad.png" height={100} width={100} alt="bad" />
          </div>
          <DialogTitle className="text-center fonr-bold text-2xl">
            You ran out of Hearts
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get Pro for unlimited hearts,or purchase them in the store
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex  flex-col gap-y-4 w-full">
            <Button
              onClick={onClick}
              variant="primary"
              className="w-full"
              size="lg"
            >
              Get Unlimited Hearts
            </Button>
            <Button
              onClick={close}
              variant="primaryOutline"
              className="w-full"
              size="lg"
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
