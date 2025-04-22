import { useState } from 'react';
import { Package, Truck, Users, HandHelping, Broom } from 'lucide-react';
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
      description: 'Persona que necesita enviar sus paquetes',
      icon: Package,
      color: 'move-blue'
    },
    {
      id: 'moving',
      title: 'Usuario de Mudanzas',
      description: 'Persona que necesita cambiar sus pertenencias de lugar',
      icon: Users,
      color: 'move-blue'
    },
    {
      id: 'freight',
      title: 'Usuario de Fletes',
      description: 'Persona que necesita movilizar objetos de gran formato',
      icon: Package,
      color: 'move-blue'
    },
    {
      id: 'driver',
      title: 'Usuario Conductor',
      description: 'Persona que tiene vehículo y presta servicio de transporte',
      icon: Truck,
      color: 'move-green'
    },
    {
      id: 'helper',
      title: 'Usuario Ayudante',
      description: 'Persona que ayuda en la mudanza',
      icon: HandHelping,
      color: 'move-green'
    },
    {
      id: 'cleaning',
      title: 'Usuario de Limpieza',
      description: 'Persona que limpia antes y después de la mudanza',
      icon: Broom,
      color: 'move-green'
    }
  ];
  
  return (
    <div className="flex flex-col space-y-4 w-full">
      <h2 className="text-xl font-semibold text-center">Soy un...</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {userTypes.map((type) => (
          <button
            key={type.id}
            className={cn(
              'p-4 border-2 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all',
              selected === type.id 
                ? `border-${type.color}-500 bg-${type.color}-50 text-${type.color}-700` 
                : `border-gray-200 hover:border-${type.color}-300 hover:bg-${type.color}-50/50`
            )}
            onClick={() => handleSelect(type.id as UserType)}
          >
            <type.icon className={cn(
              'h-10 w-10',
              selected === type.id ? `text-${type.color}-500` : 'text-gray-400'
            )} />
            <span className="font-medium">{type.title}</span>
            <p className="text-xs text-gray-500">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelector;
