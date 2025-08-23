import gsap from "gsap";
import {navLinks} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";

const Navbar = () => {
    useGSAP(() => {

        gsap.from("#logo", {
            opacity: 0,
            duration: 0.75,
            ease: "ease.in"
        });

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
                <a href='#create'>
                    <img id='logo' src={'assets/images/logo.svg'} alt="logo" />
                </a>
                <ul>
                    {navLinks.map((link) =>(
                        <li key={link.id}>
                            <a className={'nav-link'} href={`#${link.id}`}>{link.title} </a>
                        </li>))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;