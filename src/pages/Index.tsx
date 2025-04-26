
import MainHeader from '@/components/MainHeader';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import MainFooter from '@/components/MainFooter';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col font-halvar">
      <MainHeader />
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <MainFooter />
    </div>
  );
};

export default Index;
