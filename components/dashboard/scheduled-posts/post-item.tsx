"use client";

import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';

interface PostItemProps {
  time: string;
  date: string;
  content: string;
  avatarUrl?: string;
}

export function PostItem({ time, date, content, avatarUrl }: PostItemProps) {
  const router = useRouter();

  const handleCreatePost = () => {
    router.push('/create-post');
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="text-sm text-muted-foreground">
        <div className="font-semibold">{time}</div>
        <div>{date}</div>
      </div>
      
      <div className="flex-1">
        <p className="text-sm">
          {content}
        </p>
      </div>
      
      <Avatar className="h-8 w-8">
        {avatarUrl && (
          <div className="relative w-full h-full">
            <Image 
              src={avatarUrl} 
              alt="User avatar" 
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </Avatar>
    </div>
  );
}