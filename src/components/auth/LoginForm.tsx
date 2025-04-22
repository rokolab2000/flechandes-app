
import { Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onToggleForm: () => void;
}

const LoginForm = ({ onSubmit, onToggleForm }: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full">
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="email" 
            placeholder="Tu correo electrónico" 
            type="email" 
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password">Contraseña</Label>
          <a href="#" className="text-xs text-move-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="password" 
            placeholder="Tu contraseña" 
            type="password" 
            className="pl-10"
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-move-blue-500 hover:bg-move-blue-600">
        Iniciar sesión
      </Button>
      
      <p className="text-center text-sm text-gray-500">
        ¿No tienes una cuenta?{' '}
        <button 
          type="button"
          className="text-move-blue-600 hover:underline font-medium"
          onClick={onToggleForm}
        >
          Registrarse
        </button>
      </p>
      
      <div className="relative flex items-center justify-center">
        <hr className="w-full border-gray-200" />
        <span className="absolute bg-white px-2 text-sm text-gray-500">o continuar con</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" type="button" className="w-full">
          Google
        </Button>
        <Button variant="outline" type="button" className="w-full">
          Facebook
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
