"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { menuItems } from './config/menu-items';
import { aiToolCategories } from './config/ai-tools';
import MenuItem from './menu-item';
import AiToolsSubmenu from './ai-tools-submenu';

interface NavigationProps {
  isCollapsed: boolean;
}

export default function Navigation({ isCollapsed }: NavigationProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  // Auto-expand AI tools menu when on an AI tool page
  useEffect(() => {
    const aiToolsItem = menuItems.flatMap(section => section.items).find(item => item.hasSubmenu);
    if (aiToolsItem && pathname.startsWith('/ai-tools')) {
      setExpandedMenus(prev => 
        prev.includes(aiToolsItem.label) ? prev : [...prev, aiToolsItem.label]
      );
    }
  }, [pathname]);

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const toggleSubmenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isItemActive = (item: { href?: string; hasSubmenu?: boolean }) => {
    if (!item.href) {
      // For AI tools parent menu
      if (item.hasSubmenu) {
        return pathname.startsWith('/ai-tools');
      }
      return false;
    }
    if (item.href === '/' && pathname === '/') return true;
    if (item.href !== '/' && pathname.startsWith(item.href)) return true;
    return false;
  };

  return (
    <nav className="flex-1 overflow-y-auto p-4">
      {menuItems.map((section) => (
        <div key={section.section} className="mb-6">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-gray-500 mb-2">{section.section}</h3>
          )}
          <ul className="space-y-1">
            {section.items.map((item) => (
              <MenuItem
                key={item.label}
                item={item}
                isCollapsed={isCollapsed}
                isActive={isItemActive(item)}
                isExpanded={expandedMenus.includes(item.label)}
                onToggle={() => toggleSubmenu(item.label)}
                onNavigate={handleNavigation}
              >
                {!isCollapsed && item.hasSubmenu && expandedMenus.includes(item.label) && (
                  <AiToolsSubmenu 
                    categories={aiToolCategories}
                    pathname={pathname}
                    onNavigate={handleNavigation}
                  />
                )}
              </MenuItem>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}