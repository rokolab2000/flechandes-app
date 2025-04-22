
import { ChevronLeft, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RegisterStep3Props {
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegisterStep3 = ({ onBack, onSubmit }: RegisterStep3Props) => {
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
        <span className="ml-2 font-semibold">Verificación de documentos</span>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            Por favor, sube los siguientes documentos para verificar tu cuenta. Todos los archivos deben estar en formato PDF o JPG.
          </p>
        </div>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="driver-license">Licencia de conducir</Label>
          <Input 
            id="driver-license" 
            type="file" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="insurance">Seguro del vehículo</Label>
          <Input 
            id="insurance" 
            type="file" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="business-license">Licencia comercial (opcional)</Label>
          <Input 
            id="business-license" 
            type="file" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        
        <div className="flex items-start space-x-3 mt-6">
          <div className="flex items-center h-5 mt-1">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-move-blue-300"
              required
            />
          </div>
          <div className="text-sm">
            <label htmlFor="terms" className="font-medium text-gray-900">
              Acepto los <a href="#" className="text-move-blue-600 hover:underline">Términos de Servicio</a> y la <a href="#" className="text-move-blue-600 hover:underline">Política de Privacidad</a>
            </label>
            <p id="terms" className="text-xs font-normal text-gray-500">
              Al registrarte, aceptas nuestro proceso de verificación de antecedentes.
            </p>
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-move-blue-500 hover:bg-move-blue-600">
          Completar registro
        </Button>
      </form>
    </div>
  );
};

export default RegisterStep3;
