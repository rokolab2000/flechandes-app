
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RegisterStep2Props {
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegisterStep2 = ({ onBack, onSubmit }: RegisterStep2Props) => {
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center mb-6">
        <button 
          type="button" 
          onClick={onBack}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="ml-2 font-semibold">Información del vehículo</span>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vehicle-type">Tipo de vehículo</Label>
          <select 
            id="vehicle-type"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-move-blue-500"
          >
            <option value="">Seleccionar tipo de vehículo</option>
            <option value="pickup">Camioneta pickup</option>
            <option value="van">Furgoneta</option>
            <option value="truck">Camión de mudanza</option>
            <option value="box-truck">Camión de caja</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="license-plate">Placa del vehículo</Label>
          <Input 
            id="license-plate" 
            placeholder="Ingresa el número de placa" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle-capacity">Capacidad del vehículo</Label>
          <Input 
            id="vehicle-capacity" 
            placeholder="Capacidad en metros cúbicos" 
            type="number" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle-year">Año del vehículo</Label>
          <Input 
            id="vehicle-year" 
            placeholder="Año de fabricación" 
            type="number" 
          />
        </div>
        
        <Button type="submit" className="w-full bg-move-blue-500 hover:bg-move-blue-600">
          Siguiente
        </Button>
      </form>
    </div>
  );
};

export default RegisterStep2;
