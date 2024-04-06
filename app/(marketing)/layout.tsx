import { Header } from "./header";
import Footer from "./footer";
import About from "./About";
import Learn from "./Learn";
import Page from "./page";
type Props={
    children:React.ReactNode;
}

const MarketingLayout=()=>{
    return(
        <div>
        <Header/>
        <Page/>
        <About/>
        <Learn/>
        <Footer/>
        </div>
    )
}
export default MarketingLayout;