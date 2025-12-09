
import { useTransporterServices } from '@/hooks/useTransporterServices';
import DashboardHeader from '@/components/transporter/DashboardHeader';
import SearchBar from '@/components/transporter/SearchBar';
import StatsCards from '@/components/transporter/StatsCards';
import DashboardTabs from '@/components/transporter/DashboardTabs';
import MobileNavbar from '@/components/MobileNavbar';

const TransporterDashboard = () => {
  const { availableServices, acceptedServices } = useTransporterServices();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-6 mb-20">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Hola, Miguel</h1>
          <p className="text-gray-600">Bienvenido a tu panel de transportista</p>
        </div>
        
        {/* Search */}
        <SearchBar />
        
        {/* Quick Stats */}
        <StatsCards />
        
        {/* Map and Services */}
        <DashboardTabs 
          availableServices={availableServices} 
          acceptedServices={acceptedServices} 
        />
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavbar />
    </div>
  );
};

export default TransporterDashboard;
