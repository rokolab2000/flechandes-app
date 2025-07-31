import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface MapProps {
  isCustomer?: boolean;
  showSearchBox?: boolean;
  routeData?: {
    origin: string;
    destination: string;
    showVehicleTracking?: boolean;
  };
}

interface Marker {
  id: string;
  type: 'customer' | 'transporter';
  position: google.maps.LatLngLiteral;
}

const Map: React.FC<MapProps> = ({ 
  isCustomer = false, 
  showSearchBox = false, 
  routeData 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);
  const vehicleMarker = useRef<google.maps.Marker | null>(null);
  
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [googleMapsToken, setGoogleMapsToken] = useState<string | null>(null);

  // Obtener el token de Google Maps desde Supabase
  useEffect(() => {
    const getGoogleMapsToken = async () => {
      try {
        console.log('🗺️ Intentando obtener token de Google Maps...');
        const { data, error } = await supabase.functions.invoke('get-google-maps-token');
        if (error) {
          console.error('❌ Error obteniendo token de Google Maps:', error);
        } else {
          console.log('✅ Token de Google Maps obtenido exitosamente');
          setGoogleMapsToken(data.token);
        }
      } catch (error) {
        console.error('❌ Error:', error);
      }
    };
    
    getGoogleMapsToken();
  }, []);

  // Datos simulados de ubicaciones
  const markers: Marker[] = [
    { id: '1', type: 'customer', position: { lat: -34.6037, lng: -58.3816 } }, // Buenos Aires
    { id: '2', type: 'transporter', position: { lat: -34.6158, lng: -58.3960 } },
    { id: '3', type: 'customer', position: { lat: -34.5875, lng: -58.3974 } },
    { id: '4', type: 'transporter', position: { lat: -34.6092, lng: -58.3732 } },
  ];

  // Simular geocodificación
  const geocodeAddress = async (address: string): Promise<google.maps.LatLngLiteral> => {
    // En una implementación real, usarías el servicio de geocodificación de Google Maps
    const geocoder = new google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          // Fallback a coordenadas por defecto
          if (address.toLowerCase().includes('buenos aires')) {
            resolve({ lat: -34.6037, lng: -58.3816 });
          } else if (address.toLowerCase().includes('córdoba')) {
            resolve({ lat: -31.4201, lng: -64.1888 });
          } else {
            resolve({ lat: -34.6037, lng: -58.3816 });
          }
        }
      });
    });
  };

  // Animar vehículo
  const animateVehicle = (startPos: google.maps.LatLngLiteral, endPos: google.maps.LatLngLiteral) => {
    if (!mapInstance.current) return;

    // Crear marcador de vehículo si no existe
    if (!vehicleMarker.current) {
      vehicleMarker.current = new google.maps.Marker({
        position: startPos,
        map: mapInstance.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#46A358',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        title: 'Vehículo en tránsito',
      });
    }

    // Animación simple del vehículo
    let progress = 0;
    const animate = () => {
      progress += 0.01;
      if (progress <= 1) {
        const lat = startPos.lat + (endPos.lat - startPos.lat) * progress;
        const lng = startPos.lng + (endPos.lng - startPos.lng) * progress;
        vehicleMarker.current?.setPosition({ lat, lng });
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  // Dibujar ruta
  const drawRoute = async (originPos: google.maps.LatLngLiteral, destPos: google.maps.LatLngLiteral) => {
    if (!mapInstance.current || !directionsService.current || !directionsRenderer.current) return;

    const request: google.maps.DirectionsRequest = {
      origin: originPos,
      destination: destPos,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.current.route(request, (result, status) => {
      if (status === 'OK' && result) {
        directionsRenderer.current?.setDirections(result);
        
        // Si se debe mostrar seguimiento del vehículo, animar
        if (routeData?.showVehicleTracking) {
          setTimeout(() => {
            animateVehicle(originPos, destPos);
          }, 1000);
        }
      }
    });
  };

  // Inicializar mapa
  useEffect(() => {
    if (!mapRef.current || !googleMapsToken) {
      console.log('🗺️ Esperando elemento del mapa y token...', { mapRef: !!mapRef.current, token: !!googleMapsToken });
      return;
    }

    const initMap = async () => {
      try {
        console.log('🗺️ Inicializando Google Maps...');
        const loader = new Loader({
          apiKey: googleMapsToken,
          version: 'weekly',
          libraries: ['places'],
        });

        await loader.load();
        console.log('✅ Google Maps API cargada exitosamente');

        // Crear mapa
        mapInstance.current = new google.maps.Map(mapRef.current!, {
          center: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
          zoom: 12,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        // Inicializar servicios de direcciones
        directionsService.current = new google.maps.DirectionsService();
        directionsRenderer.current = new google.maps.DirectionsRenderer({
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#DB2851',
            strokeWeight: 5,
          },
        });
        directionsRenderer.current.setMap(mapInstance.current);

        // Agregar marcadores iniciales
        markers.forEach((marker) => {
          new google.maps.Marker({
            position: marker.position,
            map: mapInstance.current,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: marker.type === 'customer' ? '#009EE2' : '#DB2851',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
            title: marker.type === 'customer' ? 'Cliente' : 'Transportista',
          });
        });

        // Obtener ubicación actual del usuario
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            
            new google.maps.Marker({
              position: userLocation,
              map: mapInstance.current,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#009EE2',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3,
              },
              title: 'Tu ubicación',
            });
          });
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error inicializando Google Maps:', error);
        setIsLoading(false);
      }
    };

    initMap();
  }, [googleMapsToken]);

  // Manejar cambios en routeData
  useEffect(() => {
    if (routeData && mapInstance.current) {
      const handleRouteDisplay = async () => {
        try {
          const originCoords = await geocodeAddress(routeData.origin);
          const destCoords = await geocodeAddress(routeData.destination);
          
          drawRoute(originCoords, destCoords);
        } catch (error) {
          console.error('Error mostrando ruta:', error);
        }
      };

      setOrigin(routeData.origin);
      setDestination(routeData.destination);
      handleRouteDisplay();
    }
  }, [routeData]);

  // Búsqueda manual
  const handleSearch = async () => {
    if (!origin || !destination) return;

    try {
      const originCoords = await geocodeAddress(origin);
      const destCoords = await geocodeAddress(destination);
      
      drawRoute(originCoords, destCoords);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      
      {showSearchBox && (
        <div className="absolute top-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Origen"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Destino"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Buscar Ruta
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;