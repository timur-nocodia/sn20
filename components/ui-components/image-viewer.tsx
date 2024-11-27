"use client";

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Pencil } from 'lucide-react';
import { Button } from '@/ui/button';
import { Dialog, DialogContent } from '@/ui/dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageViewer({
  images,
  initialIndex = 0,
  open,
  onOpenChange
}: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
        <div className="relative h-[90vh] bg-black">
          {/* Main Image */}
          <div className="relative w-full h-[calc(100%-100px)]">
            <Image
              src={images[currentIndex]}
              alt="Preview"
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>

          {/* Navigation */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-sm"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-sm"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Close and Edit buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/80 hover:bg-white shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                // Edit functionality will be added later
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/20 hover:bg-black/40 text-white"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-black/50 backdrop-blur-sm">
            <div className="flex items-center justify-center h-full px-4 space-x-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative w-[80px] h-[80px] cursor-pointer transition-all duration-200 rounded-lg",
                    currentIndex === index 
                      ? "ring-2 ring-primary" 
                      : "opacity-50 hover:opacity-100"
                  )}
                  onClick={() => setCurrentIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}