import React, { useState } from "react";
import { Carousel } from "@material-tailwind/react";

interface BottomIndicatorsProps {
  length: number;
  activeIndex: number;
  onChange: (index: number) => void;
}

const BottomIndicators: React.FC<BottomIndicatorsProps> = ({
  length,
  activeIndex,
  onChange,
}) => (
  <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
    {new Array(length).fill("").map((_, i) => (
      <span
        key={i}
        className={`block h-1 cursor-pointer rounded-2xl transition-all ${
          activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
        }`}
        onClick={() => onChange(i)}
      />
    ))}
  </div>
);

interface CarouselImagesProps {
  images: string[];
}

export const CarouselImages: React.FC<CarouselImagesProps> = ({ images }) => {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenIndex(null);
  };

  const nextImage = () => {
    setFullscreenIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : 0
    );
  };

  const prevImage = () => {
    setFullscreenIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : 0
    );
  };

  return (
    <>
      <div className="w-full max-w-[800px] h-[400px]">
        <Carousel className="rounded-xl h-full"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`image ${index + 1}`}
              className="h-full w-full object-cover cursor-zoom-in"
              onClick={() => openFullscreen(index)}
            />
          ))}
        </Carousel>
      </div>

      {fullscreenIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white text-4xl z-60 hover:text-gray-300"
            aria-label="Close full-screen view"
          >
            ×
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-white text-4xl z-60 hover:text-gray-300"
            aria-label="Previous image"
          >
            &#8249;
          </button>
          <img
            src={images[fullscreenIndex]}
            alt={`Full-screen image ${fullscreenIndex + 1}`}
            className="h-[90vh] w-[90vw] object-contain"
          />
          <button
            onClick={nextImage}
            className="absolute right-4 text-white text-4xl z-60 hover:text-gray-300"
            aria-label="Next image"
          >
            &#8250;
          </button>
          <BottomIndicators
            length={images.length}
            activeIndex={fullscreenIndex}
            onChange={setFullscreenIndex}
          />
        </div>
      )}
    </>
  );
};
