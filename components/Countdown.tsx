'use client';

import { useState, useEffect } from 'react';

export function Countdown() {
  const [count, setCount] = useState(5);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return count > 0 ? (
    <p className="text-6xl text-center text-destructive font-mono animate-pulse">
      {count}
    </p>
  ) : null;
} 