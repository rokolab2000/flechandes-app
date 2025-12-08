import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Package, 
  User, 
  Phone, 
  Truck,
  Users,
  Building,
  Piano,
  AlertTriangle,
  CheckCircle,
  X,
  MessageSquare
} from 'lucide-react';
import { TransporterService } from '@/hooks/useTransporterServices';
import { formatCLP } from '@/lib/pricing';

interface ServiceDetailModalProps {
  service: TransporterService | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onCounterOffer?: (id: string) => void;
}

const ServiceDetailModal = ({ 
  service, 
  isOpen, 
  onClose,
  onAccept,
  onReject,
  onCounterOffer
}: ServiceDetailModalProps) => {
  if (!service) return null;

  const { riskFactors } = service;

  // Status translations
  const statusTranslations: Record<string, string> = {
    'pending': 'Pendiente',
    'confirmed': 'Confirmado',
    'in-progress': 'En progreso',
    'completed': 'Completado',
  };

  // Vehicle type labels
  const vehicleLabels: Record<string, string> = {
    'furgon': 'Furgón',
    'camioneta': 'Camioneta',
    'camion_chico': 'Camión Chico',
    'camion_mediano': 'Camión Mediano',
    'camion_grande': 'Camión Grande'
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">{service.title}</DialogTitle>
            <Badge variant={service.type === 'moving' ? 'default' : 'secondary'}>
              {service.type === 'moving' ? 'Mudanza' : 'Flete'}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Net Earnings Highlight */}
          <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20">
            <div className="flex justify-between items-center">
              <span className="font-medium">Tu Ganancia Neta</span>
              <span className="text-3xl font-bold text-primary">{formatCLP(service.netEarnings)}</span>
            </div>
            <Separator className="my-3" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Precio total:</span>
                <span className="font-medium">{formatCLP(service.grossPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Comisión (15%):</span>
                <span className="font-medium text-muted-foreground">-{formatCLP(service.platformFee)}</span>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className={`h-5 w-5 ${risk.textColor}`} />
              <span className="font-medium">Evaluación de Riesgo/Esfuerzo</span>
              <Badge variant="outline" className={`${risk.color} text-white border-0 ml-auto`}>
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
                <Badge variant="secondary" className="gap-1 bg-amber-100 text-amber-800">
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

          {/* Route Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                Origen
              </h3>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                {service.origin}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                Destino
              </h3>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                {service.destination}
              </p>
            </div>
          </div>

          {/* Service Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Fecha</p>
              <p className="font-medium text-sm">{service.date}</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Hora</p>
              <p className="font-medium text-sm">{service.time}</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Truck className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Vehículo</p>
              <p className="font-medium text-sm">{vehicleLabels[service.vehicleType]}</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <MapPin className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Distancia</p>
              <p className="font-medium text-sm">{service.distance} km</p>
            </div>
          </div>

          {/* Crew Requirements */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Dotación Requerida</span>
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: riskFactors.helpersRequired }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    i < riskFactors.helpersPaid 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground border-2 border-dashed'
                  }`}
                >
                  {i === 0 ? '🚚' : '👤'}
                </div>
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                {riskFactors.helpersRequired} persona{riskFactors.helpersRequired !== 1 ? 's' : ''} 
                ({riskFactors.helpersPaid} pagada{riskFactors.helpersPaid !== 1 ? 's' : ''} por cliente)
              </span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Información del Cliente
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{service.clientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{service.clientPhone}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {service.notes && (
            <div>
              <h3 className="font-medium mb-2">Notas del Cliente</h3>
              <p className="text-sm text-muted-foreground bg-amber-50 border border-amber-200 p-3 rounded-md">
                ⚠️ {service.notes}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {service.status === 'pending' && onAccept && onReject && onCounterOffer && (
            <div className="flex gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  onReject(service.id);
                  onClose();
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Rechazar
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  onCounterOffer(service.id);
                  onClose();
                }}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contraofertar
              </Button>
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => {
                  onAccept(service.id);
                  onClose();
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Aceptar Trabajo
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
