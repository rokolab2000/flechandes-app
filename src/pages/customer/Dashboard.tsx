
import { useState } from 'react';
import { PlusCircle, Package, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import MobileNavbar from '@/components/MobileNavbar';
import ServiceCard from '@/components/ServiceCard';
import Map from '@/components/Map';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package as PackageIcon, Truck, Users } from 'lucide-react';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'map' | 'upcoming' | 'past'>('map');
  
  // Datos de ejemplo para servicios
  const upcomingServices = [
    {
      id: '1',
      title: 'Mudanza de Casa',
      type: 'moving' as const,
      status: 'confirmed' as const,
      price: 299.99,
      origin: '123 Calle Principal, Madrid',
      destination: '456 Avenida Parque, Madrid',
      date: '15 Jun, 2024',
      time: '09:00 AM'
    },
    {
      id: '2',
      title: 'Entrega de Muebles',
      type: 'delivery' as const,
      status: 'pending' as const,
      price: 89.99,
      origin: 'IKEA Madrid',
      destination: '123 Calle Principal, Madrid',
      date: '18 Jun, 2024',
      time: '14:00 PM'
    }
  ];
  
  const pastServices = [
    {
      id: '3',
      title: 'Mudanza de Oficina',
      type: 'moving' as const,
      status: 'completed' as const,
      price: 450.00,
      origin: '789 Bulevar Oficina, Madrid',
      destination: '101 Calle Trabajo, Madrid',
      date: '22 May, 2024',
      time: '08:00 AM'
    }
  ];

  // Datos para las tarjetas de servicio
  const serviceOptions = [
    {
      title: "Mudanzas",
      description: "Servicio completo para trasladar tus pertenencias de manera segura",
      icon: Users,
      color: "bg-[#009EE2]/10",
      iconColor: "text-[#009EE2]",
      serviceType: 'moving' as const
    },
    {
      title: "Fletes",
      description: "Transporte de objetos grandes y pequeños a cualquier destino",
      icon: Truck,
      color: "bg-[#DB2851]/10",
      iconColor: "text-[#DB2851]",
      serviceType: 'freight' as const
    },
    {
      title: "Envíos",
      description: "Envío rápido y seguro de paquetes y documentos",
      icon: PackageIcon,
      color: "bg-[#46A358]/10",
      iconColor: "text-[#46A358]",
      serviceType: 'delivery' as const
    }
  ];

  const handleServiceClick = (serviceType: 'moving' | 'freight' | 'delivery') => {
    navigate('/customer/new-service', { state: { serviceType } });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto max-w-4xl flex justify-between items-center">
          <Logo size="md" />
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-move-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-move-blue-700">JD</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-6 mb-20">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Hola, Juan</h1>
          <p className="text-gray-600">Bienvenido a tu panel de control</p>
        </div>
        
        {/* Service Cards - Replacing the search bar */}
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
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-move-blue-100 p-2 rounded-lg">
                <Package className="h-5 w-5 text-move-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Servicios</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pendientes</p>
                <p className="text-xl font-semibold">1</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Próximos</p>
                <p className="text-xl font-semibold">2</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completados</p>
                <p className="text-xl font-semibold">1</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map and Services Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'map' 
                  ? 'text-move-blue-600 border-b-2 border-move-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('map')}
            >
              Mapa
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'upcoming' 
                  ? 'text-move-blue-600 border-b-2 border-move-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Servicios Próximos
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'past' 
                  ? 'text-move-blue-600 border-b-2 border-move-blue-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Servicios Pasados
            </button>
          </div>
          
          {/* Content */}
          <div>
            {activeTab === 'map' ? (
              <div className="h-[500px]">
                <Map isCustomer={true} showSearchBox={true} />
              </div>
            ) : (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeTab === 'upcoming' ? (
                    upcomingServices.length > 0 ? (
                      upcomingServices.map((service) => (
                        <ServiceCard
                          key={service.id}
                          {...service}
                          onClick={() => navigate(`/customer/service/${service.id}`)}
                        />
                      ))
                    ) : (
                      <div className="col-span-2 py-8 text-center text-gray-500">
                        No hay servicios próximos
                      </div>
                    )
                  ) : (
                    pastServices.length > 0 ? (
                      pastServices.map((service) => (
                        <ServiceCard
                          key={service.id}
                          {...service}
                          onClick={() => navigate(`/customer/service/${service.id}`)}
                        />
                      ))
                    ) : (
                      <div className="col-span-2 py-8 text-center text-gray-500">
                        No hay servicios pasados
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavbar />
    </div>
  );
};

export default CustomerDashboard;
