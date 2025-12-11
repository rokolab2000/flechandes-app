import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPin, Clock, Package, User, Phone, Mail, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type SmartOfferService } from './SmartOfferCard';
import { generateRiskTags, calculateQuote, type QuoteInput, formatCLP, type VehicleType } from '@/lib/pricingEngine';

interface ServiceDetailModalProps {
  service: SmartOfferService | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailModal = ({ service, isOpen, onClose }: ServiceDetailModalProps) => {
  if (!service) return null;

  // Calculate quote and risk tags
  const quoteInput: QuoteInput = {
    vehicleType: service.vehicleType,
    distanceKm: service.distance,
    specialObjects: service.specialObjects,
    originAccess: { hasElevator: service.hasElevator, floor: service.floor },
    destinationAccess: { hasElevator: true, floor: 1 },
    helpersCount: service.helpers,
    isRemoteZone: service.isRemoteZone,
    isB2B: false
  };

  const quote = calculateQuote(quoteInput);
  const riskTags = generateRiskTags(quoteInput);
  const netEarnings = Math.round(quote.total * 0.80);

  // Status translations
  const statusTranslations = {
    'pending': 'Pendiente',
    'confirmed': 'Confirmado',
    'in-progress': 'En progreso',
    'completed': 'Completado',
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{service.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-5">
          {/* Service Type, Vehicle and Status */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{typeTranslations[service.type]}</Badge>
              <Badge variant="secondary">{vehicleTranslations[service.vehicleType]}</Badge>
            </div>
            <Badge variant="outline">
              {statusTranslations[service.status]}
            </Badge>
          </div>

          {/* Risk Tags */}
          {riskTags.length > 0 && (
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Etiquetas de Riesgo / Esfuerzo
              </h3>
              <div className="flex flex-wrap gap-2">
                {riskTags.map((tag) => (
                  <Badge 
                    key={tag.id}
                    className={`text-sm ${
                      tag.severity === 'high' ? 'bg-red-100 text-red-700' :
                      tag.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {tag.icon} {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Net Earnings Card */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-green-700">Tu Ganancia Neta Estimada</p>
                <p className="text-xs text-green-600">(después de comisión plataforma)</p>
              </div>
              <span className="text-3xl font-bold text-green-600">
                {formatCLP(netEarnings)}
              </span>
            </div>
            {service.helpers > 0 && (
              <div className="mt-2 pt-2 border-t border-green-200">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Users className="h-4 w-4" />
                  <span>Ganancia peoneta: {formatCLP(Math.round(quote.helperEarnings / service.helpers))} c/u</span>
                </div>
              </div>
            )}
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
              {!service.hasElevator && service.floor > 1 && (
                <p className="text-xs text-amber-600 mt-1">
                  ⚠️ Piso {service.floor} sin ascensor
                </p>
              )}
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

          {/* Date, Time, Distance */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-1 flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4" />
                Fecha
              </h3>
              <p className="text-sm text-muted-foreground">{service.date}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1 flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                Hora
              </h3>
              <p className="text-sm text-muted-foreground">{service.time}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1 flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4" />
                Distancia
              </h3>
              <p className="text-sm text-muted-foreground">{service.distance} km</p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div>
            <h3 className="font-medium mb-2">Desglose del Precio</h3>
            <div className="bg-muted rounded-lg p-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Base vehículo</span>
                <span>{formatCLP(quote.baseVehicle)}</span>
              </div>
              {quote.distanceCharge > 0 && (
                <div className="flex justify-between">
                  <span>Distancia extra</span>
                  <span>{formatCLP(quote.distanceCharge)}</span>
                </div>
              )}
              {quote.remoteZoneCharge > 0 && (
                <div className="flex justify-between text-amber-600">
                  <span>Zona remota</span>
                  <span>{formatCLP(quote.remoteZoneCharge)}</span>
                </div>
              )}
              {quote.stairsOrigin > 0 && (
                <div className="flex justify-between text-amber-600">
                  <span>Escaleras origen</span>
                  <span>{formatCLP(quote.stairsOrigin)}</span>
                </div>
              )}
              {quote.helpersCharge > 0 && (
                <div className="flex justify-between">
                  <span>Peonetas ({service.helpers})</span>
                  <span>{formatCLP(quote.helpersCharge)}</span>
                </div>
              )}
              {quote.specialObjectsCharge > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Objetos especiales</span>
                  <span>{formatCLP(quote.specialObjectsCharge)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total cliente</span>
                <span>{formatCLP(quote.total)}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="font-medium mb-3">Información del Cliente</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Ana García Martínez</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+56 9 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>ana.garcia@email.com</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cerrar
            </Button>
            <Button variant="destructive" className="flex-1">
              Rechazar
            </Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              Aceptar Trabajo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;