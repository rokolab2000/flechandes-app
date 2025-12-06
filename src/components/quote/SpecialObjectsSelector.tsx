import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
import { SPECIAL_OBJECTS, SpecialObject, formatCLP } from '@/lib/pricing';

interface SpecialObjectsSelectorProps {
  selectedObjects: SpecialObject[];
  onSelectionChange: (objects: SpecialObject[]) => void;
}

const SpecialObjectsSelector: React.FC<SpecialObjectsSelectorProps> = ({
  selectedObjects,
  onSelectionChange,
}) => {
  const handleToggle = (objectId: SpecialObject) => {
    if (objectId === 'none') {
      onSelectionChange(['none']);
      return;
    }

    const newSelection = selectedObjects.filter(id => id !== 'none');
    
    if (newSelection.includes(objectId)) {
      const filtered = newSelection.filter(id => id !== objectId);
      onSelectionChange(filtered.length > 0 ? filtered : ['none']);
    } else {
      onSelectionChange([...newSelection, objectId]);
    }
  };

  const selectedSpecialObjects = SPECIAL_OBJECTS.filter(
    obj => selectedObjects.includes(obj.id) && obj.id !== 'none'
  );

  const hasSpecialCrew = selectedSpecialObjects.some(obj => obj.requiresSpecialCrew);
  const totalSurcharge = selectedSpecialObjects.reduce((sum, obj) => sum + obj.surcharge, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <Label className="text-base font-semibold">Objetos Especiales (Peso/Dificultad)</Label>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Declara objetos pesados o delicados para asegurar el personal y equipo adecuado.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SPECIAL_OBJECTS.filter(obj => obj.id !== 'none').map((obj) => (
          <Card 
            key={obj.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedObjects.includes(obj.id)
                ? 'border-flechandes-primary bg-flechandes-primary/5 ring-1 ring-flechandes-primary'
                : 'border-border hover:border-muted-foreground/30'
            }`}
            onClick={() => handleToggle(obj.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedObjects.includes(obj.id)}
                  onCheckedChange={() => handleToggle(obj.id)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{obj.emoji}</span>
                    <span className="font-medium text-sm">{obj.name}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {obj.requiresSpecialCrew ? 'Requiere equipo especial' : 'Cuidado adicional'}
                    </span>
                    <span className="text-xs font-semibold text-flechandes-primary">
                      +{formatCLP(obj.surcharge)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSpecialObjects.length > 0 && (
        <div className="space-y-3">
          {hasSpecialCrew && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Cuadrilla especializada requerida.</strong> Se asignará personal con experiencia en objetos pesados.
              </AlertDescription>
            </Alert>
          )}

          <Alert className="border-flechandes-secondary/30 bg-flechandes-secondary/5">
            <Info className="h-4 w-4 text-flechandes-secondary" />
            <AlertDescription className="text-foreground">
              <div className="flex items-center justify-between">
                <span>Recargo por objetos especiales:</span>
                <span className="font-bold text-flechandes-primary">{formatCLP(totalSurcharge)}</span>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default SpecialObjectsSelector;
