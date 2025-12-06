import React, { useState, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Home, Calendar, Calculator, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import VehicleSelector from '@/components/VehicleSelector';
import SpecialObjectsSelector from '@/components/quote/SpecialObjectsSelector';
import StairsAccessSelector from '@/components/quote/StairsAccessSelector';
import HelpersSelector from '@/components/quote/HelpersSelector';
import QuoteBreakdownCard from '@/components/quote/QuoteBreakdownCard';
import { useToast } from '@/hooks/use-toast';
import { useGoogleMapsAutocomplete } from '@/hooks/useGoogleMapsAutocomplete';
import Map from '@/components/Map';
import { 
  calculateQuote, 
  isRemoteZone, 
  SpecialObject, 
  QuoteBreakdown,
  SPECIAL_OBJECTS 
} from '@/lib/pricing';

const VEHICLE_NAMES: Record<string, string> = {
  'furgon': 'Furgón',
  'van': 'Camioneta',
  'small-truck': 'Camión Chico',
  'medium-truck': 'Camión Mediano',
  'large-truck': 'Camión Grande',
};

const MovingQuoteForm = () => {
  const { toast } = useToast();
  const originInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    rooms: '',
    vehicle: 'furgon',
    description: ''
  });

  // Fricción Positiva - Stairs Access
  const [originHasElevator, setOriginHasElevator] = useState<boolean | null>(null);
  const [originFloors, setOriginFloors] = useState(1);
  const [destHasElevator, setDestHasElevator] = useState<boolean | null>(null);
  const [destFloors, setDestFloors] = useState(1);

  // Peonetas
  const [helpersCount, setHelpersCount] = useState(1);

  // Objetos especiales
  const [specialObjects, setSpecialObjects] = useState<SpecialObject[]>(['none']);

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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Detectar zonas remotas
  const isOriginRemote = useMemo(() => isRemoteZone(formData.origin), [formData.origin]);
  const isDestRemote = useMemo(() => isRemoteZone(formData.destination), [formData.destination]);
  const isRemote = isOriginRemote || isDestRemote;

  // Calcular pisos totales
  const totalFloors = useMemo(() => {
    const originF = originHasElevator === false ? originFloors : 1;
    const destF = destHasElevator === false ? destFloors : 1;
    return Math.max(originF, destF);
  }, [originHasElevator, originFloors, destHasElevator, destFloors]);

  // Verificar si necesita cuadrilla especial
  const requiresSpecialCrew = useMemo(() => {
    return specialObjects.some(objId => {
      const obj = SPECIAL_OBJECTS.find(o => o.id === objId);
      return obj?.requiresSpecialCrew;
    });
  }, [specialObjects]);

  // Recomendar ayudantes basado en habitaciones y objetos
  const recommendedHelpers = useMemo(() => {
    let helpers = 1;
    if (formData.rooms === '3') helpers = 2;
    if (formData.rooms === '4') helpers = 2;
    if (formData.rooms === '5+') helpers = 3;
    if (requiresSpecialCrew) helpers = Math.max(helpers, 2);
    return helpers;
  }, [formData.rooms, requiresSpecialCrew]);

  const calculateQuoteHandler = () => {
    const breakdown = calculateQuote({
      vehicleType: formData.vehicle,
      distanceKm: distanceKm || 5,
      floors: totalFloors,
      hasElevator: originHasElevator !== false && destHasElevator !== false,
      helpersCount,
      specialObjects: specialObjects.filter(o => o !== 'none'),
      isRemoteZone: isRemote,
      urgency: 'normal',
      rooms: formData.rooms,
    });

    setQuoteBreakdown(breakdown);
    
    toast({
      title: "Cotización calculada",
      description: "Tu cotización ha sido generada con el desglose completo",
    });
  };

  const isFormValid = formData.origin && formData.destination && formData.date && formData.rooms;
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
            <Home className="h-5 w-5 text-flechandes-secondary" />
            Información de la Mudanza
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin">Dirección de Origen</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={originInputRef}
                  id="origin"
                  placeholder="¿Desde dónde mudas?"
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
              <Label htmlFor="destination">Dirección de Destino</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={destinationInputRef}
                  id="destination"
                  placeholder="¿A dónde te mudas?"
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
              <Label htmlFor="date">Fecha de mudanza</Label>
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
              <Label htmlFor="rooms">Número de habitaciones</Label>
              <Select value={formData.rooms} onValueChange={(value) => handleInputChange('rooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 habitación (estudio)</SelectItem>
                  <SelectItem value="2">2 habitaciones</SelectItem>
                  <SelectItem value="3">3 habitaciones</SelectItem>
                  <SelectItem value="4">4 habitaciones</SelectItem>
                  <SelectItem value="5+">5+ habitaciones</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Tipo de vehículo</Label>
            <VehicleSelector
              value={formData.vehicle}
              onValueChange={(value) => handleInputChange('vehicle', value)}
              serviceType="moving"
            />
          </div>
        </CardContent>
      </Card>

      {/* Fricción Positiva - Acceso */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StairsAccessSelector
          hasElevator={originHasElevator}
          floors={originFloors}
          onElevatorChange={setOriginHasElevator}
          onFloorsChange={setOriginFloors}
          locationType="origin"
        />
        <StairsAccessSelector
          hasElevator={destHasElevator}
          floors={destFloors}
          onElevatorChange={setDestHasElevator}
          onFloorsChange={setDestFloors}
          locationType="destination"
        />
      </div>

      {/* Objetos Especiales */}
      <Card className="border-border">
        <CardContent className="p-4">
          <SpecialObjectsSelector
            selectedObjects={specialObjects}
            onSelectionChange={setSpecialObjects}
          />
        </CardContent>
      </Card>

      {/* Peonetas */}
      <HelpersSelector
        helpersCount={helpersCount}
        onHelpersChange={setHelpersCount}
        recommendedHelpers={recommendedHelpers}
      />

      {/* Descripción adicional */}
      <Card className="border-border">
        <CardContent className="p-4">
          <Label htmlFor="description">Descripción adicional (opcional)</Label>
          <Textarea
            id="description"
            placeholder="Describe cualquier detalle importante: objetos frágiles, accesos especiales, horarios específicos..."
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
              <MapPin className="h-5 w-5 text-flechandes-secondary" />
              Ruta de la Mudanza
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
        className="w-full bg-flechandes-secondary hover:bg-flechandes-secondary/90 text-primary-foreground py-6 text-lg font-semibold"
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
          serviceType="moving"
        />
      )}
    </div>
  );
};

export default MovingQuoteForm;
