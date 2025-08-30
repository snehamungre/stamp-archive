import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Entry = ({ onComplete }) => {
    const videoRef = useRef();

    useGSAP(() => {
        // Instruction text animation
        gsap.fromTo(
            "#scroll-instruction",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 2, ease:'power.in'}
        );

        gsap.timeline({
            scrollTrigger: {
                trigger: ".intro-objects",
                start: "top top",   // when section is 80% down viewport
                end: "+=500",     // finish earlier
                scrub: true,
                markers: false,
                stagger: .5
            }
        })
            .from("#left-box", { x: "-100vw", opacity: 0, duration: 1, ease: "power3.out" })
            .from("#right-box", { x: "100vw", rotate:-80, opacity: 0, duration: 1, ease: "power3.out" }, "+=0.25")
            .from("#blue-env", { x: "-100vw", rotate:-80, opacity: 0, duration: 1, ease: "circ.out" }, "+=0.25");

        // Video animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#video',
                start: "bottom bottom",
                end: "+=1000",
                scrub: true,
                pin: true,
                markers:false,
                onUpdate: (self) => {
                    console.log(self.progress);
                    if (self.progress >= 0.84) {
                        onComplete();
                    }
                }
            }
        });

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            });
        };
    }, [onComplete]);

    return (
        <div className="flex-column w-full relative">
            {/* Instruction Text */}    
            <div className="h-dvh w-full relative">
                <div className="intro-objects relative h-screen pointer-events-none z-10">
                    {/* Left box - positioned at top of viewport */}
                    <img
                        id="left-box"
                        src={'assets/images/left-box.png'}
                        alt={'left-box'}
                        className="absolute top-70 h-90 -translate-x-14"
                    />
                    {/* Right box - positioned at bottom of viewport */}
                    <img id="right-box"
                         src={'assets/images/right-box.png'}
                         alt={'right-box'}
                         className="absolute bottom-10 right-0 w-60 rotate-20 translate-x-24"
                    />
                </div>


                <p
                    id="scroll-instruction"
                    className="absolute bottom-3 left-0 right-0 text-lg text-green-100 mb-6 font-large
                    text-center tracking-wide font-bold animate-bounce"
                >
                    Scroll slowly ↓
                </p>

                <img id="blue-env"
                     src={'assets/images/blue-env.svg'}
                     alt={'right-box'}
                     className="intro-objects left-0 w-70 rotate-30 -translate-x-30"
                />
            </div>

            
            {/* Video Section */}
            <div id="video" className="w-3/4 max-w-[80vw] mx-auto">
                <video
                    ref={videoRef}
                    src={'/assets/video/envelope.mp4'}
                    muted
                    playsInline
                    preload="auto"
                />
            </div>
            
            <div className="h-dvh"></div>
        </div>
    );
};

export default Entry;