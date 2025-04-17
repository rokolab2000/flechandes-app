
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Package, 
  ArrowRight,
  Camera,
  Truck,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';

const NewService = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState('moving');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final submission, navigate to confirmation
      navigate('/customer/service-confirmation');
    }
  };
  
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/customer/dashboard');
    }
  };
  
  const renderStep1 = () => (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">¿Qué tipo de servicio necesitas?</h2>
        <p className="text-gray-600">Elige el servicio que mejor se adapte a tus necesidades</p>
      </div>
      
      <RadioGroup 
        defaultValue={serviceType}
        onValueChange={setServiceType}
        className="space-y-4"
      >
        <div className={`border-2 rounded-lg p-4 ${serviceType === 'moving' ? 'border-move-blue-500 bg-move-blue-50' : 'border-gray-200'}`}>
          <div className="flex items-start">
            <RadioGroupItem value="moving" id="moving" className="mt-1" />
            <div className="ml-3">
              <Label htmlFor="moving" className="text-lg font-medium">Servicio Completo de Mudanza</Label>
              <p className="text-gray-600">Profesionales se encargarán de embalar, cargar, transportar y descargar tus artículos</p>
            </div>
          </div>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${serviceType === 'delivery' ? 'border-move-blue-500 bg-move-blue-50' : 'border-gray-200'}`}>
          <div className="flex items-start">
            <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
            <div className="ml-3">
              <Label htmlFor="delivery" className="text-lg font-medium">Servicio de Entrega</Label>
              <p className="text-gray-600">Transporte de artículos específicos de un lugar a otro</p>
            </div>
          </div>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${serviceType === 'freight' ? 'border-move-blue-500 bg-move-blue-50' : 'border-gray-200'}`}>
          <div className="flex items-start">
            <RadioGroupItem value="freight" id="freight" className="mt-1" />
            <div className="ml-3">
              <Label htmlFor="freight" className="text-lg font-medium">Servicio de Carga</Label>
              <p className="text-gray-600">Transporte de artículos grandes o pesados que requieren equipamiento especial</p>
            </div>
          </div>
        </div>
      </RadioGroup>
    </>
  );
  
  const renderStep2 = () => (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Ubicación y Horario</h2>
        <p className="text-gray-600">Dinos dónde y cuándo necesitas el servicio</p>
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
  
  const renderStep3 = () => (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Detalles de los Artículos</h2>
        <p className="text-gray-600">Describe lo que necesitas transportar</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="items-description">Descripción de los Artículos</Label>
          <Textarea 
            id="items-description" 
            placeholder="Describe los artículos a transportar (ej. muebles, cajas, electrodomésticos)"
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
        
        <div className="space-y-2">
          <Label>¿Hay artículos frágiles?</Label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input type="radio" id="fragile-yes" name="fragile" className="mr-2" />
              <label htmlFor="fragile-yes">Sí</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="fragile-no" name="fragile" className="mr-2" />
              <label htmlFor="fragile-no">No</label>
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
          <h1 className="font-semibold">Solicitar un Servicio</h1>
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
          
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-move-blue-500 text-white' : 'bg-gray-200'
            }`}>
              {step > 2 ? <Check className="h-4 w-4" /> : 2}
            </div>
            <div className={`h-1 w-12 ${
              step > 2 ? 'bg-move-blue-500' : 'bg-gray-200'
            }`} />
          </div>
          
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-move-blue-500 text-white' : 'bg-gray-200'
          }`}>
            3
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto max-w-2xl px-4 pb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            
            <div className="mt-8">
              <Button 
                type="submit" 
                className="w-full bg-move-blue-500 hover:bg-move-blue-600"
              >
                {step < 3 ? 'Continuar' : 'Solicitar Presupuestos'} 
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
