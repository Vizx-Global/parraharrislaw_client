import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Smile, 
  Shield, 
  PenSquare, 
  Headphones, 
  Download, 
  Gavel,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  Award,
  Calendar,
  Star
} from "lucide-react";

import familyImage from "@/assets/family.jpg";
import experienceImage from "@/assets/Strategy.jpg";
import satisfactionImage from "@/assets/Consultation.jpg";
import supportImage from "@/assets/Helpline.jpg";
import plansImage from "@/assets/Co-Parenting.jpg";
import successImage from "@/assets/family.jpg";

const KeyFeatures = () => {
  const features = [
    {
      icon: Shield,
      headline: "Supreme Court Approved",
      description: "All templates meet Florida legal requirements and court standards",
      badge: "Florida Compliant",
    },
    {
      icon: DollarSign,
      headline: "Affordable & Fast",
      description: "Create professional plans in under an hour for a fraction of attorney costs",
      badge: "Save Time & Money"
    },
    {
      icon: Smile,
      headline: "No Legal Expertise Needed",
      description: "Our guided questionnaire walks you through every step in plain English",
      badge: "Easy to Use"
    },
    {
      icon: Shield,
      headline: "Bank-Level Security",
      description: "256-bit encryption protects your sensitive family information",
      badge: "Secure & Private"
    },
    {
      icon: PenSquare,
      headline: "Sign Anywhere, Anytime",
      description: "Both parents can review and sign electronically from any device",
      badge: "E-Signature Ready"
    },
    {
      icon: Headphones,
      headline: "We're Here to Help",
      description: "Email support and optional attorney consultation available",
      badge: "Expert Support"
    },
    {
      icon: Zap,
      headline: "Immediate Download",
      description: "Get your completed documents instantly upon completion",
      badge: "Instant Access"
    },
    {
      icon: Gavel,
      headline: "Ready to File",
      description: "Includes filing instructions and properly formatted documents",
      badge: "Court-Ready"
    }
  ];

  const trustIndicators = [
    {
      number: "500+",
      label: "Families Helped",
      description: "Trusted by families across Florida and beyond",
      icon: Users,
      color: "from-blue-500/90 to-cyan-400/90",
      bgColor: "from-blue-600/80 to-cyan-500/80",
      image: familyImage,
    },
    {
      number: "15+",
      label: "Years Experience",
      description: "Decades of dedicated family law expertise",
      icon: Calendar,
      color: "from-green-500/90 to-emerald-400/90",
      bgColor: "from-green-600/80 to-emerald-500/80",
      image: experienceImage,
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      description: "Exceptional service and proven results",
      icon: Star,
      color: "from-amber-500/90 to-yellow-400/90",
      bgColor: "from-amber-600/80 to-yellow-500/80",
      image: satisfactionImage,
    },
    {
      number: "24/7",
      label: "Support",
      description: "Round-the-clock assistance for your needs",
      icon: Headphones,
      color: "from-purple-500/90 to-indigo-400/90",
      bgColor: "from-purple-600/80 to-indigo-500/80",
      image: supportImage,
    },
    {
      number: "3+",
      label: "Plans",
      description: "Comprehensive co-parenting solutions",
      icon: Award,
      color: "from-red-500/90 to-pink-400/90",
      bgColor: "from-red-600/80 to-pink-500/80",
      image: plansImage,
    },
    {
      number: "99%",
      label: "Success Rate",
      description: "Court-approved documents and outcomes",
      icon: CheckCircle,
      color: "from-teal-500/90 to-cyan-400/90",
      bgColor: "from-teal-600/80 to-cyan-500/80",
      image: successImage,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-church-cream to-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-church-light-blue/20 text-church-navy px-4 py-2 rounded-full mb-4">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-semibold">Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-church-navy mb-4">
            Why Families Choose Our Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've simplified the co-parenting plan process without compromising quality
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.headline}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="church-card h-full group hover:shadow-divine transition-all duration-300 border border-white bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  {/* Icon Container */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-church-gold to-secondary-light flex items-center justify-center text-white shadow-golden group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8" />
                  </div>

                  {/* Badge */}
                  <div className="inline-block bg-church-light-blue/30 text-church-navy px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {feature.badge}
                  </div>

                  {/* Headline */}
                  <h3 className="text-lg font-bold text-church-navy mb-3 leading-tight">
                    {feature.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Updated Trust Indicators with Background Images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Section Header */}
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-church-navy mb-4">
              Our Track Record of Excellence
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Years of dedicated service with measurable results for Florida families
            </p>
          </div>

          {/* Stats Grid with Background Images */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {trustIndicators.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="group h-full"
              >
                <Card className="church-card border-0 bg-transparent shadow-none overflow-hidden h-full">
                  <CardContent className="p-0 relative rounded-2xl overflow-hidden h-full min-h-[280px]">
                    {/* Background Image with Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${stat.image})` }}
                    />
                    
                  {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 transition-all duration-500 group-hover:bg-opacity-30" />
                    
                    {/* Content Container */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-white">
                      {/* Icon with Gradient Background */}
                      <motion.div
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}
                      >
                        <stat.icon className="w-8 h-8" />
                      </motion.div>

                      {/* Main Number */}
                      <motion.div
                        initial={{ scale: 0.5 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          duration: 0.6,
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-white mb-2 font-serif"
                      >
                        {stat.number}
                      </motion.div>

                      {/* Label */}
                      <h4 className="text-lg font-semibold mb-2 text-church-gold drop-shadow-lg text-center">
                        {stat.label}
                      </h4>

                      {/* Description */}
                      <p className="text-white/90 text-sm leading-relaxed text-center drop-shadow-lg max-w-[200px]">
                        {stat.description}
                      </p>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-20" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="bg-gradient-to-r from-church-light-blue/20 to-church-gold/20 rounded-2xl p-8 border border-church-gold/30 backdrop-blur-sm">
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-church-gold" />
                  <span>Florida Bar Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-church-gold" />
                  <span>Secure Document Handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-church-gold" />
                  <span>Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-church-gold" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeatures;