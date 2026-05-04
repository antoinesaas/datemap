import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.35rem] border border-white/[0.14] bg-gradient-to-br from-white/[0.09] via-white/[0.06] to-white/[0.03] shadow-[0_8px_36px_rgba(0,0,0,0.4)] backdrop-blur-3xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-white/[0.16] before:via-transparent before:to-transparent ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
