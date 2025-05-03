
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterStep1 from '@/components/auth/RegisterStep1';
import RegisterStep2 from '@/components/auth/RegisterStep2';
import RegisterStep3 from '@/components/auth/RegisterStep3';
import { UserType } from '@/components/UserTypeSelector';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthContent from '@/components/auth/AuthContent';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<UserType>('shipping');
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    const state = location.state as { userType?: UserType; isRegistering?: boolean } | null;
    if (state?.userType) {
      setUserType(state.userType);
    }
    if (state?.isRegistering) {
      setIsLogin(false);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      if (userType === 'driver' || userType === 'helper' || userType === 'cleaning') {
        navigate('/transporter/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } else {
      if (step < (userType === 'driver' || userType === 'helper' || userType === 'cleaning' ? 3 : 2)) {
        setStep(step + 1);
      } else {
        if (userType === 'driver' || userType === 'helper' || userType === 'cleaning') {
          navigate('/transporter/dashboard');
        } else {
          navigate('/customer/dashboard');
        }
      }
    }
  };
  
  const renderContent = () => {
    // Get titles and subtitles based on current state
    const getContentInfo = () => {
      if (isLogin) {
        return {
          title: 'Bienvenido de nuevo',
          subtitle: 'Inicia sesión para acceder a tu cuenta'
        };
      } else {
        switch(step) {
          case 1:
            return {
              title: 'Crea tu cuenta',
              subtitle: 'Completa el formulario para comenzar'
            };
          case 2:
            return {
              title: 'Información adicional',
              subtitle: 'Completa el formulario para comenzar'
            };
          case 3:
            return {
              title: 'Verificación',
              subtitle: 'Completa el formulario para comenzar'
            };
          default:
            return {
              title: 'Registro',
              subtitle: 'Completa el formulario para comenzar'
            };
        }
      }
    };

    const contentInfo = getContentInfo();
    const isTransporter = userType === 'driver' || userType === 'helper' || userType === 'cleaning';
    const showStepIndicator = !isLogin && (isTransporter || step > 1);
    const totalSteps = isTransporter ? 3 : 2;

    let formContent;
    if (isLogin) {
      formContent = (
        <LoginForm 
          onSubmit={handleSubmit} 
          onToggleForm={() => {setIsLogin(false); setStep(1);}} 
        />
      );
    } else {
      switch(step) {
        case 1:
          formContent = (
            <RegisterStep1 
              userType={userType}
              onUserTypeSelect={setUserType}
              onSubmit={handleSubmit}
              onToggleForm={() => {setIsLogin(true); setStep(1);}}
            />
          );
          break;
        case 2:
          formContent = (
            <RegisterStep2 
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
              userType={userType}
            />
          );
          break;
        case 3:
          formContent = (
            <RegisterStep3 
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
            />
          );
          break;
        default:
          formContent = null;
      }
    }

    return (
      <AuthContent
        title={contentInfo.title}
        subtitle={contentInfo.subtitle}
        step={step}
        totalSteps={totalSteps}
        showStepIndicator={showStepIndicator}
        userType={userType}
      >
        {formContent}
      </AuthContent>
    );
  };

  const isTransporter = !isLogin && (userType === 'driver' || userType === 'helper' || userType === 'cleaning');
  
  return (
    <AuthLayout 
      isTransporter={isTransporter}
      isLogin={isLogin}
      userType={userType}
    >
      {renderContent()}
    </AuthLayout>
  );
};

export default Login;
