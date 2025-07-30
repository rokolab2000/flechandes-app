import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPin, Clock, Package, User, Phone, Mail } from 'lucide-react';

interface ServiceDetailModalProps {
  service: {
    id: string;
    title: string;
    type: 'moving' | 'delivery' | 'freight';
    status: 'pending' | 'confirmed' | 'in-progress' | 'completed';
    price: number;
    origin: string;
    destination: string;
    date: string;
    time: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailModal = ({ service, isOpen, onClose }: ServiceDetailModalProps) => {
  if (!service) return null;

  // Status translations
  const statusTranslations = {
    'pending': 'Pendiente',
    'confirmed': 'Confirmado',
    'in-progress': 'En progreso',
    'completed': 'Completado',
  };

  // Type translations and details
  const typeDetails = {
    'moving': {
      name: 'Mudanza',
      description: 'Traslado completo de vivienda u oficina',
      items: ['Muebles', 'Electrodomésticos', 'Cajas', 'Objetos frágiles']
    },
    'delivery': {
      name: 'Entrega',
      description: 'Entrega de paquetes y productos',
      items: ['Paquetes', 'Documentos', 'Productos varios']
    },
    'freight': {
      name: 'Carga',
      description: 'Transporte de mercancía pesada',
      items: ['Equipamiento', 'Maquinaria', 'Materiales', 'Carga pesada']
    },
  };

  const serviceType = typeDetails[service.type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{service.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Service Type and Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <span className="font-medium">{serviceType.name}</span>
            </div>
            <Badge variant="outline">
              {statusTranslations[service.status]}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium mb-2">Descripción del Servicio</h3>
            <p className="text-muted-foreground">{serviceType.description}</p>
          </div>

          {/* Route Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Origen
              </h3>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                {service.origin}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Destino
              </h3>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                {service.destination}
              </p>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Fecha
              </h3>
              <p className="text-sm text-muted-foreground">{service.date}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Hora
              </h3>
              <p className="text-sm text-muted-foreground">{service.time}</p>
            </div>
          </div>

          {/* Items to Transport */}
          <div>
            <h3 className="font-medium mb-2">Elementos a Transportar</h3>
            <div className="flex flex-wrap gap-2">
              {serviceType.items.map((item, index) => (
                <Badge key={index} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="font-medium mb-3">Información del Cliente</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Ana García Martínez</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+34 612 345 678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>ana.garcia@email.com</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Precio del Servicio</span>
              <span className="text-2xl font-bold text-primary">€{service.price.toFixed(2)}</span>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <h3 className="font-medium mb-2">Notas Adicionales</h3>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              {service.type === 'moving' 
                ? 'Apartamento de 2 habitaciones en tercer piso sin ascensor. Se requiere especial cuidado con piano vertical.'
                : service.type === 'delivery'
                ? 'Entrega en horario de oficina. Contactar 30 minutos antes de llegar.'
                : 'Equipo pesado, se requiere montacargas. Acceso por entrada trasera del edificio.'
              }
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;