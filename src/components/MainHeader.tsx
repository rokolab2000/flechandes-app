
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const MainHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white py-6 px-6 md:px-12 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Logo size="lg" className="mx-auto md:mx-0" />
        
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
  );
};

export default MainHeader;
