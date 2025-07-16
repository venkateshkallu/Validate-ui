// src/components/ui/separator.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export function Separator({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-4 h-px w-full bg-border", className)} />;
}
