import { useState } from 'react';
import { useTransporterServices } from '@/hooks/useTransporterServices';
import DashboardHeader from '@/components/transporter/DashboardHeader';
import SearchBar from '@/components/transporter/SearchBar';
import StatsCards from '@/components/transporter/StatsCards';
import DashboardTabs from '@/components/transporter/DashboardTabs';
import MobileNavbar from '@/components/MobileNavbar';
import { DetentionTimer } from '@/components/transporter/DetentionTimer';
import { formatCLP } from '@/lib/pricing';

const TransporterDashboard = () => {
  const { availableServices, acceptedServices } = useTransporterServices();
  const [detentionFee, setDetentionFee] = useState(0);
  
  // Calculate total potential earnings from available services
  const totalPotentialEarnings = availableServices.reduce((sum, s) => sum + s.netEarnings, 0);

  const handleDetentionFeeUpdate = (fee: number, minutes: number) => {
    setDetentionFee(fee);
  };
  
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Content */}
      <main className="container mx-auto max-w-5xl px-4 py-6 mb-20">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Hola, Juan</h1>
          <p className="text-muted-foreground">Panel de Conductor Flechandes</p>
          {availableServices.length > 0 && (
            <p className="text-sm text-primary mt-1">
              💰 {availableServices.length} trabajo{availableServices.length !== 1 ? 's' : ''} disponible{availableServices.length !== 1 ? 's' : ''} • 
              Potencial: {formatCLP(totalPotentialEarnings)}
            </p>
          )}
        </div>
        
        {/* Search */}
        <SearchBar />
        
        {/* Quick Stats */}
        <StatsCards />
        
        {/* Detention Timer */}
        {acceptedServices.length > 0 && (
          <div className="mt-6">
            <DetentionTimer onFeeUpdate={handleDetentionFeeUpdate} />
          </div>
        )}
        
        {/* Services List */}
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
