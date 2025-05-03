
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthContent from '@/components/auth/AuthContent';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send a reset password request to your API
    setSubmitted(true);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <AuthLayout>
      <AuthContent
        title={submitted ? "Correo enviado" : "Restablecer contraseña"}
        subtitle={
          submitted
            ? "Hemos enviado un enlace de recuperación a tu correo electrónico"
            : "Ingresa tu correo electrónico para restablecer tu contraseña"
        }
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  id="email" 
                  placeholder="ejemplo@correo.com" 
                  type="email" 
                  className="pl-10 py-2 border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-[#DB2851] hover:bg-[#c11f45] py-2.5 text-base">
              Enviar instrucciones
            </Button>
            
            <div className="flex justify-center">
              <button 
                type="button" 
                onClick={handleBackToLogin}
                className="text-[#009EE2] hover:underline flex items-center gap-2 text-sm"
              >
                Volver a iniciar sesión
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 w-full">
            <div className="flex justify-center">
              <div className="bg-[#009EE2]/10 rounded-full p-4">
                <Check className="h-8 w-8 text-[#009EE2]" />
              </div>
            </div>
            
            <p className="text-center text-gray-600">
              Si existe una cuenta con el correo <span className="font-medium">{email}</span>, recibirás un enlace para restablecer tu contraseña.
            </p>
            
            <Button 
              onClick={handleBackToLogin} 
              className="w-full bg-[#DB2851] hover:bg-[#c11f45] py-2.5 text-base"
            >
              Volver a iniciar sesión
            </Button>
          </div>
        )}
      </AuthContent>
    </AuthLayout>
  );
};

export default ResetPassword;
