
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Home, Calendar, DollarSign } from 'lucide-react';
import VehicleSelector from '@/components/VehicleSelector';
import { useToast } from '@/hooks/use-toast';

const MovingQuoteForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    rooms: '',
    vehicle: 'furgon',
    hasElevator: '',
    hasHelpers: true,
    description: ''
  });
  const [quote, setQuote] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateQuote = () => {
    // Lógica básica de cotización para mudanzas
    let basePrice = 50000; // Precio base

    // Precio según tipo de vehículo
    const vehiclePrices = {
      furgon: 50000,
      van: 70000,
      'small-truck': 90000,
      'medium-truck': 120000,
      'large-truck': 150000
    };

    basePrice = vehiclePrices[formData.vehicle as keyof typeof vehiclePrices] || 50000;

    // Precio según número de habitaciones
    const roomMultiplier = {
      '1': 1,
      '2': 1.3,
      '3': 1.6,
      '4': 2,
      '5+': 2.5
    };

    basePrice *= roomMultiplier[formData.rooms as keyof typeof roomMultiplier] || 1;

    // Ajustes adicionales
    if (formData.hasElevator === 'no') basePrice *= 1.2; // 20% más sin ascensor
    if (formData.hasHelpers) basePrice *= 1.3; // 30% más con ayudantes

    setQuote(Math.round(basePrice));
    
    toast({
      title: "Cotización calculada",
      description: "Tu cotización ha sido generada exitosamente",
    });
  };

  const isFormValid = formData.origin && formData.destination && formData.date && formData.rooms;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-[#009EE2]" />
            Información de la Mudanza
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin">Origen</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="origin"
                  placeholder="Dirección de origen"
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="destination">Destino</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="destination"
                  placeholder="Dirección de destino"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Fecha de mudanza</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="rooms">Número de habitaciones</Label>
              <Select value={formData.rooms} onValueChange={(value) => handleInputChange('rooms', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 habitación</SelectItem>
                  <SelectItem value="2">2 habitaciones</SelectItem>
                  <SelectItem value="3">3 habitaciones</SelectItem>
                  <SelectItem value="4">4 habitaciones</SelectItem>
                  <SelectItem value="5+">5+ habitaciones</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Tipo de vehículo</Label>
            <VehicleSelector
              value={formData.vehicle}
              onValueChange={(value) => handleInputChange('vehicle', value)}
              serviceType="moving"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="elevator">¿Hay ascensor disponible?</Label>
              <Select value={formData.hasElevator} onValueChange={(value) => handleInputChange('hasElevator', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="helpers">¿Necesitas ayudantes?</Label>
              <Select 
                value={formData.hasHelpers ? 'yes' : 'no'} 
                onValueChange={(value) => handleInputChange('hasHelpers', value === 'yes')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción adicional (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Describe cualquier detalle importante sobre tu mudanza..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <Button
          onClick={calculateQuote}
          disabled={!isFormValid}
          className="bg-[#009EE2] hover:bg-[#0080B9] text-white py-3 text-lg"
          size="lg"
        >
          <DollarSign className="h-5 w-5 mr-2" />
          Calcular Cotización
        </Button>

        {quote && (
          <Card className="bg-gradient-to-r from-[#009EE2]/10 to-[#DB2851]/10 border-2 border-[#009EE2]/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Tu cotización estimada</h3>
              <div className="text-4xl font-bold text-[#009EE2] mb-4">
                ${quote.toLocaleString('es-CL')} CLP
              </div>
              <p className="text-gray-600 mb-4">
                Esta es una estimación basada en la información proporcionada
              </p>
              <Button 
                className="bg-[#DB2851] hover:bg-[#c11f45]"
                onClick={() => window.location.href = '/customer/new-service'}
              >
                Solicitar Servicio
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MovingQuoteForm;
