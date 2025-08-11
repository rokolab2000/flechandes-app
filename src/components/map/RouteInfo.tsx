import React from 'react';

interface RouteInfoProps {
  distance: string;
  duration: string;
}

const RouteInfo: React.FC<RouteInfoProps> = ({ distance, duration }) => {
  if (!distance || !duration) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Distancia</p>
            <p className="font-semibold text-lg text-[#009EE2]">{distance}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Tiempo estimado</p>
            <p className="font-semibold text-lg text-[#009EE2]">{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;
