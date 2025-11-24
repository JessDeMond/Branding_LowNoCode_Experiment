import React, { useState, useEffect, useRef } from 'react';

interface DecryptTextProps {
  text: string;
  className?: string;
  speed?: number;
  revealDirection?: 'forward' | 'random';
  useHover?: boolean;
}

export const DecryptText: React.FC<DecryptTextProps> = ({
  text,
  className = '',
  speed = 30,
  revealDirection = 'forward',
  useHover = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    
    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (revealDirection === 'forward') {
        iteration += 1 / 3; // Slow down the reveal relative to the scramble speed
      } else {
        iteration += 1 / 3; 
      }

      if (iteration >= text.length) {
        setDisplayText(text);
        setIsScrambling(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span 
      className={`${className} inline-block cursor-default`}
      onMouseEnter={useHover ? scramble : undefined}
    >
      {displayText}
    </span>
  );
};