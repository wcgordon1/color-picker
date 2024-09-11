'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import imagePalette from 'image-palette';
import { FaCopy, FaExpand } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ColorPicker = () => {
  const [image, setImage] = useState('/images/folsom1.jpeg');
  const [palette, setPalette] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageProcessing = useCallback((imageSrc, isDefault = false) => {
    if (!isDefault) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    }
    
    const img = new Image();
    img.onload = () => {
      setImage(imageSrc);
      imageRef.current = img;
      setIsLoading(false);
      extractColors(img);
    };
    img.onerror = () => {
      setIsLoading(false);
      toast.error('Failed to load image');
    };
    img.src = imageSrc;
  }, []);

  useEffect(() => {
    handleImageProcessing('/images/folsom1.jpeg', true);
  }, [handleImageProcessing]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error('Only JPEG, JPG, and PNG files!', {
        position: 'top-right',
      });
      return;
    }

    const file = acceptedFiles[0];
    const reader = new FileReader();

    // Show toast immediately when file is dropped
    toast('Processing. Hold tight!', {
      icon: '🖼️',
      position: 'top-right',
      duration: 3000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

    reader.onload = (e) => {
      handleImageProcessing(e.target.result, false);
    };

    reader.readAsDataURL(file);
  }, [handleImageProcessing]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    multiple: false,
  });

  const extractColors = (img) => {
    if (canvasRef.current && img) {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { colors } = imagePalette(imageData.data, 10);
      const extractedPalette = colors.map(color => ({
        rgb: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        hex: rgbToHex(color[0], color[1], color[2]),
        isLight: isLightColor(color[0], color[1], color[2])
      }));
      setPalette(extractedPalette);
      setSelectedColor(extractedPalette[0]);
    }
  };

  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');

  const isLightColor = (r, g, b) => {
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied! ${text}`, {
      position: 'bottom-center',
    });
  };

  const handleImageClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const pixelX = Math.floor(x * scaleX);
    const pixelY = Math.floor(y * scaleY);

    const ctx = canvas.getContext('2d');
    const pixelData = ctx.getImageData(pixelX, pixelY, 1, 1).data;
    const color = {
      rgb: `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`,
      hex: rgbToHex(pixelData[0], pixelData[1], pixelData[2]),
      isLight: isLightColor(pixelData[0], pixelData[1], pixelData[2])
    };
    setSelectedColor(color);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer w-full max-w-2xl"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Let go of the image to begin</p>
        ) : (
          <p>Drag or drop a JPEG, JPG, or PNG image here, or click to select one</p>
        )}
      </div>

      <div className="mt-8 relative w-full max-w-2xl mx-auto">
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
            <div className="loader"></div>
          </div>
        )}
        {image && (
          <>
            <img
              ref={imageRef}
              src={image}
              alt="Uploaded"
              className="w-full h-auto object-contain"
              style={{ maxWidth: '100%', display: 'block' }}
            />
            <canvas
              ref={canvasRef}
              onClick={handleImageClick}
              className="absolute top-0 left-0 w-full h-full cursor-crosshair"
              style={{ opacity: 0 }}
            />
          </>
        )}
      </div>

      {palette.length > 0 && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Palette</h2>
          <div className="flex flex-wrap gap-2 justify-start mb-4">
            {palette.map((color, index) => (
              <div
                key={index}
                className="w-16 h-16 cursor-pointer rounded-md shadow-md transition-transform hover:scale-105 relative"
                style={{ backgroundColor: color.rgb }}
                onClick={() => setSelectedColor(color)}
              >
                {selectedColor && color.hex === selectedColor.hex && (
                  <div 
                    className={`absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full ${color.isLight ? 'bg-black text-white' : 'bg-white text-black'}`}
                  >
                    <FaExpand size={12} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-4">Color Details</h3>
          {selectedColor && (
            <div className="flex items-stretch">
              <div
                className="w-16 h-32 rounded-md shadow-md mr-4 flex-shrink-0"
                style={{ backgroundColor: selectedColor.rgb }}
              >
              </div>
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