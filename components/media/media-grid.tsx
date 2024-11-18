"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { MoreVertical, Copy, Download, Trash, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import type { MediaType, TabType } from './media-content';

interface MediaGridProps {
  search: string;
  mediaType: MediaType;
  tab: TabType;
}

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'text';
  title: string;
  url: string;
  thumbnail?: string;
  date: Date;
  size: string;
  source: 'uploaded' | 'generated';
}

// Example media items
const mediaItems: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    title: 'Product showcase',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    date: new Date(2024, 0, 15),
    size: '2.4 MB',
    source: 'uploaded'
  },
  {
    id: '2',
    type: 'video',
    title: 'Tutorial video',
    url: 'https://example.com/video.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
    date: new Date(2024, 0, 20),
    size: '15.7 MB',
    source: 'generated'
  },
  // Add more items as needed
];

const TypeIcon = {
  image: ImageIcon,
  video: Video,
  text: FileText
} as const;

export default function MediaGrid({
  search,
  mediaType,
  tab
}: MediaGridProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filteredItems = mediaItems.filter(item => {
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (mediaType !== 'all' && item.type !== mediaType) return false;
    if (tab === 'uploaded' && item.source !== 'uploaded') return false;
    if (tab === 'generated' && item.source !== 'generated') return false;
    return true;
  });

  const handleCopy = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
  };

  const handleDownload = (e: React.MouseEvent, item: MediaItem) => {
    e.stopPropagation();
    // Handle download
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    // Handle delete
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {filteredItems.map(item => {
        const Icon = TypeIcon[item.type as keyof typeof TypeIcon];
        
        return (
          <Card
            key={item.id}
            className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:translate-y-[-2px]"
            onClick={() => setSelectedItem(item.id)}
          >
            <div className="relative aspect-video bg-muted">
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : item.type === 'video' && item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 bg-black/20 hover:bg-black/40 text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => handleCopy(e, item.url)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Копировать ссылку
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleDownload(e, item)}>
                    <Download className="mr-2 h-4 w-4" />
                    Скачать
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => handleDelete(e, item.id)}
                    className="text-destructive"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="p-4">
              <h3 className="font-medium line-clamp-1 mb-1">{item.title}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{format(item.date, 'dd MMM yyyy', { locale: ru })}</span>
                <span>{item.size}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}