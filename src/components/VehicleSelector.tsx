
import React from 'react';
import { Bike, Truck, Car } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';

interface Vehicle {
  id: string;
  name: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
}

const vehicles: Vehicle[] = [
  {
    id: 'bike',
    name: 'Bicicleta',
    description: 'Entregas pequeñas y rápidas',
    image: '/placeholder.svg',
    icon: <Bike className="h-6 w-6 text-gray-600" />
  },
  {
    id: 'motorcycle',
    name: 'Motocicleta',
    description: 'Entregas medianas y rápidas',
    image: '/placeholder.svg',
    icon: <Bike className="h-6 w-6 text-gray-600 transform rotate-45" /> // Usamos el icono de Bike con rotación como alternativa
  },
  {
    id: 'van',
    name: 'Camioneta',
    description: 'hasta 1 tonelada',
    image: '/lovable-uploads/5c43d143-230f-42ac-8335-8f38b3b809c2.png',
    icon: <Car className="h-6 w-6 text-gray-600" />
  },
  {
    id: 'small-truck',
    name: 'Camión Pequeño',
    description: '1-3 toneladas',
    image: '/lovable-uploads/7f656404-4f2d-4fcb-bcb9-4dac91ec7c16.png'
  },
  {
    id: 'medium-truck',
    name: 'Camión Mediano',
    description: '3-5 toneladas',
    image: '/lovable-uploads/7f656404-4f2d-4fcb-bcb9-4dac91ec7c16.png'
  },
  {
    id: 'large-truck',
    name: 'Camión Grande',
    description: 'más de 5 toneladas',
    image: '/lovable-uploads/7f656404-4f2d-4fcb-bcb9-4dac91ec7c16.png'
  }
];

interface VehicleSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const VehicleSelector = ({ value, onValueChange, className }: VehicleSelectorProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder="Selecciona un vehículo" />
      </SelectTrigger>
      <SelectContent>
        {vehicles.map((vehicle) => (
          <SelectItem
            key={vehicle.id}
            value={vehicle.id}
            className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              {vehicle.icon ? (
                vehicle.icon
              ) : (
                <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'placeholder.svg';
                    }}
                  />
                </div>
              )}
              <div>
                <p className="font-medium">{vehicle.name}</p>
                <p className="text-sm text-gray-500">{vehicle.description}</p>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default VehicleSelector;
