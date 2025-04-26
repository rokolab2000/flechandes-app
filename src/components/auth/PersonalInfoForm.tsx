
import { Home, Building, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PersonalInfoForm = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700">Datos personales</h3>
      
      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <div className="relative">
          <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            id="address" 
            placeholder="Calle, número, depto."
            className="pl-10 py-2 border-gray-300"
          />
        </div>
      </div>
    
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <div className="relative">
            <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              id="city" 
              placeholder="Tu ciudad"
              className="pl-10 py-2 border-gray-300"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="postal-code">Código postal</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              id="postal-code" 
              placeholder="Código postal"
              className="pl-10 py-2 border-gray-300"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="id-number">RUT o documento de identidad</Label>
        <Input 
          id="id-number" 
          placeholder="12.345.678-9"
          className="py-2 border-gray-300"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="birth-date">Fecha de nacimiento</Label>
        <Input 
          id="birth-date" 
          type="date"
          className="py-2 border-gray-300"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
