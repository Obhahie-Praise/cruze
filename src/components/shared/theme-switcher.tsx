"use client";

import { useTheme } from "next-themes";
import { Sun01Icon, Moon01Icon, ComputerIcon } from "hugeicons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Theme = "light" | "system" | "dark";

interface ThemeOption {
  value: Theme;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const themeOptions: ThemeOption[] = [
  { value: "light", label: "Light", icon: Sun01Icon },
  { value: "system", label: "System", icon: ComputerIcon },
  { value: "dark", label: "Dark", icon: Moon01Icon },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme switcher"
      className="flex items-center gap-0.5 rounded-lg border border-border bg-muted/40 p-0.5"
    >
      {themeOptions.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <Tooltip key={value}>
            <TooltipTrigger render={
              <button
                id={`theme-switcher-${value}`}
                type="button"
                aria-label={`Switch to ${label} theme`}
                aria-pressed={isActive}
                onClick={() => setTheme(value)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                )}
              >
                <Icon size={15} />
              </button>
            } />
            <TooltipContent side="bottom">
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
