import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const BlurText = ({
  text,
  delay = 200,
  baseDelay = 100,
  direction = "bottom",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  const variants = {
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
      y: direction === "bottom" ? 50 : -50,
    },
    visible: (i) => ({
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        delay: (i * delay + baseDelay) / 1000,
        duration: 0.35,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={variants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};
