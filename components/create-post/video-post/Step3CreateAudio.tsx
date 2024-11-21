"use client";

import { useState, useEffect } from 'react';
import { Upload, Mic, Play, Pause, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

interface Step3CreateAudioProps {
  onBack: () => void;
  onNext: () => void;
  script: string;
  audioUrl: string | null;
  setAudioUrl: (url: string | null) => void;
}

// Example voice options
const voices = [
  { id: 1, name: "Анна", gender: "female", language: "Русский", preview: "/audio/anna.mp3" },
  { id: 2, name: "Дмитрий", gender: "male", language: "Русский", preview: "/audio/dmitry.mp3" },
  { id: 3, name: "Елена", gender: "female", language: "Русский", preview: "/audio/elena.mp3" },
  { id: 4, name: "Михаил", gender: "male", language: "Русский", preview: "/audio/mikhail.mp3" },
  { id: 5, name: "София", gender: "female", language: "Русский", preview: "/audio/sofia.mp3" },
];

export default function Step3CreateAudio({ 
  onBack, 
  onNext,
  script,
  audioUrl,
  setAudioUrl
}: Step3CreateAudioProps) {
  const [editedScript, setEditedScript] = useState(script);
  const [selectedVoice, setSelectedVoice] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGeneratePreview = () => {
    if (!selectedVoice) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);

    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setAudioUrl('https://stuff.object.pscloud.io/audio_2024-09-21_17-20-39.mp3');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordingTime(0);
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
              <h2 className="text-lg font-semibold">Создайте аудио</h2>
              <p className="text-sm text-muted-foreground">
                Сгенерируйте аудио на основе сценария или запишите свой голос
              </p>
            </div>
          </div>
          <Button 
            onClick={onNext}
            disabled={!audioUrl}
          >
            Далее →
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-6 min-h-0">
          <Card className="flex flex-col overflow-hidden">
            <div className="p-6 pb-2">
              <h3 className="text-lg font-semibold">Сценарий</h3>
            </div>
            <div className="flex-1 p-6 pt-2">
              <Textarea
                value={editedScript}
                onChange={(e) => setEditedScript(e.target.value)}
                className="h-full resize-none bg-background border border-input"
                placeholder="Введите текст для озвучки..."
              />
            </div>
          </Card>

          <div className="flex flex-col min-h-0">
            <Tabs defaultValue="generate" className="flex-1 flex flex-col">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="generate">Сгенерировать</TabsTrigger>
                <TabsTrigger value="upload">Загрузить</TabsTrigger>
                <TabsTrigger value="record">Записать</TabsTrigger>
              </TabsList>

              <div className="flex-1 mt-6">
                <TabsContent value="generate" className="h-full m-0">
                  <div className="flex flex-col h-full space-y-4">
                    <Card className="flex-1 p-6">
                      <h3 className="text-sm font-medium mb-3">Выберите голос</h3>
                      <ScrollArea className="h-[calc(100%-2rem)]">
                        <div className="space-y-2 pr-4">
                          {voices.map((voice) => (
                            <div
                              key={voice.id}
                              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                                selectedVoice === voice.id 
                                  ? 'bg-primary/10 ring-2 ring-primary' 
                                  : 'hover:bg-primary/5'
                              }`}
                              onClick={() => setSelectedVoice(voice.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{voice.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {voice.gender === 'female' ? 'Женский' : 'Мужской'} • {voice.language}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Play voice preview
                                  }}
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </Card>

                    <Button 
                      className="w-full"
                      onClick={handleGeneratePreview}
                      disabled={!selectedVoice || isGenerating}
                    >
                      <Wand2 className="mr-2 h-4 w-4" />
                      {isGenerating ? 'Генерация...' : 'Сгенерировать'}
                    </Button>

                    {isGenerating && (
                      <div className="space-y-2">
                        <Progress value={generationProgress} className="w-full" />
                        <p className="text-sm text-muted-foreground text-center">
                          Генерация аудио... {generationProgress}%
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="h-full m-0">
                  <Card className="h-full flex flex-col items-center justify-center border-2 border-dashed">
                    <div className="mx-auto w-12 h-12 bg-[#FFF3ED] rounded-lg flex items-center justify-center mb-4">
                      <Upload className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Загрузите аудио</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Перетащите файл сюда или нажмите для выбора
                    </p>
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      id="audio-upload"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="audio-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Выбрать файл
                      </Button>
                    </label>
                  </Card>
                </TabsContent>

                <TabsContent value="record" className="h-full m-0">
                  <Card className="h-full flex flex-col items-center justify-center border-2 border-dashed">
                    <div className="mx-auto w-12 h-12 bg-[#FFF3ED] rounded-lg flex items-center justify-center mb-4">
                      <Mic className={`h-6 w-6 ${isRecording ? 'text-destructive animate-pulse' : 'text-[#FF6B00]'}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Запишите аудио</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Запишите аудио с помощью микрофона
                    </p>
                    {isRecording && (
                      <div className="text-2xl font-bold mb-4 text-destructive">
                        {formatTime(recordingTime)}
                      </div>
                    )}
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      onClick={toggleRecording}
                      className="cursor-pointer"
                    >
                      {isRecording ? 'Остановить запись' : 'Начать запись'}
                    </Button>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>

            {audioUrl && (
              <Card className="p-4 mt-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Предпросмотр аудио</h3>
                  <audio 
                    controls 
                    className="w-full" 
                    src={audioUrl}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}