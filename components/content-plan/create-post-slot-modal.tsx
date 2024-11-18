"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { X, Clock, Type, Video, Mic, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreatePostSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  selectedTime: string;
}

const postTypes = [
  { value: 'text', label: 'Текстовый пост', icon: Type },
  { value: 'video', label: 'Видео', icon: Video },
  { value: 'audio', label: 'Аудио', icon: Mic },
  { value: 'storyline', label: 'Сторилайн', icon: Layout }
];

export default function CreatePostSlotModal({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
}: CreatePostSlotModalProps) {
  const router = useRouter();
  const [startTime, setStartTime] = useState(selectedTime);
  const [endTime, setEndTime] = useState(
    format(new Date(selectedDate.setHours(parseInt(selectedTime) + 1)), 'HH:00')
  );
  const [postType, setPostType] = useState('text');

  const handleCreate = () => {
    // Navigate to create post page with date, time and post type
    router.push(`/create-post?date=${format(selectedDate, 'yyyy-MM-dd')}&time=${startTime}&type=${postType}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Запланировать пост</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Time Range */}
          <div className="space-y-2">
            <Label>Время</Label>
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="pl-9"
                />
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="flex-1 relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {/* Post Type */}
          <div className="space-y-2">
            <Label>Тип поста</Label>
            <Select
              value={postType}
              onValueChange={setPostType}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {postTypes.map(type => {
                  const Icon = type.icon;
                  return (
                    <SelectItem 
                      key={type.value} 
                      value={type.value}
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Отмена
          </Button>
          <Button onClick={handleCreate}>
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}