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

        // Video animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#video',
                start: "bottom bottom",
                end: "center center",
                scrub: true,
                pin: true,
                markers:false,
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
        <div className="flex-column  w-full">
            {/* Instruction Text */}    
            <div className="h-dvh w-full">
                <p
                    id="scroll-instruction"
                    className="absolute bottom-0 w-full transform y-full text-lg text-green-100 mb-6 font-large text-center tracking-wide font-bold animate-bounce"
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