
import { Truck, Calendar, Check, User } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
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
      title: "Recibe ofertas",
      description: "Los transportistas cercanos te enviarán sus mejores precios",
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

  return (
    <section className="py-16 px-4 bg-gray-50" id="como-funciona">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            En simples pasos, consigue el servicio de transporte que necesitas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
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
      </div>
    </section>
  );
};

export default HowItWorksSection;
