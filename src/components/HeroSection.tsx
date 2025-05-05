
import { useNavigate } from 'react-router-dom';
import { Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClientRegistration = () => {
    navigate('/login', { state: { userType: 'shipping', isRegistering: true } });
  };

  const handleDriverRegistration = () => {
    navigate('/login', { state: { userType: 'driver', isRegistering: true } });
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-[#f5f5f5] py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
            Mudanzas y <span className="text-transporter-DEFAULT">Fletes</span> en un solo lugar
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Conéctate con transportistas verificados para tus necesidades de mudanza y envío de forma rápida y segura.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <div className="grid grid-cols-2 gap-4 w-full sm:w-auto">
              <Button 
                className="bg-client-DEFAULT hover:bg-client-hover text-white py-6 px-8 rounded-lg text-lg shadow-lg flex items-center gap-2" 
                onClick={handleClientRegistration}
              >
                <Users className="h-6 w-6" />
                Cliente
              </Button>
              <Button 
                className="bg-transporter-DEFAULT hover:bg-transporter-hover text-white py-6 px-8 rounded-lg text-lg shadow-lg flex items-center gap-2" 
                onClick={handleDriverRegistration}
              >
                <Truck className="h-6 w-6" />
                Transportista
              </Button>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="relative rounded-2xl shadow-xl overflow-hidden bg-gradient-to-r from-transporter-DEFAULT to-client-DEFAULT">
            <div className="p-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                🔴¡NOS MOVEMOS CONTIGO!🔵
              </h2>
              <div className="space-y-4 text-white text-lg md:text-xl drop-shadow-md">
                <p className="flex items-center justify-center">
                  <span className="mr-2">🚚</span> Mudanzas sin estrés
                </p>
                <p className="flex items-center justify-center">
                  <span className="mr-2">📦</span> Envíos seguros y rápidos
                </p>
                <p className="flex items-center justify-center">
                  <span className="mr-2">📍</span> Fletes a cualquier punto de la ciudad
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
