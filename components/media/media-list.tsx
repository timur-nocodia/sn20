"use client";

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { MoreVertical, Copy, Download, Trash, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { MediaType, TabType } from './media-content';

interface MediaListProps {
  search: string;
  mediaType: MediaType;
  tab: TabType;
}

// Using the same media items as in media-grid.tsx
const mediaItems = [
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

export default function MediaList({
  search,
  mediaType,
  tab
}: MediaListProps) {
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

  const handleDownload = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    // Handle download
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    // Handle delete
  };

  const TypeIcon = {
    image: ImageIcon,
    video: Video,
    text: FileText
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Размер</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead>Источник</TableHead>
          <TableHead className="w-[70px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredItems.map(item => {
          const Icon = TypeIcon[item.type as keyof typeof TypeIcon];
          
          return (
            <TableRow
              key={item.id}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{item.type}</span>
                </div>
              </TableCell>
              <TableCell>{item.size}</TableCell>
              <TableCell>
                {format(item.date, 'dd MMM yyyy', { locale: ru })}
              </TableCell>
              <TableCell>
                <span className="capitalize">{item.source}</span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
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
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}