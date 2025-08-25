import { BrowserRouter, Routes, Route } from "react-router-dom";
import gsap from "gsap";
import {ScrollTrigger, SplitText} from "gsap/all";
import Navbar from "./components/Navbar.jsx";
import Entry from "./components/Entry.jsx";
import Create from "./pages/Create.jsx";
import Archive from "./pages/Archive.jsx";
import Theme from "./pages/Theme.jsx";
import About from "./pages/About.jsx";

gsap.registerPlugin(ScrollTrigger , SplitText);

const App = () => {
    return (
        // TODO: fix this router, the Entry page shows up on all the pages, it should only show up on the home page
        <BrowserRouter>
            <Navbar />
            <div className={"h-dvh bg-white-100"}></div>
            <Entry/>
            <main className="h-dvh bg-white-100">
                <Routes>
                    <Route path="/create" element={<Create />} />
                    <Route path="/archive" element={<Archive />} />
                    <Route path="/theme" element={<Theme />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;