
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
    <div className={cn('flex items-center gap-2 font-bold font-halvar', sizeClasses[size], className)}>
      <Truck className="text-[#009EE2]" />
      <span className="bg-gradient-to-r from-[#DB2851] to-[#009EE2] text-transparent bg-clip-text">
        Flechandes
      </span>
    </div>
  );
};

export default Logo;
