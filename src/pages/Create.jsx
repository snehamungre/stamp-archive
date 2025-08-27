import React, { useEffect,useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';


const Create = () => {
    const location = useLocation();
    const envelopeRef = useRef();
    const [stamps, setStamps] = useState([]);
    const [draggedStamp, setDraggedStamp] = useState(null);

    
    useEffect(() => {
        // Scroll to top when the component mounts or route changes
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [location.pathname]); 


    // todo: make a function which gets the values of all the images which are in the stamps folder 
    // todo: make the placement of the stamps responsive
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

    const handleDragStart = (e, stampSrc) => {
        setDraggedStamp(stampSrc);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (draggedStamp) {
            // Create a new stamp element on the envelope
            const stampElement = document.createElement('img');
            stampElement.src = draggedStamp;
            stampElement.className = 'absolute w-auto h-16 object-cover cursor-move';
            stampElement.style.left = `${e.clientX - envelopeRef.current.getBoundingClientRect().left - 32}px`;
            stampElement.style.top = `${e.clientY - envelopeRef.current.getBoundingClientRect().top - 32}px`;
            
            envelopeRef.current.appendChild(stampElement);
            setDraggedStamp(null);
        }
    };
    
    return (
        <div className="create-container flex flex-center flex-col items-center w-3/4 max-w-[80vw] mx-auto pt-10">
            <div id="envelope-back" className={'create-container flex-center relative'}>
                <div className='h-dvh'></div>
                <img
                ref={envelopeRef}
                src={'assets/images/back.png'}
                alt="back-envelope"
                className="shadow-md"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                />
            </div>
      
            {/* Scattered Stamps */}
            <div className="absolute inset-0 pointer-events-none">
                {stamps.map((stamp, index) => {
                // Generate some random scatter positions around envelope
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
                    className={`w-auto h-20 object-cover shadow-md absolute ${positions[index % positions.length]}`}
                    />
                );
                })}
            </div>
        </div>
      );
};

export default Create;