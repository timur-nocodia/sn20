"use client";

import { useState } from 'react';
import { Plus, ChevronLeft } from 'lucide-react';
import { Button } from '@/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Logo from './logo';
import Navigation from './navigation';

interface SidebarProps {
  onCreatePost?: () => void;
}

export default function Sidebar({ onCreatePost }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const handleCreatePost = () => {
    // Always navigate to the create post page
    router.push('/create-post');
  };

  return (
    <div className={cn(
      "relative h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      isCollapsed ? "w-[4.5rem]" : "w-64"
    )}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "absolute -right-3 top-6 h-6 w-6 rounded-full border border-border bg-background",
          "opacity-0 hover:opacity-100 transition-opacity group-hover/sidebar:opacity-100 z-50",
          isCollapsed && "rotate-180"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Logo isCollapsed={isCollapsed} />
      
      <div className="p-4">
        <Button 
          type="button"
          className="w-full" 
          onClick={handleCreatePost}
        >
          {isCollapsed ? (
            <Plus className="h-4 w-4" />
          ) : (
            <>
              Создать пост
              <span className="ml-2">+</span>
            </>
          )}
        </Button>
      </div>

      <Navigation isCollapsed={isCollapsed} />
    </div>
  );
}