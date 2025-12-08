
import { useState } from 'react';

export interface ServiceRiskFactors {
  hasHeavyObjects: boolean;
  heavyObjectType?: 'piano' | 'safe' | 'other';
  hasFragileItems: boolean;
  floors: number;
  hasElevator: boolean;
  helpersRequired: number;
  helpersPaid: number;
}

export interface TransporterService {
  id: string;
  title: string;
  type: 'moving' | 'freight';
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
  grossPrice: number;
  netEarnings: number;
  platformFee: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  distance: number;
  vehicleType: string;
  riskFactors: ServiceRiskFactors;
  clientName: string;
  clientPhone: string;
  notes?: string;
}

export function useTransporterServices() {
  const [availableServices] = useState<TransporterService[]>([
    {
      id: '1',
      title: 'Mudanza Departamento Las Condes',
      type: 'moving',
      status: 'pending',
      grossPrice: 185000,
      netEarnings: 157250,
      platformFee: 27750,
      origin: 'Av. Apoquindo 4500, Las Condes',
      destination: 'Av. Vitacura 2800, Vitacura',
      date: '15 Dic, 2024',
      time: '09:00',
      distance: 8.5,
      vehicleType: 'camion_chico',
      riskFactors: {
        hasHeavyObjects: true,
        heavyObjectType: 'piano',
        hasFragileItems: true,
        floors: 4,
        hasElevator: false,
        helpersRequired: 2,
        helpersPaid: 2
      },
      clientName: 'María González',
      clientPhone: '+56 9 8765 4321',
      notes: 'Piano vertical en buen estado. Requiere cuidado especial con cristalería antigua.'
    },
    {
      id: '2',
      title: 'Flete Muebles Providencia',
      type: 'freight',
      status: 'pending',
      grossPrice: 65000,
      netEarnings: 55250,
      platformFee: 9750,
      origin: 'Tienda HomeCenter, Providencia',
      destination: 'Manuel Montt 1200, Providencia',
      date: '16 Dic, 2024',
      time: '14:00',
      distance: 3.2,
      vehicleType: 'furgon',
      riskFactors: {
        hasHeavyObjects: false,
        hasFragileItems: false,
        floors: 2,
        hasElevator: true,
        helpersRequired: 1,
        helpersPaid: 1
      },
      clientName: 'Carlos Pérez',
      clientPhone: '+56 9 1234 5678',
      notes: 'Sofá y mesa de comedor. Edificio con estacionamiento subterráneo.'
    },
    {
      id: '3',
      title: 'Mudanza Oficina Santiago Centro',
      type: 'moving',
      status: 'pending',
      grossPrice: 320000,
      netEarnings: 272000,
      platformFee: 48000,
      origin: 'Morandé 80, Santiago',
      destination: 'Av. Libertador O\'Higgins 1449, Santiago',
      date: '18 Dic, 2024',
      time: '07:00',
      distance: 2.1,
      vehicleType: 'camion_mediano',
      riskFactors: {
        hasHeavyObjects: true,
        heavyObjectType: 'safe',
        hasFragileItems: true,
        floors: 6,
        hasElevator: false,
        helpersRequired: 4,
        helpersPaid: 4
      },
      clientName: 'Empresa ABC Ltda.',
      clientPhone: '+56 2 2345 6789',
      notes: 'Caja fuerte de 500kg. Requiere equipo especializado. Acceso por calle lateral.'
    }
  ]);
  
  const [acceptedServices] = useState<TransporterService[]>([
    {
      id: '4',
      title: 'Flete Electrodomésticos Ñuñoa',
      type: 'freight',
      status: 'confirmed',
      grossPrice: 45000,
      netEarnings: 38250,
      platformFee: 6750,
      origin: 'Ripley Alto Las Condes',
      destination: 'Irarrázaval 3500, Ñuñoa',
      date: '14 Dic, 2024',
      time: '11:00',
      distance: 12.3,
      vehicleType: 'camioneta',
      riskFactors: {
        hasHeavyObjects: false,
        hasFragileItems: true,
        floors: 1,
        hasElevator: false,
        helpersRequired: 1,
        helpersPaid: 0
      },
      clientName: 'Andrea Silva',
      clientPhone: '+56 9 5555 1234',
      notes: 'Refrigerador y lavadora. Casa con acceso directo.'
    }
  ]);

  return {
    availableServices,
    acceptedServices
  };
}
