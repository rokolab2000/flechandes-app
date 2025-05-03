
import { Check } from 'lucide-react';

const ClientBanner = () => (
  <div className="max-w-md text-white">
    <h2 className="text-3xl font-bold mb-6">Mudanzas simplificadas</h2>
    <p className="mb-8 text-lg">
      Conectamos a transportistas profesionales con clientes que necesitan servicios de mudanza y fletes.
    </p>
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="bg-white/20 rounded-full p-1 mr-4">
          <Check className="h-5 w-5" />
        </div>
        <span className="text-lg">Servicio rápido y confiable</span>
      </div>
      <div className="flex items-center">
        <div className="bg-white/20 rounded-full p-1 mr-4">
          <Check className="h-5 w-5" />
        </div>
        <span className="text-lg">Procesamiento de pagos seguro</span>
      </div>
      <div className="flex items-center">
        <div className="bg-white/20 rounded-full p-1 mr-4">
          <Check className="h-5 w-5" />
        </div>
        <span className="text-lg">Transportistas verificados</span>
      </div>
      <div className="flex items-center">
        <div className="bg-white/20 rounded-full p-1 mr-4">
          <Check className="h-5 w-5" />
        </div>
        <span className="text-lg">Seguimiento en tiempo real</span>
      </div>
    </div>
  </div>
);

export default ClientBanner;
