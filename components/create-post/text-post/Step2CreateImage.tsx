"use client";

import { useState } from 'react';
import { Upload, Wand2, Check, Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface Step2CreateImageProps {
  onBack: () => void;
  onNext: (images: string[]) => void;
}

// Example library images
const libraryImages = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
  'https://images.unsplash.com/photo-1481487196290-c152efe083f5',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  'https://images.unsplash.com/photo-1484417894907-623942c8ee29',
  'https://images.unsplash.com/photo-1516542076529-1ea3854896f2',
  'https://images.unsplash.com/photo-1516321497487-e288fb19713f',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca4',
  'https://images.unsplash.com/photo-1516321165247-4aa89a48be28'
];

export default function Step2CreateImage({ onBack, onNext }: Step2CreateImageProps) {
  const [imagePrompt, setImagePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [isCarousel, setIsCarousel] = useState(false);
  const [previewImage, setPreviewImage] = useState<number | null>(null);
  const [selectedLibraryImages, setSelectedLibraryImages] = useState<number[]>([]);

  const handleAiSuggestion = () => {
    setImagePrompt("Минималистичное рабочее пространство в светлых тонах с современным ноутбуком, чашкой ароматного кофе и стильным блокнотом. Естественное освещение создает теплую атмосферу продуктивности и творчества.");
  };

  const handleGenerate = () => {
    if (!imagePrompt.trim()) return;
    
    setIsGenerating(true);
    setSelectedImages([]);
    // Simulate image generation
    setTimeout(() => {
      setGeneratedImages([
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        'https://images.unsplash.com/photo-1481487196290-c152efe083f5',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        'https://images.unsplash.com/photo-1484417894907-623942c8ee29'
      ]);
      setIsGenerating(false);
    }, 500);
  };

  const handleNextClick = () => {
    if (selectedImages.length > 0) {
      const selectedImageUrls = selectedImages.map(index => generatedImages[index]);
      onNext(selectedImageUrls);
    } else if (selectedLibraryImages.length > 0) {
      const selectedImageUrls = selectedLibraryImages.map(index => libraryImages[index]);
      onNext(selectedImageUrls);
    }
  };

  const toggleImageSelection = (index: number, type: 'generated' | 'library', e: React.MouseEvent) => {
    // Prevent opening preview when clicking checkbox
    if ((e.target as HTMLElement).closest('.checkbox')) {
      e.stopPropagation();
      if (type === 'generated') {
        setSelectedImages(prev => {
          if (prev.includes(index)) {
            return prev.filter(i => i !== index);
          }
          if (!isCarousel) {
            return [index];
          }
          return [...prev, index];
        });
      } else {
        setSelectedLibraryImages(prev => {
          if (prev.includes(index)) {
            return prev.filter(i => i !== index);
          }
          if (!isCarousel) {
            return [index];
          }
          return [...prev, index];
        });
      }
      return;
    }
    
    const images = type === 'generated' ? generatedImages : libraryImages;
    setPreviewImage(index);
  };

  const handlePrevImage = () => {
    const imagesList = generatedImages.length > 0 ? generatedImages : libraryImages;
    setPreviewImage(prev => {
      if (prev === null) return imagesList.length - 1;
      return prev === 0 ? imagesList.length - 1 : prev - 1;
    });
  };

  const handleNextImage = () => {
    const imagesList = generatedImages.length > 0 ? generatedImages : libraryImages;
    setPreviewImage(prev => {
      if (prev === null) return 0;
      return prev === imagesList.length - 1 ? 0 : prev + 1;
    });
  };

  const isNextDisabled = isCarousel 
    ? (selectedImages.length + selectedLibraryImages.length) < 2 
    : (selectedImages.length + selectedLibraryImages.length) !== 1;

  return (
    <Card className="min-h-screen bg-background shadow-none border-none">
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={onBack}
            >
              ← Назад
            </Button>
            <div>
              <h2 className="text-lg font-semibold">Добавьте изображение</h2>
              <p className="text-sm text-muted-foreground">
                Сгенерируйте или загрузите изображение
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="carousel-mode" className="text-sm font-medium flex items-center space-x-2">
                <Images className="h-4 w-4" />
                <span>Карусель</span>
              </Label>
              <Switch
                id="carousel-mode"
                checked={isCarousel}
                onCheckedChange={setIsCarousel}
              />
            </div>
            <Button onClick={handleNextClick} disabled={isNextDisabled}>
              Далее →
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="generate">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">Сгенерировать изображение</TabsTrigger>
            <TabsTrigger value="upload">Загрузить изображение</TabsTrigger>
            <TabsTrigger value="library">Выбрать из библиотеки</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="mt-6">
            <div className="space-y-4">
              <div className="relative">
                <Textarea 
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Опишите изображение, которое хотите сгенерировать..."
                  className="min-h-[100px] resize-y pr-10"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
                  onClick={handleAiSuggestion}
                >
                  <Wand2 className="h-4 w-4" />
                </Button>
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={!imagePrompt.trim() || isGenerating}
                className="w-full"
              >
                {isGenerating ? 'Генерация...' : 'Сгенерировать'}
              </Button>

              {generatedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {generatedImages.map((src, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:translate-y-[-2px]"
                      onClick={(e) => toggleImageSelection(index, 'generated', e)}
                    >
                      <Image
                        src={src}
                        alt={`Generated image ${index + 1}`}
                        fill
                        className="object-cover transition-all duration-200"
                        unoptimized
                      />
                      {/* Orange overlay for selected state */}
                      <div
                        className={`absolute inset-0 bg-[#FF6B00] transition-opacity duration-200 ${
                          selectedImages.includes(index) 
                            ? 'opacity-50' 
                            : 'opacity-0'
                        }`}
                      />
                      <div 
                        className={`checkbox absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                          selectedImages.includes(index)
                            ? 'bg-[#FF6B00] shadow-[0_2px_8px_rgba(255,107,0,0.25)]'
                            : 'bg-white/90 opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        <Check 
                          className={`h-6 w-6 ${
                            selectedImages.includes(index)
                              ? 'text-white'
                              : 'text-primary'
                          }`}
                        />
                      </div>
                      {selectedImages.includes(index) && isCarousel && (
                        <div className="absolute top-4 left-4 bg-[#FF6B00] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-medium shadow-[0_2px_8px_rgba(255,107,0,0.25)]">
                          {selectedImages.indexOf(index) + 1}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <div className="border-2 border-dashed border-border/40 rounded-lg p-12 text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Загрузите изображение</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Перетащите файл сюда или нажмите для выбора
              </p>
              <Button variant="outline">
                Выбрать файл
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="library" className="mt-6">
            <ScrollArea className="h-[500px] pr-4">
              <div className="grid grid-cols-3 gap-4">
                {libraryImages.map((src, index) => (
                  <div 
                    key={index}
                    className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:translate-y-[-2px]"
                    onClick={(e) => toggleImageSelection(index, 'library', e)}
                  >
                    <Image
                      src={src}
                      alt={`Library image ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-200"
                      unoptimized
                    />
                    {/* Orange overlay for selected state */}
                    <div
                      className={`absolute inset-0 bg-[#FF6B00] transition-opacity duration-200 ${
                        selectedLibraryImages.includes(index) 
                          ? 'opacity-50' 
                          : 'opacity-0'
                      }`}
                    />
                    <div 
                      className={`checkbox absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                        selectedLibraryImages.includes(index)
                          ? 'bg-[#FF6B00] shadow-[0_2px_8px_rgba(255,107,0,0.25)]'
                          : 'bg-white/90 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Check 
                        className={`h-6 w-6 ${
                          selectedLibraryImages.includes(index)
                            ? 'text-white'
                            : 'text-primary'
                        }`}
                      />
                    </div>
                    {selectedLibraryImages.includes(index) && isCarousel && (
                      <div className="absolute top-4 left-4 bg-[#FF6B00] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-medium shadow-[0_2px_8px_rgba(255,107,0,0.25)]">
                        {selectedLibraryImages.indexOf(index) + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog 
        open={previewImage !== null} 
        onOpenChange={() => setPreviewImage(null)}
      >
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
          <div className="relative h-[90vh] bg-black">
            {previewImage !== null && (
              <Image
                src={generatedImages.length > 0 ? generatedImages[previewImage] : libraryImages[previewImage]}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized
              />
            )}
            
            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
              onClick={() => setPreviewImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}