import { useState, useEffect } from 'react';
import Map from '@/components/Map';
import SmartOfferCard, { type SmartOfferService } from '@/components/transporter/SmartOfferCard';
import ServiceDetailModal from '@/components/transporter/ServiceDetailModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface DashboardTabsProps {
  availableServices: SmartOfferService[];
  acceptedServices: SmartOfferService[];
}

const DashboardTabs = ({ availableServices, acceptedServices }: DashboardTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'map' | 'available' | 'accepted'>('available');
  const [routeData, setRouteData] = useState<{ origin: string; destination: string } | null>(null);
  const [selectedService, setSelectedService] = useState<SmartOfferService | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Check if we should display a route on the map
  useEffect(() => {
    if (location.state && location.state.showRoute && location.state.routeData) {
      setActiveTab('map');
      setRouteData(location.state.routeData);
      
      // Clear the location state after using it
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleAccept = (id: string) => {
    toast.success('Trabajo aceptado! Te notificaremos cuando el cliente confirme.');
  };

  const handleReject = (id: string) => {
    toast.info('Trabajo rechazado');
  };

  const handleViewMap = (service: SmartOfferService) => {
    setActiveTab('map');
    setRouteData({ origin: service.origin, destination: service.destination });
  };

  const handleViewDetails = (service: SmartOfferService) => {
    setSelectedService(service);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'available' 
                ? 'text-move-green-600 border-b-2 border-move-green-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('available')}
          >
            Trabajos Disponibles ({availableServices.length})
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'accepted' 
                ? 'text-move-green-600 border-b-2 border-move-green-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('accepted')}
          >
            Mis Trabajos ({acceptedServices.length})
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'map' 
                ? 'text-move-green-600 border-b-2 border-move-green-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('map')}
          >
            Mapa
          </button>
        </div>
        
        {/* Content */}
        <div>
          {activeTab === 'map' ? (
            <div className="h-[500px]">
              <Map 
                isCustomer={false} 
                showSearchBox={false}
                routeData={routeData}
              />
            </div>
          ) : (
            <div className="p-4">
              <div className="grid grid-cols-1 gap-4">
                {activeTab === 'available' ? (
                  availableServices.length > 0 ? (
                    availableServices.map((service) => (
                      <SmartOfferCard
                        key={service.id}
                        service={service}
                        onAccept={handleAccept}
                        onReject={handleReject}
                        onViewMap={handleViewMap}
                        onViewDetails={handleViewDetails}
                      />
                    ))
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      No hay trabajos disponibles en tu área
                    </div>
                  )
                ) : (
                  acceptedServices.length > 0 ? (
                    acceptedServices.map((service) => (
                      <SmartOfferCard
                        key={service.id}
                        service={service}
                        onAccept={handleAccept}
                        onReject={handleReject}
                        onViewMap={handleViewMap}
                        onViewDetails={handleViewDetails}
                      />
                    ))
                  ) : (
                    <div className="py-8 text-center text-gray-500">
                      No has aceptado ningún trabajo aún
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedService(null);
        }}
      />
    </>
  );
};

export default DashboardTabs;
