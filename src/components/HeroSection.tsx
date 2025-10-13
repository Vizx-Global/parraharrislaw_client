import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, FileCheck, Clock, Star } from "lucide-react";
import heroBackground from "@/assets/HeroTrial.jpg";
import expertise2021 from "@/assets/Expertise2021.png";
import phlAward from "@/assets/LegalAbility.png";
import avoRatingBadge from "@/assets/Avo Rating.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
      </div>

      {/* Content - Left Aligned */}
      <div className="relative z-10 text-white px-6 lg:px-12 max-w-2xl space-y-8 py-16">
        
        {/* Trust Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-secondary fill-current" />
            <span className="text-xs font-medium">Trusted by 500+ Families</span>
          </div>
        </div>

        {/* Main Heading with Icon */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-secondary" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-tight tracking-tight">
              Legally Complaint<br/> Co-parenting Plans.
            </h1>
          </div>
        </div>
        
        {/* Subtitle with Features */}
        <div className="space-y-6">
          <p className="text-sm md:text-xl lg:text-2xl font-light leading-relaxed text-white/90 max-w-2xl">
            Professional, court ready parenting plans<br />without complexity.
          </p>
          
          {/* Feature Points */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg">
              <FileCheck className="w-4 h-4 text-secondary" />
              <span className="text-sm">Court Approved</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="text-sm">24h Delivery</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Button 
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-gray-900 px-8 py-6 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 min-w-[180px] group"
          >
            <span>View Plans</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 min-w-[180px] group"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
  {/* Social Proof - Awards */}
      <div className="pt-8 border-t border-white/10">
        <p className="text-xs text-white/60 mb-4">Award-Winning Legal Excellence</p>
        <div className="flex items-center gap-6 opacity-90">
          {/* Expertise 2021 Award */}
          <div className="h-12 w-auto">
            <img 
              src={expertise2021} 
              alt="Expertise 2021 Award"
              className="h-full rounded-full w-auto object-contain"
            />
          </div>
          
          {/* PHL Award */}
          <div className="h-12 w-auto">
            <img 
              src={phlAward} 
              alt="PHL Award"
              className="h-full w-auto object-contain rounded-full"
            />
          </div>
          
          {/* AVVO Rating Badge - Clickable */}
          <a 
            href="https://www.avvo.com/attorneys/32217-fl-paola-parra-528267.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="h-12 w-auto transition-transform duration-300 hover:scale-110 hover:opacity-100"
          >
            <img 
              src={avoRatingBadge} 
              alt="AVVO Rating Badge"
              className="h-full w-auto rounded-full object-contain"
            />
          </a>
        </div>
      </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Floating Action Card */}
      <div className="absolute right-12 top-1/7 transform -translate-y-1/2 hidden xl:block">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-xs transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">Free Template</p>
              <p className="text-white/60 text-sm">Download Sample Plan</p>
            </div>
          </div>
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-gray-900 mt-2">
            Download
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;