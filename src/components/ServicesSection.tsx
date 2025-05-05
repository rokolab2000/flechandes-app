
import { Package, Truck, Users, Bike, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import VehicleSelector from './VehicleSelector';

const ServicesSection = () => {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState('bike');

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
      color: "bg-transporter-DEFAULT/10",
      iconColor: "text-transporter-DEFAULT",
      buttonColor: "client"
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
      color: "bg-client-DEFAULT/10",
      iconColor: "text-client-DEFAULT",
      buttonColor: "transporter"
    },
    {
      title: "Envíos",
      description: "Envío rápido y seguro de paquetes y documentos",
      icon: Package,
      features: [
        "Envíos express",
        "Embalaje seguro",
        "Seguimiento en línea",
        "Cobertura nacional"
      ],
      color: "bg-[#46A358]/10",
      iconColor: "text-[#46A358]",
      vehicleSelector: true,
      buttonColor: "client"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    value={selectedVehicle}
                    onValueChange={setSelectedVehicle}
                    className="w-full"
                  />
                </div>
              )}
              
              <Button 
                className={`w-full bg-${service.buttonColor}-DEFAULT hover:bg-${service.buttonColor}-hover`}
                onClick={() => navigate('/login')}
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
