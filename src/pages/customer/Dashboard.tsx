
import { useState } from 'react';
import { PlusCircle, Package, Clock, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import MobileNavbar from '@/components/MobileNavbar';
import ServiceCard from '@/components/ServiceCard';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
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
        
        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Buscar servicios" 
              className="pl-10"
            />
          </div>
          
          <Button 
            className="bg-move-blue-500 hover:bg-move-blue-600 flex items-center gap-2"
            onClick={() => navigate('/customer/new-service')}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Nuevo Servicio</span>
          </Button>
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
        
        {/* Services */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
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
          
          {/* Service Cards */}
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
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavbar />
    </div>
  );
};

export default CustomerDashboard;
