import * as React from "react";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left Panel - Auth Form */}
      <div className="flex flex-col items-center justify-center p-8 bg-background sm:p-12 md:p-16 lg:p-24">
        <div className="w-full max-w-[400px]">
          {children}
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-zinc-950 p-12 text-zinc-50 md:flex">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px]"
          aria-hidden="true"
        />
        
        {/* Decorative blocks to match design */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
          <div className="flex h-64 w-full max-w-lg flex-wrap">
            {Array.from({ length: 48 }).map((_, i) => (
              <div 
                key={i} 
                className={`h-8 w-8 sm:h-16 sm:w-16 ${
                  [12, 14, 25, 33, 40, 42].includes(i) ? "bg-white/5" : ""
                }`} 
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-lg font-bold text-zinc-950">
              C
            </span>
            <span className="text-3xl font-bold tracking-tight">Cruze</span>
          </div>
          <p className="max-w-xs text-sm text-zinc-400">
            Free and Open-Source Tailwind CSS Admin Dashboard Template
          </p>
        </div>

        {/* Theme Switcher */}
        <div className="absolute bottom-8 right-8 z-10">
          <div className="rounded-full bg-white/10 p-1 backdrop-blur-md">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
