
import { Package, Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Mudanzas",
      description: "Servicio completo de mudanzas para hogares y oficinas",
      icon: Users,
      features: [
        "Embalaje profesional",
        "Carga y descarga",
        "Transporte seguro",
        "Desarmado y armado de muebles"
      ]
    },
    {
      title: "Fletes",
      description: "Transporte de objetos grandes y pequeños",
      icon: Truck,
      features: [
        "Entregas el mismo día",
        "Vehículos de diferentes tamaños",
        "Conductores profesionales",
        "Seguimiento en tiempo real"
      ]
    },
    {
      title: "Envíos",
      description: "Envío de paquetes y documentos",
      icon: Package,
      features: [
        "Envíos express",
        "Embalaje seguro",
        "Seguimiento en línea",
        "Cobertura nacional"
      ]
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
              <div className="bg-[#009EE2]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <service.icon className="h-7 w-7 text-[#009EE2]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-[#009EE2] rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-[#DB2851] hover:bg-[#c11f45]"
                onClick={() => navigate('/login')}
              >
                Solicitar Servicio
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
