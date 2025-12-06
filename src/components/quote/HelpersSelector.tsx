import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Minus, Plus, Info } from 'lucide-react';
import { PRICING_CONFIG, formatCLP } from '@/lib/pricing';

interface HelpersSelectorProps {
  helpersCount: number;
  onHelpersChange: (count: number) => void;
  recommendedHelpers?: number;
}

const HelpersSelector: React.FC<HelpersSelectorProps> = ({
  helpersCount,
  onHelpersChange,
  recommendedHelpers = 1,
}) => {
  const helperCost = PRICING_CONFIG.labor_rates.helper_base;
  const totalCost = helpersCount * helperCost;

  const handleDecrement = () => {
    if (helpersCount > 0) {
      onHelpersChange(helpersCount - 1);
    }
  };

  const handleIncrement = () => {
    if (helpersCount < 5) {
      onHelpersChange(helpersCount + 1);
    }
  };

  return (
    <Card className="border-border">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-flechandes-secondary" />
          <Label className="text-base font-semibold">Peonetas / Ayudantes</Label>
        </div>

        <p className="text-sm text-muted-foreground">
          Personal adicional para carga y descarga. Recomendado: {recommendedHelpers} ayudante{recommendedHelpers > 1 ? 's' : ''}.
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleDecrement}
              disabled={helpersCount === 0}
              className="h-10 w-10"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <div className="text-center min-w-[80px]">
              <span className="text-3xl font-bold text-foreground">{helpersCount}</span>
              <p className="text-xs text-muted-foreground">
                {helpersCount === 0 ? 'Sin ayudantes' : helpersCount === 1 ? 'ayudante' : 'ayudantes'}
              </p>
            </div>
            
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleIncrement}
              disabled={helpersCount === 5}
              className="h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Costo adicional</p>
            <p className="text-xl font-bold text-flechandes-primary">
              {totalCost > 0 ? `+${formatCLP(totalCost)}` : 'Incluido'}
            </p>
          </div>
        </div>

        {helpersCount > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {Array.from({ length: helpersCount }, (_, i) => (
              <div 
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
              >
                <div className="w-8 h-8 rounded-full bg-flechandes-secondary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-flechandes-secondary">👤</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Peoneta {i + 1}</p>
                  <p className="text-xs text-muted-foreground">{formatCLP(helperCost)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {helpersCount === 0 && (
          <Alert className="border-amber-200 bg-amber-50">
            <Info className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 text-sm">
              Sin ayudantes, solo el conductor realizará la carga. Considera agregar peonetas para objetos pesados o mudanzas grandes.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default HelpersSelector;
