
import { useState } from 'react';

interface Service {
  id: string;
  title: string;
  type: 'moving' | 'delivery' | 'freight';
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
  price: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
}

export function useTransporterServices() {
  // Datos de ejemplo para servicios
  const [availableServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Mudanza de Apartamento',
      type: 'moving',
      status: 'pending',
      price: 280.00,
      origin: '123 Primera Ave, Madrid',
      destination: '456 Segunda Calle, Madrid',
      date: '20 Jun, 2024',
      time: '10:00 AM'
    },
    {
      id: '2',
      title: 'Entrega de Muebles',
      type: 'delivery',
      status: 'pending',
      price: 120.00,
      origin: 'Tienda de Muebles, Madrid',
      destination: '789 Tercera Ave, Madrid',
      date: '25 Jun, 2024',
      time: '13:00 PM'
    }
  ]);
  
  const [acceptedServices] = useState<Service[]>([
    {
      id: '3',
      title: 'Equipamiento de Oficina',
      type: 'freight',
      status: 'confirmed',
      price: 350.00,
      origin: '101 Bulevar Empresarial, Madrid',
      destination: '202 Calle Comercio, Madrid',
      date: '18 Jun, 2024',
      time: '08:00 AM'
    }
  ]);

  return {
    availableServices,
    acceptedServices
  };
}
