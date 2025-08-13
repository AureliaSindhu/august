import { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  return (
    <div className="relative w-full h-full min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-tertiary opacity-50" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
