
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = ({ size = 'md', className }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-48',
  };
  
  return (
    <img 
      src="/lovable-uploads/5c43d143-230f-42ac-8335-8f38b3b809c2.png" 
      alt="Flechandes Logo" 
      className={cn(sizeClasses[size], className)}
    />
  );
};

export default Logo;
