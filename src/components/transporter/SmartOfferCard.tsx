import { MapPin, CalendarIcon, Clock, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { generateRiskTags, calculateQuote, type QuoteInput, type VehicleType, type SpecialObject } from '@/lib/pricingEngine';

export interface SmartOfferService {
  id: string;
  title: string;
  type: 'moving' | 'freight';
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
  price: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  // New fields for smart offer
  vehicleType: VehicleType;
  distance: number;
  specialObjects: SpecialObject[];
  hasElevator: boolean;
  floor: number;
  helpers: number;
  isRemoteZone: boolean;
}

interface SmartOfferCardProps {
  service: SmartOfferService;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onViewMap: (service: SmartOfferService) => void;
  onViewDetails: (service: SmartOfferService) => void;
  className?: string;
}

const SmartOfferCard = ({
  service,
  onAccept,
  onReject,
  onViewMap,
  onViewDetails,
  className
}: SmartOfferCardProps) => {
  // Calculate quote and risk tags
  const quoteInput: QuoteInput = {
    vehicleType: service.vehicleType,
    distanceKm: service.distance,
    specialObjects: service.specialObjects,
    originAccess: { hasElevator: service.hasElevator, floor: service.floor },
    destinationAccess: { hasElevator: true, floor: 1 }, // Default destination
    helpersCount: service.helpers,
    isRemoteZone: service.isRemoteZone,
    isB2B: false
  };

  const quote = calculateQuote(quoteInput);
  const riskTags = generateRiskTags(quoteInput);

  // Calculate net earnings (approx 80% of total after platform fee)
  const netEarnings = Math.round(quote.total * 0.80);
  const helperEarnings = quote.helpersCharge > 0 
    ? Math.round(quote.helpersCharge / service.helpers * 0.90) 
    : 0;

  // Type translations
  const typeTranslations = {
    'moving': 'Mudanza',
    'freight': 'Flete'
  };

  // Vehicle translations
  const vehicleTranslations: Record<VehicleType, string> = {
    'furgon': 'Furgón',
    'camioneta': 'Camioneta',
    'camion_chico': 'Camión Chico',
    'camion_mediano': 'Camión Mediano',
    'camion_grande': 'Camión Grande'
  };

  // Risk level based on tags
  const riskLevel = riskTags.length === 0 ? 'low' : riskTags.length <= 2 ? 'medium' : 'high';
  const riskColors = {
    low: 'border-green-200 bg-green-50/50',
    medium: 'border-yellow-200 bg-yellow-50/50',
    high: 'border-red-200 bg-red-50/50'
  };

  return (
    <div 
      className={cn(
        'rounded-xl border-2 p-4 transition-all duration-300 hover:shadow-lg',
        riskColors[riskLevel],
        className
      )}
    >
      {/* Header with title and type */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground">{service.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs">
              {typeTranslations[service.type]}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {vehicleTranslations[service.vehicleType]}
            </Badge>
          </div>
        </div>
        
        {/* Net Earnings - Main highlight */}
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Ganancia Neta</p>
          <p className="text-2xl font-bold text-green-600">
            ${netEarnings.toLocaleString('es-CL')}
          </p>
        </div>
      </div>

      {/* Risk Tags */}
      {riskTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {riskTags.map((tag) => (
            <Badge 
              key={tag.id} 
              variant="destructive" 
              className={cn(
                "text-xs font-medium",
                tag.severity === 'high' && "bg-red-100 text-red-700 hover:bg-red-100",
                tag.severity === 'medium' && "bg-amber-100 text-amber-700 hover:bg-amber-100",
                tag.severity === 'low' && "bg-blue-100 text-blue-700 hover:bg-blue-100"
              )}
            >
              {tag.icon} {tag.label}
            </Badge>
          ))}
        </div>
      )}

      {/* Route Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
          <span className="text-muted-foreground truncate">{service.origin}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
          <span className="text-muted-foreground truncate">{service.destination}</span>
        </div>
      </div>

      {/* Date, Time, Distance */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>{service.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{service.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>{service.distance} km</span>
        </div>
      </div>

      {/* Crew Requirements */}
      {service.helpers > 0 && (
        <div className="flex items-center justify-between bg-blue-50 rounded-lg p-2 mb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Peoneta x{service.helpers} requerido
            </span>
          </div>
          <span className="text-sm font-semibold text-blue-600">
            +${helperEarnings.toLocaleString('es-CL')} c/u
          </span>
        </div>
      )}

      {/* Warning if high risk */}
      {riskLevel === 'high' && (
        <div className="flex items-center gap-2 bg-amber-50 rounded-lg p-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span className="text-xs text-amber-700">
            Servicio con esfuerzo físico elevado. Verifica equipamiento.
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onViewDetails(service)}
        >
          Detalles
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onViewMap(service)}
        >
          Ver Mapa
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => onReject(service.id)}
        >
          Rechazar
        </Button>
        <Button 
          size="sm"
          className="bg-green-600 hover:bg-green-700"
          onClick={() => onAccept(service.id)}
        >
          Aceptar
        </Button>
      </div>
    </div>
  );
};

export default SmartOfferCard;
