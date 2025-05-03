import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ShadowProps {
  children: ReactNode;
  className?: string;
}

export function Shadow({ children, className }: ShadowProps) {
  return (
    <div className={cn("shadow-lg rounded-lg", className)}>
      {children}
    </div>
  );
}
