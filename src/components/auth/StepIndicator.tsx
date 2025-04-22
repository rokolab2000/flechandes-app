
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div 
          key={index}
          className={`w-8 h-2 rounded-full ${
            currentStep > index 
              ? 'bg-move-blue-500' 
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
