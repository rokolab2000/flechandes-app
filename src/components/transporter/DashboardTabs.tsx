
import { useState } from 'react';
import Map from '@/components/Map';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface DashboardTabsProps {
  availableServices: any[];
  acceptedServices: any[];
}

const DashboardTabs = ({ availableServices, acceptedServices }: DashboardTabsProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'map' | 'available' | 'accepted'>('map');

  return (
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
            <Map isCustomer={false} showSearchBox={false} />
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
                      <div className="absolute bottom-4 right-4">
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
  );
};

export default DashboardTabs;
