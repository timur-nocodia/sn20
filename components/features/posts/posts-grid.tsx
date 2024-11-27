"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { MoreVertical, Copy, Pencil, Trash } from 'lucide-react';
import { Card } from '@/components/ui-components/card';
import { Button } from '@/components/ui-components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui-components/dropdown-menu";
import { NetworkIcon, ContentTypeIcon, NetworkColor } from '@/components/features/shared/constants';
import { cn } from '@/lib/utils';
import type { PostType, NetworkType, StatusType } from './posts-content';

interface PostsGridProps {
  search: string;
  postType: PostType;
  network: NetworkType;
  status: StatusType;
}

interface PostNetwork {
  network: 'instagram' | 'facebook' | 'youtube';
  status: 'published' | 'scheduled' | 'draft';
}

// Example posts data
const posts = [
  {
    id: '1',
    title: 'Топ-5 трендов в SMM на 2025 год',
    type: 'text',
    networks: [
      { network: 'instagram', status: 'published' },
      { network: 'facebook', status: 'scheduled' }
    ] as PostNetwork[],
    date: new Date(2024, 0, 15),
    stats: {
      likes: 245,
      comments: 18,
      shares: 12
    }
  },
  {
    id: '2',
    title: 'Обзор новых функций платформы',
    type: 'video',
    networks: [
      { network: 'youtube', status: 'scheduled' },
      { network: 'instagram', status: 'draft' }
    ] as PostNetwork[],
    date: new Date(2024, 0, 20),
    stats: {
      views: 1200,
      likes: 156,
      comments: 23
    }
  },
  // Add more posts as needed
];

export default function PostsGrid({
  search,
  postType,
  network,
  status
}: PostsGridProps) {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const filteredPosts = posts.filter(post => {
    if (search && !post.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (postType !== 'all' && post.type !== postType) return false;
    if (network !== 'all' && !post.networks.some(n => n.network === network)) return false;
    if (status !== 'all' && !post.networks.some(n => n.status === status)) return false;
    return true;
  });

  const handlePostClick = (postId: string) => {
    router.push(`/posts/${postId}`);
  };

  const handleCopyPost = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    // Handle copy functionality
  };

  const handleEditPost = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    router.push(`/posts/${postId}/edit`);
  };

  const handleDeletePost = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    // Handle delete functionality
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {filteredPosts.map(post => {
        const ContentIconComponent = ContentTypeIcon[post.type as keyof typeof ContentTypeIcon];
        
        return (
          <Card
            key={post.id}
            className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:translate-y-[-2px]"
            onClick={() => handlePostClick(post.id)}
          >
            {/* Preview */}
            <div className="relative aspect-video bg-muted">
              {/* Add preview image/video here */}
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-black/20 hover:bg-black/40 text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => handleCopyPost(e, post.id)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Копировать
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleEditPost(e, post.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => handleDeletePost(e, post.id)}
                      className="text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <ContentIconComponent className="h-4 w-4" />
                  <div className="flex -space-x-2">
                    {post.networks.map((networkItem, index) => {
                      const NetworkIconComponent = NetworkIcon[networkItem.network];
                      return (
                        <div
                          key={`${post.id}-${networkItem.network}`}
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center ring-2 ring-background",
                            networkItem.status === 'published' 
                              ? NetworkColor[networkItem.network]
                              : 'bg-white',
                            networkItem.status === 'draft' && 'opacity-40'
                          )}
                          style={{ zIndex: post.networks.length - index }}
                        >
                          <NetworkIconComponent 
                            className={cn(
                              "h-3 w-3",
                              networkItem.status === 'published' 
                                ? "text-white"
                                : "text-muted-foreground"
                            )}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(post.date, 'dd MMM yyyy', { locale: ru })}
                </span>
              </div>
              <h3 className="font-medium line-clamp-2 mb-2">{post.title}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span>{post.stats.likes} likes</span>
                  <span>•</span>
                  <span>{post.stats.comments} comments</span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}