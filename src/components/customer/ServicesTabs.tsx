
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import Map from '@/components/Map';
import { ServiceProps } from '@/components/ServiceCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ServicesTabsProps {
  upcomingServices: ServiceProps[];
  pastServices: ServiceProps[];
}

const ServicesTabs = ({ upcomingServices, pastServices }: ServicesTabsProps) => {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue="map" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="map">Mapa</TabsTrigger>
        <TabsTrigger value="upcoming">Servicios Próximos</TabsTrigger>
        <TabsTrigger value="past">Servicios Pasados</TabsTrigger>
      </TabsList>
      
      <TabsContent value="map">
        <div className="h-[500px]">
          <Map isCustomer={true} showSearchBox={true} />
        </div>
      </TabsContent>
      
      <TabsContent value="upcoming">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingServices.length > 0 ? (
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
            )}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="past">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastServices.length > 0 ? (
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
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ServicesTabs;
