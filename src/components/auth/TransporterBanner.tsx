
import { Check } from 'lucide-react';

const TransporterBanner = () => (
  <div className="max-w-md text-white">
    <h2 className="text-3xl font-bold mb-6">Únete a nuestra red de transportistas</h2>
    <p className="mb-8 text-lg">
      Forma parte de la comunidad de transportistas profesionales y accede a nuevas oportunidades de trabajo.
    </p>
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="bg-white/20 rounded-full p-1 mr-4">
          <Check className="h-5 w-5" />
        </div>
        <span className="text-lg">Recibe solicitudes de servicios</span>
      </div>
      <div className="flex items-center">
        <div className="bg-white/20 rounded-full p-1 mr-4">
          <Check className="h-5 w-5" />
        </div>
        <span className="text-lg">Pagos seguros y puntuales</span>
      </div>
      <div className="flex items-center">
        <div className="bg-white/20 rounded-full p-1 mr-4">
          <Check className="h-5 w-5" />
        </div>
        <span className="text-lg">Flexibilidad de horarios</span>
      </div>
      <div className="flex items-center">
        <div className="bg-white/20 rounded-full p-1 mr-4">
          <Check className="h-5 w-5" />
        </div>
        <span className="text-lg">Soporte personalizado 24/7</span>
      </div>
    </div>
  </div>
);

export default TransporterBanner;
