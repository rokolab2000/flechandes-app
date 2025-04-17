
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
      title: 'Find Reliable Movers',
      description: 'Connect with verified transporters for all your moving needs'
    },
    {
      icon: <CalendarDays className="h-8 w-8 text-move-blue-500" />,
      title: 'Book When You Need',
      description: 'Schedule services at your convenience with real-time availability'
    },
    {
      icon: <Map className="h-8 w-8 text-move-blue-500" />,
      title: 'Track Your Move',
      description: 'Follow your shipment with real-time location updates'
    },
    {
      icon: <Star className="h-8 w-8 text-move-blue-500" />,
      title: 'Trusted Reviews',
      description: 'See ratings and reviews from other customers'
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
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-move-blue-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Logo size="lg" className="mx-auto mb-6" />
          
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Moving Made <span className="text-move-blue-500">Simple</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with reliable movers for your delivery and moving needs in just a few clicks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-move-blue-500 hover:bg-move-blue-600 text-white font-medium py-6 px-8 rounded-lg text-lg shadow-lg" 
              onClick={() => navigate('/login')}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
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
            Why Choose <span className="text-move-blue-500">Move-It-Easy</span>
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
          <h2 className="text-2xl font-bold mb-4">Ready to simplify your move?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made their moving experience stress-free with Move-It-Easy.
          </p>
          <Button 
            className="bg-move-blue-500 hover:bg-move-blue-600 text-white font-medium py-2.5 px-6 rounded-lg shadow-md" 
            onClick={() => navigate('/login')}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-4 mt-auto">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Logo size="md" className="text-white" />
              <p className="mt-2 text-sm">Moving solutions at your fingertips</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h4 className="font-semibold mb-2">Company</h4>
                <ul className="space-y-1 text-sm">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Support</h4>
                <ul className="space-y-1 text-sm">
                  <li>Help Center</li>
                  <li>Safety</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Move-It-Easy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
