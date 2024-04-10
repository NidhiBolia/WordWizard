"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type Props = {
    label: string;
    iconSrc: string;
    href: string; // Changed from String to string
}

export default function SidebarItems({ label, iconSrc, href }: Props) {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Button variant={active ? "active" : "primaryOutline"} className="justify-start h-[52px]" asChild>
            <Link href={href}>
                <Image src={iconSrc} alt={label} className="mr-5" height={32} width={32} ></Image>
                {label}
            </Link>
        </Button>
    );
}
