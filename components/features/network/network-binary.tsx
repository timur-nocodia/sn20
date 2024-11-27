"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { ChevronRight, Users, DollarSign, Calendar, Plus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ScrollArea } from '@/ui/scroll-area';

// Network data structure remains the same...
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
          activeMembers: 3
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
          activeMembers: 2
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
          activeMembers: 1
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
  children?: NetworkNode[];
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

function NetworkNodeComponent({ node, isExpanded, onToggle }: { 
  node: NetworkNode; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-1">
      <Card 
        className="py-1.5 px-3 shadow-none bg-white/95 hover:bg-white transition-all duration-200"
        onClick={node.children?.length ? onToggle : undefined}
      >
        <div className="flex items-center space-x-2">
          {node.children?.length ? (
            <ChevronRight className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
          ) : (
            <Button variant="outline" size="icon" className="h-5 w-5 rounded-full flex-shrink-0">
              <Plus className="h-3 w-3" />
            </Button>
          )}
          <Avatar className="h-7 w-7">
            <AvatarImage src={node.avatar} />
            <AvatarFallback className="text-xs">
              {node.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-medium text-sm truncate">{node.name}</div>
            <div className="text-xs text-muted-foreground">ID: {node.id}</div>
          </div>
          <Badge variant="outline" className="ml-1 text-[10px] px-1 h-4 hidden sm:inline-flex">
            Уровень {node.level}
          </Badge>
          <div className="flex items-center space-x-4 ml-auto text-xs text-muted-foreground">
            <div className="hidden sm:block">
              <span className="font-medium">{node.members}</span> партнеров
            </div>
            <div>
              <span className="font-medium">${node.revenue}</span>
            </div>
          </div>
        </div>
      </Card>

      {isExpanded && node.children && (
        <div className="pl-6 space-y-1 border-l border-border/40">
          {node.children.map(child => (
            <NetworkNodeComponent 
              key={child.id} 
              node={child}
              isExpanded={false}
              onToggle={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NetworkBinary() {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-1">
        <NetworkNodeComponent 
          node={networkData}
          isExpanded={expandedNodes.includes(networkData.id)}
          onToggle={() => toggleNode(networkData.id)}
        />
        {networkData.children?.map(node => (
          <NetworkNodeComponent
            key={node.id}
            node={node}
            isExpanded={expandedNodes.includes(node.id)}
            onToggle={() => toggleNode(node.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}