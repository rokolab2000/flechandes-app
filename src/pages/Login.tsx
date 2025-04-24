import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';
import LoginForm from '@/components/auth/LoginForm';
import RegisterStep1 from '@/components/auth/RegisterStep1';
import RegisterStep2 from '@/components/auth/RegisterStep2';
import RegisterStep3 from '@/components/auth/RegisterStep3';
import StepIndicator from '@/components/auth/StepIndicator';
import { UserType } from '@/components/UserTypeSelector';
import { Button } from '@/components/ui/button';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<UserType>('shipping');
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    const state = location.state as { userType?: UserType; isRegistering?: boolean } | null;
    if (state?.userType) {
      setUserType(state.userType);
    }
    if (state?.isRegistering) {
      setIsLogin(false);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      if (userType === 'driver' || userType === 'helper' || userType === 'cleaning') {
        navigate('/transporter/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } else {
      if (step < (userType === 'driver' || userType === 'helper' || userType === 'cleaning' ? 3 : 2)) {
        setStep(step + 1);
      } else {
        if (userType === 'driver' || userType === 'helper' || userType === 'cleaning') {
          navigate('/transporter/dashboard');
        } else {
          navigate('/customer/dashboard');
        }
      }
    }
  };
  
  const renderStepIndicator = () => {
    if (isLogin || (userType !== 'driver' && userType !== 'helper' && userType !== 'cleaning' && step === 1)) return null;
    
    const totalSteps = userType === 'driver' || userType === 'helper' || userType === 'cleaning' ? 3 : 2;
    return <StepIndicator currentStep={step} totalSteps={totalSteps} />;
  };
  
  const renderContent = () => {
    if (isLogin) {
      return (
        <LoginForm 
          onSubmit={handleSubmit} 
          onToggleForm={() => {setIsLogin(false); setStep(1);}} 
        />
      );
    }
    
    switch(step) {
      case 1:
        return (
          <RegisterStep1 
            userType={userType}
            onUserTypeSelect={setUserType}
            onSubmit={handleSubmit}
            onToggleForm={() => {setIsLogin(true); setStep(1);}}
          />
        );
      case 2:
        return (
          <RegisterStep2 
            onBack={() => setStep(1)}
            onSubmit={handleSubmit}
          />
        );
      case 3:
        return (
          <RegisterStep3 
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Header for mobile */}
      <div className="md:hidden p-4 flex items-center justify-between bg-white shadow-sm">
        <Link to="/" className="flex items-center text-gray-700">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver
        </Link>
        <Logo size="sm" />
      </div>

      {/* Left Panel - Form */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="hidden md:block mb-8">
            <Logo size="lg" className="mx-auto" />
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {isLogin 
                  ? 'Bienvenido de nuevo' 
                  : step === 1 
                    ? 'Crea tu cuenta' 
                    : step === 2 
                      ? 'Información adicional' 
                      : 'Verificación'
                }
              </h1>
              <p className="text-gray-600 mt-2">
                {isLogin 
                  ? 'Inicia sesión para acceder a tu cuenta' 
                  : 'Completa el formulario para comenzar'
                }
              </p>
            </div>
            
            {renderStepIndicator()}
            {renderContent()}
          </div>
        </div>
      </div>
      
      {/* Right Panel - Image */}
      <div className="hidden md:block w-1/2 bg-gradient-to-br from-[#009EE2] to-[#007bb3]">
        <div className="h-full flex items-center justify-center p-6">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-6">Mudanzas simplificadas</h2>
            <p className="mb-8 text-lg">
              Conectamos a transportistas profesionales con clientes que necesitan servicios de mudanza y fletes.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-1 mr-4">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-lg">Servicio rápido y confiable</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-1 mr-4">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-lg">Procesamiento de pagos seguro</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-1 mr-4">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-lg">Transportistas verificados</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-1 mr-4">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-lg">Seguimiento en tiempo real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
