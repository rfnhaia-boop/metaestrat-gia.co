import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className = '', hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={`glass-panel rounded-2xl p-6 ${className}`}
      whileHover={hoverEffect ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
      whileTap={hoverEffect ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}
