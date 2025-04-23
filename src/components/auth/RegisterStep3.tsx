
import { ChevronLeft, AlertCircle, Upload } from 'lucide-react';
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
      <div className="flex items-center mb-4">
        <button 
          type="button" 
          onClick={onBack}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <span className="ml-2 font-medium text-gray-700">Verificación de documentos</span>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            Para garantizar la seguridad de nuestros usuarios, necesitamos verificar tu identidad y documentos. Por favor, sube los siguientes archivos.
          </p>
        </div>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <Label htmlFor="driver-license" className="block mb-2 text-gray-700">Carnet de identidad (ambos lados)</Label>
            <div className="flex items-center justify-center h-32 bg-gray-50 rounded-md">
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Arrastra una imagen o <span className="text-[#DB2851] font-medium">búscala</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">Formatos: JPG, PNG o PDF (máx. 5MB)</p>
              </div>
              <Input 
                id="driver-license" 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
            </div>
          </div>
          
          <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <Label htmlFor="vehicle-document" className="block mb-2 text-gray-700">Licencia de conducir</Label>
            <div className="flex items-center justify-center h-32 bg-gray-50 rounded-md">
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Arrastra una imagen o <span className="text-[#DB2851] font-medium">búscala</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">Formatos: JPG, PNG o PDF (máx. 5MB)</p>
              </div>
              <Input 
                id="vehicle-document" 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
            </div>
          </div>
          
          <div className="border border-dashed border-gray-300 rounded-lg p-4">
            <Label htmlFor="selfie" className="block mb-2 text-gray-700">Foto de perfil</Label>
            <div className="flex items-center justify-center h-32 bg-gray-50 rounded-md">
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Arrastra una imagen o <span className="text-[#DB2851] font-medium">búscala</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">Formatos: JPG, PNG (máx. 5MB)</p>
              </div>
              <Input 
                id="selfie" 
                type="file" 
                accept=".jpg,.jpeg,.png"
                className="hidden"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 mt-2">
          <div className="flex items-center h-5 mt-1">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-[#DB2851]"
              required
            />
          </div>
          <div className="text-sm text-gray-600">
            <label htmlFor="terms">
              Certifico que los documentos proporcionados son auténticos y actualizados. Entiendo que proporcionar información falsa puede resultar en la suspensión de mi cuenta.
            </label>
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-[#DB2851] hover:bg-[#c11f45] py-2.5 text-base mt-4">
          Completar registro
        </Button>
      </form>
    </div>
  );
};

export default RegisterStep3;
