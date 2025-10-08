import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { 
  Shield, 
  Users, 
  FileCheck, 
  Target, 
  Heart, 
  Award,
  Clock,
  CheckCircle2,
  ArrowRight,
  Play,
  X
} from "lucide-react";
import processImage from "@/assets/Consultation.jpg";
import consultationImage from "@/assets/family.jpg";
import strategyImage from "@/assets/Strategy.jpg";
import resolutionImage from "@/assets/LandlordHero.jpg";
import howItWorksVideo from "@/assets/testimonial.mp4"; 

// Video Modal Component
const VideoModal = ({ isOpen, onClose, videoSrc }: { isOpen: boolean; onClose: () => void; videoSrc: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player */}
        <video
          ref={videoRef}
          controls
          className="w-full h-auto max-h-[80vh]"
          onEnded={onClose}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Info */}
        <div className="p-6 bg-gradient-to-r from-church-navy to-church-light-blue text-white">
          <h3 className="text-xl font-bold mb-2">See How It Works</h3>
          <p className="text-blue-100">
            Watch how we help families navigate legal challenges with compassion and expertise
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const HowWeWork = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const processSteps = [
    {
      icon: Users,
      title: "Initial Consultation",
      description: "We begin with a comprehensive case evaluation to understand your unique situation and legal needs.",
      image: consultationImage,
      features: ["Free Case Assessment", "Confidential Discussion", "Clear Fee Structure"]
    },
    {
      icon: Target,
      title: "Strategic Planning",
      description: "Our team develops a customized legal strategy tailored to achieve your specific objectives.",
      image: strategyImage,
      features: ["Personalized Approach", "Goal-Oriented Strategy", "Timeline Planning"]
    },
    {
      icon: FileCheck,
      title: "Case Execution",
      description: "We handle all legal proceedings with precision while keeping you informed at every step.",
      image: processImage,
      features: ["Regular Updates", "Document Preparation", "Court Representation"]
    },
    {
      icon: Shield,
      title: "Resolution & Support",
      description: "We ensure favorable outcomes and provide ongoing support for your family's future.",
      image: resolutionImage,
      features: ["Case Resolution", "Post-Case Support", "Future Planning"]
    }
  ];

  const practiceAreas = [
    { name: "Adoption", icon: Heart },
    { name: "Child Support", icon: Users },
    { name: "Child Custody", icon: Shield },
    { name: "Divorce", icon: FileCheck },
    { name: "Domestic Violence", icon: Shield },
    { name: "Family Law Mediation", icon: Target },
    { name: "High-Net Worth Divorce", icon: Award },
    { name: "Prenuptial Agreements", icon: FileCheck },
    { name: "Post-Judgment Enforcement", icon: CheckCircle2 },
    { name: "Relocation", icon: Clock },
  ];

  const stats = [
    { number: "500+", label: "Families Helped" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Client Support" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-10 bg-gradient-to-b from-church-cream to-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-divine text-church-navy px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-semibold">Our Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-church-navy mb-4">
            How We Work
          </h2>
          <p className="text-xl leading-relaxed font-light max-w-3xl mx-auto">
            A structured, compassionate approach to family law that prioritizes your family's wellbeing and legal success.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="flex flex-col md:flex-row gap-6 items-start group"
            >
              {/* Step Number and Icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-church-gold to-secondary-light rounded-2xl flex items-center justify-center text-white shadow-golden">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-church-navy text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-church-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {step.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-church-gold flex-shrink-0" />
                      <span className="text-sm text-church-navy">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="w-full md:w-48 flex-shrink-0">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-soft group-hover:shadow-divine transition-all duration-300">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Practice Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-church-navy mb-4">
              Our Family Law Practice Areas
            </h3>
            <p className="text-lg text-muted-foreground">
              Comprehensive legal services for all family matters
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="church-card text-center group cursor-pointer h-full">
                  <CardContent className="p-4">
                    <div className="w-12 h-12 bg-church-light-blue rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-church-gold group-hover:text-white transition-all duration-300">
                      <area.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-church-navy group-hover:text-church-gold transition-colors duration-300">
                      {area.name}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to begin your family law journey with confidence?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="church-button text-lg py-6 px-8"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Us in Action
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="church-button-outline text-lg py-6 px-8">
              Download Free Guide
            </Button>
          </div>
        </motion.div>

        {/* Video Modal */}
        <VideoModal 
          isOpen={isVideoOpen} 
          onClose={() => setIsVideoOpen(false)} 
          videoSrc={howItWorksVideo} 
        />
      </div>
    </section>
  );
};

export default HowWeWork;