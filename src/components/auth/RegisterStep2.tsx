import { ChevronLeft, MapPin, Building, Home, Truck, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Form } from '@/components/ui/form';

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
        {/* Datos personales */}
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

        {/* Información del vehículo (solo para conductores) */}
        {isDriver && (
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-medium text-gray-700">Información del vehículo</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-type">Tipo de vehículo</Label>
                <select 
                  id="vehicle-type"
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-[#DB2851] focus:border-[#DB2851]"
                >
                  <option value="">Seleccionar...</option>
                  <option value="van">Furgón</option>
                  <option value="truck">Camión</option>
                  <option value="pickup">Camioneta</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle-year">Año del vehículo</Label>
                <Input 
                  id="vehicle-year"
                  type="number"
                  placeholder="2020"
                  className="py-2 border-gray-300"
                />
              </div>
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
              <Label htmlFor="vehicle-plate">Patente</Label>
              <Input 
                id="vehicle-plate"
                placeholder="XX-XX-XX"
                className="py-2 border-gray-300"
              />
            </div>
          </div>
        )}
        
        {/* Ayudante (solo para conductores) */}
        {isDriver && (
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-medium text-gray-700">Información del ayudante (opcional)</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="helper-name">Nombre del ayudante</Label>
                <Input 
                  id="helper-name"
                  placeholder="Nombre completo"
                  className="py-2 border-gray-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="helper-id">RUT del ayudante</Label>
                <Input 
                  id="helper-id"
                  placeholder="12.345.678-9"
                  className="py-2 border-gray-300"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="helper-phone">Teléfono del ayudante</Label>
              <Input 
                id="helper-phone"
                placeholder="+56 9 1234 5678"
                type="tel"
                className="py-2 border-gray-300"
              />
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          className={`w-full ${isDriver ? 'bg-[#DB2851] hover:bg-[#c11f45]' : 'bg-[#009EE2] hover:bg-[#007bb3]'} py-2.5 text-base mt-4`}
        >
          {isDriver ? "Continuar a verificación" : "Finalizar registro"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterStep2;
