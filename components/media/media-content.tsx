"use client";

import { useState } from 'react';
import { Search, Filter, Grid, List, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MediaGrid from './media-grid';
import MediaList from './media-list';

export type ViewMode = 'grid' | 'list';
export type MediaType = 'image' | 'video' | 'text' | 'all';
export type TabType = 'overview' | 'uploaded' | 'generated';

interface MediaContentProps {
  tab: TabType;
}

export default function MediaContent({ tab }: MediaContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск медиафайлов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select value={mediaType} onValueChange={(value: MediaType) => setMediaType(value)}>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Тип медиа" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="image">
                <div className="flex items-center">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  <span>Изображения</span>
                </div>
              </SelectItem>
              <SelectItem value="video">
                <div className="flex items-center">
                  <Video className="mr-2 h-4 w-4" />
                  <span>Видео</span>
                </div>
              </SelectItem>
              <SelectItem value="text">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Текст</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <MediaGrid
          search={search}
          mediaType={mediaType}
          tab={tab}
        />
      ) : (
        <MediaList
          search={search}
          mediaType={mediaType}
          tab={tab}
        />
      )}
    </div>
  );
}