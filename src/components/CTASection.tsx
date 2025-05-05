
import { useNavigate } from 'react-router-dom';
import { Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const navigate = useNavigate();

  const handleDriverRegistration = () => {
    navigate('/login', { state: { userType: 'driver', isRegistering: true } });
  };

  const handleClientRegistration = () => {
    navigate('/login', { state: { userType: 'shipping', isRegistering: true } });
  };

  return (
    <>
      <section className="py-16 px-4 bg-gradient-to-br from-[#009EE2]/10 to-[#009EE2]/20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-6 border border-[#009EE2]/10">
            <div className="flex justify-center mb-4">
              <Truck className="h-12 w-12 text-[#009EE2]" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              ¿Eres <span className="text-[#009EE2]">Transportista</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Únete a Flechandes y transforma tu negocio de transporte y mudanzas. 
              Conecta con clientes, gestiona tus servicios y aumenta tus ingresos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#DB2851] hover:bg-[#c11f45] text-white py-6 px-8 rounded-lg text-lg shadow-lg flex items-center gap-2" 
                onClick={handleDriverRegistration}
              >
                <Truck className="h-6 w-6" />
                Registrarse como Transportista
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#009EE2]/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para simplificar tu mudanza?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos que han hecho su experiencia de mudanza sin estrés con Flechandes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-[#DB2851] hover:bg-[#c11f45] text-white py-6 px-8 rounded-lg text-lg shadow-lg flex items-center gap-2" 
              onClick={handleClientRegistration}
            >
              <Users className="h-6 w-6" />
              Registrarse como Cliente
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;
