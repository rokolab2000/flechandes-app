
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Buscar solicitudes de servicio" 
          className="pl-10"
        />
      </div>
    </div>
  );
};

export default SearchBar;
