
import { useState } from 'react';
import { Search, TrendingUp, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import MobileNavbar from '@/components/MobileNavbar';
import ServiceCard from '@/components/ServiceCard';
import { useNavigate } from 'react-router-dom';

const TransporterDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'available' | 'accepted'>('available');
  
  // Mock data for services
  const availableServices = [
    {
      id: '1',
      title: 'Apartment Moving',
      type: 'moving' as const,
      status: 'pending' as const,
      price: 280.00,
      origin: '123 First Ave, Seattle',
      destination: '456 Second St, Seattle',
      date: 'Jun 20, 2024',
      time: '10:00 AM'
    },
    {
      id: '2',
      title: 'Furniture Delivery',
      type: 'delivery' as const,
      status: 'pending' as const,
      price: 120.00,
      origin: 'Furniture Store, Seattle',
      destination: '789 Third Ave, Seattle',
      date: 'Jun 25, 2024',
      time: '01:00 PM'
    }
  ];
  
  const acceptedServices = [
    {
      id: '3',
      title: 'Office Equipment',
      type: 'freight' as const,
      status: 'confirmed' as const,
      price: 350.00,
      origin: '101 Business Blvd, Seattle',
      destination: '202 Commerce St, Seattle',
      date: 'Jun 18, 2024',
      time: '08:00 AM'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
      
      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-6 mb-20">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Hello, Mike</h1>
          <p className="text-gray-600">Welcome to your transporter dashboard</p>
        </div>
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search service requests" 
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-move-green-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-move-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Your Rating</p>
                <p className="text-xl font-semibold">4.9/5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-move-blue-100 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-move-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Earnings</p>
                <p className="text-xl font-semibold">$1,250</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-xl font-semibold">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-xl font-semibold">1</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Services */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'available' 
                  ? 'text-move-green-600 border-b-2 border-move-green-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('available')}
            >
              Available Jobs
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'accepted' 
                  ? 'text-move-green-600 border-b-2 border-move-green-500' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('accepted')}
            >
              My Jobs
            </button>
          </div>
          
          {/* Service Cards */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTab === 'available' ? (
                availableServices.length > 0 ? (
                  availableServices.map((service) => (
                    <div key={service.id} className="relative">
                      <ServiceCard
                        {...service}
                        onClick={() => navigate(`/transporter/job/${service.id}`)}
                      />
                      <div className="absolute bottom-4 right-4">
                        <Button className="bg-move-green-500 hover:bg-move-green-600">
                          Accept Job
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-8 text-center text-gray-500">
                    No available jobs in your area
                  </div>
                )
              ) : (
                acceptedServices.length > 0 ? (
                  acceptedServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      {...service}
                      onClick={() => navigate(`/transporter/job/${service.id}`)}
                    />
                  ))
                ) : (
                  <div className="col-span-2 py-8 text-center text-gray-500">
                    You haven't accepted any jobs yet
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavbar />
    </div>
  );
};

export default TransporterDashboard;
