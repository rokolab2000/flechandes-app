
import { TrendingUp, DollarSign, CheckCircle, Clock } from 'lucide-react';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-move-green-100 p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-move-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Tu Calificación</p>
            <p className="text-xl font-semibold">4.9/5</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-move-blue-100 p-2 rounded-lg">
            <DollarSign className="h-5 w-5 text-move-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Ganancias</p>
            <p className="text-xl font-semibold">€1,250</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completados</p>
            <p className="text-xl font-semibold">12</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">En Progreso</p>
            <p className="text-xl font-semibold">1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
