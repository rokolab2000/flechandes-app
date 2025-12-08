import { useState, useEffect, useCallback } from 'react';
import { Clock, DollarSign, Play, Pause, RotateCcw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCLP } from '@/lib/pricing';

interface DetentionTimerProps {
  onFeeUpdate?: (fee: number, minutes: number) => void;
  freeMinutes?: number;
  blockPrice?: number;
  blockTimeMinutes?: number;
}

export const DetentionTimer = ({ 
  onFeeUpdate,
  freeMinutes = 10,
  blockPrice = 2500,
  blockTimeMinutes = 15
}: DetentionTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentFee, setCurrentFee] = useState(0);

  const calculateFee = useCallback((seconds: number) => {
    const totalMinutes = Math.floor(seconds / 60);
    if (totalMinutes <= freeMinutes) return 0;
    
    const chargeableMinutes = totalMinutes - freeMinutes;
    const blocks = Math.ceil(chargeableMinutes / blockTimeMinutes);
    return blocks * blockPrice;
  }, [freeMinutes, blockPrice, blockTimeMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => {
          const newSeconds = prev + 1;
          const fee = calculateFee(newSeconds);
          setCurrentFee(fee);
          onFeeUpdate?.(fee, Math.floor(newSeconds / 60));
          return newSeconds;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, calculateFee, onFeeUpdate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setCurrentFee(0);
    onFeeUpdate?.(0, 0);
  };

  const totalMinutes = Math.floor(elapsedSeconds / 60);
  const isCharging = totalMinutes > freeMinutes;
  const remainingFreeMinutes = Math.max(0, freeMinutes - totalMinutes);

  return (
    <Card className="p-4 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Cronómetro de Espera</h3>
        </div>
        {isCharging && (
          <Badge variant="destructive" className="animate-pulse">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Cobrando
          </Badge>
        )}
      </div>

      {/* Timer Display */}
      <div className="text-center mb-4">
        <div className={`text-5xl font-mono font-bold ${isCharging ? 'text-destructive' : 'text-foreground'}`}>
          {formatTime(elapsedSeconds)}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {isCharging 
            ? `Cobrando desde minuto ${freeMinutes + 1}`
            : `${remainingFreeMinutes} min gratis restantes`
          }
        </p>
      </div>

      {/* Fee Display */}
      <div className={`rounded-lg p-3 mb-4 ${isCharging ? 'bg-destructive/10 border border-destructive/20' : 'bg-muted'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className={`h-4 w-4 ${isCharging ? 'text-destructive' : 'text-muted-foreground'}`} />
            <span className="text-sm text-muted-foreground">Cargo por espera:</span>
          </div>
          <span className={`font-bold text-lg ${isCharging ? 'text-destructive' : 'text-foreground'}`}>
            {formatCLP(currentFee)}
          </span>
        </div>
      </div>

      {/* Rules Info */}
      <div className="bg-muted/50 rounded-lg p-3 mb-4 text-xs text-muted-foreground">
        <p className="flex items-center gap-1 mb-1">
          <span className="font-medium">Regla:</span> 
          Primeros {freeMinutes} min gratis
        </p>
        <p className="flex items-center gap-1">
          <span className="font-medium">Después:</span> 
          {formatCLP(blockPrice)} cada {blockTimeMinutes} min
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {!isRunning ? (
          <Button 
            onClick={handleStart} 
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            <Play className="h-4 w-4 mr-2" />
            {elapsedSeconds === 0 ? 'Iniciar' : 'Continuar'}
          </Button>
        ) : (
          <Button 
            onClick={handlePause} 
            variant="secondary"
            className="flex-1"
          >
            <Pause className="h-4 w-4 mr-2" />
            Pausar
          </Button>
        )}
        <Button 
          onClick={handleReset} 
          variant="outline"
          disabled={elapsedSeconds === 0}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
