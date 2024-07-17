import React, { useState } from "react";

export default function ({ children }) {
  const [isVisible, setIsVisible] = useState(true);
  const [direction, setDirection] = useState(null);

  const swipe = (dir) => {
    setDirection(dir);
    setIsVisible(false);
    // Reset after animation
    setTimeout(() => {
      setDirection(null);
      setIsVisible(true);
    }, 500); // Match this with the animation duration
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-80">
        <div
          className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out
            ${
              !isVisible && direction === "right"
                ? "translate-x-full rotate-12 opacity-0"
                : ""
            }
            ${
              !isVisible && direction === "left"
                ? "-translate-x-full -rotate-12 opacity-0"
                : ""
            }
          `}
        >
          {children}
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => swipe("left")}
          className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Swipe Left
        </button>
        <button
          onClick={() => swipe("right")}
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Swipe Right
        </button>
      </div>
    </div>
  );
}
