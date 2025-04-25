
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = ({ size = 'md', className }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-28',
    md: 'w-40',
    lg: 'w-56',
  };
  
  return (
    <Link to="/">
      <img 
        src="/lovable-uploads/5c43d143-230f-42ac-8335-8f38b3b809c2.png" 
        alt="Flechandes Logo" 
        className={cn(sizeClasses[size], className)}
      />
    </Link>
  );
};

export default Logo;
