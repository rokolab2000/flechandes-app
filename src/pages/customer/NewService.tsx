
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
  Check,
  Users,
  Shield,
  Boxes,
  Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const NewService = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState('moving');
  const [helpers, setHelpers] = useState('1');
  const [vehicleType, setVehicleType] = useState('van');
  const [packagingType, setPackagingType] = useState([]);
  const [insurance, setInsurance] = useState(false);
  
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
            <div className="ml-3 flex-1">
              <Label htmlFor="moving" className="text-lg font-medium flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Servicio Completo de Mudanza
              </Label>
              <p className="text-gray-600">Profesionales se encargarán de embalar, cargar, transportar y descargar tus artículos entre dos ubicaciones</p>
            </div>
          </div>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${serviceType === 'freight' ? 'border-move-blue-500 bg-move-blue-50' : 'border-gray-200'}`}>
          <div className="flex items-start">
            <RadioGroupItem value="freight" id="freight" className="mt-1" />
            <div className="ml-3 flex-1">
              <Label htmlFor="freight" className="text-lg font-medium flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Servicio de Fletes
              </Label>
              <p className="text-gray-600">Tipo taxi carga, el chofer va con su vehículo, carga y entrega tus artículos</p>
            </div>
          </div>
        </div>
        
        <div className={`border-2 rounded-lg p-4 ${serviceType === 'delivery' ? 'border-move-blue-500 bg-move-blue-50' : 'border-gray-200'}`}>
          <div className="flex items-start">
            <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
            <div className="ml-3 flex-1">
              <Label htmlFor="delivery" className="text-lg font-medium flex items-center">
                <Boxes className="h-5 w-5 mr-2" />
                Servicio de Envíos
              </Label>
              <p className="text-gray-600">Para usuarios con PyME que necesitan enviar varios productos a diferentes direcciones</p>
            </div>
          </div>
        </div>
      </RadioGroup>
    </>
  );
  
  const renderStep2 = () => {
    if (serviceType === 'moving') {
      return renderMovingLocationForm();
    } else if (serviceType === 'freight') {
      return renderFreightLocationForm();
    } else {
      return renderDeliveryLocationForm();
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

  const renderDeliveryLocationForm = () => (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Programación de Envíos</h2>
        <p className="text-gray-600">Información para enviar productos a diferentes direcciones</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pickup-address">Dirección de Recogida (Almacén/Tienda)</Label>
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
          <Label>Tipo de Programación</Label>
          <RadioGroup defaultValue="same-day" className="grid grid-cols-2 gap-4">
            <div className="flex items-center border rounded-lg p-3">
              <RadioGroupItem value="same-day" id="same-day" className="mr-2" />
              <Label htmlFor="same-day">Mismo día</Label>
            </div>
            <div className="flex items-center border rounded-lg p-3">
              <RadioGroupItem value="schedule" id="schedule" className="mr-2" />
              <Label htmlFor="schedule">Programar entregas</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Collapsible className="border rounded-lg p-4">
          <CollapsibleTrigger className="flex w-full justify-between items-center">
            <span className="font-medium">Agregar dirección de entrega</span>
            <Button variant="outline" type="button" size="sm">Agregar</Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delivery-address">Dirección de Entrega #1</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="delivery-address" 
                  placeholder="Ingresa la dirección de entrega" 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="delivery-date">Fecha</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="delivery-date" 
                    type="date"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="delivery-time">Hora</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="delivery-time" 
                    type="time"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
  
  const renderStep3 = () => {
    if (serviceType === 'moving') {
      return renderMovingDetailsForm();
    } else if (serviceType === 'freight') {
      return renderFreightDetailsForm();
    } else {
      return renderDeliveryDetailsForm();
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
          
          <Select defaultValue={vehicleType} onValueChange={setVehicleType}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un vehículo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="van">Camioneta (hasta 1 tonelada)</SelectItem>
              <SelectItem value="small-truck">Camión Pequeño (1-3 toneladas)</SelectItem>
              <SelectItem value="medium-truck">Camión Mediano (3-5 toneladas)</SelectItem>
              <SelectItem value="large-truck">Camión Grande (más de 5 toneladas)</SelectItem>
            </SelectContent>
          </Select>
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

  const renderDeliveryDetailsForm = () => (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Detalles de los Envíos</h2>
        <p className="text-gray-600">Información sobre los productos a enviar</p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="items-description" className="flex items-center">
            <Boxes className="h-4 w-4 mr-2" />
            Descripción de los Productos
          </Label>
          <Textarea 
            id="items-description" 
            placeholder="Describe los productos a enviar (tipo, cantidad, etc.)"
            rows={3}
          />
        </div>

        <div className="border rounded-lg p-4">
          <Label className="font-medium mb-2 block">Necesidades Especiales</Label>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <input type="checkbox" id="refrigerated" className="mr-2 mt-1" />
              <div>
                <label htmlFor="refrigerated" className="font-medium">Refrigerado</label>
                <p className="text-xs text-gray-600">Para productos que requieren temperatura controlada</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <input type="checkbox" id="fragile" className="mr-2 mt-1" />
              <div>
                <label htmlFor="fragile" className="font-medium">Frágil</label>
                <p className="text-xs text-gray-600">Manipulación especial para artículos delicados</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <input type="checkbox" id="urgent" className="mr-2 mt-1" />
              <div>
                <label htmlFor="urgent" className="font-medium">Urgente</label>
                <p className="text-xs text-gray-600">Entrega prioritaria</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-move-blue-500" />
              <div>
                <Label className="font-medium">Seguro de Envío</Label>
                <p className="text-sm text-gray-600">Protege tus productos durante el transporte</p>
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
          <Label htmlFor="additional-notes">Instrucciones de Entrega (Opcional)</Label>
          <Textarea 
            id="additional-notes" 
            placeholder="Instrucciones especiales para la entrega de los productos"
            rows={2}
          />
        </div>

        <div className="border rounded-lg p-4 space-y-2">
          <Label className="font-medium">¿Recepción con firma?</Label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input type="radio" id="signature-yes" name="signature" className="mr-2" />
              <label htmlFor="signature-yes">Sí</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="signature-no" name="signature" className="mr-2" />
              <label htmlFor="signature-no">No</label>
            </div>
          </div>
          <p className="text-xs text-gray-600">Si se requiere firma, alguien debe estar presente para recibir el envío</p>
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

