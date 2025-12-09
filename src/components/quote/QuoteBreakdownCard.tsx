import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Truck, MapPin, ArrowUpFromLine, Users, Package, 
  AlertTriangle, CheckCircle, Receipt, ArrowRight 
} from 'lucide-react';
import { QuoteBreakdown, RiskTag, formatCLP } from '@/lib/pricingEngine';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface QuoteBreakdownCardProps {
  breakdown: QuoteBreakdown;
  riskTags: RiskTag[];
  serviceType: 'moving' | 'freight';
}

const QuoteBreakdownCard = ({ breakdown, riskTags, serviceType }: QuoteBreakdownCardProps) => {
  const navigate = useNavigate();
  
  const hasHighRisk = riskTags.some(tag => tag.severity === 'high');
  const hasMediumRisk = riskTags.some(tag => tag.severity === 'medium');

  const lineItems = [
    { label: 'Tarifa base vehículo', value: breakdown.baseVehicle, icon: Truck },
    breakdown.distanceCharge > 0 && { 
      label: 'Cargo por distancia', 
      value: breakdown.distanceCharge, 
      icon: MapPin 
    },
    breakdown.remoteZoneCharge > 0 && { 
      label: 'Zona remota', 
      value: breakdown.remoteZoneCharge, 
      icon: MapPin 
    },
    breakdown.stairsOrigin > 0 && { 
      label: 'Escaleras origen', 
      value: breakdown.stairsOrigin, 
      icon: ArrowUpFromLine,
      highlight: true
    },
    breakdown.stairsDestination > 0 && { 
      label: 'Escaleras destino', 
      value: breakdown.stairsDestination, 
      icon: ArrowUpFromLine,
      highlight: true
    },
    breakdown.helpersCharge > 0 && { 
      label: 'Ayudantes', 
      value: breakdown.helpersCharge, 
      icon: Users,
      highlight: true
    },
    breakdown.specialObjectsCharge > 0 && { 
      label: 'Objetos especiales', 
      value: breakdown.specialObjectsCharge, 
      icon: Package,
      highlight: true
    },
  ].filter(Boolean) as Array<{ label: string; value: number; icon: React.ElementType; highlight?: boolean }>;

  return (
    <Card className={cn(
      'overflow-hidden border-2',
      hasHighRisk 
        ? 'border-destructive/50' 
        : hasMediumRisk 
        ? 'border-amber-500/50' 
        : 'border-primary/50'
    )}>
      <CardHeader className={cn(
        'pb-4',
        hasHighRisk 
          ? 'bg-gradient-to-r from-destructive/10 to-destructive/5' 
          : hasMediumRisk 
          ? 'bg-gradient-to-r from-amber-100 to-amber-50' 
          : 'bg-gradient-to-r from-primary/10 to-primary/5'
      )}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Receipt className="h-5 w-5" />
            Tu Cotización
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            IVA Incluido
          </Badge>
        </div>

        {/* Risk Tags */}
        {riskTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {riskTags.map(tag => (
              <Badge 
                key={tag.id}
                variant="secondary"
                className={cn(
                  'text-xs font-semibold',
                  tag.severity === 'high' 
                    ? 'bg-destructive/20 text-destructive border-destructive/30' 
                    : tag.severity === 'medium'
                    ? 'bg-amber-100 text-amber-700 border-amber-300'
                    : 'bg-primary/10 text-primary border-primary/30'
                )}
              >
                <span className="mr-1">{tag.icon}</span>
                {tag.label}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Line Items */}
        <div className="space-y-2">
          {lineItems.map((item, index) => (
            <div 
              key={index}
              className={cn(
                'flex items-center justify-between py-2 px-3 rounded-lg',
                item.highlight ? 'bg-muted' : ''
              )}
            >
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{item.label}</span>
              </div>
              <span className={cn(
                'text-sm font-medium',
                item.highlight ? 'text-amber-600' : ''
              )}>
                {formatCLP(item.value)}
              </span>
            </div>
          ))}
        </div>

        {/* B2B Discount */}
        {breakdown.b2bDiscount > 0 && (
          <>
            <Separator />
            <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
              <span className="text-sm text-green-700">Descuento B2B</span>
              <span className="text-sm font-medium text-green-700">
                -{formatCLP(breakdown.b2bDiscount)}
              </span>
            </div>
          </>
        )}

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-lg font-bold">Total</p>
            <p className="text-xs text-muted-foreground">
              IVA incluido: {formatCLP(breakdown.ivaIncluded)}
            </p>
          </div>
          <p className={cn(
            'text-3xl font-bold',
            hasHighRisk ? 'text-destructive' : 'text-primary'
          )}>
            {formatCLP(breakdown.total)}
          </p>
        </div>

        {/* Helper Earnings Info */}
        {breakdown.helperEarnings > 0 && (
          <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <Users className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium text-primary">
                Ganancia del equipo: {formatCLP(breakdown.helperEarnings)}
              </p>
              <p className="text-muted-foreground">
                Los cargos por escaleras van directamente al equipo de trabajo
              </p>
            </div>
          </div>
        )}

        {/* Warning for High Risk */}
        {hasHighRisk && (
          <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-xs text-destructive">
              Este servicio requiere equipo especializado. El transportista confirmará 
              la disponibilidad antes de aceptar.
            </p>
          </div>
        )}

        {/* CTA Button */}
        <Button 
          className="w-full gap-2"
          size="lg"
          onClick={() => navigate('/customer/new-service', { 
            state: { serviceType, step: 1 } 
          })}
        >
          <CheckCircle className="h-5 w-5" />
          Solicitar Servicio
          <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Esta es una estimación. El precio final puede variar según las condiciones reales.
        </p>
      </CardContent>
    </Card>
  );
};

export default QuoteBreakdownCard;
