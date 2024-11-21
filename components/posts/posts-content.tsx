"use client";

import { useState } from 'react';
import { Search, Filter, Grid, List, Type, Video, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PostsGrid from './posts-grid';
import PostsList from './posts-list';

export type ViewMode = 'grid' | 'list';
export type PostType = 'text' | 'video' | 'audio' | 'all';
export type NetworkType = 'instagram' | 'facebook' | 'youtube' | 'all';
export type StatusType = 'all' | 'draft' | 'scheduled' | 'published' | 'failed';


interface PostsContentProps {
  status: StatusType;
}

// Example posts data
export const posts = {
  drafts: [
    {
      id: '1',
      title: 'Топ-5 трендов в SMM на 2025 год',
      type: 'text',
      networks: [
        { network: 'instagram', status: 'draft' },
        { network: 'facebook', status: 'draft' }
      ],
      date: new Date(2024, 0, 15),
      stats: {
        likes: 0,
        comments: 0,
        shares: 0
      }
    },
    {
      id: '2',
      title: 'Обзор новых функций платформы',
      type: 'video',
      networks: [
        { network: 'youtube', status: 'draft' },
        { network: 'instagram', status: 'draft' }
      ],
      date: new Date(2024, 0, 20),
      stats: {
        views: 0,
        likes: 0,
        comments: 0
      }
    },
    {
      id: '3',
      title: 'Подкаст: Интервью с экспертом',
      type: 'audio',
      networks: [
        { network: 'facebook', status: 'draft' }
      ],
      date: new Date(2024, 0, 22),
      stats: {
        plays: 0,
        likes: 0,
        shares: 0
      }
    }
  ],
  scheduled: [
    {
      id: '4',
      title: 'Как улучшить продуктивность',
      type: 'text',
      networks: [
        { network: 'instagram', status: 'scheduled' },
        { network: 'facebook', status: 'scheduled' }
      ],
      date: new Date(2024, 1, 1),
      stats: {
        scheduled: '10:00'
      }
    },
    {
      id: '5',
      title: 'Мастер-класс по маркетингу',
      type: 'video',
      networks: [
        { network: 'youtube', status: 'scheduled' }
      ],
      date: new Date(2024, 1, 3),
      stats: {
        scheduled: '15:30'
      }
    },
    {
      id: '6',
      title: 'Еженедельный подкаст',
      type: 'audio',
      networks: [
        { network: 'facebook', status: 'scheduled' }
      ],
      date: new Date(2024, 1, 5),
      stats: {
        scheduled: '12:00'
      }
    }
  ],
  history: [
    {
      id: '7',
      title: 'Итоги года в digital-маркетинге',
      type: 'text',
      networks: [
        { network: 'instagram', status: 'published' },
        { network: 'facebook', status: 'published' }
      ],
      date: new Date(2023, 11, 31),
      stats: {
        likes: 1245,
        comments: 89,
        shares: 56
      }
    },
    {
      id: '8',
      title: 'Тренды социальных сетей 2024',
      type: 'video',
      networks: [
        { network: 'youtube', status: 'published' }
      ],
      date: new Date(2024, 0, 5),
      stats: {
        views: 3500,
        likes: 245,
        comments: 67
      }
    },
    {
      id: '9',
      title: 'Специальный выпуск подкаста',
      type: 'audio',
      networks: [
        { network: 'facebook', status: 'published' }
      ],
      date: new Date(2024, 0, 10),
      stats: {
        plays: 890,
        likes: 156,
        shares: 34
      }
    }
  ]
};

export default function PostsContent({ status }: PostsContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [postType, setPostType] = useState<PostType>('all');
  const [network, setNetwork] = useState<NetworkType>('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск постов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select value={postType} onValueChange={(value: PostType) => setPostType(value)}>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Тип контента" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="text">
                <div className="flex items-center">
                  <Type className="mr-2 h-4 w-4" />
                  <span>Текст</span>
                </div>
              </SelectItem>
              <SelectItem value="video">
                <div className="flex items-center">
                  <Video className="mr-2 h-4 w-4" />
                  <span>Видео</span>
                </div>
              </SelectItem>
              <SelectItem value="audio">
                <div className="flex items-center">
                  <Mic className="mr-2 h-4 w-4" />
                  <span>Аудио</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={network} onValueChange={(value: NetworkType) => setNetwork(value)}>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Соц. сеть" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все сети</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
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
        <PostsGrid
          search={search}
          postType={postType}
          network={network}
          status={status}
        />
      ) : (
        <PostsList
          search={search}
          postType={postType}
          network={network}
          status={status}
        />
      )}
    </div>
  );
}