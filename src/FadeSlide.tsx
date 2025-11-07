// FadeSlide.tsx
import React from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";

type Direction = "left" | "right" | "up" | "down" | "center";

export interface FadeSlideProps {
  show: boolean;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  ease?: Transition["ease"];
  className?: string;
  children: React.ReactNode;
}

const FadeSlide: React.FC<FadeSlideProps> = ({
  show,
  direction = "right",
  distance = 100,
  duration = 0.6,
  delay = 0,
  ease = "easeInOut",
  className,
  children,
}) => {
  const offsets = React.useMemo(() => {
    switch (direction) {
      case "left":
        return { x: -distance, y: 0 };
      case "right":
        return { x: distance, y: 0 };
      case "up":
        return { x: 0, y: -distance };
      case "down":
        return { x: 0, y: distance };
      case "center":
        return { scale: 1 };
      default:
        return { x: 0, y: 0 };
    }
  }, [direction, distance]);

  const variants = React.useMemo(() => {
    if (direction === "center") {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }
    return {
      hidden: { opacity: 0, ...offsets },
      visible: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, ...offsets },
    };
  }, [direction, offsets]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="fade-slide"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration, delay, ease }}
          className={className}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FadeSlide;
