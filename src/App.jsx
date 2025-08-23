import gsap from "gsap";
import {ScrollTrigger, SplitText} from "gsap/all";
import Navbar from "./components/Navbar.jsx";
import Entry from "./components/Entry.jsx";

gsap.registerPlugin(ScrollTrigger , SplitText);

const App = () => {
    return (
        <main>
            <Navbar/>
            <Entry/>
        </main>
        // <div>
        //     App
        //     <h1 className={'font-roza text-center text-5xl'}>
        //         Hello World! बनाएं
        //     </h1>
        //     <h1 className={'font-se text-center text-5xl'}>
        //         Hello World! बनाएं
        //     </h1>
        // </div>
    );
};

export default App;