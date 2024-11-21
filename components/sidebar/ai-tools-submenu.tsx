"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Category } from './config/ai-tools';

interface AiToolsSubmenuProps {
  categories: Category[];
  pathname: string;
  onNavigate: (href: string) => void;
}

export default function AiToolsSubmenu({
  categories,
  pathname,
  onNavigate
}: AiToolsSubmenuProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const isToolActive = (href: string) => pathname === href;
  const isCategoryActive = (category: Category) => {
    if (category.href) {
      return pathname === category.href || pathname.startsWith(`${category.href}/`);
    }
    return category.tools?.some(tool => pathname === tool.href);
  };

  return (
    <div className="mt-1 space-y-2">
      {categories.map((category) => (
        <div key={category.name} className="pl-9">
          <button
            className={cn(
              "w-full flex items-center hover:bg-primary/5 rounded-lg transition-colors px-3 py-2",
              category.tools ? "font-medium" : "text-gray-700",
              isCategoryActive(category) && "bg-primary/5 text-primary"
            )}
            onClick={() => {
              if (category.tools) {
                toggleCategory(category.name);
              } else if (category.href) {
                onNavigate(category.href);
              }
            }}
          >
            <div className="flex-1 text-left">
              <span className="text-sm">
                {category.name}
              </span>
            </div>
            {category.tools && (
              <ChevronDown 
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  expandedCategories.includes(category.name) && "rotate-180"
                )}
              />
            )}
          </button>

          {category.tools && expandedCategories.includes(category.name) && (
            <div className="mt-1 space-y-1 pl-4">
              {category.tools.map((tool) => {
                const isToolActive = pathname === tool.href;
                
                return (
                  <button
                    key={tool.href}
                    onClick={() => !tool.comingSoon && onNavigate(tool.href)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                      isToolActive 
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-primary/5",
                      tool.comingSoon && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={tool.comingSoon}
                  >
                    {tool.label}
                    {tool.comingSoon && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-2">
                        Скоро
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}