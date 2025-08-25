import gsap from "gsap";
import {navLinks} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";
import { Link } from "react-router-dom";

const Navbar = () => {
    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: "main",
                start: "top top",
                end: "+=200",
                scrub: true,
            }
        }).fromTo("nav",
            { backgroundColor: "transparent" },
            { backgroundColor: "rgba(243, 241, 240, 0.5)", backgroundFilter: "blur(20px)", duration: 1 }
        );

        gsap.from("#logo", {
            opacity: 0,
            duration: 0.75,
            ease: "ease.in"
        });

        // Navigation links animation
        gsap.from(".nav-link", {
            opacity: 0,
            duration: 1,
            ease: "back.out",
            stagger: 0.2,
            delay: 1,
        });
    }, []);

    return (
        <nav>
            <div>
                <Link to='/'>
                    <img id='logo' src={'assets/images/logo.svg'} alt="logo" />
                </Link>
                <ul>
                    {navLinks.map((link) =>(
                        <li key={link.id}>
                            <Link className={'nav-link'} to={`/${link.id}`}>{link.title} </Link>
                        </li>))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;