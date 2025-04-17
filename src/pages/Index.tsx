import { useNavigate } from 'react-router-dom';
import { CalendarDays, Truck, Map, Star, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Truck className="h-8 w-8 text-move-blue-500" />,
      title: 'Encuentra Transportistas Confiables',
      description: 'Conéctate con transportistas verificados para todas tus necesidades de mudanza'
    },
    {
      icon: <CalendarDays className="h-8 w-8 text-move-blue-500" />,
      title: 'Reserva Cuando Necesites',
      description: 'Programa servicios a tu conveniencia con disponibilidad en tiempo real'
    },
    {
      icon: <Map className="h-8 w-8 text-move-blue-500" />,
      title: 'Rastrea Tu Mudanza',
      description: 'Sigue tu envío con actualizaciones de ubicación en tiempo real'
    },
    {
      icon: <Star className="h-8 w-8 text-move-blue-500" />,
      title: 'Reseñas Confiables',
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
    <div className="min-h-screen flex flex-col font-halvar">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-[#f0f0f0] py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Logo size="lg" className="mx-auto mb-6" />
          
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Mudanzas <span className="text-[#009EE2]">Simples</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Conéctate con transportistas confiables para tus necesidades de mudanza y envío en solo unos clics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-[#DB2851] hover:bg-[#c11f45] text-white font-medium py-6 px-8 rounded-lg text-lg shadow-lg" 
              onClick={() => navigate('/login')}
            >
              Comenzar <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            <img 
              src="https://images.unsplash.com/photo-1600023622007-8b2162dab098?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Moving services" 
              className="rounded-lg shadow-xl mx-auto max-w-full md:max-w-3xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-12 text-center">
            Por qué elegir <span className="text-move-blue-500">Move-It-Easy</span>
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
                className="flex p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:move-shadow transition"
                variants={itemVariants}
              >
                <div className="mr-4">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-move-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">¿Listo para simplificar tu mudanza?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos que han hecho su experiencia de mudanza sin estrés con Move-It-Easy.
          </p>
          <Button 
            className="bg-move-blue-500 hover:bg-move-blue-600 text-white font-medium py-2.5 px-6 rounded-lg shadow-md" 
            onClick={() => navigate('/login')}
          >
            Comenzar Hoy
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-4 mt-auto">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Logo size="md" className="text-white" />
              <p className="mt-2 text-sm">Soluciones de mudanza en tus manos</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h4 className="font-semibold mb-2">Empresa</h4>
                <ul className="space-y-1 text-sm">
                  <li>Sobre Nosotros</li>
                  <li>Carreras</li>
                  <li>Contacto</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Soporte</h4>
                <ul className="space-y-1 text-sm">
                  <li>Centro de Ayuda</li>
                  <li>Seguridad</li>
                  <li>Términos de Servicio</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Move-It-Easy. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
