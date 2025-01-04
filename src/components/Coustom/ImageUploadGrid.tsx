"use client";

import React, { useState, useEffect } from "react";
import { ImagePlus, X, Move as MoveIcon } from "lucide-react";

interface UploadFileProps {
  img?: string | null;
  file?: File | null;
  onChange: (file: File, index: number) => void;
  onRemove: (index: number) => void;
  index: number;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  isActive: boolean;
}

const UploadFile: React.FC<UploadFileProps> = ({
  img,
  onChange,
  onRemove,
  index,
  onDragStart,
  onDragOver,
  isActive,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile, index);
    }
  };

  return (
    <div
      className={`aspect-square border-2 border-dashed rounded-md flex items-center justify-center relative 
        ${isActive ? "border-gray-300 bg-gray-50 hover:bg-gray-100" : "border-gray-200 bg-gray-100"}`}
      draggable={!!img}
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(index);
      }}
    >
      {img ? (
        <>
          <img
            src={img}
            alt={`Uploaded image ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
            onClick={() => onRemove(index)}
          >
            <X size={16} />
          </button>
          <div className="absolute top-1 left-1 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center">
            {index + 1}
          </div>
          <MoveIcon className="absolute bottom-1 right-1 text-white" size={20} />
        </>
      ) : isActive ? (
        <label className="cursor-pointer">
          <ImagePlus className="w-8 h-8 text-gray-400" />
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
      ) : (
        <ImagePlus className="w-8 h-8 text-gray-300" />
      )}
    </div>
  );
};

interface ImageUploadGridProps {
  onChange: (images: string[]) => void;
  initialImages?: string[];
}

const ImageUploadGrid: React.FC<ImageUploadGridProps> = ({
  onChange,
  initialImages = [],
}) => {
  const [images, setImages] = useState<(string | null)[]>([]);
  const [files, setFiles] = useState<(File | null)[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setImages(initialImages);
    setFiles(initialImages.map(() => null));
  }, [initialImages]);

  const handleUpload = (file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImages = [...images];
      const newFiles = [...files];
      newImages[index] = e.target?.result as string;
      newFiles[index] = file;
      setImages(newImages);
      setFiles(newFiles);
      onChange(newImages.filter((img): img is string => img !== null));
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (index: number) => {
    const newImages = [...images];
    const newFiles = [...files];
    newImages.splice(index, 1);
    newFiles.splice(index, 1);
    setImages(newImages);
    setFiles(newFiles);
    onChange(newImages.filter((img): img is string => img !== null));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (
      draggedIndex !== null &&
      draggedIndex !== index &&
      index < images.length
    ) {
      const newImages = [...images];
      const newFiles = [...files];
      const [movedImage] = newImages.splice(draggedIndex, 1);
      const [movedFile] = newFiles.splice(draggedIndex, 1);
      newImages.splice(index, 0, movedImage);
      newFiles.splice(index, 0, movedFile);
      setImages(newImages);
      setFiles(newFiles);
      setDraggedIndex(index);
      onChange(newImages.filter((img): img is string => img !== null));
    }
  };

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
      {[...Array(6)].map((_, index) => (
        <UploadFile
          key={index}
          img={images[index]}
          file={files[index]}
          onChange={handleUpload}
          onRemove={handleRemove}
          index={index}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          isActive={index === 0 || index < images.length + 1}
        />
      ))}
    </div>
  );
};

export default ImageUploadGrid;
