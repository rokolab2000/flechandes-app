
import { ChevronLeft, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import VehicleInfoForm from './VehicleInfoForm';
import HelperInfoForm from './HelperInfoForm';

interface RegisterStep2Props {
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  userType?: string;
}

const RegisterStep2 = ({ onBack, onSubmit, userType }: RegisterStep2Props) => {
  const isDriver = userType === "driver" || userType === "helper" || userType === "cleaning";
  const [vehicleType, setVehicleType] = useState('');
  
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
      
      {isDriver && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded mb-2 flex items-center">
          <Truck className="w-5 h-5 mr-2" />
          Completa estos datos para poder verificar tu identidad y habilitarte como chofer en nuestra plataforma.
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <PersonalInfoForm />
        
        {isDriver && (
          <>
            <VehicleInfoForm 
              vehicleType={vehicleType}
              onVehicleTypeChange={setVehicleType}
            />
            <HelperInfoForm />
          </>
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
