
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

// Temporalmente usamos un token público de Mapbox
// En producción, este token debería estar en variables de entorno
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS10ZW1wIiwiYSI6ImNsdHZxMGFnbTAxM28yanBoY2cwczd4Y2YifQ.4-TQzkrH3i2nFo48L-HzWw';

interface MapProps {
  isCustomer?: boolean;
  showSearchBox?: boolean;
}

interface Marker {
  id: string;
  type: 'customer' | 'transporter';
  coordinates: [number, number];
}

const Map = ({ isCustomer = true, showSearchBox = true }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  
  // Datos simulados de ubicaciones
  const markers: Marker[] = [
    { id: '1', type: 'customer', coordinates: [-3.703790, 40.416775] }, // Madrid
    { id: '2', type: 'transporter', coordinates: [-3.690880, 40.410637] }, // Cerca de Madrid
    { id: '3', type: 'transporter', coordinates: [-3.712124, 40.423852] }  // Otro cerca de Madrid
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    // Inicializar mapa
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-3.703790, 40.416775], // Madrid como punto de inicio
      zoom: 13
    });

    // Añadir controles de navegación
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    
    // Solicitar geolocalización del usuario
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (map.current) {
          const { longitude, latitude } = position.coords;
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            essential: true
          });

          // Añadir marcador del usuario
          new mapboxgl.Marker({ color: '#009EE2' })
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        }
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
      }
    );

    // Añadir marcadores simulados
    markers.forEach(marker => {
      if (map.current) {
        // Solo mostrar transportistas si es el dashboard del cliente
        if (isCustomer || marker.type === 'customer') {
          const color = marker.type === 'customer' ? '#009EE2' : '#DB2851';
          new mapboxgl.Marker({ color })
            .setLngLat(marker.coordinates)
            .addTo(map.current);
        }
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [isCustomer]);

  const handleSearch = () => {
    console.log('Buscando ruta de:', origin, 'a:', destination);
    // Aquí iría la lógica para geocodificar y mostrar la ruta
  };

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      
      {showSearchBox && (
        <div className="absolute top-4 left-0 right-0 mx-auto w-full max-w-md px-4">
          <div className="bg-white rounded-lg shadow-lg p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Origen" 
                className="pl-10"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
              <div className="absolute right-3 top-2.5">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Destino" 
                className="pl-10"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <div className="absolute right-3 top-2.5">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <Button 
              onClick={handleSearch}
              className="w-full bg-move-blue-500 hover:bg-move-blue-600"
            >
              Buscar transportistas
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
