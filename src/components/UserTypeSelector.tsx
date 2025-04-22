
import { useState } from 'react';
import { Truck, Package, Users, HandHelping } from 'lucide-react';
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
      description: 'Envía paquetes de manera segura y económica',
      icon: Package,
      color: 'flechandes-primary'
    },
    {
      id: 'moving',
      title: 'Usuario de Mudanzas',
      description: 'Planifica y realiza tu mudanza sin complicaciones',
      icon: Users,
      color: 'flechandes-primary'
    },
    {
      id: 'freight',
      title: 'Usuario de Fletes',
      description: 'Transporta objetos grandes con seguridad',
      icon: Truck,
      color: 'flechandes-primary'
    },
    {
      id: 'driver',
      title: 'Usuario Conductor',
      description: 'Genera ingresos con tu vehículo',
      icon: Truck,
      color: 'flechandes-secondary'
    },
    {
      id: 'helper',
      title: 'Usuario Ayudante',
      description: 'Ofrece tu ayuda en mudanzas y gana dinero',
      icon: HandHelping,
      color: 'flechandes-secondary'
    },
    {
      id: 'cleaning',
      title: 'Usuario de Limpieza',
      description: 'Ofrece servicios de limpieza pre y post mudanza',
      icon: Package,
      color: 'flechandes-secondary'
    }
  ];
  
  return (
    <div className="flex flex-col space-y-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
        Selecciona tu tipo de usuario
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userTypes.map((type) => (
          <button
            key={type.id}
            className={cn(
              'p-6 rounded-xl flex flex-col items-center justify-center space-y-3 transition-all duration-300',
              'hover:shadow-lg hover:scale-[1.02] transform',
              selected === type.id 
                ? `bg-${type.color} text-white shadow-lg` 
                : `bg-white border-2 border-${type.color} hover:border-opacity-50`
            )}
            onClick={() => handleSelect(type.id as UserType)}
          >
            <type.icon className={cn(
              'h-12 w-12 mb-2',
              selected === type.id 
                ? 'text-white' 
                : `text-${type.color}`
            )} />
            <span className="font-semibold text-lg">{type.title}</span>
            <p className={cn(
              "text-sm text-center",
              selected === type.id 
                ? 'text-white/90' 
                : 'text-gray-600'
            )}>
              {type.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelector;
