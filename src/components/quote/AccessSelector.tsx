import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Building, ArrowUpFromLine, AlertCircle } from 'lucide-react';
import { AccessInfo } from '@/lib/pricingEngine';
import { cn } from '@/lib/utils';

interface AccessSelectorProps {
  label: string;
  value: AccessInfo;
  onChange: (value: AccessInfo) => void;
}

const AccessSelector = ({ label, value, onChange }: AccessSelectorProps) => {
  const showStairsWarning = !value.hasElevator && value.floor >= 3;
  const stairsSurcharge = !value.hasElevator && value.floor > 1 
    ? (value.floor - 1) * 5000 
    : 0;

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Building className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-semibold">{label}</Label>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm">¿Hay ascensor disponible?</Label>
            <p className="text-xs text-muted-foreground">
              {value.hasElevator 
                ? 'Ascensor disponible y cabe la carga'
                : 'Sin ascensor o no cabe la carga'
              }
            </p>
          </div>
          <Switch
            checked={value.hasElevator}
            onCheckedChange={(checked) => onChange({ ...value, hasElevator: checked })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Piso</Label>
          <Select 
            value={value.floor.toString()} 
            onValueChange={(v) => onChange({ ...value, floor: parseInt(v) })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Planta baja / Piso 1</SelectItem>
              <SelectItem value="2">Piso 2</SelectItem>
              <SelectItem value="3">Piso 3</SelectItem>
              <SelectItem value="4">Piso 4</SelectItem>
              <SelectItem value="5">Piso 5</SelectItem>
              <SelectItem value="6">Piso 6+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!value.hasElevator && value.floor > 1 && (
          <div className={cn(
            'flex items-start gap-2 p-3 rounded-lg',
            showStairsWarning 
              ? 'bg-destructive/10 border border-destructive/20'
              : 'bg-amber-50 border border-amber-200'
          )}>
            <ArrowUpFromLine className={cn(
              'h-4 w-4 flex-shrink-0 mt-0.5',
              showStairsWarning ? 'text-destructive' : 'text-amber-600'
            )} />
            <div>
              <p className={cn(
                'text-sm font-medium',
                showStairsWarning ? 'text-destructive' : 'text-amber-700'
              )}>
                {value.floor - 1} piso{value.floor > 2 ? 's' : ''} por escalera
              </p>
              <p className={cn(
                'text-xs',
                showStairsWarning ? 'text-destructive/80' : 'text-amber-600'
              )}>
                Cargo adicional: +${stairsSurcharge.toLocaleString('es-CL')}
              </p>
            </div>
          </div>
        )}

        {showStairsWarning && (
          <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
            <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Servicios en pisos altos sin ascensor requieren mayor esfuerzo físico. 
              El cargo adicional compensa el trabajo extra del equipo.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AccessSelector;
