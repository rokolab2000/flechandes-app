import { 
  MapPin, 
  Clock, 
  Calendar,
  Truck,
  Users,
  AlertTriangle,
  Piano,
  Package,
  Building,
  CheckCircle,
  X,
  MessageSquare,
  Eye,
  Map
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TransporterService } from '@/hooks/useTransporterServices';
import { formatCLP } from '@/lib/pricing';

interface SmartOfferCardProps {
  service: TransporterService;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onCounterOffer: (id: string) => void;
  onViewDetails: (service: TransporterService) => void;
  onViewMap: (service: TransporterService) => void;
}

const SmartOfferCard = ({ 
  service, 
  onAccept, 
  onReject, 
  onCounterOffer,
  onViewDetails,
  onViewMap
}: SmartOfferCardProps) => {
  const { riskFactors } = service;
  
  // Calculate risk level
  const getRiskLevel = () => {
    let riskScore = 0;
    if (riskFactors.hasHeavyObjects) riskScore += 3;
    if (riskFactors.heavyObjectType === 'piano') riskScore += 2;
    if (riskFactors.heavyObjectType === 'safe') riskScore += 3;
    if (!riskFactors.hasElevator && riskFactors.floors > 2) riskScore += riskFactors.floors - 2;
    if (riskFactors.hasFragileItems) riskScore += 1;
    
    if (riskScore >= 6) return { level: 'alto', color: 'bg-red-500', textColor: 'text-red-700' };
    if (riskScore >= 3) return { level: 'medio', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    return { level: 'bajo', color: 'bg-green-500', textColor: 'text-green-700' };
  };

  const risk = getRiskLevel();

  // Vehicle type labels
  const vehicleLabels: Record<string, string> = {
    'furgon': 'Furgón',
    'camioneta': 'Camioneta',
    'camion_chico': 'Camión Chico',
    'camion_mediano': 'Camión Mediano',
    'camion_grande': 'Camión Grande'
  };

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      {/* Header with Net Earnings */}
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{service.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4" />
              <span>{service.date}</span>
              <Clock className="h-4 w-4 ml-2" />
              <span>{service.time}</span>
            </div>
          </div>
          <Badge variant={service.type === 'moving' ? 'default' : 'secondary'}>
            {service.type === 'moving' ? 'Mudanza' : 'Flete'}
          </Badge>
        </div>
        
        {/* Net Earnings Highlight */}
        <div className="mt-4 p-3 bg-background rounded-lg border-2 border-primary/20">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Tu Ganancia Neta</span>
            <span className="text-2xl font-bold text-primary">{formatCLP(service.netEarnings)}</span>
          </div>
          <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
            <span>Precio total: {formatCLP(service.grossPrice)}</span>
            <span>Comisión plataforma: {formatCLP(service.platformFee)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Route Info */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <span className="text-sm line-clamp-1">{service.origin}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
            <span className="text-sm line-clamp-1">{service.destination}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pl-6">
            <span>{service.distance} km</span>
            <span>•</span>
            <span>{vehicleLabels[service.vehicleType] || service.vehicleType}</span>
          </div>
        </div>

        <Separator />

        {/* Risk Tags */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className={`h-4 w-4 ${risk.textColor}`} />
            <span className="text-sm font-medium">Nivel de Esfuerzo: </span>
            <Badge variant="outline" className={`${risk.color} text-white border-0`}>
              {risk.level.toUpperCase()}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {riskFactors.hasHeavyObjects && riskFactors.heavyObjectType === 'piano' && (
              <Badge variant="destructive" className="gap-1">
                <Piano className="h-3 w-3" />
                PIANO
              </Badge>
            )}
            {riskFactors.hasHeavyObjects && riskFactors.heavyObjectType === 'safe' && (
              <Badge variant="destructive" className="gap-1">
                <Package className="h-3 w-3" />
                CAJA FUERTE
              </Badge>
            )}
            {riskFactors.hasFragileItems && (
              <Badge variant="secondary" className="gap-1 bg-amber-100 text-amber-800 hover:bg-amber-200">
                <Package className="h-3 w-3" />
                FRÁGIL
              </Badge>
            )}
            {!riskFactors.hasElevator && riskFactors.floors > 1 && (
              <Badge variant="outline" className="gap-1 bg-orange-100 text-orange-800 border-orange-300">
                <Building className="h-3 w-3" />
                {riskFactors.floors} PISOS S/ASCENSOR
              </Badge>
            )}
            {riskFactors.hasElevator && (
              <Badge variant="outline" className="gap-1 bg-green-100 text-green-800 border-green-300">
                <Building className="h-3 w-3" />
                CON ASCENSOR
              </Badge>
            )}
          </div>
        </div>

        <Separator />

        {/* Crew Required */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Dotación Requerida</span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: riskFactors.helpersRequired }).map((_, i) => (
              <div 
                key={i} 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  i < riskFactors.helpersPaid 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground border border-dashed'
                }`}
              >
                {i + 1}
              </div>
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              ({riskFactors.helpersPaid} pagado{riskFactors.helpersPaid !== 1 ? 's' : ''})
            </span>
          </div>
        </div>

        {/* Vehicle Required */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Vehículo</span>
          </div>
          <Badge variant="outline">{vehicleLabels[service.vehicleType]}</Badge>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 bg-muted/30 pt-4">
        {/* Quick Actions */}
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(service)}
          >
            <Eye className="h-4 w-4 mr-1" />
            Detalles
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewMap(service)}
          >
            <Map className="h-4 w-4 mr-1" />
            Ver Mapa
          </Button>
        </div>
        
        {/* Main Actions */}
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onReject(service.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            onClick={() => onCounterOffer(service.id)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Contraofertar
          </Button>
          <Button 
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => onAccept(service.id)}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Aceptar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SmartOfferCard;
