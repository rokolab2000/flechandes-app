
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import VehicleSelector from '@/components/VehicleSelector';

interface VehicleInfoFormProps {
  vehicleType: string;
  onVehicleTypeChange: (value: string) => void;
}

const VehicleInfoForm = ({ vehicleType, onVehicleTypeChange }: VehicleInfoFormProps) => {
  return (
    <div className="space-y-4 pt-6 border-t">
      <h3 className="font-medium text-gray-700">Información del vehículo</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Tipo de vehículo</Label>
          <VehicleSelector
            value={vehicleType}
            onValueChange={onVehicleTypeChange}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle-brand">Marca</Label>
            <Input 
              id="vehicle-brand"
              placeholder="Marca del vehículo"
              className="py-2 border-gray-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vehicle-model">Modelo</Label>
            <Input 
              id="vehicle-model"
              placeholder="Modelo del vehículo"
              className="py-2 border-gray-300"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Fotos del vehículo</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Car className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Foto frontal</p>
              <Button variant="outline" type="button" className="text-sm">
                Subir foto
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Car className="h-8 w-8 mx-auto text-gray-400 mb-2 transform scale-x-[-1]" />
              <p className="text-sm text-gray-500 mb-2">Foto trasera</p>
              <Button variant="outline" type="button" className="text-sm">
                Subir foto
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Car className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Lado izquierdo</p>
              <Button variant="outline" type="button" className="text-sm">
                Subir foto
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Car className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Lado derecho</p>
              <Button variant="outline" type="button" className="text-sm">
                Subir foto
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Sube fotos claras de tu vehículo desde diferentes ángulos
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoForm;
