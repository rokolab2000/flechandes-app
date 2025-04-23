
import { ChevronLeft, MapPin, Building, Home, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RegisterStep2Props {
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  userType?: string;
}

const RegisterStep2 = ({ onBack, onSubmit, userType }: RegisterStep2Props) => {
  const isDriver = userType === "driver" || userType === "helper" || userType === "cleaning";
  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center mb-4">
        <button 
          type="button" 
          onClick={onBack}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <span className="ml-2 font-medium text-gray-700">
          {isDriver ? "Información del chofer" : "Datos adicionales"}
        </span>
      </div>
      {/* Instrucciones solo para choferes */}
      {isDriver && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded mb-2 flex items-center">
          <Truck className="w-5 h-5 mr-2" />
          Completa estos datos para poder verificar tu identidad y habilitarte como chofer en nuestra plataforma.
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
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
        
        <div className="space-y-2 pt-4">
          <Label className="text-gray-700">Género</Label>
          <div className="grid grid-cols-3 gap-3">
            {['Masculino', 'Femenino', 'Otro'].map((gender) => (
              <div key={gender} className="flex items-center">
                <input
                  type="radio"
                  id={`gender-${gender.toLowerCase()}`}
                  name="gender"
                  className="h-4 w-4 text-[#009EE2] border-gray-300 focus:ring-[#009EE2]"
                />
                <label htmlFor={`gender-${gender.toLowerCase()}`} className="ml-2 text-sm text-gray-700">
                  {gender}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <Button type="submit" className={`w-full ${isDriver ? 'bg-[#DB2851] hover:bg-[#c11f45]' : 'bg-[#009EE2] hover:bg-[#007bb3]'} py-2.5 text-base mt-4`}>
          {isDriver ? "Continuar a verificación" : "Finalizar registro"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterStep2;
