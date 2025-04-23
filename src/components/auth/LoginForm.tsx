
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onToggleForm: () => void;
}

const LoginForm = ({ onSubmit, onToggleForm }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-5 w-full">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700">Correo electrónico</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            id="email" 
            placeholder="ejemplo@correo.com" 
            type="email" 
            className="pl-10 py-2 border-gray-300"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
          <a href="#" className="text-sm text-[#009EE2] hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            id="password" 
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
      </div>
      
      <div className="flex items-center space-x-2 mt-1">
        <input
          type="checkbox"
          id="remember"
          className="h-4 w-4 rounded border-gray-300 text-[#009EE2] focus:ring-[#009EE2]"
        />
        <Label htmlFor="remember" className="text-sm text-gray-600">Recordar mi sesión</Label>
      </div>
      
      <Button type="submit" className="w-full bg-[#DB2851] hover:bg-[#c11f45] py-2.5 text-base">
        Iniciar sesión
      </Button>
      
      <p className="text-center text-sm text-gray-600 pt-2">
        ¿No tienes una cuenta?{' '}
        <button 
          type="button"
          className="text-[#009EE2] hover:underline font-medium"
          onClick={onToggleForm}
        >
          Registrarse
        </button>
      </p>
      
      <div className="relative flex items-center justify-center mt-6">
        <hr className="w-full border-gray-200" />
        <span className="absolute bg-white px-4 text-xs text-gray-500">o continuar con</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button variant="outline" type="button" className="w-full border-gray-300 hover:bg-gray-50 text-gray-700">
          Google
        </Button>
        <Button variant="outline" type="button" className="w-full border-gray-300 hover:bg-gray-50 text-gray-700">
          Facebook
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
