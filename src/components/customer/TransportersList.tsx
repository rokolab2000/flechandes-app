
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Truck, Users, Check } from 'lucide-react';
import { toast } from "sonner";

interface Transporter {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  vehicleType: string;
  vehicleModel: string;
  plateNumber: string;
  price: number;
  distance: string;
  arrivalTime: string;
  photo: string;
  isVerified: boolean;
}

interface TransportersListProps {
  onTransporterSelect: (transporter: Transporter) => void;
}

const TransportersList = ({ onTransporterSelect }: TransportersListProps) => {
  const [selectedTransporter, setSelectedTransporter] = useState<string | null>(null);

  const mockTransporters: Transporter[] = [
    {
      id: '1',
      name: 'Carlos Rodríguez',
      rating: 4.8,
      reviews: 127,
      vehicleType: 'Camioneta',
      vehicleModel: 'Ford Transit 2022',
      plateNumber: 'ABC-123',
      price: 45000,
      distance: '2.3 km',
      arrivalTime: '15 min',
      photo: '/placeholder.svg',
      isVerified: true
    },
    {
      id: '2',
      name: 'María González',
      rating: 4.9,
      reviews: 89,
      vehicleType: 'Furgón',
      vehicleModel: 'Mercedes Sprinter 2021',
      plateNumber: 'DEF-456',
      price: 52000,
      distance: '3.1 km',
      arrivalTime: '20 min',
      photo: '/placeholder.svg',
      isVerified: true
    },
    {
      id: '3',
      name: 'José Pérez',
      rating: 4.7,
      reviews: 156,
      vehicleType: 'Camión',
      vehicleModel: 'Isuzu NPR 2020',
      plateNumber: 'GHI-789',
      price: 38000,
      distance: '4.5 km',
      arrivalTime: '25 min',
      photo: '/placeholder.svg',
      isVerified: true
    }
  ];

  const handleSelectTransporter = (transporter: Transporter) => {
    setSelectedTransporter(transporter.id);
    
    setTimeout(() => {
      toast.success("Su flechandes fue seleccionado y va en camino a su ubicación de origen", {
        duration: 4000,
      });
      onTransporterSelect(transporter);
    }, 1000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Transportistas Disponibles</h3>
        <p className="text-gray-600">Selecciona el transportista que mejor se ajuste a tus necesidades</p>
      </div>

      {mockTransporters.map((transporter) => (
        <Card 
          key={transporter.id} 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedTransporter === transporter.id ? 'ring-2 ring-[#DB2851] bg-red-50' : ''
          }`}
          onClick={() => handleSelectTransporter(transporter)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={transporter.photo} 
                    alt={transporter.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {transporter.isVerified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{transporter.name}</h4>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{transporter.rating}</span>
                    <span className="text-sm text-gray-500">({transporter.reviews} reseñas)</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[#DB2851]">{formatPrice(transporter.price)}</div>
                <div className="text-sm text-gray-500">Precio estimado</div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{transporter.vehicleModel}</div>
                  <div className="text-xs text-gray-500">{transporter.plateNumber}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{transporter.distance}</div>
                  <div className="text-xs text-gray-500">Llegada en {transporter.arrivalTime}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-gray-100">
                {transporter.vehicleType}
              </Badge>
              
              {selectedTransporter === transporter.id ? (
                <div className="flex items-center space-x-2 text-[#DB2851]">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Seleccionado</span>
                </div>
              ) : (
                <Button 
                  size="sm" 
                  className="bg-[#DB2851] hover:bg-[#c11f45]"
                >
                  Seleccionar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TransportersList;
