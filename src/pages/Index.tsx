import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection"; 
import PracticeAreas from "@/components/PracticeAreasSection";
import AttorneysSection from "@/components/AttorneySection";
import HowWeWork from "@/components/HowWeWork";
import PricingSection from "@/components/PricingSelection";
import Benefits from "@/components/Benefits";
import Award from "@/components/Award";
import ContactUs from "@/components/ContactUs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PracticeAreas/>
        <AttorneysSection/>
        <HowWeWork/> 
        <PricingSection/>
        <Benefits/>
        <Award/>
        <ContactUs/>

      </main>
 
    </div>
  );
};

export default Index;
