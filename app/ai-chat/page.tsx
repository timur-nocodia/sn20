"use client";

import { useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import Sidebar from '@/components/layout-components/sidebar';
import ChatTopics from '@/components/features/ai-chat/chat-topics';
import ChatMessages from '@/components/features/ai-chat/chat-messages';
import ChatInput from '@/components/features/ai-chat/chat-input';
import ModelSelector from '@/components/features/ai-chat/model-selector';
import { Button } from '@/components/ui-components/button';
import { Card } from '@/components/ui-components/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui-components/tooltip';

export default function AiChatPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isTopicsSidebarCollapsed, setIsTopicsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onCreatePost={() => {}} />
      <div className="flex flex-1 overflow-hidden">
        <ChatTopics 
          selectedTopic={selectedTopic} 
          onSelectTopic={setSelectedTopic}
          isCollapsed={isTopicsSidebarCollapsed}
          onToggleCollapse={() => setIsTopicsSidebarCollapsed(!isTopicsSidebarCollapsed)}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setIsTopicsSidebarCollapsed(!isTopicsSidebarCollapsed)}
                >
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isTopicsSidebarCollapsed ? '' : 'rotate-180'}`} />
                </Button>
                <div>
                  <h1 className="text-2xl font-semibold">Чат с ИИ</h1>
                  <p className="text-sm text-muted-foreground">
                    Общайтесь с искусственным интеллектом
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setSelectedTopic(null)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Новый чат</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <ModelSelector 
                  value={selectedModel} 
                  onChange={setSelectedModel} 
                />
              </div>
            </div>
          </div>

          <Card className="flex-1 m-6 flex flex-col overflow-hidden shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border">
            <ChatMessages />
            <ChatInput />
          </Card>
        </main>
      </div>
    </div>
  );
}