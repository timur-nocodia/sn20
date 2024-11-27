"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image as ImageIcon, X, FileText, FileIcon, Film, Music, Code, File } from 'lucide-react';
import { Button } from '@/ui/button';
import { ScrollArea } from '@/ui/scroll-area';
import { Badge } from '@/ui/badge';
import Image from 'next/image';

interface FileWithPreview extends File {
  preview?: string;
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return ImageIcon;
  if (type.startsWith('video/')) return Film;
  if (type.startsWith('audio/')) return Music;
  if (type.startsWith('text/')) return FileText;
  if (type.includes('javascript') || type.includes('json') || type.includes('html')) return Code;
  return File;
};

const getFileExtension = (filename: string) => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toUpperCase();
};

export default function ChatInput() {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;
    
    // Handle sending message and attachments
    console.log('Sending:', { message, attachments });
    
    // Clean up previews
    attachments.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    
    setMessage('');
    setAttachments([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).map(file => {
      const fileWithPreview = file as FileWithPreview;
      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }
      return fileWithPreview;
    });
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => {
      const file = prev[index];
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 12 * 24); // 24px is approx line height
    textarea.style.height = `${newHeight}px`;
  }, [message]);

  return (
    <div className="p-4 border-t">
      {attachments.length > 0 && (
        <ScrollArea className="mb-4 max-h-32">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => {
              const Icon = getFileIcon(file.type);
              const extension = getFileExtension(file.name);
              
              return (
                <div
                  key={index}
                  className="group relative flex items-center space-x-2 bg-muted px-3 py-1.5 rounded-lg text-sm"
                >
                  {file.preview ? (
                    <div className="relative h-6 w-6 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={file.preview}
                        alt={file.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-[10px] font-medium text-white">
                          {extension}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex-shrink-0">
                      <Icon className="h-5 w-5" />
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-2 -right-2 px-1 py-0 text-[10px] min-w-[20px] h-4"
                      >
                        {extension}
                      </Badge>
                    </div>
                  )}
                  <span className="max-w-[200px] truncate">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-transparent hover:text-destructive"
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  
                  {file.preview && (
                    <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="relative h-32 w-32 rounded-lg overflow-hidden shadow-lg">
                        <Image
                          src={file.preview}
                          alt={file.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-1 right-1">
                          <Badge variant="secondary" className="text-xs">
                            {extension}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напишите сообщение..."
          className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-24 min-h-[40px] max-h-[288px] overflow-y-auto"
          style={{ lineHeight: '24px' }}
          rows={1}
        />
        <div className="absolute bottom-2 right-2 flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileSelect}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            className="h-8 w-8"
            onClick={handleSend}
            disabled={!message.trim() && attachments.length === 0}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}