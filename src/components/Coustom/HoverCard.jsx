import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names

const HoverCard = ({ 
  type = 1, 
  leftLabel = 'Click', 
  rightLabel = 'Click', 
  onChange, 
  backgroundImage,
  className,
  color1 = 'red',
  color2 = 'blue'
}) => {
  const handleClick = (side) => {
    if (onChange) {
      onChange(side);
    }
  };

  const cardStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'fill',
    backgroundPosition: 'center',
  };

  return (
    <div className={cn("w-full group/card", className)}>
      <div
        className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl flex flex-col justify-between p-4"
        style={cardStyle}
      >
        <div className="flex absolute inset-0">
          {type === 2 ? (
            <>
              <div 
                className={`w-1/2 h-full transition duration-300 hover:bg-opacity-70 hover:bg-${color1}`}
                onClick={() => handleClick('left')}
              >
                <p className="flex justify-center items-center h-full w-full text-4xl font-semibold text-white opacity-0 hover:opacity-100 transition duration-500">
                  {leftLabel}
                </p>
              </div>
              <div 
                className={`w-1/2 h-full transition duration-300 hover:bg-opacity-70 hover:bg-${color2}`}
                onClick={() => handleClick('right')}
              >
                <p className="flex justify-center items-center h-full w-full text-4xl font-semibold text-white opacity-0 hover:opacity-100 transition duration-500">
                  {rightLabel}
                </p>
              </div>
            </>
          ) : (
            <div 
              className={`w-full h-full transition duration-300 hover:bg-opacity-70 hover:bg-${color1}`}
              onClick={() => handleClick('center')}
            >
              <div className="flex justify-center items-center h-full w-full text-4xl font-semibold text-white opacity-0 hover:opacity-100 transition duration-500">
                {leftLabel}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HoverCard;