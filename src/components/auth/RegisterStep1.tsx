
import { useState } from 'react';
import { Mail, Lock, Phone, User, Eye, EyeOff } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Tipo de usuario</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className={`p-4 rounded-lg border-2 flex flex-col items-center text-center ${
              ['shipping', 'moving', 'freight'].includes(userType) 
                ? 'bg-[#009EE2] text-white border-[#009EE2]' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#009EE2]/50'
            }`}
            onClick={() => onUserTypeSelect('shipping')}
          >
            <User className={`h-6 w-6 mb-2 ${['shipping', 'moving', 'freight'].includes(userType) ? 'text-white' : 'text-[#009EE2]'}`} />
            <span className="text-sm font-medium">Cliente</span>
          </button>
          
          <button
            type="button"
            className={`p-4 rounded-lg border-2 flex flex-col items-center text-center ${
              ['driver', 'helper', 'cleaning'].includes(userType) 
                ? 'bg-[#DB2851] text-white border-[#DB2851]' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#DB2851]/50'
            }`}
            onClick={() => onUserTypeSelect('driver')}
          >
            <Truck className={`h-6 w-6 mb-2 ${['driver', 'helper', 'cleaning'].includes(userType) ? 'text-white' : 'text-[#DB2851]'}`} />
            <span className="text-sm font-medium">Transportista</span>
          </button>
        </div>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4 mt-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="names" className="text-gray-700">Nombres y apellidos</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                id="names" 
                placeholder="Ingresa tu nombre completo" 
                type="text" 
                className="pl-10 py-2 border-gray-300"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-email" className="text-gray-700">Correo electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                id="register-email" 
                placeholder="ejemplo@correo.com" 
                type="email" 
                className="pl-10 py-2 border-gray-300"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-phone" className="text-gray-700">Número de teléfono</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                id="register-phone" 
                placeholder="+56 9 1234 5678" 
                type="tel" 
                className="pl-10 py-2 border-gray-300"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="register-password" className="text-gray-700">Crear contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                id="register-password" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"} 
                className="pl-10 pr-10 py-2 border-gray-300"
              />
              <button 
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              La contraseña debe tener al menos 8 caracteres
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 mt-2">
          <div className="flex items-center h-5 mt-1">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-[#009EE2]"
              required
            />
          </div>
          <div className="text-sm text-gray-600">
            <label htmlFor="terms">
              Acepto los <a href="#" className="text-[#009EE2] hover:underline">Términos de Servicio</a> y la <a href="#" className="text-[#009EE2] hover:underline">Política de Privacidad</a>
            </label>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className={`w-full ${['driver', 'helper', 'cleaning'].includes(userType) ? 'bg-[#DB2851] hover:bg-[#c11f45]' : 'bg-[#009EE2] hover:bg-[#007bb3]'} py-2.5 text-base`}
        >
          {userType === 'driver' || userType === 'helper' || userType === 'cleaning' ? 'Siguiente' : 'Registrarse'}
        </Button>
        
        <p className="text-center text-sm text-gray-600 pt-2">
          ¿Ya tienes una cuenta?{' '}
          <button 
            type="button"
            className="text-[#009EE2] hover:underline font-medium"
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
