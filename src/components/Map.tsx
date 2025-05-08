
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

// Temporalmente usamos un token público de Mapbox actualizado
// En producción, este token debería estar en variables de entorno
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS10ZW1wIiwiYSI6ImNsdHZxMGFnbTAxM28yanA5YXUwc3ZhY3YifQ.vdS7oJeJ9cKT9WT_J-94Tg';

interface MapProps {
  isCustomer?: boolean;
  showSearchBox?: boolean;
  routeData?: { origin: string; destination: string } | null;
}

interface Marker {
  id: string;
  type: 'customer' | 'transporter';
  coordinates: [number, number];
}

const Map = ({ isCustomer = true, showSearchBox = true, routeData = null }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [origin, setOrigin] = useState(routeData?.origin || '');
  const [destination, setDestination] = useState(routeData?.destination || '');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [routeDisplayed, setRouteDisplayed] = useState(false);
  
  // Datos simulados de ubicaciones
  const markers: Marker[] = [
    { id: '1', type: 'customer', coordinates: [-3.703790, 40.416775] }, // Madrid
    { id: '2', type: 'transporter', coordinates: [-3.690880, 40.410637] }, // Cerca de Madrid
    { id: '3', type: 'transporter', coordinates: [-3.712124, 40.423852] }  // Otro cerca de Madrid
  ];

  // Simulated geocoding function (in a real app, you'd use Mapbox's geocoding API)
  const geocodeAddress = async (address: string): Promise<[number, number]> => {
    // For demo purposes, return fixed coordinates based on address
    if (address.toLowerCase().includes('madrid')) {
      return [-3.703790, 40.416775];
    } else if (address.toLowerCase().includes('barcelona')) {
      return [2.1734, 41.3851];
    } else if (address.toLowerCase().includes('valencia')) {
      return [-0.3773, 39.4699];
    } else {
      // Default to Madrid with slight offset for demo
      const randomOffset = Math.random() * 0.05 - 0.025;
      return [-3.703790 + randomOffset, 40.416775 + randomOffset];
    }
  };

  // Draw a route between two points
  const drawRoute = async (originCoords: [number, number], destCoords: [number, number]) => {
    if (!map.current) return;

    try {
      // In a real app, you would use the Mapbox Directions API
      // Here we're creating a simple line for demonstration
      
      // Create a GeoJSON source with the route
      const routeSource = {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [originCoords, destCoords]
          }
        }
      };

      // Add the source to the map
      if (map.current.getSource('route')) {
        // @ts-ignore
        map.current.getSource('route').setData(routeSource.data);
      } else {
        map.current.addSource('route', routeSource as any);
        
        // Add a layer showing the route
        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#009EE2',
            'line-width': 4,
            'line-opacity': 0.8
          }
        });
      }

      // Add markers for origin and destination
      new mapboxgl.Marker({ color: '#DB2851' })
        .setLngLat(originCoords)
        .addTo(map.current);

      new mapboxgl.Marker({ color: '#009EE2' })
        .setLngLat(destCoords)
        .addTo(map.current);

      // Add driver marker (simulated)
      new mapboxgl.Marker({ color: '#46A358' })
        .setLngLat([
          originCoords[0] - (Math.random() * 0.01),
          originCoords[1] - (Math.random() * 0.01)
        ])
        .addTo(map.current);

      // Fit the map to show the route
      const bounds = new mapboxgl.LngLatBounds()
        .extend(originCoords)
        .extend(destCoords);
      
      map.current.fitBounds(bounds, {
        padding: 100,
        duration: 1000
      });

      setRouteDisplayed(true);
    } catch (err) {
      console.error('Error drawing route:', err);
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;
    
    console.log('Iniciando mapa con token:', mapboxgl.accessToken);

    // Inicializar mapa con manejo de errores
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-3.703790, 40.416775], // Madrid como punto de inicio
        zoom: 13
      });

      // Verificar si el mapa se carga correctamente
      map.current.on('load', () => {
        console.log('Mapa cargado correctamente');
        setMapLoaded(true);
        
        // Añadir marcadores simulados después de que el mapa se cargue
        markers.forEach(marker => {
          if (map.current && (isCustomer || marker.type === 'customer')) {
            const color = marker.type === 'customer' ? '#009EE2' : '#DB2851';
            new mapboxgl.Marker({ color })
              .setLngLat(marker.coordinates)
              .addTo(map.current);
          }
        });

        // Check if we need to show a route
        if (routeData && routeData.origin && routeData.destination) {
          handleRouteDisplay();
        }
      });

      // Añadir controles de navegación
      map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
      
      // Solicitar geolocalización del usuario
      if (navigator.geolocation) {
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
      }
    } catch (err) {
      console.error('Error al inicializar el mapa:', err);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [isCustomer]);

  // Handle drawing the route when routeData changes
  const handleRouteDisplay = async () => {
    if (!routeData || !routeData.origin || !routeData.destination || routeDisplayed) return;
    
    try {
      const originCoords = await geocodeAddress(routeData.origin);
      const destCoords = await geocodeAddress(routeData.destination);
      
      if (map.current && map.current.loaded()) {
        drawRoute(originCoords, destCoords);
      } else if (map.current) {
        map.current.on('load', () => {
          drawRoute(originCoords, destCoords);
        });
      }
    } catch (err) {
      console.error('Error displaying route:', err);
    }
  };

  // When there's new route data, update the state and trigger route display
  useEffect(() => {
    if (routeData && routeData.origin && routeData.destination) {
      setOrigin(routeData.origin);
      setDestination(routeData.destination);
      setRouteDisplayed(false);
      handleRouteDisplay();
    }
  }, [routeData]);

  const handleSearch = async () => {
    if (!origin || !destination) return;
    
    console.log('Buscando ruta de:', origin, 'a:', destination);
    
    try {
      const originCoords = await geocodeAddress(origin);
      const destCoords = await geocodeAddress(destination);
      drawRoute(originCoords, destCoords);
    } catch (err) {
      console.error('Error en búsqueda:', err);
    }
  };

  return (
    <div className="w-full h-full relative">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10 rounded-lg">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-700">Cargando mapa...</p>
          </div>
        </div>
      )}
      
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      
      {showSearchBox && (
        <div className="absolute top-4 left-0 right-0 mx-auto w-full max-w-md px-4 z-20">
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
