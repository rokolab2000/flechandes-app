
import ServicesTabs from '@/components/customer/ServicesTabs';
import { ServiceProps } from '@/components/ServiceCard';

interface ServicesPanelProps {
  upcomingServices: ServiceProps[];
  pastServices: ServiceProps[];
}

const ServicesPanel = ({ upcomingServices, pastServices }: ServicesPanelProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <ServicesTabs
        upcomingServices={upcomingServices}
        pastServices={pastServices}
      />
    </div>
  );
};

export default ServicesPanel;
