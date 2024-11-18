"use client";

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PromptSection } from './sections/prompt-section';
import { SettingsSection } from './sections/settings-section';
import { PreviewSection } from './sections/preview-section';

interface ImageGeneratorProps {
  onBack: () => void;
}

export function ImageGenerator({ onBack }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [style, setStyle] = useState('auto');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [model, setModel] = useState('2.0');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setSelectedImage(null);
    // Simulate generating 4 images
    setTimeout(() => {
      setGeneratedImages([
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        'https://images.unsplash.com/photo-1481487196290-c152efe083f5',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        'https://images.unsplash.com/photo-1484417894907-623942c8ee29'
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
          <div>
            <h2 className="text-lg font-semibold">Генерация изображений</h2>
            <p className="text-sm text-muted-foreground">
              Создавайте уникальные изображения с помощью AI
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <PromptSection
            prompt={prompt}
            setPrompt={setPrompt}
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          <SettingsSection
            style={style}
            setStyle={setStyle}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            model={model}
            setModel={setModel}
          />
        </div>

        <PreviewSection
          isGenerating={isGenerating}
          generatedImages={generatedImages}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>
    </div>
  );
}