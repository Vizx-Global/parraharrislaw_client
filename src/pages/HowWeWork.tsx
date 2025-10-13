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
  X,
  FileText,
  Search,
  ThumbsUp,
  Download,
  MessageCircle,
  Star,
  Calendar,
  Zap,
  Lock,
  Globe
} from "lucide-react";
import processImage from "@/assets/Consultation.jpg";
import consultationImage from "@/assets/family.jpg";
import strategyImage from "@/assets/Strategy.jpg";
import resolutionImage from "@/assets/LandlordHero.jpg";
import howItWorksVideo from "@/assets/testimonial.mp4";
import practiceAreaImage from "@/assets/family.jpg";
import Header from "@/components/HeaderTwo";
import Footer from "@/components/Footer";

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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <video
          ref={videoRef}
          controls
          className="w-full h-auto max-h-[80vh]"
          onEnded={onClose}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="p-6 bg-gradient-to-r from-church-navy to-church-light-blue text-white">
          <h3 className="text-xl font-bold mb-2">See How CoParent Florida Works</h3>
          <p className="text-blue-100">
            Watch how we help Florida families create peaceful, court-ready parenting plans
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
      icon: FileText,
      title: "Complete Guided Questionnaire",
      description: "Answer our Florida-specific questions designed by family law attorneys. Our intuitive platform guides you through every aspect of co-parenting arrangements.",
      image: consultationImage,
      features: ["20-30 targeted questions", "Florida legal compliance", "Save & resume anytime", "Real-time progress tracking"],
      duration: "15-20 mins"
    },
    {
      icon: Search,
      title: "Review Custom Parenting Plan",
      description: "Preview your comprehensive parenting plan with all required Florida sections. Make adjustments and ensure everything meets your family's needs.",
      image: strategyImage,
      features: ["Complete plan preview", "Customizable sections", "Legal compliance check", "Real-time editing"],
      duration: "5-10 mins"
    },
    {
      icon: ThumbsUp,
      title: "E-Sign & Download Documents",
      description: "Both parents securely e-sign the agreement and instantly receive court-ready PDF documents. All documents are formatted for Florida family courts.",
      image: processImage,
      features: ["Secure e-signatures", "Instant PDF download", "Court filing instructions", "Mobile-friendly access"],
      duration: "Instant"
    },
    {
      icon: Shield,
      title: "Optional Attorney Review",
      description: "Get peace of mind with our optional attorney review. Florida family law attorneys will review, edit, and finalize your documents.",
      image: resolutionImage,
      features: ["Attorney review & editing", "Custom clause insertion", "Direct legal support", "Compliance guarantee"],
      duration: "24-48 hours"
    }
  ];

  const keyFeatures = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Complete your parenting plan in under an hour with our streamlined process",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Bank-level security ensures your family's information stays confidential",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: Globe,
      title: "Florida Specific",
      description: "Built specifically for Florida family law requirements and court standards",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Attorney Backed",
      description: "All plans reviewed by experienced Florida family law attorneys",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const pricingPlans = [
    {
      name: "DIY Essential Plan",
      price: "$999",
      popular: false,
      description: "Perfect for parents who want a fast, court-ready parenting plan",
      features: [
        "Custom parenting plan questionnaire",
        "Florida-specific legal compliance",
        "Secure e-signature for both parents",
        "Instant PDF download",
        "Court filing instructions",
        "Email support",
        "30-day access to documents"
      ],
      cta: "Start DIY Plan"
    },
    {
      name: "Advanced Legal Plan",
      price: "$2,500",
      popular: true,
      description: "Complete legal package with full attorney review and support",
      features: [
        "Everything in DIY Plan, plus:",
        "Attorney review & editing",
        "Custody application preparation",
        "Financial affidavits (both parents)",
        "Child support guidelines calculation",
        "Direct attorney messaging",
        "Custom clause insertion",
        "Priority document processing"
      ],
      cta: "Get Full Support"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M., Orlando",
      role: "Single Mother",
      content: "The DIY Plan saved us thousands in legal fees. We had our parenting plan ready in just two days and the court accepted it without any changes!",
      rating: 5
    },
    {
      name: "Michael T., Miami",
      role: "Co-Parent",
      content: "The attorney review option gave us complete peace of mind. Our lawyer caught a few important details we missed. Worth every penny.",
      rating: 5
    },
    {
      name: "Jennifer L., Tampa",
      role: "Working Parent",
      content: "I completed the questionnaire on my phone during my lunch break. So convenient and much less stressful than traditional lawyers.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Is this recognized by Florida family courts?",
      answer: "Yes, all our parenting plans are designed to meet Florida family law requirements and have a 100% court acceptance rate."
    },
    {
      question: "Can both parents sign online?",
      answer: "Absolutely! Our secure e-signature platform allows both parents to sign from anywhere, on any device."
    },
    {
      question: "What if we need changes after filing?",
      answer: "You can modify your plan anytime within your access period, or upgrade to attorney support for complex modifications."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment options. Contact our team to discuss payment plan arrangements."
    }
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
    <div className="min-h-screen bg-gradient-to-b from-church-cream to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-divine overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-church-navy px-4 py-2 rounded-full mb-6"
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold text-church-gold">Fast • Affordable • Court-Ready</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl md:text-4xl text-church-navy font-bold mb-6 mt-4 leading-tight"
            >
              Create Your Parenting Plan in{' '}
              <span className="text-church-gold">4 Simple Steps</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-church-navy font-light mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Our Florida-based platform helps separated parents create customized, court-ready parenting plans 
              with optional attorney support—all without the stress and high costs of traditional lawyers.
            </motion.p>

            {/* Hero CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-church-gold hover:bg-church-gold/90 text-church-navy text-lg font-semibold py-4 px-8 rounded-xl shadow-lg">
                <FileText className="w-5 h-5 mr-2" />
                Start Your Plan - $999
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-church-navy text-church-navy hover:bg-church-navy hover:text-white text-lg font-semibold py-4 px-8 rounded-xl"
                onClick={() => setIsVideoOpen(true)}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-church-gold rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-church-light-blue rounded-full opacity-30"></div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-divine text-church-navy px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-church-navy mb-4">
              Built for Florida Families
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="church-card border-0 shadow-soft hover:shadow-divine transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-md mx-auto mb-4`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-church-navy mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   {/* Process Steps */}
<section className="py-16 bg-gradient-to-b from-church-cream to-white">
  <div className="container mx-auto px-6 lg:px-12">
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
      <h2 className="text-3xl md:text-4xl font-bold text-church-navy mb-4">
        How It Works
      </h2>
      <p className="text-lg leading-relaxed font-light max-w-3xl mx-auto">
        A structured, compassionate approach to co-parenting that prioritizes your family's wellbeing and legal success.
      </p>
    </motion.div>

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
  </div>
</section>

      {/* Pricing Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-divine text-church-navy px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold">Simple Pricing</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-church-navy mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you prefer to do it yourself or want full legal guidance, we've got you covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-church-gold text-church-navy px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <Card className={`church-card h-full border-2 ${plan.popular ? 'border-church-gold' : 'border-gray-200'} shadow-soft hover:shadow-divine transition-all duration-300`}>
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-church-navy mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold text-church-gold mb-2">{plan.price}</div>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-church-gold mt-0.5 flex-shrink-0" />
                          <span className="text-church-navy">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className={`w-full text-lg py-4 ${plan.popular ? 'church-button' : 'church-button-outline'}`}>
                      {plan.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-church-cream to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-divine text-church-navy px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4" />
              <span className="text-sm font-semibold">Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-church-navy mb-4">
              What Parents Are Saying
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="church-card border-0 shadow-soft hover:shadow-divine transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-church-gold text-church-gold" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-church-navy">{testimonial.name}</div>
                      <div className="text-sm text-church-gold">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-church-navy to-church-light-blue">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Create Your Peaceful Parenting Plan?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of Florida families who have successfully created their parenting plans with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-church-gold hover:bg-church-gold/90 text-church-navy text-lg font-semibold py-4 px-8">
                Start Your Parenting Plan
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-church-navy hover:bg-white hover:text-church-navy text-lg font-semibold py-4 px-8"
                onClick={() => setIsVideoOpen(true)}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoSrc={howItWorksVideo} 
      />
    </div>
  );
};

export default HowWeWork;