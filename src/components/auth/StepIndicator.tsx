
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              index + 1 === currentStep 
                ? 'bg-[#009EE2] text-white' 
                : index + 1 < currentStep
                  ? 'bg-[#009EE2]/20 text-[#009EE2]'
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            {index + 1}
          </div>
          <div className={`text-xs ${
            index + 1 === currentStep 
              ? 'text-[#009EE2] font-medium' 
              : 'text-gray-500'
          }`}>
            {index === 0 ? 'Datos' : index === 1 ? 'Dirección' : 'Verificación'}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-8 h-0.5 absolute left-[calc(50%+${(index-totalSteps/2+0.5)*4}rem)] ${
              index + 1 < currentStep ? 'bg-[#009EE2]' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
