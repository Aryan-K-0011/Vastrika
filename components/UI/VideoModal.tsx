import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] text-white/50 hover:text-white transition-colors duration-300 group"
      >
        <span className="sr-only">Close</span>
        <X size={40} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>
      
      {/* Video Container */}
      <div className="relative w-full max-w-7xl aspect-video bg-black shadow-2xl rounded-sm overflow-hidden z-[105] animate-in zoom-in-95 duration-300">
        <iframe 
          src={videoUrl} 
          title="Brand Film"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};