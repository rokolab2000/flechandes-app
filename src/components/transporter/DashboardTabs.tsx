
import { useState, useEffect } from 'react';
import Map from '@/components/Map';
import ServiceCard from '@/components/ServiceCard';
import ServiceDetailModal from '@/components/transporter/ServiceDetailModal';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface DashboardTabsProps {
  availableServices: any[];
  acceptedServices: any[];
}

const DashboardTabs = ({ availableServices, acceptedServices }: DashboardTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'map' | 'available' | 'accepted'>('map');
  const [routeData, setRouteData] = useState<{ origin: string; destination: string } | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
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

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
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
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'available' 
                ? 'text-move-green-600 border-b-2 border-move-green-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('available')}
          >
            Trabajos Disponibles
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'accepted' 
                ? 'text-move-green-600 border-b-2 border-move-green-500' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('accepted')}
          >
            Mis Trabajos
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTab === 'available' ? (
                  availableServices.length > 0 ? (
                    availableServices.map((service) => (
                      <div key={service.id} className="relative">
                        <ServiceCard
                          {...service}
                          onClick={() => navigate(`/transporter/job/${service.id}`)}
                        />
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedService(service);
                              setIsDetailModalOpen(true);
                            }}
                          >
                            Ver Detalles
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab('map');
                              setRouteData({ origin: service.origin, destination: service.destination });
                            }}
                          >
                            Ver en Mapa
                          </Button>
                          <Button className="bg-move-green-500 hover:bg-move-green-600">
                            Aceptar Trabajo
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 py-8 text-center text-gray-500">
                      No hay trabajos disponibles en tu área
                    </div>
                  )
                ) : (
                  acceptedServices.length > 0 ? (
                    acceptedServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        {...service}
                        onClick={() => navigate(`/transporter/job/${service.id}`)}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 py-8 text-center text-gray-500">
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
