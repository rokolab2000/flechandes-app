// Algoritmo de Precios Híbrido Flechandes (PRD v2.1)
// Basado en Data 2024-2025 como "Anchor Price"

export interface PricingConfig {
  base_rates: {
    furgon_std: number;
    truck_34: number;
    van: number;
    small_truck: number;
    medium_truck: number;
    large_truck: number;
    moto_b2b: number;
  };
  labor_rates: {
    helper_base: number;      // Tarifa base Peoneta
    stairs_surcharge: number; // Bono por piso s/ascensor
  };
  surcharges: {
    piano_heavy: number;
    remote_zone: number;
    fragile: number;
    dangerous: number;
    electronics: number;
  };
  detention_fee: {
    block_price: number;
    block_time_min: number;
    free_minutes: number;
  };
  distance_rates: {
    base_km: number;        // km incluidos en base
    rate_per_km: number;    // +$800/km después de base
    peripheral_rate: number; // +$600/km carretera/periferia
  };
  urgency_multipliers: {
    normal: number;
    urgent: number;
    express: number;
  };
}

export const PRICING_CONFIG: PricingConfig = {
  base_rates: {
    furgon_std: 35000,
    truck_34: 70000,
    van: 45000,
    small_truck: 55000,
    medium_truck: 90000,
    large_truck: 120000,
    moto_b2b: 4000,
  },
  labor_rates: {
    helper_base: 15000,      // $15.000 - $20.000 por peoneta
    stairs_surcharge: 5000,  // $5.000 por piso sin ascensor
  },
  surcharges: {
    piano_heavy: 100000,     // Piano, caja fuerte, etc.
    remote_zone: 10000,      // Colina, Lampa, etc.
    fragile: 8000,           // Carga frágil
    dangerous: 15000,        // Carga peligrosa
    electronics: 5000,       // Electrónicos
  },
  detention_fee: {
    block_price: 2500,       // $2.500 por bloque
    block_time_min: 15,      // cada 15 min
    free_minutes: 10,        // primeros 10 min gratis
  },
  distance_rates: {
    base_km: 7,              // 0-7km incluido en base
    rate_per_km: 800,        // +$800/km después
    peripheral_rate: 600,    // carretera
  },
  urgency_multipliers: {
    normal: 1,
    urgent: 1.4,
    express: 1.8,
  },
};

// Tipos de objetos especiales (Fricción Positiva)
export type SpecialObject = 'none' | 'piano' | 'safe' | 'refrigerator' | 'washer' | 'gym_equipment' | 'aquarium';

export interface SpecialObjectInfo {
  id: SpecialObject;
  name: string;
  emoji: string;
  surcharge: number;
  requiresSpecialCrew: boolean;
  warningMessage: string;
}

export const SPECIAL_OBJECTS: SpecialObjectInfo[] = [
  { id: 'none', name: 'Ninguno', emoji: '✓', surcharge: 0, requiresSpecialCrew: false, warningMessage: '' },
  { id: 'piano', name: 'Piano / Órgano', emoji: '🎹', surcharge: 100000, requiresSpecialCrew: true, warningMessage: 'Se requiere cuadrilla especializada' },
  { id: 'safe', name: 'Caja Fuerte', emoji: '🔒', surcharge: 80000, requiresSpecialCrew: true, warningMessage: 'Se requiere equipo de carga pesada' },
  { id: 'refrigerator', name: 'Refrigerador Grande', emoji: '🧊', surcharge: 15000, requiresSpecialCrew: false, warningMessage: 'Requiere cuidado especial' },
  { id: 'washer', name: 'Lavadora / Secadora', emoji: '🧺', surcharge: 10000, requiresSpecialCrew: false, warningMessage: '' },
  { id: 'gym_equipment', name: 'Equipos de Gimnasio', emoji: '🏋️', surcharge: 50000, requiresSpecialCrew: true, warningMessage: 'Se requiere personal adicional' },
  { id: 'aquarium', name: 'Acuario Grande', emoji: '🐠', surcharge: 30000, requiresSpecialCrew: true, warningMessage: 'Requiere manejo especializado' },
];

// Zonas remotas (Geocercas)
export const REMOTE_ZONES = [
  'colina', 'lampa', 'til til', 'batuco', 'chicureo',
  'buin', 'paine', 'pirque', 'san josé de maipo',
  'calera de tango', 'padre hurtado', 'talagante'
];

export interface QuoteInput {
  vehicleType: string;
  distanceKm: number;
  floors: number;
  hasElevator: boolean;
  helpersCount: number;
  specialObjects: SpecialObject[];
  isRemoteZone: boolean;
  urgency: 'normal' | 'urgent' | 'express';
  cargoType?: string;
  weightKg?: number;
  isB2B?: boolean;
  rooms?: string;
}

export interface QuoteBreakdown {
  basePrice: number;
  distanceSurcharge: number;
  stairsSurcharge: number;
  helpersCost: number;
  specialObjectsSurcharge: number;
  remoteZoneSurcharge: number;
  urgencySurcharge: number;
  cargoTypeSurcharge: number;
  subtotal: number;
  iva: number;
  total: number;
  riskTags: string[];
  crewRequired: number;
}

export function calculateQuote(input: QuoteInput): QuoteBreakdown {
  const config = PRICING_CONFIG;
  const riskTags: string[] = [];
  
  // 1. Base del vehículo
  const vehicleMap: Record<string, keyof typeof config.base_rates> = {
    'furgon': 'furgon_std',
    'van': 'van',
    'small-truck': 'small_truck',
    'medium-truck': 'medium_truck',
    'large-truck': 'large_truck',
    'truck-34': 'truck_34',
    'moto': 'moto_b2b',
  };
  
  const vehicleKey = vehicleMap[input.vehicleType] || 'furgon_std';
  let basePrice = config.base_rates[vehicleKey];

  // Ajuste por habitaciones (mudanzas)
  if (input.rooms) {
    const roomMultiplier: Record<string, number> = {
      '1': 1,
      '2': 1.2,
      '3': 1.4,
      '4': 1.7,
      '5+': 2.0
    };
    basePrice *= roomMultiplier[input.rooms] || 1;
  }
  
  // 2. Distancia
  let distanceSurcharge = 0;
  if (input.distanceKm > config.distance_rates.base_km) {
    const extraKm = input.distanceKm - config.distance_rates.base_km;
    distanceSurcharge = Math.round(extraKm * (input.isRemoteZone 
      ? config.distance_rates.peripheral_rate 
      : config.distance_rates.rate_per_km));
  }
  
  // 3. Escaleras (Fricción Positiva para proteger al Peoneta)
  let stairsSurcharge = 0;
  if (!input.hasElevator && input.floors > 1) {
    stairsSurcharge = (input.floors - 1) * config.labor_rates.stairs_surcharge;
    riskTags.push(`🏢 ${input.floors} PISOS S/ASCENSOR`);
  }
  
  // 4. Peonetas
  const helpersCost = input.helpersCount * config.labor_rates.helper_base;
  
  // 5. Objetos especiales
  let specialObjectsSurcharge = 0;
  let crewRequired = 1 + input.helpersCount;
  
  input.specialObjects.forEach(objId => {
    const obj = SPECIAL_OBJECTS.find(o => o.id === objId);
    if (obj && obj.id !== 'none') {
      specialObjectsSurcharge += obj.surcharge;
      riskTags.push(`${obj.emoji} ${obj.name.toUpperCase()}`);
      if (obj.requiresSpecialCrew) {
        crewRequired = Math.max(crewRequired, 3);
      }
    }
  });
  
  // 6. Zona remota
  const remoteZoneSurcharge = input.isRemoteZone ? config.surcharges.remote_zone : 0;
  if (input.isRemoteZone) {
    riskTags.push('🗺️ ZONA REMOTA');
  }
  
  // 7. Urgencia
  const urgencyMultiplier = config.urgency_multipliers[input.urgency] || 1;
  const urgencySurcharge = urgencyMultiplier > 1 
    ? Math.round(basePrice * (urgencyMultiplier - 1))
    : 0;
  if (input.urgency === 'urgent') riskTags.push('⏰ URGENTE');
  if (input.urgency === 'express') riskTags.push('⚡ EXPRESS');
  
  // 8. Tipo de carga (fletes)
  let cargoTypeSurcharge = 0;
  if (input.cargoType) {
    const cargoMap: Record<string, keyof typeof config.surcharges> = {
      'fragile': 'fragile',
      'dangerous': 'dangerous',
      'electronics': 'electronics',
    };
    const surchargeKey = cargoMap[input.cargoType];
    if (surchargeKey) {
      cargoTypeSurcharge = config.surcharges[surchargeKey];
      if (input.cargoType === 'fragile') riskTags.push('📦 FRÁGIL');
      if (input.cargoType === 'dangerous') riskTags.push('⚠️ PELIGROSA');
    }
  }

  // Peso extra (fletes)
  if (input.weightKg && input.weightKg > 100) {
    cargoTypeSurcharge += Math.round((input.weightKg - 100) * 50); // $50/kg extra
    riskTags.push(`⚖️ ${input.weightKg}KG`);
  }
  
  // Cálculo final
  const subtotal = basePrice + distanceSurcharge + stairsSurcharge + helpersCost + 
                   specialObjectsSurcharge + remoteZoneSurcharge + urgencySurcharge + 
                   cargoTypeSurcharge;
  
  // IVA incluido en precio bruto (B2C)
  const iva = Math.round(subtotal * 0.19);
  const total = subtotal + iva;
  
  return {
    basePrice: Math.round(basePrice),
    distanceSurcharge,
    stairsSurcharge,
    helpersCost,
    specialObjectsSurcharge,
    remoteZoneSurcharge,
    urgencySurcharge,
    cargoTypeSurcharge,
    subtotal: Math.round(subtotal),
    iva,
    total: Math.round(total),
    riskTags,
    crewRequired,
  };
}

// Detectar si una dirección está en zona remota
export function isRemoteZone(address: string): boolean {
  const lowerAddress = address.toLowerCase();
  return REMOTE_ZONES.some(zone => lowerAddress.includes(zone));
}

// Formatear precio en CLP
export function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(amount);
}
