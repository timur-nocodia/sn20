"use client";

import { Card } from '@/ui/card';
import { ScrollArea } from '@/ui/scroll-area';
import Image from 'next/image';

interface TopPostsProps {
  period: '90days' | '30days' | '7days' | 'custom';
  dateRange: { start: Date; end: Date };
  metric: 'engagement' | 'impressions' | 'rate';
}

const posts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    engagement: 245,
    impressions: 1200,
    rate: 20.4
  },
  // Add more posts
];

export default function TopPosts({
  period,
  dateRange,
  metric
}: TopPostsProps) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-4">Лучшие посты</h4>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="p-4 flex items-center space-x-4 cursor-pointer shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post.image}
                  alt="Post thumbnail"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl font-semibold">
                  {metric === 'engagement' && post.engagement}
                  {metric === 'impressions' && post.impressions}
                  {metric === 'rate' && `${post.rate}%`}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric === 'engagement' && 'вовлечений'}
                  {metric === 'impressions' && 'показов'}
                  {metric === 'rate' && 'коэффициент вовлеченности'}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}