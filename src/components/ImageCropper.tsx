"use client";

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/utils/cropImage';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCropperProps {
  imageSrc: string;
  onSave: (croppedImage: string) => void;
  onCancel: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onSave, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels as any, rotation);
      if (croppedImage) {
        onSave(croppedImage);
      }
    } catch (e) {
      console.error(e);
      alert('Error cropping image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-full max-w-2xl bg-black border border-[#FF0E7F] p-6 shadow-[0_0_30px_rgba(255,14,127,0.2)] flex flex-col gap-6 relative">
          
          <div className="flex justify-between items-center text-[#00FFFF] font-mono border-b border-gray-800 pb-4">
            <h3 className="text-xl font-bold tracking-widest uppercase">
              [ EDIT_IMAGE ]
            </h3>
            <button onClick={onCancel} className="text-gray-500 hover:text-[#FF0E7F] transition-colors uppercase text-sm font-bold">
              [ CLOSE ]
            </button>
          </div>

          <div className="relative w-full h-[40vh] md:h-[50vh] bg-gray-900 border border-[#00FFFF]/30">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              showGrid={false}
              cropShape="rect"
            />
          </div>

          <div className="flex flex-col gap-4 font-mono">
            <div className="flex items-center gap-4">
              <span className="text-[#FFE114] text-xs uppercase w-20">Zoom</span>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[#FFE114]"
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[#FF0E7F] text-xs uppercase w-20">Rotate</span>
              <input
                type="range"
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full accent-[#FF0E7F]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-2">
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-600 text-gray-400 font-mono text-sm uppercase hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isProcessing}
              className="px-6 py-2 bg-[#00FFFF] text-black font-mono font-bold text-sm uppercase shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isProcessing ? 'Processing...' : 'Save Crop'}
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
