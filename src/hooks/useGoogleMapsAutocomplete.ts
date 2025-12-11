import { useEffect, useRef, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader } from '@googlemaps/js-api-loader';

interface UseGoogleMapsAutocompleteOptions {
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  countryRestriction?: string;
  types?: string[];
}

// Global state to track Google Maps loading
let googleMapsPromise: Promise<void> | null = null;
let googleMapsApiKey: string | null = null;

const loadGoogleMapsApi = async (): Promise<void> => {
  // If already loaded, return immediately
  if (window.google?.maps?.places) {
    return Promise.resolve();
  }

  // If currently loading, wait for existing promise
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  // Start loading
  googleMapsPromise = (async () => {
    try {
      // Get API key from Supabase if not cached
      if (!googleMapsApiKey) {
        console.log('🗺️ Obteniendo API key de Google Maps...');
        const { data, error } = await supabase.functions.invoke('get-google-maps-token');
        
        if (error) {
          console.error('❌ Error obteniendo token:', error);
          throw new Error('No se pudo obtener el token de Google Maps');
        }
        
        if (!data?.token) {
          throw new Error('Token de Google Maps no disponible');
        }
        
        googleMapsApiKey = data.token;
        console.log('✅ API key obtenida');
      }

      // Load Google Maps API
      const loader = new Loader({
        apiKey: googleMapsApiKey,
        version: 'weekly',
        libraries: ['places'],
      });

      await loader.load();
      console.log('✅ Google Maps API cargada');
    } catch (error) {
      googleMapsPromise = null; // Reset so we can retry
      throw error;
    }
  })();

  return googleMapsPromise;
};

export const useGoogleMapsAutocomplete = (
  inputRef: React.RefObject<HTMLInputElement>,
  options: UseGoogleMapsAutocompleteOptions = {}
) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listenerRef = useRef<google.maps.MapsEventListener | null>(null);

  const initializeAutocomplete = useCallback(async () => {
    if (!inputRef.current) {
      return;
    }

    // Clean up previous instance
    if (listenerRef.current) {
      google.maps.event.removeListener(listenerRef.current);
      listenerRef.current = null;
    }
    
    if (autocompleteRef.current) {
      google.maps.event.clearInstanceListeners(autocompleteRef.current);
      autocompleteRef.current = null;
    }

    try {
      await loadGoogleMapsApi();

      if (!inputRef.current || !window.google?.maps?.places) {
        return;
      }

      // Create autocomplete instance
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        types: options.types || ['address'],
        componentRestrictions: options.countryRestriction 
          ? { country: options.countryRestriction } 
          : { country: 'cl' }, // Default to Chile
        fields: ['formatted_address', 'geometry', 'name', 'place_id'],
      });

      // Add listener for place selection
      listenerRef.current = autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && options.onPlaceSelected) {
          options.onPlaceSelected(place);
        }
      });

      setIsReady(true);
      setError(null);
    } catch (err) {
      console.error('❌ Error inicializando autocompletado:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setIsReady(false);
    }
  }, [inputRef, options.onPlaceSelected, options.countryRestriction, options.types]);

  useEffect(() => {
    initializeAutocomplete();

    return () => {
      if (listenerRef.current) {
        google.maps.event.removeListener(listenerRef.current);
      }
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [initializeAutocomplete]);

  return { autocomplete: autocompleteRef.current, isReady, error };
};

// Export function to preload Google Maps API
export const preloadGoogleMaps = () => {
  loadGoogleMapsApi().catch(console.error);
};
