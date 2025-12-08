import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import Map from '@/components/Map';
import SmartOfferCard from '@/components/transporter/SmartOfferCard';
import ServiceDetailModal from '@/components/transporter/ServiceDetailModal';
import { TransporterService } from '@/hooks/useTransporterServices';

interface DashboardTabsProps {
  availableServices: TransporterService[];
  acceptedServices: TransporterService[];
}

const DashboardTabs = ({ availableServices, acceptedServices }: DashboardTabsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'map' | 'available' | 'accepted'>('available');
  const [routeData, setRouteData] = useState<{ origin: string; destination: string } | null>(null);
  const [selectedService, setSelectedService] = useState<TransporterService | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Check if we should display a route on the map
  useEffect(() => {
    if (location.state && location.state.showRoute && location.state.routeData) {
      setActiveTab('map');
      setRouteData(location.state.routeData);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleAccept = (id: string) => {
    toast.success('¡Trabajo aceptado!', {
      description: 'El cliente será notificado de tu aceptación.'
    });
  };

  const handleReject = (id: string) => {
    toast.info('Trabajo rechazado', {
      description: 'El trabajo ha sido removido de tu lista.'
    });
  };

  const handleCounterOffer = (id: string) => {
    toast.info('Función próximamente', {
      description: 'La función de contraoferta estará disponible pronto.'
    });
  };

  const handleViewDetails = (service: TransporterService) => {
    setSelectedService(service);
    setIsDetailModalOpen(true);
  };

  const handleViewMap = (service: TransporterService) => {
    setActiveTab('map');
    setRouteData({ origin: service.origin, destination: service.destination });
  };

  return (
    <>
      <div className="bg-background rounded-lg shadow-sm border overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'available' 
                ? 'text-primary border-b-2 border-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            onClick={() => setActiveTab('available')}
          >
            Trabajos Disponibles
            {availableServices.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {availableServices.length}
              </span>
            )}
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'accepted' 
                ? 'text-primary border-b-2 border-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            onClick={() => setActiveTab('accepted')}
          >
            Mis Trabajos
            {acceptedServices.length > 0 && (
              <span className="ml-2 bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                {acceptedServices.length}
              </span>
            )}
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'map' 
                ? 'text-primary border-b-2 border-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeTab === 'available' ? (
                  availableServices.length > 0 ? (
                    availableServices.map((service) => (
                      <SmartOfferCard
                        key={service.id}
                        service={service}
                        onAccept={handleAccept}
                        onReject={handleReject}
                        onCounterOffer={handleCounterOffer}
                        onViewDetails={handleViewDetails}
                        onViewMap={handleViewMap}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center text-muted-foreground">
                      <p className="text-lg mb-2">No hay trabajos disponibles en tu área</p>
                      <p className="text-sm">Revisa más tarde o amplía tu zona de cobertura</p>
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
                        onCounterOffer={handleCounterOffer}
                        onViewDetails={handleViewDetails}
                        onViewMap={handleViewMap}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 py-12 text-center text-muted-foreground">
                      <p className="text-lg mb-2">No has aceptado ningún trabajo aún</p>
                      <p className="text-sm">Revisa los trabajos disponibles y acepta uno</p>
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
        onAccept={handleAccept}
        onReject={handleReject}
        onCounterOffer={handleCounterOffer}
      />
    </>
  );
};

export default DashboardTabs;
