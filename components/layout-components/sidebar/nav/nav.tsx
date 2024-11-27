"use client";

import { cn } from "@/lib/utils";

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export function Nav({ className, children, ...props }: NavProps) {
  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {children}
    </nav>
  );
}
