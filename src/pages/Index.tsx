import { useNavigate } from 'react-router-dom';
import { CalendarDays, Truck, Map, Star, Shield, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';

const Index = () => {
  const navigate = useNavigate();

  const handleDriverRegistration = () => {
    navigate('/login', { state: { userType: 'driver', isRegistering: true } });
  };

  const features = [
    {
      icon: <Truck className="h-8 w-8 text-[#009EE2]" />,
      title: 'Transportistas Verificados',
      description: 'Conéctate con transportistas verificados para todas tus necesidades de mudanza'
    },
    {
      icon: <Shield className="h-8 w-8 text-[#009EE2]" />,
      title: 'Seguro Incluido',
      description: 'Todas nuestras mudanzas incluyen seguro para tu tranquilidad'
    },
    {
      icon: <Clock className="h-8 w-8 text-[#009EE2]" />,
      title: 'Disponibilidad 24/7',
      description: 'Programa servicios a tu conveniencia con disponibilidad en tiempo real'
    },
    {
      icon: <Star className="h-8 w-8 text-[#009EE2]" />,
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
    <div className="min-h-screen flex flex-col font-halvar">
      {/* Header/Nav */}
      <header className="bg-white py-4 px-6 md:px-12 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="md" className="mx-auto md:mx-0" />
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-gray-700 hover:text-[#DB2851] transition-colors">Servicios</a>
            <a href="#como-funciona" className="text-gray-700 hover:text-[#DB2851] transition-colors">¿Cómo funciona?</a>
            <a href="#testimonios" className="text-gray-700 hover:text-[#DB2851] transition-colors">Testimonios</a>
            <Button 
              variant="outline" 
              className="border-[#DB2851] text-[#DB2851] hover:bg-[#DB2851]/10"
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </Button>
          </nav>
          
          <Button 
            className="hidden md:flex bg-[#DB2851] hover:bg-[#c11f45]"
            onClick={() => navigate('/login')}
          >
            Registrarse
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-[#f5f5f5] py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
              Mudanzas y <span className="text-[#009EE2]">Fletes</span> en un solo lugar
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Conéctate con transportistas verificados para tus necesidades de mudanza y envío de forma rápida y segura.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                className="bg-[#DB2851] hover:bg-[#c11f45] text-white font-medium py-6 px-8 rounded-lg text-lg shadow-lg" 
                onClick={() => navigate('/login')}
              >
                Empezar ahora <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#009EE2]/80 to-[#DB2851]/80 mix-blend-multiply"></div>
              <img 
                src="https://images.unsplash.com/photo-1600023622007-8b2162dab098?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Servicios de mudanza" 
                className="w-full h-[400px] object-cover object-center"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white text-center drop-shadow-lg">
                  Mudanzas Profesionales
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-[#f5f5f5]" id="como-funciona">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              ¿Cómo funciona?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Solicita un servicio de mudanza o flete en tres simples pasos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                number: "01",
                title: "Solicita un servicio",
                description: "Indica origen, destino, fecha y tipo de servicio que necesitas"
              },
              {
                number: "02",
                title: "Recibe propuestas",
                description: "Transportistas verificados te enviarán sus mejores presupuestos"
              },
              {
                number: "03",
                title: "Elige y coordina",
                description: "Selecciona al transportista y coordina los detalles del servicio"
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-[#009EE2] w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-[#DB2851] hover:bg-[#c11f45]"
              onClick={() => navigate('/login')}
            >
              Solicitar ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white" id="caracteristicas">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Por qué elegir <span className="text-[#009EE2]">Flechandes</span>
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
      
      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA para choferes */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#009EE2]/10 to-[#009EE2]/20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-6 border border-[#009EE2]/10">
            <div className="flex justify-center mb-4">
              <Truck className="h-12 w-12 text-[#009EE2]" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              ¿Eres <span className="text-[#009EE2]">Transportista</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Únete a Flechandes y transforma tu negocio de transporte y mudanzas. 
              Conecta con clientes, gestiona tus servicios y aumenta tus ingresos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#DB2851] hover:bg-[#c11f45] text-white py-3 px-8" 
                onClick={handleDriverRegistration}
              >
                Registrarse como Chofer
              </Button>
              <Button
                variant="outline"
                className="border-[#009EE2] text-[#009EE2] hover:bg-[#009EE2]/10 py-3 px-8"
                onClick={handleDriverRegistration}
              >
                Cómo funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-[#009EE2]/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para simplificar tu mudanza?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de clientes satisfechos que han hecho su experiencia de mudanza sin estrés con Flechandes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-[#DB2851] hover:bg-[#c11f45] text-white py-3 px-8" 
              onClick={() => navigate('/login')}
            >
              Comenzar Hoy
            </Button>
            <Button
              variant="outline"
              className="border-[#009EE2] text-[#009EE2] hover:bg-[#009EE2]/10"
              onClick={() => navigate('/login')}
            >
              Ver demostración
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-4 mt-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo size="md" className="text-white mb-4" />
              <p className="text-sm">Soluciones de mudanza y transporte en tus manos</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Servicios</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#009EE2] transition-colors">Mudanzas</a></li>
                <li><a href="#" className="hover:text-[#009EE2] transition-colors">Fletes</a></li>
                <li><a href="#" className="hover:text-[#009EE2] transition-colors">Envíos</a></li>
                <li><a href="#" className="hover:text-[#009EE2] transition-colors">Para transportistas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#009EE2] transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-[#009EE2] transition-colors">Trabaja con nosotros</a></li>
                <li><a href="#" className="hover:text-[#009EE2] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#009EE2] transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#009EE2] transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-[#009EE2] transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-[#009EE2] transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Flechandes. Todos los derechos reservados.</p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
