
import { motion } from 'framer-motion';

interface HolographicLightProps {
  color?: string;
  size?: number;
  className?: string;
  delay?: number;
}

export function HolographicLight({ 
  color = 'bg-nexus-cyan/20', 
  size = 400, 
  className = '',
  delay = 0 
}: HolographicLightProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[120px] pointer-events-none ${color} ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0.3, scale: 0.8 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3], 
        scale: [0.8, 1.1, 0.8] 
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    />
  );
}
