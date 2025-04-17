
import { useState } from 'react';
import { Package, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserTypeSelectorProps {
  onSelect: (type: 'customer' | 'transporter') => void;
  defaultSelected?: 'customer' | 'transporter';
}

const UserTypeSelector = ({ 
  onSelect, 
  defaultSelected = 'customer' 
}: UserTypeSelectorProps) => {
  const [selected, setSelected] = useState<'customer' | 'transporter'>(defaultSelected);
  
  const handleSelect = (type: 'customer' | 'transporter') => {
    setSelected(type);
    onSelect(type);
  };
  
  return (
    <div className="flex flex-col space-y-4 w-full">
      <h2 className="text-xl font-semibold text-center">Soy un...</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          className={cn(
            'p-4 border-2 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all',
            selected === 'customer' 
              ? 'border-move-blue-500 bg-move-blue-50 text-move-blue-700' 
              : 'border-gray-200 hover:border-move-blue-300 hover:bg-move-blue-50/50'
          )}
          onClick={() => handleSelect('customer')}
        >
          <Package className={cn(
            'h-10 w-10',
            selected === 'customer' ? 'text-move-blue-500' : 'text-gray-400'
          )} />
          <span className="font-medium">Cliente</span>
          <p className="text-xs text-gray-500">Necesito servicios de mudanza</p>
        </button>
        
        <button
          className={cn(
            'p-4 border-2 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all',
            selected === 'transporter' 
              ? 'border-move-green-500 bg-move-green-50 text-move-green-700' 
              : 'border-gray-200 hover:border-move-green-300 hover:bg-move-green-50/50'
          )}
          onClick={() => handleSelect('transporter')}
        >
          <Truck className={cn(
            'h-10 w-10',
            selected === 'transporter' ? 'text-move-green-500' : 'text-gray-400'
          )} />
          <span className="font-medium">Transportista</span>
          <p className="text-xs text-gray-500">Proporciono servicios de mudanza</p>
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelector;
