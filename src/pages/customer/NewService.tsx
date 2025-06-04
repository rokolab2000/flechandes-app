
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Package, 
  ArrowRight,
  Camera,
  Truck,
  Check,
  Users,
  Shield,
  Mail, 
  Lock, 
  Phone, 
  User, 
  Eye, 
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import VehicleSelector from '@/components/VehicleSelector';
import { toast } from "sonner";
import { ServiceType } from '@/components/customer/ServiceOptions';

const NewService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<ServiceType>('moving');
  const [helpers, setHelpers] = useState('1');
  const [vehicleType, setVehicleType] = useState('van');
  const [insurance, setInsurance] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Simple authentication check (in a real app, this would come from a context/auth provider)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication status on component mount
  useEffect(() => {
    // Simple check - in a real app, this would check for actual auth tokens/session
    const userToken = localStorage.getItem('userToken') || sessionStorage.getItem('userSession');
    setIsAuthenticated(!!userToken);
  }, []);
  
  // Get service type from location state
  useEffect(() => {
    if (location.state?.serviceType) {
      setServiceType(location.state.serviceType);
    }
    if (location.state?.step) {
      setStep(location.state.step);
    }
  }, [location.state]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If user is authenticated, skip the registration step (step 3)
    const maxStep = isAuthenticated ? 2 : 3;
    
    if (step < maxStep) {
      setStep(step + 1);
    } else {
      // Final submission - either step 2 (if authenticated) or step 3 (if not authenticated)
      const serviceData = {
        type: serviceType,
        origin,
        destination,
        vehicleType,
        helpers,
        insurance
      };
      
      console.log('Service data submitted:', serviceData);
      
      if (!isAuthenticated) {
        // Simulate registration completion
        localStorage.setItem('userToken', 'demo-token');
        setIsAuthenticated(true);
      }
      
      toast.success("¡Solicitud completada! Redirigiendo al panel...");
      
      setTimeout(() => {
        navigate('/customer/dashboard', { 
          state: { 
            showSuccessModal: true,
            serviceData: serviceData,
            showRoute: true, 
            routeData: {
              origin,
              destination
            }
          } 
        });
      }, 1500);
    }
  };
  
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };
  
  const renderStep1 = () => {
    if (serviceType === 'moving') {
      return renderMovingLocationForm();
    } else {
      return renderFreightLocationForm();
    }
  };

  const renderMovingLocationForm = () => (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Dirección de Mudanza</h2>
        <p className="text-gray-600">Indícanos el origen y destino de tu mudanza</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pickup-address">Dirección de Origen</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="pickup-address" 
              placeholder="Ingresa la dirección de origen" 
              className="pl-10"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="delivery-address">Dirección de Destino</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="delivery-address" 
              placeholder="Ingresa la dirección de destino" 
              className="pl-10"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="service-date">Fecha</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="service-date" 
                type="date"
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service-time">Hora</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="service-time" 
                type="time"
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderFreightLocationForm = () => (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Ubicación del Flete</h2>
        <p className="text-gray-600">Dinos dónde recoger y entregar tus artículos</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pickup-address">Dirección de Recogida</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="pickup-address" 
              placeholder="Ingresa la dirección de recogida" 
              className="pl-10"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="delivery-address">Dirección de Entrega</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="delivery-address" 
              placeholder="Ingresa la dirección de entrega" 
              className="pl-10"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="service-date">Fecha</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="service-date" 
                type="date"
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service-time">Hora</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="service-time" 
                type="time"
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
  const renderStep2 = () => {
    if (serviceType === 'moving') {
      return renderMovingDetailsForm();
    } else {
      return renderFreightDetailsForm();
    }
  };

  const renderMovingDetailsForm = () => (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Detalles de la Mudanza</h2>
        <p className="text-gray-600">Describe lo que necesitas transportar y servicios adicionales</p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="items-description" className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Lista de Objetos a Mudar
          </Label>
          <Textarea 
            id="items-description" 
            placeholder="Describe detalladamente los muebles y artículos a transportar"
            rows={4}
          />
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="font-medium flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Ayudantes
          </Label>
          <p className="text-sm text-gray-600">¿Cuántos ayudantes necesitas para tu mudanza?</p>
          
          <RadioGroup 
            defaultValue={helpers} 
            onValueChange={setHelpers}
            className="grid grid-cols-3 gap-2"
          >
            <div className={`border rounded-lg p-2 text-center ${helpers === '1' ? 'bg-move-blue-50 border-move-blue-500' : ''}`}>
              <RadioGroupItem value="1" id="one-helper" className="sr-only" />
              <Label htmlFor="one-helper" className="cursor-pointer block">
                <span className="text-xl font-bold">1</span>
                <span className="block text-xs">Ayudante</span>
              </Label>
            </div>
            
            <div className={`border rounded-lg p-2 text-center ${helpers === '2' ? 'bg-move-blue-50 border-move-blue-500' : ''}`}>
              <RadioGroupItem value="2" id="two-helpers" className="sr-only" />
              <Label htmlFor="two-helpers" className="cursor-pointer block">
                <span className="text-xl font-bold">2</span>
                <span className="block text-xs">Ayudantes</span>
              </Label>
            </div>
            
            <div className={`border rounded-lg p-2 text-center ${helpers === '3' ? 'bg-move-blue-50 border-move-blue-500' : ''}`}>
              <RadioGroupItem value="3" id="three-helpers" className="sr-only" />
              <Label htmlFor="three-helpers" className="cursor-pointer block">
                <span className="text-xl font-bold">3</span>
                <span className="block text-xs">Ayudantes</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="font-medium flex items-center">
            <Truck className="h-4 w-4 mr-2" />
            Tipo de Vehículo
          </Label>
          <p className="text-sm text-gray-600">Selecciona el tamaño de vehículo que necesitas</p>
          
          <VehicleSelector
            value={vehicleType}
            onValueChange={setVehicleType}
            serviceType="moving"
          />
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="font-medium">Servicio de Embalaje</Label>
          <p className="text-sm text-gray-600">¿Necesitas materiales para embalar tus pertenencias?</p>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="packaging-paper" className="mr-2" />
              <label htmlFor="packaging-paper">Papel de embalaje</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="packaging-film" className="mr-2" />
              <label htmlFor="packaging-film">Film plástico</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="packaging-cardboard" className="mr-2" />
              <label htmlFor="packaging-cardboard">Cartón corrugado</label>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-move-blue-500" />
              <div>
                <Label className="font-medium">Seguro de Carga</Label>
                <p className="text-sm text-gray-600">Protege tus pertenencias durante el transporte</p>
              </div>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="insurance" 
                className="mr-2" 
                checked={insurance} 
                onChange={() => setInsurance(!insurance)} 
              />
              <Label htmlFor="insurance">{insurance ? 'Incluido' : 'No incluido'}</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Añadir Fotos (Opcional)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-2">Sube fotos de tus artículos</p>
            <Button variant="outline" type="button" className="text-sm">
              Seleccionar Fotos
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="additional-notes">Notas Adicionales (Opcional)</Label>
          <Textarea 
            id="additional-notes" 
            placeholder="Cualquier instrucción o requisito especial"
            rows={2}
          />
        </div>
      </div>
    </>
  );

  const renderFreightDetailsForm = () => (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Detalles del Flete</h2>
        <p className="text-gray-600">Describe lo que necesitas transportar y servicios adicionales</p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="items-description" className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Descripción de la Carga
          </Label>
          <Textarea 
            id="items-description" 
            placeholder="Describe los artículos a transportar"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="approximate-weight">Peso Aproximado (kg)</Label>
            <Input 
              id="approximate-weight" 
              type="number"
              placeholder="Ingresa el peso"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approximate-volume">Volumen Aproximado (m³)</Label>
            <Input 
              id="approximate-volume" 
              type="number"
              placeholder="Ingresa el volumen"
            />
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="font-medium flex items-center">
            <Users className="h-4 w-4 mr-2" />
            ¿Necesitas un Ayudante?
          </Label>
          
          <RadioGroup defaultValue="no" className="grid grid-cols-2 gap-4">
            <div className="flex items-center border rounded-lg p-3">
              <RadioGroupItem value="yes" id="helper-yes" className="mr-2" />
              <Label htmlFor="helper-yes">Sí</Label>
            </div>
            <div className="flex items-center border rounded-lg p-3">
              <RadioGroupItem value="no" id="helper-no" className="mr-2" />
              <Label htmlFor="helper-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="font-medium flex items-center">
            <Truck className="h-4 w-4 mr-2" />
            Tipo de Vehículo
          </Label>
          <p className="text-sm text-gray-600">Selecciona el tamaño de vehículo que necesitas</p>
          
          <VehicleSelector
            value={vehicleType}
            onValueChange={setVehicleType}
            serviceType="freight"
          />
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <Label className="font-medium">Servicio de Embalaje</Label>
          <p className="text-sm text-gray-600">¿Necesitas materiales para embalar tus artículos?</p>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="packaging-paper" className="mr-2" />
              <label htmlFor="packaging-paper">Papel de embalaje</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="packaging-film" className="mr-2" />
              <label htmlFor="packaging-film">Film plástico</label>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-move-blue-500" />
              <div>
                <Label className="font-medium">Seguro de Carga</Label>
                <p className="text-sm text-gray-600">Protege tus artículos durante el transporte</p>
              </div>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="insurance" 
                className="mr-2" 
                checked={insurance} 
                onChange={() => setInsurance(!insurance)} 
              />
              <Label htmlFor="insurance">{insurance ? 'Incluido' : 'No incluido'}</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Añadir Fotos (Opcional)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-2">Sube fotos de tus artículos</p>
            <Button variant="outline" type="button" className="text-sm">
              Seleccionar Fotos
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Registro de Usuario</h2>
        <p className="text-gray-600">Completa tu registro para solicitar el servicio</p>
      </div>
      
      <div className="space-y-4">
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
        
        <div className="flex items-start space-x-3 mt-4">
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
        
        <div className="relative flex items-center justify-center mt-6">
          <hr className="w-full border-gray-200" />
          <span className="absolute bg-white px-4 text-xs text-gray-500">o continuar con</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button variant="outline" type="button" className="w-full border-gray-300 hover:bg-gray-50 text-gray-700">
            Google
          </Button>
          <Button variant="outline" type="button" className="w-full border-gray-300 hover:bg-gray-50 text-gray-700">
            Facebook
          </Button>
        </div>
        
        <p className="text-center text-sm text-gray-600 pt-4">
          ¿Ya tienes una cuenta?{' '}
          <button 
            type="button"
            className="text-[#009EE2] hover:underline font-medium"
          >
            Iniciar sesión
          </button>
        </p>
      </div>
    </>
  );
  
  // Calculate total steps based on authentication status
  const totalSteps = isAuthenticated ? 2 : 3;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto max-w-2xl flex items-center">
          <button 
            className="p-1 rounded-full hover:bg-gray-100 mr-3"
            onClick={goBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="font-semibold">Solicitar {
            serviceType === 'moving' ? 'Mudanza' : 'Flete'
          }</h1>
        </div>
      </header>
      
      {/* Progress Indicator */}
      <div className="container mx-auto max-w-2xl px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-move-blue-500 text-white' : 'bg-gray-200'
            }`}>
              {step > 1 ? <Check className="h-4 w-4" /> : 1}
            </div>
            <div className={`h-1 w-12 ${
              step > 1 ? 'bg-move-blue-500' : 'bg-gray-200'
            }`} />
          </div>
          
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-move-blue-500 text-white' : 'bg-gray-200'
          }`}>
            {step > 2 ? <Check className="h-4 w-4" /> : 2}
          </div>

          {!isAuthenticated && (
            <>
              <div className={`h-1 w-12 ${
                step > 2 ? 'bg-move-blue-500' : 'bg-gray-200'
              }`} />

              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-move-blue-500 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto max-w-2xl px-4 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && !isAuthenticated && renderStep3()}
            
            <div className="mt-8">
              <Button 
                type="submit" 
                className="w-full bg-move-blue-500 hover:bg-move-blue-600"
              >
                {step === 1 ? 'Continuar' : 
                 step === 2 && isAuthenticated ? 'Completar Solicitud' :
                 step === 2 && !isAuthenticated ? 'Continuar al Registro' : 
                 'Completar Registro'} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewService;
