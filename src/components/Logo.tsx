
import { Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = ({ size = 'md', className }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };
  
  return (
    <div className={cn('flex items-center gap-2 font-bold', sizeClasses[size], className)}>
      <Truck className="text-move-blue-500" />
      <span className="bg-gradient-to-r from-move-blue-500 to-move-green-500 text-transparent bg-clip-text">
        Muévete-Fácil
      </span>
    </div>
  );
};

export default Logo;
