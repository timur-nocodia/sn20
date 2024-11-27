"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  disabled?: boolean;
}

export function NavItem({ href, icon, title, disabled }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={disabled ? "#" : href}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        isActive ? "bg-accent text-accent-foreground" : "transparent",
        disabled && "pointer-events-none opacity-60"
      )}
    >
      {icon}
      <span className="ml-3">{title}</span>
    </Link>
  );
}
