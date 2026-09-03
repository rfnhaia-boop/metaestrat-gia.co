import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  title: string;
  className?: string;
}

export function AudioPlayer({ title, className = '' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const rates = [0.75, 1, 1.25, 1.5];

  const togglePlay = () => setIsPlaying(!isPlaying);

  const cycleRate = () => {
    const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
  };

  return (
    <div className={`glass-panel bg-white/65 border border-black/10 p-4 rounded-full flex items-center gap-4 shadow-sm ${className}`}>
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-[#171716] text-[#c7b182] flex items-center justify-center border border-black/20"
      >
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
      </motion.button>
      
      <div className="flex-1">
        <p className="text-sm font-medium text-black/85">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-1 flex-1 bg-black/10 rounded-full overflow-hidden">
             <div className="h-full bg-[#a68f63] w-1/3 rounded-full" />
          </div>
          <span className="text-xs text-black/40 font-mono">03:42</span>
        </div>
      </div>

      <button 
        onClick={cycleRate}
        className="px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-mono text-black/55 hover:text-black transition-colors"
      >
        {playbackRate}x
      </button>
    </div>
  );
}
