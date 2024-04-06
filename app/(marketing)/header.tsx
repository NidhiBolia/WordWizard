// export const Header=()=>{
//     return(
//         <header className="h-20 w-full border-b-2 bg-black  border-slate-200 px-4"> 
//         <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
//         <div>
//             <h1 className="text-2xl font-extrabold text-yellow-300 tracking-wide">FluentIQ</h1>
//         </div>
//         </div>
//         </header>
//     )
// };
// export default Header;
import { Loader } from "lucide-react";
import { 
  ClerkLoaded, 
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 bg-black border-slate-200 px-4">
      <div className=" mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center ">
          <h1 className="text-2xl font-extrabold text-yellow-300 tracking-wide">
          WordWizard
          </h1>

        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
            />
          </SignedIn>
          <SignedOut>
            
            <SignInButton
              mode="modal"
              afterSignInUrl="/learn"
              afterSignUpUrl="/learn"
            >
              <Button size="lg" variant="ghost" className="text-white">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
       

      </div>
    </header>
  );
};