"use client";

import { useState } from 'react';
import { Upload, Play, Pause, Check } from 'lucide-react';
import { Button } from '@/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Card } from '@/ui/card';
import { Dialog, DialogContent } from "@/ui/dialog";
import Image from 'next/image';

interface Step2CreateVideoProps {
  onBack: () => void;
  onNext: () => void;
  script: string;
  videoUrl: string | null;
  setVideoUrl: (url: string | null) => void;
  selectedAvatar: number | null;
  setSelectedAvatar: (id: number | null) => void;
}

// Example avatar data
const avatars = [
  { id: 1, name: "Анна М.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
  { id: 2, name: "Михаил К.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
  { id: 3, name: "Елена С.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" },
  { id: 4, name: "Дмитрий П.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" },
  { id: 5, name: "София В.", image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e" },
];

export default function Step2CreateVideo({ 
  onBack, 
  onNext,
  script,
  videoUrl,
  setVideoUrl,
  selectedAvatar,
  setSelectedAvatar
}: Step2CreateVideoProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
              <h2 className="text-lg font-semibold">Создайте видео</h2>
              <p className="text-sm text-muted-foreground">
                Сгенерируйте видео на основе сценария или загрузите готовое
              </p>
            </div>
          </div>
          <Button 
            onClick={onNext}
            disabled={selectedAvatar === null && !videoUrl}
          >
            Далее →
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="generate">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Сгенерировать видео</TabsTrigger>
            <TabsTrigger value="upload">Загрузить видео</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="mt-6">
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-3">Выберите свой аватар</h3>
              <div className="flex flex-wrap gap-4">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    className={`relative p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                      selectedAvatar === avatar.id 
                        ? 'bg-primary/10 ring-2 ring-primary' 
                        : 'hover:bg-primary/5'
                    }`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                  >
                    <div className="relative aspect-[2/3] w-32 rounded-lg overflow-hidden mb-2">
                      <div className="relative w-full h-full">
                        <Image
                          src={avatar.image}
                          alt={avatar.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      {selectedAvatar === avatar.id && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-center">{avatar.name}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <Card className="border-2 border-dashed border-border/40 rounded-lg p-12 text-center">
              <div className="mx-auto w-12 h-12 bg-[#FFF3ED] rounded-lg flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-[#FF6B00]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Загрузите видео</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Перетащите файл сюда или нажмите для выбора
              </p>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                id="video-upload"
                onChange={handleFileUpload}
              />
              <label htmlFor="video-upload">
                <Button variant="outline" className="cursor-pointer">
                  Выбрать файл
                </Button>
              </label>

              {videoUrl && (
                <div className="mt-6 relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    src={videoUrl}
                    className="w-full h-full object-contain"
                    controls
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                    onClick={() => handlePreview(videoUrl)}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog 
        open={previewUrl !== null} 
        onOpenChange={() => setPreviewUrl(null)}
      >
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
          <div className="relative w-full h-[90vh] bg-black">
            {previewUrl && (
              <video
                src={previewUrl}
                className="w-full h-full object-contain"
                autoPlay={isPlaying}
                controls
              />
            )}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}