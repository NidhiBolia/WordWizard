import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader } from "lucide-react";
import { 
  ClerkLoaded, 
  ClerkLoading, 
  SignInButton, 
  SignUpButton, 
  SignedIn, 
  SignedOut
} from "@clerk/nextjs";
import Link from "next/link";
export default function Page() {
  return (
    <div className="bg-gray-100 py-20  mb-0 pb-0 px-10  flex flex-col items-center">
    <h1 className="text-2xl text-center text-gray-600 font-bold">
    Get started by learning  any language
    <span className="block text-gray-900 text-6xl font-bold mb-10">
        Learn,Practice,Master
        </span> 
    </h1>
        <p className=" mt-4  max-w-lg text-gray-500 text-xl">Your gateway to linguistic mastery! Dive into a vibrant world of languages with our interactive platform. From beginner to advanced levels, embark on a journey of discovery, practice, and fluency. Engage in immersive exercises, connect with a global community, and unlock the doors to endless opportunities</p>
        <div className="flex flex-col items-center gap-y-3 max-w-[300px] w-full">

        <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button size="lg" variant="primary" className=" mt-2">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button size="lg" variant="ghost" className="mt-2">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="primary" className="mt-2 mb-2" asChild>
                <Link href="/learn">
                  Continue Learning
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
        {/* <Button variant="primary" className="mt-4">Get Started</Button>
        <Button variant="ghost" className="mt-4">Already have account?</Button> */}
        <Image src="/pic.png" alt="Description of the image" width={1000} height={1000} className="mt-2"/>
    </div>
  );
}
