
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Package, Calendar, DollarSign } from 'lucide-react';
import VehicleSelector from '@/components/VehicleSelector';
import { useToast } from '@/hooks/use-toast';

const FreightQuoteForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    weight: '',
    dimensions: '',
    vehicle: 'furgon',
    cargoType: '',
    urgency: 'normal',
    description: ''
  });
  const [quote, setQuote] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateQuote = () => {
    // Lógica básica de cotización para fletes
    let basePrice = 25000; // Precio base

    // Precio según tipo de vehículo
    const vehiclePrices = {
      furgon: 25000,
      van: 35000,
      'small-truck': 45000,
      'medium-truck': 60000,
      'large-truck': 80000
    };

    basePrice = vehiclePrices[formData.vehicle as keyof typeof vehiclePrices] || 25000;

    // Precio según peso
    const weight = parseFloat(formData.weight) || 0;
    if (weight > 100) basePrice *= 1.5;
    else if (weight > 50) basePrice *= 1.3;
    else if (weight > 20) basePrice *= 1.1;

    // Precio según urgencia
    if (formData.urgency === 'urgent') basePrice *= 1.4;
    else if (formData.urgency === 'express') basePrice *= 1.8;

    // Precio según tipo de carga
    if (formData.cargoType === 'fragile') basePrice *= 1.2;
    else if (formData.cargoType === 'dangerous') basePrice *= 1.5;

    setQuote(Math.round(basePrice));
    
    toast({
      title: "Cotización calculada",
      description: "Tu cotización ha sido generada exitosamente",
    });
  };

  const isFormValid = formData.origin && formData.destination && formData.date && formData.weight;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-[#DB2851]" />
            Información del Flete
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
              <Label htmlFor="date">Fecha de transporte</Label>
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
              <Label htmlFor="weight">Peso aproximado (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Ej: 50"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="dimensions">Dimensiones (largo x ancho x alto en cm)</Label>
            <Input
              id="dimensions"
              placeholder="Ej: 100 x 80 x 60"
              value={formData.dimensions}
              onChange={(e) => handleInputChange('dimensions', e.target.value)}
            />
          </div>

          <div>
            <Label>Tipo de vehículo</Label>
            <VehicleSelector
              value={formData.vehicle}
              onValueChange={(value) => handleInputChange('vehicle', value)}
              serviceType="freight"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cargoType">Tipo de carga</Label>
              <Select value={formData.cargoType} onValueChange={(value) => handleInputChange('cargoType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fragile">Frágil</SelectItem>
                  <SelectItem value="dangerous">Peligrosa</SelectItem>
                  <SelectItem value="electronics">Electrónicos</SelectItem>
                  <SelectItem value="furniture">Muebles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="urgency">Urgencia</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal (24-48 hrs)</SelectItem>
                  <SelectItem value="urgent">Urgente (12-24 hrs)</SelectItem>
                  <SelectItem value="express">Express (mismo día)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción adicional (opcional)</Label>
            <Textarea
              id="description"
              placeholder="Describe tu carga y cualquier detalle importante..."
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
          className="bg-[#DB2851] hover:bg-[#c11f45] text-white py-3 text-lg"
          size="lg"
        >
          <DollarSign className="h-5 w-5 mr-2" />
          Calcular Cotización
        </Button>

        {quote && (
          <Card className="bg-gradient-to-r from-[#DB2851]/10 to-[#009EE2]/10 border-2 border-[#DB2851]/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Tu cotización estimada</h3>
              <div className="text-4xl font-bold text-[#DB2851] mb-4">
                ${quote.toLocaleString('es-CL')} CLP
              </div>
              <p className="text-gray-600 mb-4">
                Esta es una estimación basada en la información proporcionada
              </p>
              <Button 
                className="bg-[#009EE2] hover:bg-[#0080B9]"
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

export default FreightQuoteForm;
