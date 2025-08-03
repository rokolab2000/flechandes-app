import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseGoogleMapsAutocompleteOptions {
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  countryRestriction?: string;
  types?: string[];
}

export const useGoogleMapsAutocomplete = (
  inputRef: React.RefObject<HTMLInputElement>,
  options: UseGoogleMapsAutocompleteOptions = {}
) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!inputRef.current || isInitialized.current) return;

    const initializeAutocomplete = async () => {
      try {
        // Obtener token de Google Maps
        const { data, error } = await supabase.functions.invoke('get-google-maps-token');
        if (error) {
          console.error('❌ Error obteniendo token de Google Maps:', error);
          return;
        }

        // Cargar Google Maps API si no está cargada
        if (!window.google) {
          const { Loader } = await import('@googlemaps/js-api-loader');
          const loader = new Loader({
            apiKey: data.token,
            version: 'weekly',
            libraries: ['places'],
          });
          await loader.load();
        }

        // Crear autocompletado
        if (inputRef.current && window.google) {
          autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
            types: options.types || ['address'],
            componentRestrictions: options.countryRestriction 
              ? { country: options.countryRestriction } 
              : { country: 'ar' },
          });

          // Agregar listener para cambios
          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace();
            if (place && options.onPlaceSelected) {
              options.onPlaceSelected(place);
            }
          });

          isInitialized.current = true;
        }
      } catch (error) {
        console.error('❌ Error inicializando autocompletado:', error);
      }
    };

    initializeAutocomplete();

    // Cleanup
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
      isInitialized.current = false;
    };
  }, [inputRef, options.onPlaceSelected, options.countryRestriction, options.types]);

  return autocompleteRef.current;
};