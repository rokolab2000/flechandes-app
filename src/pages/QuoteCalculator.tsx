import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowLeft, Phone, Mail, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import ConversationalQuote from '@/components/quote/ConversationalQuote';

const QuoteCalculator = () => {
  const navigate = useNavigate();

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
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Cotizador Inteligente</h1>
                  <p className="text-gray-600">Cotiza conversando con nuestro asistente IA</p>
                </div>
              </div>
            </div>
            <Logo size="md" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Cuéntanos qué necesitas mover
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nuestro asistente inteligente te ayudará a cotizar tu mudanza o flete de forma rápida y personalizada
          </p>
        </div>

        <ConversationalQuote />
      </div>

      {/* Contact CTA */}
      <div className="bg-white py-16">
        <div className="container mx-auto max-w-6xl px-4">
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
