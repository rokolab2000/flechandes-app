
import Logo from '@/components/Logo';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="container mx-auto max-w-4xl flex justify-between items-center">
        <Logo size="md" />
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-move-green-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-move-green-700">MT</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
