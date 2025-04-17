
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check,
  ChevronLeft, 
  Mail, 
  Lock, 
  Phone, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import UserTypeSelector from '@/components/UserTypeSelector';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'customer' | 'transporter'>('customer');
  const [step, setStep] = useState(1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would handle actual authentication
    // For now, just redirect to the dashboard
    if (isLogin) {
      if (userType === 'customer') {
        navigate('/customer/dashboard');
      } else {
        navigate('/transporter/dashboard');
      }
    } else {
      // If registering, go to next step or finish
      if (step < (userType === 'transporter' ? 3 : 2)) {
        setStep(step + 1);
      } else {
        // Registration complete, redirect to dashboard
        if (userType === 'customer') {
          navigate('/customer/dashboard');
        } else {
          navigate('/transporter/dashboard');
        }
      }
    }
  };
  
  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
          onClick={() => {setIsLogin(false); setStep(1);}}
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
  
  const renderRegisterStep1 = () => (
    <div className="space-y-6 w-full">
      <UserTypeSelector onSelect={setUserType} defaultSelected={userType} />
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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
          {userType === 'transporter' ? 'Siguiente' : 'Registrarse'}
        </Button>
        
        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes una cuenta?{' '}
          <button 
            type="button"
            className="text-move-blue-600 hover:underline font-medium"
            onClick={() => {setIsLogin(true); setStep(1);}}
          >
            Iniciar sesión
          </button>
        </p>
      </form>
    </div>
  );
  
  const renderRegisterStep2 = () => (
    <div className="space-y-6 w-full">
      <div className="flex items-center mb-6">
        <button 
          type="button" 
          onClick={() => setStep(1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="ml-2 font-semibold">Información del vehículo</span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vehicle-type">Tipo de vehículo</Label>
          <select 
            id="vehicle-type"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-move-blue-500"
          >
            <option value="">Seleccionar tipo de vehículo</option>
            <option value="pickup">Camioneta pickup</option>
            <option value="van">Furgoneta</option>
            <option value="truck">Camión de mudanza</option>
            <option value="box-truck">Camión de caja</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="license-plate">Placa del vehículo</Label>
          <Input 
            id="license-plate" 
            placeholder="Ingresa el número de placa" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle-capacity">Capacidad del vehículo</Label>
          <Input 
            id="vehicle-capacity" 
            placeholder="Capacidad en metros cúbicos" 
            type="number" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle-year">Año del vehículo</Label>
          <Input 
            id="vehicle-year" 
            placeholder="Año de fabricación" 
            type="number" 
          />
        </div>
        
        <Button type="submit" className="w-full bg-move-blue-500 hover:bg-move-blue-600">
          Siguiente
        </Button>
      </form>
    </div>
  );
  
  const renderRegisterStep3 = () => (
    <div className="space-y-6 w-full">
      <div className="flex items-center mb-6">
        <button 
          type="button" 
          onClick={() => setStep(2)}
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
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
  
  const renderStepIndicator = () => {
    if (isLogin || (userType === 'customer' && step === 1)) return null;
    
    const totalSteps = userType === 'transporter' ? 3 : 2;
    
    return (
      <div className="flex items-center justify-center space-x-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`w-8 h-2 rounded-full ${
              step > index 
                ? 'bg-move-blue-500' 
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Form */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo size="lg" className="mx-auto mb-6" />
            <h1 className="text-2xl font-bold">
              {isLogin 
                ? 'Bienvenido de nuevo' 
                : step === 1 
                  ? 'Crea tu cuenta' 
                  : step === 2 
                    ? 'Información del vehículo' 
                    : 'Verificación de documentos'
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
          
          {isLogin 
            ? renderLoginForm() 
            : step === 1 
              ? renderRegisterStep1() 
              : step === 2 
                ? renderRegisterStep2() 
                : renderRegisterStep3()
          }
        </div>
      </div>
      
      {/* Right Panel - Image */}
      <div className="hidden md:block w-1/2 bg-move-blue-500">
        <div className="h-full flex items-center justify-center p-6">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-4">Mudanzas simplificadas</h2>
            <p className="mb-6">
              Únete a nuestra comunidad de transportistas y clientes para una experiencia de mudanza sin complicaciones.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-1 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span>Servicio rápido y confiable</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-1 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span>Procesamiento de pagos seguro</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-1 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span>Seguimiento en tiempo real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
