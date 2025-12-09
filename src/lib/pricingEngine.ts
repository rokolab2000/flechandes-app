// Flechandes Pricing Engine - Based on PRD Algorithm
// Formula: Price = (Base_Vehículo + (Km × Tarifa_Zona) + Surcharges) × Factor_B2B

export interface PricingConfig {
  base_rates: {
    furgon: number;
    camioneta: number;
    camion_chico: number;
    camion_mediano: number;
    camion_grande: number;
  };
  distance_rates: {
    base_km: number; // First 7km included in base
    per_km_standard: number; // +7km rate
    per_km_highway: number; // Peripheral/highway rate
  };
  labor_rates: {
    helper_base: number; // Base helper rate
    stairs_surcharge_per_floor: number; // Per floor without elevator
  };
  surcharges: {
    piano_heavy: number;
    safe_heavy: number;
    fragile: number;
    remote_zone: number;
    appliances_large: number;
  };
  detention_fee: {
    free_minutes: number;
    block_price: number;
    block_time_min: number;
  };
  b2b_discount: number; // Factor for B2B clients
}

export const PRICING_CONFIG: PricingConfig = {
  base_rates: {
    furgon: 35000,
    camioneta: 45000,
    camion_chico: 70000,
    camion_mediano: 100000,
    camion_grande: 150000,
  },
  distance_rates: {
    base_km: 7,
    per_km_standard: 800,
    per_km_highway: 600,
  },
  labor_rates: {
    helper_base: 15000,
    stairs_surcharge_per_floor: 5000,
  },
  surcharges: {
    piano_heavy: 100000,
    safe_heavy: 80000,
    fragile: 10000,
    remote_zone: 10000,
    appliances_large: 15000,
  },
  detention_fee: {
    free_minutes: 10,
    block_price: 2500,
    block_time_min: 15,
  },
  b2b_discount: 0.85,
};

export type VehicleType = 'furgon' | 'camioneta' | 'camion_chico' | 'camion_mediano' | 'camion_grande';
export type SpecialObject = 'piano' | 'safe' | 'fragile' | 'appliances_large' | 'none';

export interface AccessInfo {
  hasElevator: boolean;
  floor: number;
}

export interface QuoteInput {
  vehicleType: VehicleType;
  distanceKm: number;
  isRemoteZone: boolean;
  originAccess: AccessInfo;
  destinationAccess: AccessInfo;
  helpersCount: number;
  specialObjects: SpecialObject[];
  isB2B: boolean;
}

export interface QuoteBreakdown {
  baseVehicle: number;
  distanceCharge: number;
  remoteZoneCharge: number;
  stairsOrigin: number;
  stairsDestination: number;
  helpersCharge: number;
  specialObjectsCharge: number;
  subtotal: number;
  b2bDiscount: number;
  total: number;
  ivaIncluded: number;
  helperEarnings: number; // What the helper earns from this service
}

export interface RiskTag {
  id: string;
  label: string;
  icon: string;
  severity: 'low' | 'medium' | 'high';
}

export function calculateStairsCharge(access: AccessInfo): number {
  if (access.hasElevator || access.floor <= 1) {
    return 0;
  }
  // Charge for floors 2+ without elevator
  const floorsToCharge = access.floor - 1;
  return floorsToCharge * PRICING_CONFIG.labor_rates.stairs_surcharge_per_floor;
}

export function calculateDistanceCharge(distanceKm: number, isRemoteZone: boolean): number {
  if (distanceKm <= PRICING_CONFIG.distance_rates.base_km) {
    return 0;
  }
  
  const extraKm = distanceKm - PRICING_CONFIG.distance_rates.base_km;
  const rate = isRemoteZone 
    ? PRICING_CONFIG.distance_rates.per_km_highway 
    : PRICING_CONFIG.distance_rates.per_km_standard;
  
  return Math.round(extraKm * rate);
}

export function calculateSpecialObjectsCharge(objects: SpecialObject[]): number {
  let total = 0;
  
  objects.forEach(obj => {
    switch (obj) {
      case 'piano':
        total += PRICING_CONFIG.surcharges.piano_heavy;
        break;
      case 'safe':
        total += PRICING_CONFIG.surcharges.safe_heavy;
        break;
      case 'fragile':
        total += PRICING_CONFIG.surcharges.fragile;
        break;
      case 'appliances_large':
        total += PRICING_CONFIG.surcharges.appliances_large;
        break;
    }
  });
  
  return total;
}

export function generateRiskTags(input: QuoteInput): RiskTag[] {
  const tags: RiskTag[] = [];
  
  // Special objects tags
  if (input.specialObjects.includes('piano')) {
    tags.push({ id: 'piano', label: 'PIANO', icon: '🎹', severity: 'high' });
  }
  if (input.specialObjects.includes('safe')) {
    tags.push({ id: 'safe', label: 'CAJA FUERTE', icon: '🔐', severity: 'high' });
  }
  if (input.specialObjects.includes('fragile')) {
    tags.push({ id: 'fragile', label: 'FRÁGIL', icon: '📦', severity: 'medium' });
  }
  if (input.specialObjects.includes('appliances_large')) {
    tags.push({ id: 'appliances', label: 'ELECTRODOM.', icon: '🧊', severity: 'medium' });
  }
  
  // Stairs tags
  const originStairs = !input.originAccess.hasElevator && input.originAccess.floor > 1;
  const destStairs = !input.destinationAccess.hasElevator && input.destinationAccess.floor > 1;
  
  if (originStairs) {
    tags.push({ 
      id: 'stairs_origin', 
      label: `${input.originAccess.floor} PISOS ORIGEN`, 
      icon: '🏢', 
      severity: input.originAccess.floor >= 4 ? 'high' : 'medium' 
    });
  }
  if (destStairs) {
    tags.push({ 
      id: 'stairs_dest', 
      label: `${input.destinationAccess.floor} PISOS DESTINO`, 
      icon: '🏢', 
      severity: input.destinationAccess.floor >= 4 ? 'high' : 'medium' 
    });
  }
  
  // Helpers
  if (input.helpersCount > 0) {
    tags.push({ 
      id: 'helpers', 
      label: `${input.helpersCount} AYUDANTE${input.helpersCount > 1 ? 'S' : ''}`, 
      icon: '👤', 
      severity: 'low' 
    });
  }
  
  // Remote zone
  if (input.isRemoteZone) {
    tags.push({ id: 'remote', label: 'ZONA REMOTA', icon: '📍', severity: 'medium' });
  }
  
  return tags;
}

export function calculateQuote(input: QuoteInput): QuoteBreakdown {
  // Base vehicle rate
  const baseVehicle = PRICING_CONFIG.base_rates[input.vehicleType];
  
  // Distance charge
  const distanceCharge = calculateDistanceCharge(input.distanceKm, input.isRemoteZone);
  
  // Remote zone surcharge
  const remoteZoneCharge = input.isRemoteZone ? PRICING_CONFIG.surcharges.remote_zone : 0;
  
  // Stairs charges
  const stairsOrigin = calculateStairsCharge(input.originAccess);
  const stairsDestination = calculateStairsCharge(input.destinationAccess);
  
  // Helpers charge
  const helpersCharge = input.helpersCount * PRICING_CONFIG.labor_rates.helper_base;
  
  // Special objects charge
  const specialObjectsCharge = calculateSpecialObjectsCharge(input.specialObjects);
  
  // Subtotal before B2B discount
  const subtotal = baseVehicle + distanceCharge + remoteZoneCharge + 
                   stairsOrigin + stairsDestination + helpersCharge + specialObjectsCharge;
  
  // B2B discount
  const b2bDiscount = input.isB2B ? Math.round(subtotal * (1 - PRICING_CONFIG.b2b_discount)) : 0;
  
  // Total
  const total = subtotal - b2bDiscount;
  
  // IVA is included (19%)
  const ivaIncluded = Math.round(total * 0.19 / 1.19);
  
  // Helper earnings (stairs surcharges go to helpers)
  const helperEarnings = stairsOrigin + stairsDestination + 
                        (input.helpersCount * PRICING_CONFIG.labor_rates.helper_base * 0.8); // 80% to helper
  
  return {
    baseVehicle,
    distanceCharge,
    remoteZoneCharge,
    stairsOrigin,
    stairsDestination,
    helpersCharge,
    specialObjectsCharge,
    subtotal,
    b2bDiscount,
    total,
    ivaIncluded,
    helperEarnings,
  };
}

export function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}
