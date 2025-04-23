
import { useState } from 'react';
import { Truck, Package, Users, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

export type UserType = 
  | 'shipping' 
  | 'moving' 
  | 'freight' 
  | 'driver' 
  | 'helper' 
  | 'cleaning';

interface UserTypeSelectorProps {
  onSelect: (type: UserType) => void;
  defaultSelected?: UserType;
}

const UserTypeSelector = ({ 
  onSelect, 
  defaultSelected = 'shipping'
}: UserTypeSelectorProps) => {
  const [selected, setSelected] = useState<UserType>(defaultSelected);
  
  const handleSelect = (type: UserType) => {
    setSelected(type);
    onSelect(type);
  };
  
  const userTypes = [
    {
      id: 'shipping',
      title: 'Usuario de Envíos',
      description: 'Envía paquetes de manera segura',
      icon: Package,
      color: 'flechandes-secondary'
    },
    {
      id: 'moving',
      title: 'Usuario de Mudanzas',
      description: 'Planifica y realiza tu mudanza',
      icon: Users,
      color: 'flechandes-secondary'
    },
    {
      id: 'freight',
      title: 'Usuario de Fletes',
      description: 'Transporta objetos grandes',
      icon: Truck,
      color: 'flechandes-secondary'
    },
    {
      id: 'driver',
      title: 'Usuario Conductor',
      description: 'Genera ingresos con tu vehículo',
      icon: Truck,
      color: 'flechandes-primary'
    },
    {
      id: 'helper',
      title: 'Usuario Ayudante',
      description: 'Ofrece tu ayuda en mudanzas',
      icon: Wrench,
      color: 'flechandes-primary'
    },
    {
      id: 'cleaning',
      title: 'Usuario de Limpieza',
      description: 'Ofrece servicios de limpieza',
      icon: Package,
      color: 'flechandes-primary'
    }
  ];
  
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="grid grid-cols-2 gap-3">
        <button
          className={cn(
            'p-4 rounded-lg border-2 flex flex-col items-center text-center',
            selected === 'shipping' || selected === 'moving' || selected === 'freight'
              ? 'bg-[#009EE2] text-white border-[#009EE2]'
              : 'bg-white text-gray-700 border-gray-200 hover:border-[#009EE2]/50'
          )}
          onClick={() => handleSelect('shipping')}
        >
          <Users className={cn(
            'h-6 w-6 mb-2',
            selected === 'shipping' || selected === 'moving' || selected === 'freight'
              ? 'text-white'
              : 'text-[#009EE2]'
          )} />
          <span className="font-medium">Cliente</span>
        </button>

        <button
          className={cn(
            'p-4 rounded-lg border-2 flex flex-col items-center text-center',
            selected === 'driver' || selected === 'helper' || selected === 'cleaning'
              ? 'bg-[#DB2851] text-white border-[#DB2851]'
              : 'bg-white text-gray-700 border-gray-200 hover:border-[#DB2851]/50'
          )}
          onClick={() => handleSelect('driver')}
        >
          <Truck className={cn(
            'h-6 w-6 mb-2',
            selected === 'driver' || selected === 'helper' || selected === 'cleaning'
              ? 'text-white'
              : 'text-[#DB2851]'
          )} />
          <span className="font-medium">Transportista</span>
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelector;
