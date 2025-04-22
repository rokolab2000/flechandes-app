
import { Mail, Lock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UserTypeSelector, { UserType } from '@/components/UserTypeSelector';

interface RegisterStep1Props {
  userType: UserType;
  onUserTypeSelect: (type: UserType) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleForm: () => void;
}

const RegisterStep1 = ({ 
  userType, 
  onUserTypeSelect, 
  onSubmit, 
  onToggleForm 
}: RegisterStep1Props) => {
  return (
    <div className="space-y-6 w-full">
      <UserTypeSelector onSelect={onUserTypeSelect} defaultSelected={userType} />
      
      <form onSubmit={onSubmit} className="space-y-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="register-email">Correo electrónico</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="register-email" 
              placeholder="Tu correo electrónico" 
              type="email" 
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-phone">Número de teléfono</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="register-phone" 
              placeholder="Tu número de teléfono" 
              type="tel" 
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-password">Crear contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="register-password" 
              placeholder="Crea una contraseña fuerte" 
              type="password" 
              className="pl-10"
            />
          </div>
          <p className="text-xs text-gray-500">
            La contraseña debe tener al menos 8 caracteres
          </p>
        </div>
        
        <Button type="submit" className="w-full bg-move-blue-500 hover:bg-move-blue-600">
          {userType === 'driver' || userType === 'helper' || userType === 'cleaning' ? 'Siguiente' : 'Registrarse'}
        </Button>
        
        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes una cuenta?{' '}
          <button 
            type="button"
            className="text-move-blue-600 hover:underline font-medium"
            onClick={onToggleForm}
          >
            Iniciar sesión
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterStep1;
