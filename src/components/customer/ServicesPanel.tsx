
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import Map from '@/components/Map';
import { ServiceProps } from '@/components/ServiceCard';

interface ServicesPanelProps {
  upcomingServices: ServiceProps[];
  pastServices: ServiceProps[];
}

const ServicesPanel = ({ upcomingServices, pastServices }: ServicesPanelProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'map' | 'upcoming' | 'past'>('map');

  return (
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
  );
};

export default ServicesPanel;
