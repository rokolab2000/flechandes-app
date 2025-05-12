
import { Package, Clock, Calendar } from 'lucide-react';

interface StatsOverviewProps {
  totalServices: number;
  pendingServices: number;
  upcomingServices: number;
  completedServices: number;
}

const StatsOverview = ({
  totalServices,
  pendingServices,
  upcomingServices,
  completedServices
}: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-move-blue-100 p-2 rounded-lg">
            <Package className="h-5 w-5 text-move-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Servicios</p>
            <p className="text-xl font-semibold">{totalServices}</p>
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
            <p className="text-xl font-semibold">{pendingServices}</p>
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
            <p className="text-xl font-semibold">{upcomingServices}</p>
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
            <p className="text-xl font-semibold">{completedServices}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
