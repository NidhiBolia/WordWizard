import Link from "next/link";
import Image from "next/image";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import SidebarItems from "./SidebarItems";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className,
    )}>
        <Link href='/learn'>
      <div className="pt-8 pl-4 pb-7 flex items-center ">
          <Image src="/wordWizard.png" className="mr-5" height={32} width={32}  alt="wordWizard"/>
          <h1 className="text-2xl font-extrabold text-sky-500 tracking-wide">
          WordWizard
          </h1>
        </div>
        </Link>
        <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItems label="learn" href='/learn' iconSrc="/learn.png"/>
        <SidebarItems label="leaderboard" href='/leaderboard' iconSrc="/leaderboard.png"/>
        <SidebarItems label="quest" href='/quest' iconSrc="/quest.png"/>
        <SidebarItems label="shop" href='/shop' iconSrc="/shop.png"/>
        </div>
        <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
        </div>
    </div>
  );
};