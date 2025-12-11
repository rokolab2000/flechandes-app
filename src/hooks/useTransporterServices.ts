import { useState } from 'react';
import type { SmartOfferService } from '@/components/transporter/SmartOfferCard';

export function useTransporterServices() {
  // Datos de ejemplo para servicios con información de riesgo
  const [availableServices] = useState<SmartOfferService[]>([
    {
      id: '1',
      title: 'Mudanza Departamento 3 Pisos',
      type: 'moving',
      status: 'pending',
      price: 85000,
      origin: 'Av. Providencia 1234, Providencia',
      destination: 'Los Leones 567, Providencia',
      date: '20 Dic, 2024',
      time: '10:00 AM',
      vehicleType: 'camion_chico',
      distance: 8,
      specialObjects: ['piano'],
      hasElevator: false,
      floor: 4,
      helpers: 2,
      isRemoteZone: false
    },
    {
      id: '2',
      title: 'Flete Muebles IKEA',
      type: 'freight',
      status: 'pending',
      price: 45000,
      origin: 'IKEA Parque Arauco, Las Condes',
      destination: 'Av. Apoquindo 4500, Las Condes',
      date: '21 Dic, 2024',
      time: '14:00 PM',
      vehicleType: 'furgon',
      distance: 5,
      specialObjects: [],
      hasElevator: true,
      floor: 8,
      helpers: 0,
      isRemoteZone: false
    },
    {
      id: '3',
      title: 'Mudanza Oficina Completa',
      type: 'moving',
      status: 'pending',
      price: 180000,
      origin: 'Torre Costanera, Providencia',
      destination: 'Parque Industrial Lampa',
      date: '22 Dic, 2024',
      time: '08:00 AM',
      vehicleType: 'camion_grande',
      distance: 35,
      specialObjects: ['safe', 'fragile'],
      hasElevator: true,
      floor: 15,
      helpers: 3,
      isRemoteZone: true
    }
  ]);
  
  const [acceptedServices] = useState<SmartOfferService[]>([
    {
      id: '4',
      title: 'Flete Electrodomésticos',
      type: 'freight',
      status: 'confirmed',
      price: 55000,
      origin: 'Falabella Costanera Center',
      destination: 'Ñuñoa Centro',
      date: '19 Dic, 2024',
      time: '16:00 PM',
      vehicleType: 'camioneta',
      distance: 7,
      specialObjects: ['fragile'],
      hasElevator: true,
      floor: 3,
      helpers: 1,
      isRemoteZone: false
    }
  ]);

  return {
    availableServices,
    acceptedServices
  };
}
