import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = 'fit-content', delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once revealed, we can disconnect if we only want it to run once
          observer.disconnect(); 
        }
      },
      { threshold: 0.15 } // Trigger when 15% visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ width }} 
      className={`transform transition-all duration-1000 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div style={{ transitionDelay: `${delay}ms` }} className="h-full w-full">
        {children}
      </div>
    </div>
  );
};