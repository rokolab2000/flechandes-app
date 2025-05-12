
import { useState } from 'react';
import MobileNavbar from '@/components/MobileNavbar';
import DashboardHeader from '@/components/customer/DashboardHeader';
import ServiceOptions from '@/components/customer/ServiceOptions';
import StatsOverview from '@/components/customer/StatsOverview';
import ServicesPanel from '@/components/customer/ServicesPanel';
import { ServiceProps } from '@/components/ServiceCard';

const CustomerDashboard = () => {
  // Mock data for services
  const upcomingServices: ServiceProps[] = [
    {
      id: '1',
      title: 'Mudanza de Casa',
      type: 'moving',
      status: 'confirmed',
      price: 299.99,
      origin: '123 Calle Principal, Madrid',
      destination: '456 Avenida Parque, Madrid',
      date: '15 Jun, 2024',
      time: '09:00 AM'
    },
    {
      id: '2',
      title: 'Entrega de Muebles',
      type: 'delivery',
      status: 'pending',
      price: 89.99,
      origin: 'IKEA Madrid',
      destination: '123 Calle Principal, Madrid',
      date: '18 Jun, 2024',
      time: '14:00 PM'
    }
  ];
  
  const pastServices: ServiceProps[] = [
    {
      id: '3',
      title: 'Mudanza de Oficina',
      type: 'moving',
      status: 'completed',
      price: 450.00,
      origin: '789 Bulevar Oficina, Madrid',
      destination: '101 Calle Trabajo, Madrid',
      date: '22 May, 2024',
      time: '08:00 AM'
    }
  ];

  // Calculate stats from services
  const totalServices = upcomingServices.length + pastServices.length;
  const pendingServices = upcomingServices.filter(s => s.status === 'pending').length;
  const upcomingCount = upcomingServices.length;
  const completedServices = pastServices.filter(s => s.status === 'completed').length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader userInitials="JD" />
      
      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-6 mb-20">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Hola, Juan</h1>
          <p className="text-gray-600">Bienvenido a tu panel de control</p>
        </div>
        
        {/* Service Options */}
        <ServiceOptions />
        
        {/* Quick Stats */}
        <StatsOverview 
          totalServices={totalServices}
          pendingServices={pendingServices}
          upcomingServices={upcomingCount}
          completedServices={completedServices}
        />
        
        {/* Map and Services Tabs */}
        <ServicesPanel 
          upcomingServices={upcomingServices}
          pastServices={pastServices}
        />
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavbar />
    </div>
  );
};

export default CustomerDashboard;
