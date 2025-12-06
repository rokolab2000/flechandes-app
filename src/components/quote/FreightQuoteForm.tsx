import React, { useState, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Package, Calendar, Calculator, AlertTriangle, Scale } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import VehicleSelector from '@/components/VehicleSelector';
import StairsAccessSelector from '@/components/quote/StairsAccessSelector';
import HelpersSelector from '@/components/quote/HelpersSelector';
import QuoteBreakdownCard from '@/components/quote/QuoteBreakdownCard';
import { useToast } from '@/hooks/use-toast';
import { useGoogleMapsAutocomplete } from '@/hooks/useGoogleMapsAutocomplete';
import Map from '@/components/Map';
import { 
  calculateQuote, 
  isRemoteZone, 
  QuoteBreakdown 
} from '@/lib/pricing';

const VEHICLE_NAMES: Record<string, string> = {
  'furgon': 'Furgón',
  'van': 'Camioneta',
  'small-truck': 'Camión Chico',
  'medium-truck': 'Camión Mediano',
  'large-truck': 'Camión Grande',
};

const FreightQuoteForm = () => {
  const { toast } = useToast();
  const originInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    weight: '',
    dimensions: '',
    vehicle: 'furgon',
    cargoType: 'normal',
    urgency: 'normal',
    description: ''
  });

  // Fricción Positiva - Stairs Access
  const [destHasElevator, setDestHasElevator] = useState<boolean | null>(null);
  const [destFloors, setDestFloors] = useState(1);

  // Peonetas
  const [helpersCount, setHelpersCount] = useState(0);

  // Quote state
  const [quoteBreakdown, setQuoteBreakdown] = useState<QuoteBreakdown | null>(null);
  const [routeInfo, setRouteInfo] = useState<{distance: string, duration: string} | null>(null);
  const [distanceKm, setDistanceKm] = useState<number>(0);

  // Configurar autocompletado para origen
  useGoogleMapsAutocomplete(originInputRef, {
    onPlaceSelected: (place) => {
      if (place.formatted_address) {
        setFormData(prev => ({ ...prev, origin: place.formatted_address || '' }));
      }
    }
  });

  // Configurar autocompletado para destino
  useGoogleMapsAutocomplete(destinationInputRef, {
    onPlaceSelected: (place) => {
      if (place.formatted_address) {
        setFormData(prev => ({ ...prev, destination: place.formatted_address || '' }));
      }
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Detectar zonas remotas
  const isOriginRemote = useMemo(() => isRemoteZone(formData.origin), [formData.origin]);
  const isDestRemote = useMemo(() => isRemoteZone(formData.destination), [formData.destination]);
  const isRemote = isOriginRemote || isDestRemote;

  // Peso en kg
  const weightKg = useMemo(() => parseFloat(formData.weight) || 0, [formData.weight]);

  // Recomendar ayudantes basado en peso
  const recommendedHelpers = useMemo(() => {
    if (weightKg > 100) return 2;
    if (weightKg > 50) return 1;
    return 0;
  }, [weightKg]);

  const calculateQuoteHandler = () => {
    const breakdown = calculateQuote({
      vehicleType: formData.vehicle,
      distanceKm: distanceKm || 5,
      floors: destHasElevator === false ? destFloors : 1,
      hasElevator: destHasElevator !== false,
      helpersCount,
      specialObjects: [],
      isRemoteZone: isRemote,
      urgency: formData.urgency as 'normal' | 'urgent' | 'express',
      cargoType: formData.cargoType,
      weightKg,
    });

    setQuoteBreakdown(breakdown);
    
    toast({
      title: "Cotización calculada",
      description: "Tu cotización ha sido generada con el desglose completo",
    });
  };

  const isFormValid = formData.origin && formData.destination && formData.date && formData.weight;
  const shouldShowMap = formData.origin && formData.destination;

  const handleDistanceCalculated = (distance: string, duration: string) => {
    setRouteInfo({ distance, duration });
    // Extraer número de km
    const kmMatch = distance.match(/[\d.]+/);
    if (kmMatch) {
      setDistanceKm(parseFloat(kmMatch[0]));
    }
  };

  return (
    <div className="space-y-6">
      {/* Información básica */}
      <Card className="border-border">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="h-5 w-5 text-flechandes-primary" />
            Información del Flete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin">Dirección de Origen (Retiro)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={originInputRef}
                  id="origin"
                  placeholder="¿Dónde retiramos?"
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  className="pl-10"
                />
              </div>
              {isOriginRemote && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Zona remota detectada
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="destination">Dirección de Destino (Entrega)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={destinationInputRef}
                  id="destination"
                  placeholder="¿Dónde entregamos?"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="pl-10"
                />
              </div>
              {isDestRemote && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Zona remota detectada
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Fecha de transporte</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="weight">Peso aproximado (kg)</Label>
              <div className="relative">
                <Scale className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="weight"
                  type="number"
                  placeholder="Ej: 50"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="pl-10"
                />
              </div>
              {weightKg > 100 && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Carga pesada: +${((weightKg - 100) * 50).toLocaleString('es-CL')} adicional
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="dimensions">Dimensiones (largo x ancho x alto en cm)</Label>
            <Input
              id="dimensions"
              placeholder="Ej: 100 x 80 x 60"
              value={formData.dimensions}
              onChange={(e) => handleInputChange('dimensions', e.target.value)}
            />
          </div>

          <div>
            <Label>Tipo de vehículo</Label>
            <VehicleSelector
              value={formData.vehicle}
              onValueChange={(value) => handleInputChange('vehicle', value)}
              serviceType="freight"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cargoType">Tipo de carga</Label>
              <Select value={formData.cargoType} onValueChange={(value) => handleInputChange('cargoType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fragile">
                    <span className="flex items-center gap-2">
                      📦 Frágil (+$8.000)
                    </span>
                  </SelectItem>
                  <SelectItem value="dangerous">
                    <span className="flex items-center gap-2">
                      ⚠️ Peligrosa (+$15.000)
                    </span>
                  </SelectItem>
                  <SelectItem value="electronics">
                    <span className="flex items-center gap-2">
                      🔌 Electrónicos (+$5.000)
                    </span>
                  </SelectItem>
                  <SelectItem value="furniture">Muebles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="urgency">Urgencia</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal (24-48 hrs)</SelectItem>
                  <SelectItem value="urgent">
                    <span className="flex items-center gap-2">
                      ⏰ Urgente (12-24 hrs) +40%
                    </span>
                  </SelectItem>
                  <SelectItem value="express">
                    <span className="flex items-center gap-2">
                      ⚡ Express (mismo día) +80%
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fricción Positiva - Acceso en destino */}
      <StairsAccessSelector
        hasElevator={destHasElevator}
        floors={destFloors}
        onElevatorChange={setDestHasElevator}
        onFloorsChange={setDestFloors}
        locationType="destination"
      />

      {/* Peonetas (opcional para fletes) */}
      <HelpersSelector
        helpersCount={helpersCount}
        onHelpersChange={setHelpersCount}
        recommendedHelpers={recommendedHelpers}
      />

      {/* Descripción adicional */}
      <Card className="border-border">
        <CardContent className="p-4">
          <Label htmlFor="description">Descripción de la carga (opcional)</Label>
          <Textarea
            id="description"
            placeholder="Describe tu carga y cualquier detalle importante: fragilidad, instrucciones de manejo..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="mt-2"
          />
        </CardContent>
      </Card>

      {/* Mapa con ruta */}
      {shouldShowMap && (
        <Card className="border-border overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-flechandes-primary" />
              Ruta del Flete
              {routeInfo && (
                <span className="ml-auto text-sm font-normal text-muted-foreground">
                  {routeInfo.distance} • {routeInfo.duration}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Map
              routeData={{
                origin: formData.origin,
                destination: formData.destination
              }}
              onDistanceCalculated={handleDistanceCalculated}
            />
          </CardContent>
        </Card>
      )}

      {/* Botón de calcular */}
      <Button
        onClick={calculateQuoteHandler}
        disabled={!isFormValid}
        className="w-full bg-flechandes-primary hover:bg-flechandes-primary/90 text-primary-foreground py-6 text-lg font-semibold"
        size="lg"
      >
        <Calculator className="h-5 w-5 mr-2" />
        Calcular Cotización
      </Button>

      {/* Resultado de cotización */}
      {quoteBreakdown && (
        <QuoteBreakdownCard
          breakdown={quoteBreakdown}
          vehicleName={VEHICLE_NAMES[formData.vehicle] || 'Vehículo'}
          distanceKm={distanceKm}
          durationMinutes={routeInfo ? parseInt(routeInfo.duration) : undefined}
          serviceType="freight"
        />
      )}
    </div>
  );
};

export default FreightQuoteForm;
