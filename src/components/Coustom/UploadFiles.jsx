import React from 'react';
import { UserRound, ImageUp } from "lucide-react";

export default function UploadFiles({ type = "roommate", img, onChange }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && onChange) {
      onChange(file);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <label
        className={`flex cursor-pointer flex-col items-center justify-center 
        border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 overflow-hidden
        ${
          type === "roommate"
            ? "rounded-full w-32 h-32 lg:w-64 lg:h-64"
            : "rounded-md w-full h-64"
        }`}
      >
        {img ? (
          <img src={img} alt="Uploaded file" className="object-cover w-full h-64" />
        ) : (
          <>
            <div className="flex flex-col items-center justify-center p-4 lg:p-8 gap-2 lg:gap-4  ">
              {type === "roommate" ? (
                <UserRound className="h-8 w-8 lg:h-16 lg:w-16 text-gray-400" />
              ) : (
                <ImageUp className="h-8 xw8 lg:h-16 lg:w-16 text-gray-400" />
              )}
              <p className="text-xs lg:text-sm text-gray-500 text-center">
                <span className="font-semibold">Click to upload</span> or drag and drop
              <span className="text-xs text-gray-500 hidden lg:block">SVG, PNG, JPG or GIF (MAX. 800x400px)</span>
              </p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
              accept="image/*"
            />
          </>
        )}
      </label>
    </div>
  );
}