import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

interface SearchControlsProps {
  origin: string;
  destination: string;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onSearch: () => void;
  originInputRef: React.RefObject<HTMLInputElement>;
  destinationInputRef: React.RefObject<HTMLInputElement>;
}

const SearchControls: React.FC<SearchControlsProps> = ({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  onSearch,
  originInputRef,
  destinationInputRef,
}) => {
  return (
    <div className="absolute top-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
          <Input
            ref={originInputRef}
            placeholder="Origen"
            value={origin}
            onChange={(e) => onOriginChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
          <Input
            ref={destinationInputRef}
            placeholder="Destino"
            value={destination}
            onChange={(e) => onDestinationChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onSearch} className="w-full">
          <Search className="w-4 h-4 mr-2" />
          Buscar Ruta
        </Button>
      </div>
    </div>
  );
};

export default SearchControls;
