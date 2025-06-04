
import { Package, Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import VehicleSelector from './VehicleSelector';

const ServicesSection = () => {
  const navigate = useNavigate();
  const [selectedVehicles, setSelectedVehicles] = useState({
    moving: 'furgon',
    freight: 'furgon'
  });

  const handleVehicleChange = (service: string, value: string) => {
    setSelectedVehicles(prev => ({
      ...prev,
      [service]: value
    }));
  };

  const handleServiceRequest = (serviceType: 'moving' | 'freight') => {
    navigate('/customer/new-service', { state: { serviceType, step: 1 } });
  };

  const services = [
    {
      title: "Mudanzas",
      description: "Servicio completo para trasladar tus pertenencias de manera segura",
      icon: Users,
      features: [
        "Embalaje profesional",
        "Carga y descarga",
        "Transporte seguro",
        "Desarmado y armado de muebles"
      ],
      color: "bg-[#009EE2]/10",
      iconColor: "text-[#009EE2]",
      vehicleSelector: true,
      serviceKey: 'moving',
      serviceType: 'moving'
    },
    {
      title: "Fletes",
      description: "Transporte de objetos grandes y pequeños a cualquier destino",
      icon: Truck,
      features: [
        "Entregas el mismo día",
        "Vehículos de diferentes tamaños",
        "Conductores profesionales",
        "Seguimiento en tiempo real"
      ],
      color: "bg-[#DB2851]/10",
      iconColor: "text-[#DB2851]",
      vehicleSelector: true,
      serviceKey: 'freight',
      serviceType: 'freight'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white" id="servicios">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofrecemos soluciones completas para todas tus necesidades de transporte y mudanza
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-5`}>
                <service.icon className={`h-8 w-8 ${service.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-5 min-h-[50px]">
                {service.description}
              </p>
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <span className={`w-2 h-2 ${service.iconColor} rounded-full mr-2`} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {service.vehicleSelector && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Elige el tipo de vehículo:</p>
                  <VehicleSelector
                    value={selectedVehicles[service.serviceKey]}
                    onValueChange={(value) => handleVehicleChange(service.serviceKey, value)}
                    className="w-full"
                    serviceType={service.serviceType as 'moving' | 'freight'}
                  />
                </div>
              )}
              
              <Button 
                className={`w-full bg-[#DB2851] hover:bg-[#c11f45]`}
                onClick={() => handleServiceRequest(service.serviceType as 'moving' | 'freight')}
              >
                Solicitar {service.title}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
