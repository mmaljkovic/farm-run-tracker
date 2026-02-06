import { useState, useEffect } from 'react';

// Hook to trigger re-renders for timer updates
export function useTimer(intervalMs: number = 1000) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);
}

// Hook for countdown to a specific date
export function useCountdown(targetDate: Date | null) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    if (!targetDate) {
      setTimeRemaining(0);
      return;
    }

    const calculateRemaining = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const remaining = Math.max(0, target - now);
      setTimeRemaining(remaining);
    };

    calculateRemaining();
    const timer = setInterval(calculateRemaining, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return {
    timeRemaining,
    hours,
    minutes,
    seconds,
    isComplete: timeRemaining === 0 && targetDate !== null,
  };
}
