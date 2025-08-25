import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Entry = ({ onComplete }) => {
    const videoRef = useRef();

    useGSAP(() => {
        // Instruction text animation
        gsap.fromTo(
            "#scroll-instruction",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5 }
        );

        // Video animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#video',
                start: "bottom bottom",
                end: "center center",
                scrub: true,
                pin: true,
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
        <div className="min-h-screen bg-white-100 flex flex-col items-center justify-center">
            {/* Instruction Text */}
            <p
                id="scroll-instruction"
                className="text-lg text-gray-600 mb-6 font-medium tracking-wide"
            >
                Scroll slowly ↓
            </p>

            {/* Video Section */}
            <div id="video" className="w-3/4 max-w-[80vw] mx-auto pt-10">
                <video
                    ref={videoRef}
                    src={'/assets/video/envelope.mp4'}
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
};

export default Entry;