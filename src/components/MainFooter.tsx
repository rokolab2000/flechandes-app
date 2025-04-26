
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const MainFooter = () => {
  return (
    <footer className="bg-[#009EE2] text-white py-12 px-4 mt-auto">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img 
              src="/lovable-uploads/7f656404-4f2d-4fcb-bcb9-4dac91ec7c16.png" 
              alt="Flechandes Logo" 
              className="w-48 mb-4"
            />
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
        
        <div className="border-t border-white/20 pt-8 mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Flechandes. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
