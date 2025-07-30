
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Truck, Users, ArrowLeft, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
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
            <Logo size="md" />
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

      {/* CTA Section - Servicios */}
      <div className="bg-white py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Flechandes te ofrece soluciones completas de transporte y logística para satisfacer todas tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Mudanzas */}
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="bg-[#009EE2]/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-[#009EE2]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Mudanzas</h3>
                <p className="text-gray-600 mb-6">
                  Servicio integral de mudanzas residenciales y corporativas con personal especializado y equipos de última generación.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-[#009EE2] rounded-full"></div>
                    Embalaje profesional
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-[#009EE2] rounded-full"></div>
                    Transporte seguro
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-[#009EE2] rounded-full"></div>
                    Seguro incluido
                  </li>
                </ul>
                <Button 
                  className="w-full bg-[#009EE2] hover:bg-[#007bb3]"
                  onClick={() => navigate('/customer/new-service', { state: { serviceType: 'moving', step: 1 } })}
                >
                  Solicitar Mudanza
                </Button>
              </CardContent>
            </Card>

            {/* Fletes */}
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="bg-[#DB2851]/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Truck className="h-8 w-8 text-[#DB2851]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Fletes</h3>
                <p className="text-gray-600 mb-6">
                  Transporte de carga y mercancías de cualquier tamaño, con la flexibilidad y confiabilidad que necesitas.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-[#DB2851] rounded-full"></div>
                    Diferentes tamaños de vehículos
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-[#DB2851] rounded-full"></div>
                    Tracking en tiempo real
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-[#DB2851] rounded-full"></div>
                    Entrega garantizada
                  </li>
                </ul>
                <Button 
                  className="w-full bg-[#DB2851] hover:bg-[#c11f45]"
                  onClick={() => navigate('/customer/new-service', { state: { serviceType: 'freight', step: 1 } })}
                >
                  Solicitar Flete
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-[#009EE2] to-[#DB2851] rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">¿Necesitas ayuda personalizada?</h3>
            <p className="text-lg mb-6 opacity-90">
              Nuestro equipo de expertos está listo para asesorarte y brindarte la mejor solución
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="bg-white text-[#009EE2] border-white hover:bg-gray-100 flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Llamar Ahora
              </Button>
              <Button 
                variant="outline" 
                className="bg-white text-[#DB2851] border-white hover:bg-gray-100 flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Enviar Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;
