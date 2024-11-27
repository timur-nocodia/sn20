"use client";

import { useState } from 'react';
import { Upload, Sparkles, Mic } from 'lucide-react';
import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";

interface AudioPostProps {
  onBack: () => void;
  initialDate?: Date;
  initialTime?: string;
}

export default function AudioPost({ onBack, initialDate, initialTime }: AudioPostProps) {
  const [showAiModal, setShowAiModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost"
            onClick={onBack}
          >
            ← Назад
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAiModal(true)}
            className="bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Сгенерировать аудио
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border-2 border-dashed border-border/40 rounded-lg p-12 text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Загрузите аудио</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Перетащите файл сюда или нажмите для выбора
            </p>
            <Button variant="outline">
              Выбрать файл
            </Button>
          </div>

          <div className="border-2 border-dashed border-border/40 rounded-lg p-12 text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Mic className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Записать аудио</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Запишите аудио прямо сейчас
            </p>
            <Button 
              variant={isRecording ? "destructive" : "outline"}
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? "Остановить запись" : "Начать запись"}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showAiModal} onOpenChange={setShowAiModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Генерация аудио с помощью AI</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}