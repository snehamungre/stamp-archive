import React from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {useRef} from "react";

const Entry = () => {
    const videoRef = useRef();

    useGSAP(() => {

        // this is for the video animation

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#video',
                start: "bottom bottom",   // bottom of video hits bottom of viewport
                end: "center center",     // middle of video aligns with middle of viewport
                scrub: true,
                pin: true
            }
        })

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            })
        }


    })

    return (
        <div id='video' className="w-3/4 max-w-[80vw] mx-auto">
            <video
                ref={videoRef}
                src={'assets/video/envelope.mp4'}
                muted
                playsInline
                preload="auto"
            />
        </div>
    );
};

export default Entry;