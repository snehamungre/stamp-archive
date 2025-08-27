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
                trigger: "#intro-boxes",
                start: "top top",   // when section is 80% down viewport
                end: "+=150",     // finish earlier
                scrub: true,
                markers: false
            }
        })
            .from("#left-box", { x: "-100vw", opacity: 0, duration: 1, ease: "power3.out" })
            .from("#right-box", { x: "100vw", opacity: 0, duration: 1, ease: "power3.out" }, "<");

        // Video animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#video',
                start: "bottom bottom",
                end: "+=1100",
                scrub: true,
                pin: true,
                markers:true,
                onLeave: () => {
                    // when scroll animation is finished
                    if (onComplete) onComplete();
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
                <div id="intro-boxes" className="relative h-screen pointer-events-none z-10">
                    {/* Left box - positioned at top of viewport */}
                    <img
                        id="left-box"
                        src={'assets/images/left-box.png'}
                        alt={'left-box'}
                        className="absolute top-50 h-90 -translate-x-14"
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
                    className="absolute bottom-3 left-0 right-0 text-lg text-green-100 mb-6 font-large text-center tracking-wide font-bold animate-bounce"
                >
                    Scroll slowly ↓
                </p>
            </div>
            
            {/* Video Section */}
            <div id="video" className="w-3/4 max-w-[80vw] mx-auto pt-10">
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