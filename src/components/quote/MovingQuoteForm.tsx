import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Home, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import VehicleSelector from '@/components/VehicleSelector';
import { useToast } from '@/hooks/use-toast';
import { useGoogleMapsAutocomplete } from '@/hooks/useGoogleMapsAutocomplete';
import Map from '@/components/Map';
import SpecialObjectsSelector from './SpecialObjectsSelector';
import AccessSelector from './AccessSelector';
import HelpersSelector from './HelpersSelector';
import QuoteBreakdownCard from './QuoteBreakdownCard';
import { 
  calculateQuote, 
  generateRiskTags, 
  QuoteBreakdown, 
  RiskTag,
  VehicleType,
  SpecialObject,
  AccessInfo,
  QuoteInput
} from '@/lib/pricingEngine';

const MovingQuoteForm = () => {
  const { toast } = useToast();
  const originInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    rooms: '',
    vehicle: 'furgon' as VehicleType,
    description: ''
  });
  
  // Friction positive fields
  const [specialObjects, setSpecialObjects] = useState<SpecialObject[]>([]);
  const [originAccess, setOriginAccess] = useState<AccessInfo>({ hasElevator: true, floor: 1 });
  const [destinationAccess, setDestinationAccess] = useState<AccessInfo>({ hasElevator: true, floor: 1 });
  const [helpersCount, setHelpersCount] = useState(0);
  
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [quoteResult, setQuoteResult] = useState<{ breakdown: QuoteBreakdown; riskTags: RiskTag[] } | null>(null);
  const [routeInfo, setRouteInfo] = useState<{distance: string, duration: string} | null>(null);

  // Vehicle type mapping
  const vehicleMap: Record<string, VehicleType> = {
    'furgon': 'furgon',
    'van': 'camioneta',
    'small-truck': 'camion_chico',
    'medium-truck': 'camion_mediano',
    'large-truck': 'camion_grande'
  };

  // Configure autocomplete for origin
  const { isReady: originReady } = useGoogleMapsAutocomplete(originInputRef, {
    countryRestriction: 'cl',
    onPlaceSelected: (place) => {
      if (place.formatted_address) {
        setFormData(prev => ({ ...prev, origin: place.formatted_address || '' }));
      }
    }
  });

  // Configure autocomplete for destination
  const { isReady: destReady } = useGoogleMapsAutocomplete(destinationInputRef, {
    countryRestriction: 'cl',
    onPlaceSelected: (place) => {
      if (place.formatted_address) {
        setFormData(prev => ({ ...prev, destination: place.formatted_address || '' }));
      }
    }
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateQuoteHandler = () => {
    const input: QuoteInput = {
      vehicleType: vehicleMap[formData.vehicle] || 'furgon',
      distanceKm: distanceKm,
      isRemoteZone: false, // TODO: Detect from geocoding
      originAccess,
      destinationAccess,
      helpersCount,
      specialObjects,
      isB2B: false
    };

    const breakdown = calculateQuote(input);
    const riskTags = generateRiskTags(input);
    
    setQuoteResult({ breakdown, riskTags });
    
    toast({
      title: "Cotización calculada",
      description: `Total estimado: $${breakdown.total.toLocaleString('es-CL')} CLP`,
    });
  };

  const handleDistanceCalculated = (distance: string, duration: string) => {
    setRouteInfo({ distance, duration });
    // Extract km from distance string (e.g., "15.3 km" -> 15.3)
    const kmMatch = distance.match(/[\d.]+/);
    if (kmMatch) {
      setDistanceKm(parseFloat(kmMatch[0]));
    }
  };

  const isFormValid = formData.origin && formData.destination && formData.date && formData.rooms;
  const shouldShowMap = formData.origin && formData.destination;
  
  // Check if high-risk items are selected
  const hasHighRisk = specialObjects.includes('piano') || specialObjects.includes('safe');
  const hasStairsIssue = (!originAccess.hasElevator && originAccess.floor >= 3) || 
                         (!destinationAccess.hasElevator && destinationAccess.floor >= 3);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Información de la Mudanza
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin">Origen</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={originInputRef}
                  id="origin"
                  placeholder="Dirección de origen"
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="destination">Destino</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={destinationInputRef}
                  id="destination"
                  placeholder="Dirección de destino"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Date and rooms */}
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
                  <SelectItem value="1">1 habitación</SelectItem>
                  <SelectItem value="2">2 habitaciones</SelectItem>
                  <SelectItem value="3">3 habitaciones</SelectItem>
                  <SelectItem value="4">4 habitaciones</SelectItem>
                  <SelectItem value="5+">5+ habitaciones</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vehicle selector */}
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

      {/* Positive Friction Section */}
      <Card className="border-2 border-dashed border-amber-300 bg-amber-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Detalles Importantes
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Esta información nos ayuda a calcular un precio justo y preparar al equipo
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Special Objects Selector */}
          <SpecialObjectsSelector 
            selected={specialObjects}
            onChange={setSpecialObjects}
          />

          {/* Access Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AccessSelector
              label="Acceso en Origen"
              value={originAccess}
              onChange={setOriginAccess}
            />
            <AccessSelector
              label="Acceso en Destino"
              value={destinationAccess}
              onChange={setDestinationAccess}
            />
          </div>

          {/* Helpers Selector */}
          <HelpersSelector
            value={helpersCount}
            onChange={setHelpersCount}
          />
        </CardContent>
      </Card>

      {/* Additional description */}
      <Card>
        <CardContent className="pt-6">
          <Label htmlFor="description">Descripción adicional (opcional)</Label>
          <Textarea
            id="description"
            placeholder="Describe cualquier detalle importante sobre tu mudanza..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="mt-2"
          />
        </CardContent>
      </Card>

      {/* Map with route */}
      {shouldShowMap && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Ruta de la Mudanza
              {routeInfo && (
                <span className="text-sm font-normal text-muted-foreground ml-auto">
                  {routeInfo.distance} • {routeInfo.duration}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
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

      {/* Calculate button */}
      <Button
        onClick={calculateQuoteHandler}
        disabled={!isFormValid}
        className="w-full py-6 text-lg"
        size="lg"
      >
        <DollarSign className="h-5 w-5 mr-2" />
        Calcular Cotización
      </Button>

      {/* Quote Result */}
      {quoteResult && (
        <QuoteBreakdownCard
          breakdown={quoteResult.breakdown}
          riskTags={quoteResult.riskTags}
          serviceType="moving"
        />
      )}
    </div>
  );
};

export default MovingQuoteForm;
