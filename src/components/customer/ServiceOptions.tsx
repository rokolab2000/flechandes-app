
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Package as PackageIcon, Truck, Users } from 'lucide-react';

// Service option types
export type ServiceType = 'moving' | 'freight' | 'delivery';

interface ServiceOptionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  iconColor: string;
  serviceType: ServiceType;
}

const ServiceOptions = () => {
  const navigate = useNavigate();
  
  // Service options data
  const serviceOptions: ServiceOptionProps[] = [
    {
      title: "Mudanzas",
      description: "Servicio completo para trasladar tus pertenencias de manera segura",
      icon: Users,
      color: "bg-[#009EE2]/10",
      iconColor: "text-[#009EE2]",
      serviceType: 'moving'
    },
    {
      title: "Fletes",
      description: "Transporte de objetos grandes y pequeños a cualquier destino",
      icon: Truck,
      color: "bg-[#DB2851]/10",
      iconColor: "text-[#DB2851]",
      serviceType: 'freight'
    },
    {
      title: "Envíos",
      description: "Envío rápido y seguro de paquetes y documentos",
      icon: PackageIcon,
      color: "bg-[#46A358]/10",
      iconColor: "text-[#46A358]",
      serviceType: 'delivery'
    }
  ];

  const handleServiceClick = (serviceType: ServiceType) => {
    navigate('/customer/new-service', { state: { serviceType } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {serviceOptions.map((service, index) => (
        <Card 
          key={index} 
          className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          onClick={() => handleServiceClick(service.serviceType)}
        >
          <CardHeader className="pb-2">
            <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-2`}>
              <service.icon className={`h-6 w-6 ${service.iconColor}`} />
            </div>
            <CardTitle className="text-lg">{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm">
              {service.description}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-[#DB2851] hover:bg-[#c11f45]"
            >
              Solicitar {service.title}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ServiceOptions;
