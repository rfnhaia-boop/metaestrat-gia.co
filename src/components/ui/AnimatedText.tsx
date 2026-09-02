import { motion, type Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(4px)",
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  };

  const words = text.split(' ');

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
