"use client";

import { useState } from 'react';
import { Wand2, ImageIcon, Video } from 'lucide-react';
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Card } from '@/ui/card';
import Image from 'next/image';
import type { Story } from './types';

interface GenerateVisualModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (imageUrl: string) => void;
  story?: Story;
}

const styles = [
  { id: 'auto', label: 'Авто' },
  { id: 'general', label: 'Общий' },
  { id: 'realistic', label: 'Реалистичный' },
  { id: 'design', label: 'Дизайн' },
  { id: '3d', label: '3D' },
  { id: 'anime', label: 'Аниме' }
];

export default function GenerateVisualModal({
  open,
  onOpenChange,
  onGenerate,
  story
}: GenerateVisualModalProps) {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [style, setStyle] = useState('auto');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePromptEnhance = () => {
    setPrompt("Профессиональная фотография в высоком разрешении, мягкое естественное освещение, детализированная композиция с глубиной резкости");
  };

  const handleNegativePromptEnhance = () => {
    setNegativePrompt("Размытость, шум, артефакты, искажения, низкое качество, пиксели");
  };

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

  const handleConfirm = () => {
    if (selectedImage !== null) {
      onGenerate(generatedImages[selectedImage]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Сгенерировать медиа</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="image" className="w-full" onValueChange={(value) => setActiveTab(value as 'image' | 'video')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="image">
              <ImageIcon className="h-4 w-4 mr-2" />
              Изображение
            </TabsTrigger>
            <TabsTrigger value="video">
              <Video className="h-4 w-4 mr-2" />
              Видео
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Промпт</Label>
                <div className="relative">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Опишите, что вы хотите увидеть..."
                    className="min-h-[100px] resize-y pr-10"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
                    onClick={handlePromptEnhance}
                  >
                    <Wand2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Негативный промпт</Label>
                <div className="relative">
                  <Textarea
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="Опишите, что вы НЕ хотите видеть..."
                    className="min-h-[100px] resize-y pr-10"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary"
                    onClick={handleNegativePromptEnhance}
                  >
                    <Wand2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Стиль</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map(style => (
                      <SelectItem key={style.id} value={style.id}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full" 
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
              >
                {activeTab === 'image' ? <ImageIcon className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
                {isGenerating ? 'Генерация...' : 'Сгенерировать'}
              </Button>
            </div>

            <Card className="p-4">
              <div className="space-y-4">
                <Label>Предпросмотр</Label>

                {isGenerating ? (
                  <div className="aspect-[9/16] rounded-lg bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      {activeTab === 'image' ? (
                        <ImageIcon className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                      ) : (
                        <Video className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                      )}
                      <p>Генерация...</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {generatedImages.map((image, index) => (
                      <div
                        key={index}
                        className={`relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                          selectedImage === index 
                            ? 'ring-2 ring-primary' 
                            : 'hover:ring-2 hover:ring-primary/50'
                        }`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <Image
                          src={image}
                          alt={`Generated ${activeTab} ${index + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                )}

                {selectedImage !== null && (
                  <Button 
                    className="w-full"
                    onClick={handleConfirm}
                  >
                    Использовать
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}