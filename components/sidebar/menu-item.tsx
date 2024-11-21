import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  item: {
    icon: React.ElementType;
    label: string;
    href?: string;
    hasSubmenu?: boolean;
  };
  isCollapsed: boolean;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate: (href: string) => void;
  children?: React.ReactNode;
}

export default function MenuItem({
  item,
  isCollapsed,
  isActive,
  isExpanded,
  onToggle,
  onNavigate,
  children
}: MenuItemProps) {
  const Icon = item.icon;

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          if (item.hasSubmenu) {
            onToggle();
          } else if (item.href) {
            onNavigate(item.href);
          }
        }}
        className={cn(
          "w-full flex items-center text-gray-700 hover:bg-primary/5 rounded-lg transition-colors font-medium",
          isCollapsed ? "px-2 py-2 justify-center" : "px-3 py-2 space-x-3",
          isActive && "bg-primary/5 text-primary"
        )}
      >
        <Icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-primary")} />
        {!isCollapsed && (
          <>
            <span className={cn("text-sm flex-1 text-left", isActive && "text-primary")}>
              {item.label}
            </span>
            {item.hasSubmenu && (
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
              />
            )}
          </>
        )}
      </button>
      {children}
    </li>
  );
}