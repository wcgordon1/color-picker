'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import imagePalette from 'image-palette';
import { FaCopy } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const ColorPicker = () => {
  const [image, setImage] = useState(null);
  const [palette, setPalette] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    setIsLoading(true);
    reader.onload = (e) => {
      setImage(e.target.result);
      extractColors(e.target.result);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const extractColors = (imageData) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { colors } = imagePalette(imageData.data, 10);
      const extractedPalette = colors.map(color => ({
        rgb: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        hex: rgbToHex(color[0], color[1], color[2])
      }));
      setPalette(extractedPalette);
      setSelectedColor(extractedPalette[0]);
      setIsLoading(false);
    };
    img.src = imageData;
  };

  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied! ${text}`);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <Toaster position="bottom-center" />
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer w-full max-w-2xl"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Let go of the image to begin</p>
        ) : (
          <p>Drag or drop an image here, or click to select one</p>
        )}
      </div>

      {isLoading && (
        <div className="mt-8 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}

      {image && !isLoading && (
        <div className="mt-8 relative w-full max-w-2xl">
          <img src={image} alt="Uploaded" className="w-full h-auto object-contain" />
        </div>
      )}

      {palette.length > 0 && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Palette</h2>
          <div className="flex flex-wrap gap-2 justify-start mb-4">
            {palette.map((color, index) => (
              <div
                key={index}
                className="w-16 h-16 cursor-pointer rounded-md shadow-md transition-transform hover:scale-105"
                style={{ backgroundColor: color.rgb }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
          {selectedColor && (
            <div className="flex items-stretch">
              <div
                className="w-16 h-32 rounded-md shadow-md mr-4 flex-shrink-0"
                style={{ backgroundColor: selectedColor.rgb }}
              ></div>
              <div className="flex-grow flex flex-col">
                <div 
                  className="flex-1 bg-white rounded-md shadow-md mb-2 flex items-center justify-between px-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => copyToClipboard(selectedColor.hex)}
                >
                  <span>HEX: {selectedColor.hex}</span>
                  <FaCopy className="text-gray-600 group-hover:text-blue-500 transition-colors duration-200" />
                </div>
                <div 
                  className="flex-1 bg-white rounded-md shadow-md flex items-center justify-between px-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => copyToClipboard(selectedColor.rgb)}
                >
                  <span>RGB: {selectedColor.rgb}</span>
                  <FaCopy className="text-gray-600 group-hover:text-blue-500 transition-colors duration-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;