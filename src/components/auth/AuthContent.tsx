
import { ReactNode } from 'react';
import Logo from '@/components/Logo';
import StepIndicator from './StepIndicator';
import { UserType } from '@/components/UserTypeSelector';

interface AuthContentProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  step?: number;
  totalSteps?: number;
  showStepIndicator?: boolean;
  userType?: UserType;
}

const AuthContent = ({ 
  children, 
  title, 
  subtitle, 
  step, 
  totalSteps, 
  showStepIndicator, 
  userType 
}: AuthContentProps) => {
  
  return (
    <div className="w-full max-w-md">
      <div className="hidden md:block mb-8">
        <Logo size="lg" className="mx-auto" />
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>
        
        {showStepIndicator && step && totalSteps && (
          <StepIndicator currentStep={step} totalSteps={totalSteps} />
        )}
        
        {children}
      </div>
    </div>
  );
};

export default AuthContent;
