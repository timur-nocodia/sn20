"use client";

import { ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface PreviewSectionProps {
  isGenerating: boolean;
  generatedImages: string[];
  selectedImage: number | null;
  setSelectedImage: (index: number | null) => void;
}

export function PreviewSection({
  isGenerating,
  generatedImages,
  selectedImage,
  setSelectedImage
}: PreviewSectionProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Label>Предпросмотр</Label>

        {isGenerating ? (
          <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="h-8 w-8 mx-auto mb-2 animate-pulse" />
              <p>Генерация изображений...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {generatedImages.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                  selectedImage === index 
                    ? 'ring-2 ring-primary' 
                    : 'hover:ring-2 hover:ring-primary/50'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`Generated image ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}