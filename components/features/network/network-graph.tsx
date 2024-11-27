"use client";

import { useState, useRef, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Plus, Users, DollarSign, Calendar, ZoomIn, ZoomOut } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// Network data remains the same...
const networkData = {
  id: '0',
  name: 'Тимур Есенов',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  level: 0,
  members: 12,
  revenue: 15000,
  joinDate: new Date(2023, 11, 1),
  personalRevenue: 5000,
  teamRevenue: 10000,
  activeMembers: 8,
  children: [
    {
      id: '1',
      name: 'Анна М.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      level: 1,
      members: 8,
      revenue: 12000,
      joinDate: new Date(2024, 0, 15),
      personalRevenue: 3000,
      teamRevenue: 9000,
      activeMembers: 6,
      children: [
        {
          id: '3',
          name: 'Елена С.',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
          level: 2,
          members: 4,
          revenue: 6000,
          joinDate: new Date(2024, 0, 20),
          personalRevenue: 2000,
          teamRevenue: 4000,
          activeMembers: 3,
          children: []
        },
        {
          id: '4',
          name: 'Дмитрий П.',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
          level: 2,
          members: 3,
          revenue: 4500,
          joinDate: new Date(2024, 0, 25),
          personalRevenue: 1500,
          teamRevenue: 3000,
          activeMembers: 2,
          children: []
        }
      ]
    },
    {
      id: '2',
      name: 'Михаил К.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      level: 1,
      members: 6,
      revenue: 9000,
      joinDate: new Date(2024, 0, 10),
      personalRevenue: 2500,
      teamRevenue: 6500,
      activeMembers: 4,
      children: [
        {
          id: '5',
          name: 'София В.',
          avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e',
          level: 2,
          members: 2,
          revenue: 3000,
          joinDate: new Date(2024, 0, 30),
          personalRevenue: 1000,
          teamRevenue: 2000,
          activeMembers: 1,
          children: []
        }
      ]
    }
  ]
};

interface NetworkNode {
  id: string;
  name: string;
  avatar: string;
  level: number;
  members: number;
  revenue: number;
  joinDate: Date;
  personalRevenue: number;
  teamRevenue: number;
  activeMembers: number;
  children: NetworkNode[];
}

function NetworkNodeTooltip({ node }: { node: NetworkNode }) {
  return (
    <div className="p-3 space-y-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={node.avatar} />
          <AvatarFallback>
            {node.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{node.name}</div>
          <div className="text-sm text-muted-foreground">ID: {node.id}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Присоединился</div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{format(node.joinDate, 'dd MMM yyyy', { locale: ru })}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Активные партнеры</div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{node.activeMembers} из {node.members}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Личный доход</div>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4" />
            <span>${node.personalRevenue}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Командный доход</div>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4" />
            <span>${node.teamRevenue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NetworkNode({ node, isRoot = false }: { node: NetworkNode; isRoot?: boolean }) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const nodePos = useRef({ x: 0, y: 0 });

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    nodePos.current = { x: rect.left, y: rect.top };
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    const element = e.target as HTMLElement;
    element.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-3 cursor-move shadow-none bg-white/95 hover:bg-white transition-all duration-200 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]"
              onMouseDown={handleDragStart}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={node.avatar} />
                  <AvatarFallback>
                    {node.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{node.name}</div>
                  <div className="text-xs text-muted-foreground">ID: {node.id}</div>
                </div>
                <Badge variant="outline" className="ml-2 text-xs">
                  Уровень {node.level}
                </Badge>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-muted-foreground">Партнеры</div>
                  <div className="font-medium">{node.members}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Доход</div>
                  <div className="font-medium">${node.revenue}</div>
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="right" className="w-80">
            <NetworkNodeTooltip node={node} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {node.children.length > 0 && (
        <>
          <div className="w-px h-6 bg-border"></div>
          <div className="relative flex">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-border"></div>
            <div className="flex space-x-6">
              {node.children.map((child, index) => (
                <div key={child.id} className="flex flex-col items-center">
                  <div className="w-px h-6 bg-border"></div>
                  <NetworkNode node={child} />
                </div>
              ))}
              <div className="flex flex-col items-center">
                <div className="w-px h-6 bg-border"></div>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function NetworkGraph() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={2}
        wheel={{ wheelDisabled: true }}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut }) => (
          <>
            <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
              <Button variant="outline" size="icon" onClick={() => zoomIn()}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => zoomOut()}>
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
            <TransformComponent wrapperClass="min-w-full min-h-full p-6">
              <div className="flex items-center justify-center w-full h-full">
                <NetworkNode node={networkData} isRoot />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}