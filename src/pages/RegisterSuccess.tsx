
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthContent from '@/components/auth/AuthContent';

const RegisterSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = location.state || { userType: 'shipping' };
  
  const isTransporter = ['driver', 'helper', 'cleaning'].includes(userType);

  const handleContinue = () => {
    if (isTransporter) {
      navigate('/transporter/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  };

  return (
    <AuthLayout isTransporter={isTransporter} userType={userType}>
      <AuthContent
        title="¡Registro exitoso!"
        subtitle="Tu cuenta ha sido creada correctamente"
      >
        <div className="space-y-6 w-full">
          <div className="flex justify-center">
            <div className={`bg-${isTransporter ? '[#DB2851]/10' : '[#009EE2]/10'} rounded-full p-5`}>
              <CheckCircle className={`h-16 w-16 text-${isTransporter ? '[#DB2851]' : '[#009EE2]'}`} />
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <h2 className="text-xl font-medium text-gray-800">
              {isTransporter 
                ? 'Gracias por registrarte como transportista' 
                : 'Gracias por registrarte en nuestra plataforma'}
            </h2>
            
            <p className="text-gray-600">
              {isTransporter 
                ? 'Tu solicitud ha sido recibida y está en proceso de verificación. Te notificaremos cuando tu cuenta esté activa.'
                : 'Ya puedes comenzar a utilizar todos nuestros servicios de envíos, mudanzas y cargas.'}
            </p>
          </div>
          
          <Button 
            onClick={handleContinue} 
            className={`w-full ${isTransporter ? 'bg-[#DB2851] hover:bg-[#c11f45]' : 'bg-[#009EE2] hover:bg-[#007bb3]'} py-2.5 text-base`}
          >
            Ir al panel principal
          </Button>
        </div>
      </AuthContent>
    </AuthLayout>
  );
};

export default RegisterSuccess;
