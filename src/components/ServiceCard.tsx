
import { CalendarIcon, MapPin, Clock, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ServiceProps {
  id: string;
  title: string;
  type: 'moving' | 'delivery' | 'freight';
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
  price?: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  className?: string;
  onClick?: () => void;
}

const ServiceCard = ({
  id,
  title,
  type,
  status,
  price,
  origin,
  destination,
  date,
  time,
  className,
  onClick,
}: ServiceProps) => {
  // Status badge colors
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    'completed': 'bg-green-100 text-green-800',
  };

  const typeIcons = {
    'moving': <Package className="h-5 w-5" />,
    'delivery': <Package className="h-5 w-5" />,
    'freight': <Package className="h-5 w-5" />,
  };

  return (
    <div 
      className={cn(
        'bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:move-shadow transition-all duration-300',
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-lg">{title}</h3>
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusColors[status])}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="flex items-center text-gray-600 mb-2 text-sm">
        <Package className="h-4 w-4 mr-2" />
        <span className="capitalize">{type}</span>
      </div>

      <div className="flex items-center text-gray-600 mb-2 text-sm">
        <MapPin className="h-4 w-4 mr-2" />
        <span className="truncate">{origin} → {destination}</span>
      </div>

      <div className="flex items-center text-gray-600 mb-2 text-sm">
        <CalendarIcon className="h-4 w-4 mr-2" />
        <span>{date}</span>
      </div>

      <div className="flex items-center text-gray-600 mb-3 text-sm">
        <Clock className="h-4 w-4 mr-2" />
        <span>{time}</span>
      </div>

      {price && (
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold text-move-blue-600">${price.toFixed(2)}</span>
          <Button variant="default" size="sm" className="bg-move-blue-500 hover:bg-move-blue-600">
            View Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
