import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Minus, Plus, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HelpersSelectorProps {
  value: number;
  onChange: (count: number) => void;
  maxHelpers?: number;
}

const HelpersSelector = ({ value, onChange, maxHelpers = 4 }: HelpersSelectorProps) => {
  const helperCost = 15000;
  const totalCost = value * helperCost;

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-semibold">Ayudantes Adicionales</Label>
      </div>

      <p className="text-xs text-muted-foreground">
        Agrega ayudantes (peonetas) para cargas pesadas o mudanzas grandes
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={() => onChange(Math.max(0, value - 1))}
            disabled={value === 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <div className="text-center min-w-[60px]">
            <span className="text-2xl font-bold">{value}</span>
            <p className="text-xs text-muted-foreground">
              {value === 1 ? 'ayudante' : 'ayudantes'}
            </p>
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={() => onChange(Math.min(maxHelpers, value + 1))}
            disabled={value >= maxHelpers}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {value > 0 && (
          <div className="text-right">
            <p className="text-lg font-semibold text-primary">
              +${totalCost.toLocaleString('es-CL')}
            </p>
            <p className="text-xs text-muted-foreground">
              ${helperCost.toLocaleString('es-CL')} c/u
            </p>
          </div>
        )}
      </div>

      {value > 0 && (
        <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-primary">
              <strong>{value} ayudante{value > 1 ? 's' : ''}</strong> incluido{value > 1 ? 's' : ''} en el servicio
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Los ayudantes reciben el 80% de este cargo por su trabajo
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-muted rounded text-center">
          <p className="font-medium">1-2 ayudantes</p>
          <p className="text-muted-foreground">Mudanza pequeña</p>
        </div>
        <div className="p-2 bg-muted rounded text-center">
          <p className="font-medium">3-4 ayudantes</p>
          <p className="text-muted-foreground">Mudanza grande</p>
        </div>
      </div>
    </Card>
  );
};

export default HelpersSelector;
