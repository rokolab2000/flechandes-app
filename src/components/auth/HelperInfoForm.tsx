
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const HelperInfoForm = () => {
  return (
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
  );
};

export default HelperInfoForm;
