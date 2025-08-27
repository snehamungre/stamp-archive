import React, { useState, useEffect } from 'react';

const Card = ({ stamp }) => {
    const [isPortrait, setIsPortrait] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (!stamp?.img) return;

        const img = new Image();
        img.src = stamp.img;

        img.onload = () => {
            setImageLoaded(true);
            const aspectRatio = img.width / img.height;

            // Determine orientation based on aspect ratio
            if (aspectRatio > 1.2) {
                // Landscape (width significantly greater than height)
                setIsLandscape(true);
                setIsPortrait(false);
            } else if (aspectRatio < 0.8) {
                // Portrait (height significantly greater than width)
                setIsPortrait(true);
                setIsLandscape(false);
            } else {
                // Square or near-square
                setIsPortrait(false);
                setIsLandscape(false);
            }
        };

        img.onerror = () => {
            console.error('Failed to load stamp image:', stamp.img);
            setImageLoaded(true); // Still set loaded to true to avoid infinite loading
        };
    }, [stamp]);

    if (!stamp) return null;

    return (
        <div className="relative w-80 mx-auto">
            {/* SVG Background */}
            <img
                src="/assets/images/content-card.svg"
                alt="Card background"
                className="w-full h-auto block"
            />

            {/* Stamp Image Container */}
            <div
                className={`absolute transform top-25  -translate-x-1/2 -translate-y-1/2
                            flex items-center justify-center
                            ${isLandscape ? 'right-0 w-30 h-auto' : isPortrait ? 'w-auto h-30 right-5' : 'right-2 w-30 h-30'}`}>
                {!imageLoaded && (
                    <div className="w-full h-full bg-gray-200 animate-pulse rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">Loading...</span>
                    </div>
                )}

                <img
                    src={stamp.img}
                    alt={stamp.id}
                    className={`w-full h-full object-contain transition-opacity duration-300
                     ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                        console.error('Failed to load image:', stamp.img);
                        e.target.style.display = 'none';
                    }}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: isLandscape ? 'cover' : isPortrait ? 'cover' : 'contain'
                    }}
                />
            </div>


            {/* Collection Name */}
            <div className="absolute top-41 left-10 right-10 w-50 text-center">
                <h3 className="text-s font-serif text-gray-800 leading-tight line-clamp-2">
                    {stamp.collection}
                </h3>
            </div>

            {/* Year */}
            <div className="absolute top-47 left-10 right-18 text-center">
                <p className="text-sm font-sans text-pink-100 weight-black-100">
                    Year: {stamp.year}
                </p>
            </div>

            {/* Countries */}
            <div className="absolute top-54 left-9  text-center">
                <p className="text-xs font-sans text-brown-100">
                    Countries: {stamp.countries.join(' , ')}
                </p>
            </div>



            {/* Additional Info */}
            <div className="absolute top-60 w-60 left-7 right-10 text-center">
                <p className="text-xs text-brown-100 leading-tight line-clamp-3">
                    {stamp.info}
                </p>
            </div>
        </div>
    );
};

export default Card;