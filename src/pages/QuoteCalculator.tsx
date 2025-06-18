
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Truck, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MovingQuoteForm from '@/components/quote/MovingQuoteForm';
import FreightQuoteForm from '@/components/quote/FreightQuoteForm';

const QuoteCalculator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('moving');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#009EE2] to-[#DB2851] p-2 rounded-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Cotizador Inteligente</h1>
                  <p className="text-gray-600">Obtén una cotización instantánea para tu servicio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Calcula el costo de tu servicio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Utiliza nuestro cotizador inteligente para obtener una estimación precisa del costo de tu mudanza o flete
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#009EE2]/10 to-[#DB2851]/10">
            <CardTitle className="text-center text-xl">Selecciona tu servicio</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="moving" className="flex items-center gap-2 py-3">
                  <Users className="h-5 w-5" />
                  Mudanzas
                </TabsTrigger>
                <TabsTrigger value="freight" className="flex items-center gap-2 py-3">
                  <Truck className="h-5 w-5" />
                  Fletes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="moving" className="mt-0">
                <MovingQuoteForm />
              </TabsContent>

              <TabsContent value="freight" className="mt-0">
                <FreightQuoteForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuoteCalculator;
