import { Header } from "./header";
import Footer from "./footer";
import About from "./About";
import Learn from "./Learn";
import Page from "./page";
type Props={
    children:React.ReactNode;
}

const MarketingLayout=({children}:Props)=>{
    return(
        // <div className="min-h-screen flex flex-col">
        <div>
        <Header/>
        {/* <main className="flex-1 flex flex-col items-center justify-center">
           {children}
        </main> */}
        <Page/>
        <About/>
        <Learn/>
        <Footer/>
        </div>
    )
}
export default MarketingLayout;