
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Buscando:', searchTerm);
    // Aquí implementaríamos la lógica de búsqueda
  };

  return (
    <div className="mb-6">
      <div className="relative flex items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Buscar solicitudes de servicio" 
            className="pl-10 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          onClick={handleSearch}
          className="ml-2 bg-[#009EE2] hover:bg-[#0089C9]"
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
