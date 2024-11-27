"use client";

import { Brain } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const models = [
  { id: 'ИИ-маркетолог', name: 'ИИ-маркетолог' },
  { id: 'gpt-4o', name: 'GPT-4' },
  { id: 'claude-3', name: 'Claude 3 Sonnet' }
];

export default function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] hover:bg-primary/5 transition-colors">
        <Brain className="mr-2 h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem 
            key={model.id} 
            value={model.id}
            className="hover:bg-primary/5 transition-colors"
          >
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}