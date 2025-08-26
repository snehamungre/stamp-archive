import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import gsap from "gsap";
import {ScrollTrigger, SplitText} from "gsap/all";
import Navbar from "./components/Navbar.jsx";
import Entry from "./components/Entry.jsx";
import Create from "./pages/Create.jsx";
import Archive from "./pages/Archive.jsx";
import Theme from "./pages/Theme.jsx";
import About from "./pages/About.jsx";
import {useState} from "react";

gsap.registerPlugin(ScrollTrigger , SplitText);

const App = () => {
    const [entryDone, setEntryDone] = useState(false);

    return (
        <BrowserRouter>
            <Navbar />
            {!entryDone ? (
                <main>
                    <Entry onComplete={() => setEntryDone(true)} />
                </main>
            ) : (
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/create" replace />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/archive" element={<Archive />} />
                        <Route path="/theme" element={<Theme />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            )}
            
        </BrowserRouter>
    );
};

export default App;