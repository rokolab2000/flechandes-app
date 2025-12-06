import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building2, AlertTriangle, CheckCircle } from 'lucide-react';
import { PRICING_CONFIG, formatCLP } from '@/lib/pricing';

interface StairsAccessSelectorProps {
  hasElevator: boolean | null;
  floors: number;
  onElevatorChange: (hasElevator: boolean) => void;
  onFloorsChange: (floors: number) => void;
  locationType: 'origin' | 'destination' | 'both';
}

const StairsAccessSelector: React.FC<StairsAccessSelectorProps> = ({
  hasElevator,
  floors,
  onElevatorChange,
  onFloorsChange,
  locationType,
}) => {
  const showStairsWarning = hasElevator === false && floors > 1;
  const stairsSurcharge = showStairsWarning ? (floors - 1) * PRICING_CONFIG.labor_rates.stairs_surcharge : 0;
  
  const locationLabel = locationType === 'origin' 
    ? 'en origen' 
    : locationType === 'destination' 
    ? 'en destino' 
    : '';

  return (
    <Card className="border-border">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-flechandes-secondary" />
          <Label className="text-base font-semibold">
            Acceso al Inmueble {locationLabel}
          </Label>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">
              ¿Hay ascensor disponible y cabe la carga?
            </Label>
            <RadioGroup
              value={hasElevator === null ? '' : hasElevator ? 'yes' : 'no'}
              onValueChange={(value) => onElevatorChange(value === 'yes')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`elevator-yes-${locationType}`} />
                <Label 
                  htmlFor={`elevator-yes-${locationType}`} 
                  className="cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Sí, hay ascensor
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`elevator-no-${locationType}`} />
                <Label 
                  htmlFor={`elevator-no-${locationType}`}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  No / No cabe
                </Label>
              </div>
            </RadioGroup>
          </div>

          {hasElevator === false && (
            <div className="space-y-2">
              <Label htmlFor={`floors-${locationType}`} className="text-sm text-muted-foreground">
                ¿En qué piso está el inmueble?
              </Label>
              <Select
                value={floors.toString()}
                onValueChange={(value) => onFloorsChange(parseInt(value))}
              >
                <SelectTrigger id={`floors-${locationType}`} className="w-full">
                  <SelectValue placeholder="Selecciona el piso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Planta baja (Piso 1)</SelectItem>
                  <SelectItem value="2">Piso 2</SelectItem>
                  <SelectItem value="3">Piso 3</SelectItem>
                  <SelectItem value="4">Piso 4</SelectItem>
                  <SelectItem value="5">Piso 5</SelectItem>
                  <SelectItem value="6">Piso 6 o superior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {showStairsWarning && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <div className="space-y-1">
                  <p className="font-medium">
                    Recargo por escaleras: +{formatCLP(stairsSurcharge)}
                  </p>
                  <p className="text-sm">
                    Este monto compensa el esfuerzo físico adicional del equipo de carga ({floors - 1} piso{floors > 2 ? 's' : ''} por escalera).
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {hasElevator === true && (
            <Alert className="border-secondary/30 bg-secondary/5">
              <CheckCircle className="h-4 w-4 text-secondary" />
              <AlertDescription className="text-foreground">
                Excelente, el ascensor facilita la operación. Sin recargo adicional.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StairsAccessSelector;
