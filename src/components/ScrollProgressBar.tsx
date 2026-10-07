import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth spring interpolation inspired by Apple UI fluidity
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[45] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-gradient-to-r from-[#25225a] via-[#1d4ed8] to-[#25225a] shadow-[0_1px_6px_rgba(37,34,90,0.35)]"
      />
    </div>
  );
};
