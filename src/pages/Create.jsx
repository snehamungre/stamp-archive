import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

const Create = () => {
    const location = useLocation();
    const envelopeRef = useRef();
    const [stamps, setStamps] = useState([]);
    const [draggedStamp, setDraggedStamp] = useState(null);
    const [placedStamps, setPlacedStamps] = useState([]);

    useEffect(() => {
        // Scroll to top when the component mounts or route changes
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Animate container on load/route change
        gsap.fromTo(
            envelopeRef.current,
            { scale: 1.1 }, // start slightly bigger & invisible
            {
                opacity: 1,
                scale: 1,
                duration: .5,
                ease: "circ"
            }
        );
    }, [location.pathname]);

    // Available stamp images
    const stampImages = [
        '/assets/stamps/ind-mex-1.png',
        '/assets/stamps/ind-mex-2.png',
        '/assets/stamps/india-flowers.png',
        '/assets/stamps/Indian-Stamp.png'
    ];

    useEffect(() => {
        // Randomly select 3-4 stamps
        const shuffled = stampImages.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 3);
        setStamps(selected);
    }, []);

    // Handle the start of dragging - this stores which stamp is being dragged
    const handleDragStart = (e, stampSrc) => {
        setDraggedStamp(stampSrc);
        // Store the stamp source in dataTransfer for cross-browser compatibility
        e.dataTransfer.setData("text/plain", stampSrc);
        e.dataTransfer.effectAllowed = 'move';
    };

    // Handle drag over envelope - this must prevent default to allow dropping
    const handleDragOver = (e) => {
        e.preventDefault(); // This is crucial - without it, drop won't work
        e.dataTransfer.dropEffect = 'move';
    };

    // Handle drag enter - helps with visual feedback and browser compatibility
    const handleDragEnter = (e) => {
        e.preventDefault();
        // Optional: Add visual feedback here (like highlighting the drop zone)
    };

    // Handle the actual drop event
    const handleDrop = (e) => {
        e.preventDefault();
        // Get the stamp source from either state or dataTransfer
        const stampSrc = draggedStamp || e.dataTransfer.getData("text/plain");
        
        if (stampSrc && envelopeRef.current) {
            // Get the envelope's position and size
            const rect = envelopeRef.current.getBoundingClientRect();
            
            // Calculate the position relative to the envelope
            // We subtract half the stamp size (32px) to center the stamp on the cursor
            let x = e.clientX - rect.left - 32;
            let y = e.clientY - rect.top - 32;

            // Ensure the stamp stays within the envelope boundaries
            // These calculations prevent stamps from being placed outside the envelope
            const stampSize = 64; // Approximate stamp size in pixels
            const maxX = rect.width - stampSize;
            const maxY = rect.height - stampSize;
            
            // Clamp the position to stay within bounds
            x = Math.max(0, Math.min(x, maxX));
            y = Math.max(0, Math.min(y, maxY));

            // Add the new stamp to the placed stamps array
            setPlacedStamps(prevStamps => [...prevStamps, { 
                src: stampSrc, 
                x, 
                y,
                id: Date.now() // Add unique ID for React key
            }]);
            
            // Clear the dragged stamp state
            setDraggedStamp(null);
        }
    };

    return (
        <div className="create-container flex flex-center flex-col items-center max-w-[90vw] mx-auto pt-90">
            <div id="envelope-back" className={'create-container flex-center relative'}>
                <div 
                    ref={envelopeRef}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter} // Added for better browser compatibility
                    onDrop={handleDrop}
                    className="relative inline-block"  
                    style={{ width: "fit-content", height: "fit-content" }}
                >
                    <img
                        src={'assets/images/back.png'}
                        alt="back-envelope"
                        className="shadow-lg"
                        draggable={false} // Prevent the envelope image from being draggable
                    />

                    {/* Render all placed stamps on top of the envelope */}
                    {placedStamps.map((stamp) => (
                        <img
                            key={stamp.id} 
                            src={stamp.src}
                            alt="placed-stamp"
                            className="absolute w-auto h-16 object-cover pointer-events-none"
                            style={{ 
                                left: `${stamp.x}px`, 
                                top: `${stamp.y}px`,
                                zIndex: 10
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Scattered Stamps - these are the draggable stamps around the envelope */}
            <div className="absolute inset-0 pointer-events-none"> {/* pointer-events-none on container */}
                {stamps.map((stamp, index) => {
                    // Define positions for scattering stamps around the envelope
                    const positions = [
                        "top-100 left-100 rotate-[-12deg]",
                        "top-120 right-60 rotate-[8deg]",
                        "bottom-90 left-54 rotate-[15deg]",
                        "bottom-85 right-35 rotate-[-18deg]"
                    ];
                    
                    return (
                        <img
                            key={index}
                            src={stamp}
                            alt={`Stamp ${index + 1}`}
                            className={`w-auto h-20 object-cover cursor-move absolute pointer-events-auto ${positions[index % positions.length]}`} // pointer-events-auto on individual stamps
                            draggable={true} // Explicitly set draggable
                            onDragStart={(e) => handleDragStart(e, stamp)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Create;