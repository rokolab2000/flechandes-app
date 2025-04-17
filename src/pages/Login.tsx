
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check,
  ChevronLeft, 
  Mail, 
  Lock, 
  Phone, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import UserTypeSelector from '@/components/UserTypeSelector';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'customer' | 'transporter'>('customer');
  const [step, setStep] = useState(1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would handle actual authentication
    // For now, just redirect to the dashboard
    if (isLogin) {
      if (userType === 'customer') {
        navigate('/customer/dashboard');
      } else {
        navigate('/transporter/dashboard');
      }
    } else {
      // If registering, go to next step or finish
      if (step < (userType === 'transporter' ? 3 : 2)) {
        setStep(step + 1);
      } else {
        // Registration complete, redirect to dashboard
        if (userType === 'customer') {
          navigate('/customer/dashboard');
        } else {
          navigate('/transporter/dashboard');
        }
      }
    }
  };
  
  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="email" 
            placeholder="Your email address" 
            type="email" 
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="text-xs text-move-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            id="password" 
            placeholder="Your password" 
            type="password" 
            className="pl-10"
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-move-blue-500 hover:bg-move-blue-600">
        Login
      </Button>
      
      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <button 
          type="button"
          className="text-move-blue-600 hover:underline font-medium"
          onClick={() => {setIsLogin(false); setStep(1);}}
        >
          Register
        </button>
      </p>
      
      <div className="relative flex items-center justify-center">
        <hr className="w-full border-gray-200" />
        <span className="absolute bg-white px-2 text-sm text-gray-500">or continue with</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" type="button" className="w-full">
          Google
        </Button>
        <Button variant="outline" type="button" className="w-full">
          Facebook
        </Button>
      </div>
    </form>
  );
  
  const renderRegisterStep1 = () => (
    <div className="space-y-6 w-full">
      <UserTypeSelector onSelect={setUserType} defaultSelected={userType} />
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="register-email" 
              placeholder="Your email address" 
              type="email" 
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="register-phone" 
              placeholder="Your phone number" 
              type="tel" 
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="register-password">Create Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              id="register-password" 
              placeholder="Create a strong password" 
              type="password" 
              className="pl-10"
            />
          </div>
          <p className="text-xs text-gray-500">
            Password must be at least 8 characters long
          </p>
        </div>
        
        <Button type="submit" className="w-full bg-move-blue-500 hover:bg-move-blue-600">
          {userType === 'transporter' ? 'Next' : 'Register'}
        </Button>
        
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <button 
            type="button"
            className="text-move-blue-600 hover:underline font-medium"
            onClick={() => {setIsLogin(true); setStep(1);}}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
  
  const renderRegisterStep2 = () => (
    <div className="space-y-6 w-full">
      <div className="flex items-center mb-6">
        <button 
          type="button" 
          onClick={() => setStep(1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="ml-2 font-semibold">Vehicle Information</span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vehicle-type">Vehicle Type</Label>
          <select 
            id="vehicle-type"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-move-blue-500"
          >
            <option value="">Select vehicle type</option>
            <option value="pickup">Pickup Truck</option>
            <option value="van">Van</option>
            <option value="truck">Moving Truck</option>
            <option value="box-truck">Box Truck</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="license-plate">License Plate</Label>
          <Input 
            id="license-plate" 
            placeholder="Enter license plate number" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle-capacity">Vehicle Capacity</Label>
          <Input 
            id="vehicle-capacity" 
            placeholder="Capacity in cubic feet" 
            type="number" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle-year">Vehicle Year</Label>
          <Input 
            id="vehicle-year" 
            placeholder="Year of manufacture" 
            type="number" 
          />
        </div>
        
        <Button type="submit" className="w-full bg-move-blue-500 hover:bg-move-blue-600">
          Next
        </Button>
      </form>
    </div>
  );
  
  const renderRegisterStep3 = () => (
    <div className="space-y-6 w-full">
      <div className="flex items-center mb-6">
        <button 
          type="button" 
          onClick={() => setStep(2)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="ml-2 font-semibold">Documents Verification</span>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            Please upload the following documents to verify your account. All files must be in PDF or JPG format.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="driver-license">Driver's License</Label>
          <Input 
            id="driver-license" 
            type="file" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="insurance">Vehicle Insurance</Label>
          <Input 
            id="insurance" 
            type="file" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="business-license">Business License (optional)</Label>
          <Input 
            id="business-license" 
            type="file" 
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
        
        <div className="flex items-start space-x-3 mt-6">
          <div className="flex items-center h-5 mt-1">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-move-blue-300"
              required
            />
          </div>
          <div className="text-sm">
            <label htmlFor="terms" className="font-medium text-gray-900">
              I agree to the <a href="#" className="text-move-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-move-blue-600 hover:underline">Privacy Policy</a>
            </label>
            <p id="terms" className="text-xs font-normal text-gray-500">
              By registering, you agree to our background check process.
            </p>
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-move-blue-500 hover:bg-move-blue-600">
          Complete Registration
        </Button>
      </form>
    </div>
  );
  
  const renderStepIndicator = () => {
    if (isLogin || (userType === 'customer' && step === 1)) return null;
    
    const totalSteps = userType === 'transporter' ? 3 : 2;
    
    return (
      <div className="flex items-center justify-center space-x-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`w-8 h-2 rounded-full ${
              step > index 
                ? 'bg-move-blue-500' 
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Form */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo size="lg" className="mx-auto mb-6" />
            <h1 className="text-2xl font-bold">
              {isLogin 
                ? 'Welcome back' 
                : step === 1 
                  ? 'Create your account' 
                  : step === 2 
                    ? 'Vehicle Information' 
                    : 'Document Verification'
              }
            </h1>
            <p className="text-gray-600 mt-2">
              {isLogin 
                ? 'Sign in to access your account' 
                : 'Complete the form to get started'
              }
            </p>
          </div>
          
          {renderStepIndicator()}
          
          {isLogin 
            ? renderLoginForm() 
            : step === 1 
              ? renderRegisterStep1() 
              : step === 2 
                ? renderRegisterStep2() 
                : renderRegisterStep3()
          }
        </div>
      </div>
      
      {/* Right Panel - Image */}
      <div className="hidden md:block w-1/2 bg-move-blue-500">
        <div className="h-full flex items-center justify-center p-6">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-4">Moving made simple</h2>
            <p className="mb-6">
              Join our community of transporters and customers for a seamless moving experience.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-1 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span>Fast and reliable service</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-1 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 rounded-full p-1 mr-3">
                  <Check className="h-5 w-5" />
                </div>
                <span>Real-time tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
