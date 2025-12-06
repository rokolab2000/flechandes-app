import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DollarSign, 
  Truck, 
  MapPin, 
  Building2, 
  Users, 
  Package, 
  Clock,
  Shield,
  ArrowRight,
  Info
} from 'lucide-react';
import { QuoteBreakdown, formatCLP } from '@/lib/pricing';
import { useNavigate } from 'react-router-dom';

interface QuoteBreakdownCardProps {
  breakdown: QuoteBreakdown;
  vehicleName: string;
  distanceKm?: number;
  durationMinutes?: number;
  serviceType: 'moving' | 'freight';
}

const QuoteBreakdownCard: React.FC<QuoteBreakdownCardProps> = ({
  breakdown,
  vehicleName,
  distanceKm,
  durationMinutes,
  serviceType,
}) => {
  const navigate = useNavigate();

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}min` : ''}`;
  };

  return (
    <Card className="border-2 border-flechandes-primary/30 bg-gradient-to-br from-flechandes-primary/5 to-flechandes-secondary/5 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <DollarSign className="h-6 w-6 text-flechandes-primary" />
            Tu Cotización
          </CardTitle>
          <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
            IVA Incluido
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Risk Tags */}
        {breakdown.riskTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {breakdown.riskTags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="text-xs py-1 px-2 bg-amber-50 border-amber-200 text-amber-800"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Route Info */}
        {(distanceKm || durationMinutes) && (
          <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
            <MapPin className="h-5 w-5 text-flechandes-secondary" />
            <div className="flex-1">
              <p className="text-sm font-medium">Ruta estimada</p>
              <p className="text-xs text-muted-foreground">
                {distanceKm && `${distanceKm.toFixed(1)} km`}
                {distanceKm && durationMinutes && ' • '}
                {durationMinutes && formatDuration(durationMinutes)}
              </p>
            </div>
          </div>
        )}

        {/* Crew Required */}
        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
          <Users className="h-5 w-5 text-flechandes-secondary" />
          <div className="flex-1">
            <p className="text-sm font-medium">Equipo asignado</p>
            <p className="text-xs text-muted-foreground">
              {breakdown.crewRequired} persona{breakdown.crewRequired > 1 ? 's' : ''} (Conductor + {breakdown.crewRequired - 1} ayudante{breakdown.crewRequired > 2 ? 's' : ''})
            </p>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Truck className="h-4 w-4" />
              Base ({vehicleName})
            </span>
            <span className="font-medium">{formatCLP(breakdown.basePrice)}</span>
          </div>

          {breakdown.distanceSurcharge > 0 && (
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Distancia extra
              </span>
              <span className="font-medium">+{formatCLP(breakdown.distanceSurcharge)}</span>
            </div>
          )}

          {breakdown.stairsSurcharge > 0 && (
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                Escaleras
              </span>
              <span className="font-medium text-amber-600">+{formatCLP(breakdown.stairsSurcharge)}</span>
            </div>
          )}

          {breakdown.helpersCost > 0 && (
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                Peonetas
              </span>
              <span className="font-medium">+{formatCLP(breakdown.helpersCost)}</span>
            </div>
          )}

          {breakdown.specialObjectsSurcharge > 0 && (
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" />
                Objetos especiales
              </span>
              <span className="font-medium text-amber-600">+{formatCLP(breakdown.specialObjectsSurcharge)}</span>
            </div>
          )}

          {breakdown.remoteZoneSurcharge > 0 && (
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Zona remota
              </span>
              <span className="font-medium">+{formatCLP(breakdown.remoteZoneSurcharge)}</span>
            </div>
          )}

          {breakdown.urgencySurcharge > 0 && (
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                Urgencia
              </span>
              <span className="font-medium text-amber-600">+{formatCLP(breakdown.urgencySurcharge)}</span>
            </div>
          )}

          {breakdown.cargoTypeSurcharge > 0 && (
            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" />
                Tipo de carga
              </span>
              <span className="font-medium">+{formatCLP(breakdown.cargoTypeSurcharge)}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatCLP(breakdown.subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">IVA (19%)</span>
            <span className="font-medium">{formatCLP(breakdown.iva)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center py-2">
          <span className="text-lg font-semibold">Total a Pagar</span>
          <span className="text-3xl font-bold text-flechandes-primary">
            {formatCLP(breakdown.total)}
          </span>
        </div>

        {/* Insurance Note */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/10 text-sm">
          <Shield className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-secondary-foreground">Seguro incluido</p>
            <p className="text-xs text-muted-foreground">
              Póliza RMX hasta 500 UF. Declaración de valor mayor activa prima adicional.
            </p>
          </div>
        </div>

        {/* Detention Fee Info */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm">
          <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">
              <strong>Tiempo de espera:</strong> Primeros 10 min gratis. Después, $2.500 cada 15 min.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          className="w-full bg-flechandes-primary hover:bg-flechandes-primary/90 text-primary-foreground py-6 text-lg font-semibold"
          onClick={() => navigate('/customer/new-service', { 
            state: { serviceType, step: 1 } 
          })}
        >
          Solicitar Servicio
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Precio cerrado. Sin sorpresas al momento de la entrega.
        </p>
      </CardContent>
    </Card>
  );
};

export default QuoteBreakdownCard;
