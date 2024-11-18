import { Instagram, Facebook, Youtube, Video, FileText, Mic } from 'lucide-react';

export const NetworkIcon = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube
};

export const ContentTypeIcon = {
  text: FileText,
  video: Video,
  audio: Mic
};

export const NetworkColor = {
  instagram: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
  facebook: 'bg-[#1877F2]',
  youtube: 'bg-[#FF0000]'
};

export const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const timeSlots = Array.from({ length: 24 }, (_, i) => 
  `${i.toString().padStart(2, '0')}:00`
);