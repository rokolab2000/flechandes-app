import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Piano, Shield, Package, Refrigerator } from 'lucide-react';
import { SpecialObject } from '@/lib/pricingEngine';
import { cn } from '@/lib/utils';

interface SpecialObjectsSelectorProps {
  selected: SpecialObject[];
  onChange: (objects: SpecialObject[]) => void;
}

const specialObjects = [
  {
    id: 'piano' as SpecialObject,
    label: 'Piano / Objeto Muy Pesado',
    description: 'Requiere cuadrilla especializada',
    icon: Piano,
    surcharge: '+$100.000',
    severity: 'high' as const,
  },
  {
    id: 'safe' as SpecialObject,
    label: 'Caja Fuerte',
    description: 'Objeto extremadamente pesado',
    icon: Shield,
    surcharge: '+$80.000',
    severity: 'high' as const,
  },
  {
    id: 'appliances_large' as SpecialObject,
    label: 'Electrodomésticos Grandes',
    description: 'Refrigerador, lavadora, etc.',
    icon: Refrigerator,
    surcharge: '+$15.000',
    severity: 'medium' as const,
  },
  {
    id: 'fragile' as SpecialObject,
    label: 'Objetos Frágiles',
    description: 'Requiere cuidado especial',
    icon: Package,
    surcharge: '+$10.000',
    severity: 'low' as const,
  },
];

const SpecialObjectsSelector = ({ selected, onChange }: SpecialObjectsSelectorProps) => {
  const handleToggle = (objectId: SpecialObject) => {
    if (selected.includes(objectId)) {
      onChange(selected.filter(id => id !== objectId));
    } else {
      onChange([...selected, objectId]);
    }
  };

  const hasHighSeverity = selected.some(id => 
    specialObjects.find(obj => obj.id === id)?.severity === 'high'
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Label className="text-base font-semibold">Objetos Especiales</Label>
        <span className="text-sm text-muted-foreground">(Opcional)</span>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Declara objetos que requieran cuidado especial o esfuerzo adicional
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {specialObjects.map((obj) => {
          const isSelected = selected.includes(obj.id);
          const Icon = obj.icon;
          
          return (
            <Card
              key={obj.id}
              className={cn(
                'p-4 cursor-pointer transition-all border-2',
                isSelected 
                  ? obj.severity === 'high'
                    ? 'border-destructive bg-destructive/5'
                    : obj.severity === 'medium'
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-primary bg-primary/5'
                  : 'border-border hover:border-muted-foreground/50'
              )}
              onClick={() => handleToggle(obj.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={isSelected}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={cn(
                      'h-4 w-4',
                      obj.severity === 'high' ? 'text-destructive' :
                      obj.severity === 'medium' ? 'text-amber-600' : 'text-primary'
                    )} />
                    <span className="font-medium text-sm">{obj.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{obj.description}</p>
                  <span className={cn(
                    'inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded',
                    obj.severity === 'high' ? 'bg-destructive/10 text-destructive' :
                    obj.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-primary/10 text-primary'
                  )}>
                    {obj.surcharge}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {hasHighSeverity && (
        <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-destructive">
              Se requiere cuadrilla especializada
            </p>
            <p className="text-xs text-destructive/80">
              Los objetos pesados requieren personal adicional y equipamiento especial
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialObjectsSelector;
