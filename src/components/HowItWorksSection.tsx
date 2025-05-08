
import { Truck, Calendar, Check, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HowItWorksSection = () => {
  const userSteps = [
    {
      title: "Selecciona el servicio",
      description: "Elige entre mudanzas, fletes o envíos según tus necesidades",
      icon: Truck,
      color: "bg-[#DB2851]/10",
      iconColor: "text-[#DB2851]",
    },
    {
      title: "Programa la fecha",
      description: "Selecciona cuándo necesitas el servicio y especifica tu ubicación",
      icon: Calendar,
      color: "bg-[#009EE2]/10",
      iconColor: "text-[#009EE2]",
    },
    {
      title: "Envía tu oferta",
      description: "Propón el precio que estás dispuesto a pagar por el servicio",
      icon: User,
      color: "bg-[#46A358]/10",
      iconColor: "text-[#46A358]",
    },
    {
      title: "Disfruta del servicio",
      description: "Confirma tu elección y disfruta de un servicio de calidad",
      icon: Check,
      color: "bg-[#DB2851]/10",
      iconColor: "text-[#DB2851]",
    },
  ];

  const transporterSteps = [
    {
      title: "Regístrate como transportista",
      description: "Crea tu perfil detallando tus vehículos y experiencia",
      icon: User,
      color: "bg-[#009EE2]/10",
      iconColor: "text-[#009EE2]",
    },
    {
      title: "Recibe solicitudes",
      description: "Obtén notificaciones de usuarios que necesitan servicios en tu zona",
      icon: Calendar,
      color: "bg-[#46A358]/10",
      iconColor: "text-[#46A358]",
    },
    {
      title: "Recibe ofertas",
      description: "Los usuarios te enviarán sus ofertas para que evalúes",
      icon: Truck,
      color: "bg-[#DB2851]/10",
      iconColor: "text-[#DB2851]",
    },
    {
      title: "Completa el servicio",
      description: "Realiza el transporte y recibe el pago y calificación del cliente",
      icon: Check,
      color: "bg-[#46A358]/10",
      iconColor: "text-[#46A358]",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50" id="como-funciona">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Nuestra plataforma conecta a quienes necesitan servicios de transporte con transportistas profesionales
          </p>

          <Tabs defaultValue="users" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 w-[400px] mx-auto mb-8">
              <TabsTrigger value="users">Para solicitantes</TabsTrigger>
              <TabsTrigger value="transporters">Para transportistas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {userSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                        <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                      </div>
                      <span className="text-4xl font-bold text-gray-300">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="transporters" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {transporterSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                        <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                      </div>
                      <span className="text-4xl font-bold text-gray-300">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
