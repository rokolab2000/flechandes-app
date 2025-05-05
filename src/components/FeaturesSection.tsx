
import { motion } from 'framer-motion';
import { Truck, Shield, Clock, Star } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-transporter-DEFAULT" />,
      title: 'Transportistas Verificados',
      description: 'Conéctate con transportistas verificados para todas tus necesidades de mudanza'
    },
    {
      icon: <Shield className="h-8 w-8 text-transporter-DEFAULT" />,
      title: 'Seguro Incluido',
      description: 'Todas nuestras mudanzas incluyen seguro para tu tranquilidad'
    },
    {
      icon: <Clock className="h-8 w-8 text-transporter-DEFAULT" />,
      title: 'Disponibilidad 24/7',
      description: 'Programa servicios a tu conveniencia con disponibilidad en tiempo real'
    },
    {
      icon: <Star className="h-8 w-8 text-transporter-DEFAULT" />,
      title: 'Reseñas Verificadas',
      description: 'Consulta calificaciones y opiniones de otros clientes'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="py-16 px-4 bg-white" id="caracteristicas">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Por qué elegir <span className="text-transporter-DEFAULT">Flechandes</span>
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="flex p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="mr-4">{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
