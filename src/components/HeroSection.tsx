import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/LandlordHero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image - Extended to cover header area */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      
      {/* Content - Left Aligned */}
      <div className="relative z-10 text-white px-6 lg:px-12 max-w-2xl">
        {/* Main Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold mb-6 leading-tight tracking-tight">
          Legally Complaint<br/> Co-parenting Plans.
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm md:text-xl lg:text-2xl mb-10 font-light leading-relaxed text-white/90 max-w-2xl">
          Proffessional, court ready parenting plans<br />without complexity.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Button 
            size="lg"
            className="bg-secondary text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 min-w-[180px]"
          >
              View Plans
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 min-w-[180px] backdrop-blur-sm"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;