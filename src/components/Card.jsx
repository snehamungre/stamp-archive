import React from 'react';

const Card = ({ stamp }) => {
    if (!stamp) return null;

    return (
        <div className="relative w-[443px] h-[462px]">
            {/* SVG Background */}
            <img 
                src="/assets/images/content-card.svg" 
                alt="Card background"
                className="absolute inset-0 w-1/2 h-auto"
            />

            {/* Stamp Image - positioned in the red area */}
            <div className="absolute top-[86px] left-[131px] w-[177px] h-[168px] flex items-center justify-center">
                <img 
                    src={stamp.img} 
                    alt={`Stamp from ${stamp.countries.join(' and ')}`}
                    className="w-full h-full object-cover rounded"
                />
            </div>

            {/* Collection Name - positioned above the lines */}
            <div className="absolute top-[200px] left-[50px] right-[50px] text-center">
                <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                    {stamp.collection}
                </h3>
            </div>

            {/* Countries - positioned on the first line */}
            <div className="absolute top-[260px] left-[50px] right-[50px] text-center">
                <p className="text-sm font-medium text-gray-700">
                    Countries: {stamp.countries.join(' & ')}
                </p>
            </div>

            {/* Year - positioned on the second line */}
            <div className="absolute top-[294px] left-[50px] right-[50px] text-center">
                <p className="text-sm font-medium text-gray-700">
                    Year: {stamp.year}
                </p>
            </div>

            {/* Additional Info - positioned on the third line */}
            <div className="absolute top-[328px] left-[50px] right-[50px] text-center">
                <p className="text-sm text-gray-600 leading-tight">
                    {stamp.info}
                </p>
            </div>
        </div>
    );
};

export default Card;