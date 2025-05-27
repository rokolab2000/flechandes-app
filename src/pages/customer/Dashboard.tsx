
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MobileNavbar from '@/components/MobileNavbar';
import DashboardHeader from '@/components/customer/DashboardHeader';
import ServiceOptions from '@/components/customer/ServiceOptions';
import StatsOverview from '@/components/customer/StatsOverview';
import ServicesPanel from '@/components/customer/ServicesPanel';
import SuccessModal from '@/components/customer/SuccessModal';
import TransportersList from '@/components/customer/TransportersList';
import Map from '@/components/Map';
import { ServiceProps } from '@/components/ServiceCard';

const CustomerDashboard = () => {
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTransportersList, setShowTransportersList] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [routeData, setRouteData] = useState(null);

  // Check if we need to show success modal from navigation state
  useEffect(() => {
    if (location.state?.showSuccessModal) {
      setShowSuccessModal(true);
      setServiceData(location.state.serviceData);
      setRouteData(location.state.routeData);
    }
  }, [location.state]);

  // Mock data for services
  const upcomingServices: ServiceProps[] = [
    {
      id: '1',
      title: 'Mudanza de Casa',
      type: 'moving',
      status: 'confirmed',
      price: 299.99,
      origin: '123 Calle Principal, Madrid',
      destination: '456 Avenida Parque, Madrid',
      date: '15 Jun, 2024',
      time: '09:00 AM'
    },
    {
      id: '2',
      title: 'Entrega de Muebles',
      type: 'delivery',
      status: 'pending',
      price: 89.99,
      origin: 'IKEA Madrid',
      destination: '123 Calle Principal, Madrid',
      date: '18 Jun, 2024',
      time: '14:00 PM'
    }
  ];
  
  const pastServices: ServiceProps[] = [
    {
      id: '3',
      title: 'Mudanza de Oficina',
      type: 'moving',
      status: 'completed',
      price: 450.00,
      origin: '789 Bulevar Oficina, Madrid',
      destination: '101 Calle Trabajo, Madrid',
      date: '22 May, 2024',
      time: '08:00 AM'
    }
  ];

  // Calculate stats from services
  const totalServices = upcomingServices.length + pastServices.length;
  const pendingServices = upcomingServices.filter(s => s.status === 'pending').length;
  const upcomingCount = upcomingServices.length;
  const completedServices = pastServices.filter(s => s.status === 'completed').length;

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setShowTransportersList(true);
  };

  const handleTransporterSelect = (transporter: any) => {
    setSelectedTransporter(transporter);
    setShowTransportersList(false);
    // Update route data to show vehicle tracking
    setRouteData({
      ...routeData,
      showVehicleTracking: true,
      selectedTransporter: transporter
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader userInitials="JD" />
      
      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-6 mb-20">
        {/* Success Modal */}
        <SuccessModal 
          isOpen={showSuccessModal}
          onClose={handleCloseSuccessModal}
          serviceType={serviceData?.type || 'moving'}
        />

        {/* Transporters List Modal/Section */}
        {showTransportersList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
              <TransportersList onTransporterSelect={handleTransporterSelect} />
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Hola, Juan</h1>
          <p className="text-gray-600">Bienvenido a tu panel de control</p>
        </div>
        
        {/* Service Options */}
        <ServiceOptions />
        
        {/* Quick Stats */}
        <StatsOverview 
          totalServices={totalServices}
          pendingServices={pendingServices}
          upcomingServices={upcomingCount}
          completedServices={completedServices}
        />
        
        {/* Map and Services Tabs */}
        {selectedTransporter ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-800">Seguimiento en tiempo real</h3>
              <p className="text-sm text-gray-600">
                {selectedTransporter.name} va en camino a tu ubicación de origen
              </p>
            </div>
            <div className="h-96">
              <Map 
                showSearchBox={false}
                routeData={routeData}
                isCustomer={true}
              />
            </div>
          </div>
        ) : (
          <ServicesPanel 
            upcomingServices={upcomingServices}
            pastServices={pastServices}
          />
        )}
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavbar />
    </div>
  );
};

export default CustomerDashboard;
