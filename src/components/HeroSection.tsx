
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
            Mudanzas y <span className="text-[#009EE2]">Fletes</span> en un solo lugar
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Conéctate con transportistas verificados para tus necesidades de mudanza y envío de forma rápida y segura.
          </p>
          
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
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="relative rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#009EE2]/80 to-[#DB2851]/80 mix-blend-multiply"></div>
            <img 
              src="https://images.unsplash.com/photo-1600023622007-8b2162dab098?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Servicios de mudanza" 
              className="w-full h-[400px] object-cover object-center"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white text-center drop-shadow-lg">
                Mudanzas Profesionales
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
