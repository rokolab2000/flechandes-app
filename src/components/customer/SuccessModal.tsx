
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
}

const SuccessModal = ({ isOpen, onClose, serviceType }: SuccessModalProps) => {
  const getServiceName = () => {
    switch (serviceType) {
      case 'moving': return 'mudanza';
      case 'freight': return 'flete';
      case 'delivery': return 'envío';
      default: return 'servicio';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <DialogTitle className="text-lg font-semibold">
                ¡Tu solicitud de {getServiceName()} se realizó exitosamente!
              </DialogTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-gray-600 mb-4">
            Ahora puedes elegir tu flechandes o encontraremos el que mejor se ajuste a tus necesidades y lo asignamos.
          </p>
          
          <Button 
            onClick={onClose}
            className="w-full bg-[#DB2851] hover:bg-[#c11f45]"
          >
            Ver transportistas disponibles
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
