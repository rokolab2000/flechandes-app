
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';
import { UserType } from '@/components/UserTypeSelector';
import TransporterBanner from './TransporterBanner';
import ClientBanner from './ClientBanner';

interface AuthLayoutProps {
  children: React.ReactNode;
  isTransporter?: boolean;
  isLogin?: boolean;
  userType?: UserType;
}

const AuthLayout = ({ children, isTransporter, isLogin, userType }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="md:hidden p-4 flex items-center justify-between bg-white shadow-sm">
        <Link to="/" className="flex items-center text-gray-700">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver
        </Link>
        <Logo size="sm" />
      </div>

      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center">
        {children}
      </div>
      
      <div className="hidden md:block w-1/2 bg-gradient-to-br from-[#009EE2] to-[#007bb3]">
        <div className="h-full flex items-center justify-center p-6">
          {(isTransporter || (!isLogin && (userType === 'driver' || userType === 'helper' || userType === 'cleaning')))
            ? <TransporterBanner />
            : <ClientBanner />
          }
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
