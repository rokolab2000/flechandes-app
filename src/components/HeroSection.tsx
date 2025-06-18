
import { useNavigate } from 'react-router-dom';
import { Truck, Users, LogIn, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClientRegistration = () => {
    navigate('/login', { state: { userType: 'shipping', isRegistering: true } });
  };

  const handleDriverRegistration = () => {
    navigate('/login', { state: { userType: 'driver', isRegistering: true } });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleQuoteCalculator = () => {
    navigate('/quote-calculator');
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-[#f5f5f5] py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
            Mudanzas y <span className="text-[#009EE2]">Fletes</span> en un solo lugar
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Conéctate con transportistas verificados para tus necesidades de mudanza y flete de forma rápida y segura.
          </p>
          
          <div className="flex flex-col gap-6 justify-center md:justify-start">
            {/* Quote Calculator Button */}
            <div className="flex justify-center md:justify-start">
              <Button 
                className="bg-gradient-to-r from-[#009EE2] to-[#DB2851] hover:from-[#0080B9] hover:to-[#c11f45] text-white py-3 px-8 rounded-lg text-lg shadow-lg flex items-center gap-2" 
                onClick={handleQuoteCalculator}
              >
                <Calculator className="h-5 w-5" />
                Cotizador Inteligente
              </Button>
            </div>

            {/* Login Button */}
            <div className="flex justify-center md:justify-start">
              <Button 
                variant="outline"
                className="border-[#009EE2] text-[#009EE2] hover:bg-[#009EE2]/10 py-3 px-8 rounded-lg text-lg shadow-md flex items-center gap-2" 
                onClick={handleLogin}
              >
                <LogIn className="h-5 w-5" />
                ¿Ya tienes cuenta? Iniciar Sesión
              </Button>
            </div>
            
            {/* Registration Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <div className="grid grid-cols-2 gap-4 w-full sm:w-auto">
                <Button 
                  className="bg-[#DB2851] hover:bg-[#c11f45] text-white py-6 px-8 rounded-lg text-lg shadow-lg flex items-center gap-2" 
                  onClick={handleClientRegistration}
                >
                  <Users className="h-6 w-6" />
                  Cliente
                </Button>
                <Button 
                  className="bg-[#009EE2] hover:bg-[#0080B9] text-white py-6 px-8 rounded-lg text-lg shadow-lg flex items-center gap-2" 
                  onClick={handleDriverRegistration}
                >
                  <Truck className="h-6 w-6" />
                  Transportista
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 text-center md:text-left">
              Regístrate para comenzar a usar nuestros servicios
            </p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="relative rounded-2xl shadow-xl overflow-hidden bg-gradient-to-r from-[#009EE2] to-[#DB2851]">
            <div className="p-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                🔴¡NOS MOVEMOS CONTIGO!🔵
              </h2>
              <div className="space-y-4 text-white text-lg md:text-xl drop-shadow-md">
                <p className="flex items-center justify-center">
                  <span className="mr-2">🚚</span> Mudanzas sin estrés
                </p>
                <p className="flex items-center justify-center">
                  <span className="mr-2">📦</span> Fletes seguros y rápidos
                </p>
                <p className="flex items-center justify-center">
                  <span className="mr-2">📍</span> Transporte a cualquier punto de la ciudad
                </p>
              </div>
              <p className="mt-6 text-white font-medium text-xl">
                Confianza - Rapidez - Economía
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
