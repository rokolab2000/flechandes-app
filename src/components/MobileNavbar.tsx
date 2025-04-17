
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Package, User, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: 'Servicios', path: '/services', icon: Package },
    { name: 'Rastrear', path: '/track', icon: Map },
    { name: 'Perfil', path: '/profile', icon: User },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.name}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full',
                isActive ? 'text-move-blue-600' : 'text-gray-500'
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavbar;
