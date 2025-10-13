import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection"; 
import PracticeAreas from "@/components/PracticeAreasSection";
import AttorneysSection from "@/components/AttorneySection";
import HowWeWork from "@/components/HowWeWork";
import PricingSection from "@/components/PricingSelection";
import Benefits from "@/components/Benefits";
import Award from "@/components/Award";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PracticeAreas/>
        <PricingSection/>
        <HowWeWork/>
        <Benefits/>
        <ContactUs/>
      </main>
        <Footer/>
    </div>
  );
};

export default Index;
