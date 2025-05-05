
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { UserType } from '@/components/UserTypeSelector';

const MainHeader = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Por defecto, el login muestra la opción de cliente (rojo)
    navigate('/login');
  };

  const handleRegisterClick = (userType: UserType = 'shipping') => {
    navigate('/login', { state: { isRegistering: true, userType } });
  };

  return (
    <header className="bg-white py-6 px-6 md:px-12 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Logo size="lg" className="mx-auto md:mx-0" />
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="text-gray-700 hover:text-[#DB2851] transition-colors">Servicios</a>
          <a href="#como-funciona" className="text-gray-700 hover:text-[#DB2851] transition-colors">¿Cómo funciona?</a>
          <a href="#testimonios" className="text-gray-700 hover:text-[#DB2851] transition-colors">Testimonios</a>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-[#DB2851] text-[#DB2851] hover:bg-[#DB2851]/10"
              onClick={handleLoginClick}
            >
              Cliente
            </Button>
            <Button 
              variant="outline" 
              className="border-[#009EE2] text-[#009EE2] hover:bg-[#009EE2]/10"
              onClick={() => handleLoginClick()}
            >
              Transportista
            </Button>
          </div>
        </nav>
        
        <div className="hidden md:flex gap-2">
          <Button 
            className="bg-[#DB2851] hover:bg-[#c11f45]"
            onClick={() => handleRegisterClick('shipping')}
          >
            Registrar Cliente
          </Button>
          <Button 
            className="bg-[#009EE2] hover:bg-[#0089C9]"
            onClick={() => handleRegisterClick('driver')}
          >
            Registrar Transportista
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
