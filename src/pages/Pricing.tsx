import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, MessageCircle, Download, FileText, Shield, ArrowRight, X, Zap, Clock, Users, Target, Heart, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Commet } from "react-loading-indicators";
import Header from "@/components/HeaderTwo";
import Footer from "@/components/Footer";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <Commet color="#D4AF37" size="medium" text="" textColor="" />
        <p className="mt-4 text-church-navy font-semibold">Loading co-parenting plan</p>
      </div>
    </div>
  );
};

const PricingPage = () => {
  const [loading, setLoading] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("diy");
  const navigate = useNavigate();

  const handlePlanClick = (route: string, planName: string) => {
    setLoadingRoute(planName);
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      navigate(route); 
    }, 2500);
  };

  const plans = [
    {
      id: "diy",
      name: "DIY Essential Plan",
      price: "$999",
      description: "Perfect for amicable co-parents who want a fast, court-ready parenting plan",
      badge: {
        text: "Most Popular",
        icon: Star,
        variant: "default" as const
      },
      features: [
        { icon: FileText, text: "Custom parenting plan questionnaire", included: true },
        { icon: Check, text: "Florida-specific legal compliance", included: true },
        { icon: Download, text: "Secure e-signature for both parents", included: true },
        { icon: FileText, text: "Instant PDF download", included: true },
        { icon: FileText, text: "Court filing instructions", included: true },
        { icon: MessageCircle, text: "Email support", included: true },
        { icon: FileText, text: "30-day access to documents", included: true },
        { icon: Shield, text: "Attorney review & editing", included: false },
        { icon: MessageCircle, text: "Attorney consultation", included: false },
        { icon: FileText, text: "Custody application preparation", included: false },
        { icon: FileText, text: "Financial affidavits", included: false },
        { icon: FileText, text: "Child support calculation", included: false },
        { icon: MessageCircle, text: "Direct attorney messaging", included: false }
      ],
      cta: "Start DIY Plan",
      route: "/diy-plan",
      popular: true
    },
      {
      id: "advanced",
      name: "Advanced Legal Plan",
      price: "$2,500",
      description: "Complete legal package with full attorney review and support",
      badge: {
        text: "Best Value",
        icon: Crown,
        variant: "secondary" as const
      },
      features: [
        { icon: FileText, text: "Custom parenting plan questionnaire", included: true },
        { icon: Check, text: "Florida-specific legal compliance", included: true },
        { icon: Download, text: "Secure e-signature for both parents", included: true },
        { icon: FileText, text: "Instant PDF download", included: true },
        { icon: FileText, text: "Court filing instructions", included: true },
        { icon: MessageCircle, text: "Email support", included: true },
        { icon: FileText, text: "30-day access to documents", included: true },
        { icon: Shield, text: "Attorney review & editing", included: true },
        { icon: MessageCircle, text: "Attorney consultation included", included: true },
        { icon: FileText, text: "Custody application preparation", included: true },
        { icon: FileText, text: "Financial affidavits (both parents)", included: true },
        { icon: FileText, text: "Child support guidelines calculation", included: true },
        { icon: MessageCircle, text: "Direct attorney messaging", included: true }
      ],
      cta: "Get Full Support",
      route: "/advance-plan",
      highlighted: true
    },
    {
      id: "consultation",
      name: "Consultation Add-on",
      price: "$350",
      description: "Add expert guidance to any plan",
      badge: null,
      features: [
        { icon: MessageCircle, text: "45-minute attorney consultation", included: true },
        { icon: Users, text: "Q&A session", included: true },
        { icon: Target, text: "State-specific guidance", included: true },
        { icon: FileText, text: "Filing procedure clarification", included: true },
        { icon: MessageCircle, text: "Video conference", included: true },
        { icon: FileText, text: "Post-meeting notes", included: true },
        { icon: FileText, text: "Custom parenting plan questionnaire", included: false },
        { icon: Check, text: "Florida-specific legal compliance", included: false },
        { icon: Download, text: "Secure e-signature for both parents", included: false },
        { icon: Shield, text: "Attorney review & editing", included: false },
        { icon: FileText, text: "Custody application preparation", included: false },
        { icon: FileText, text: "Financial affidavits", included: false },
        { icon: FileText, text: "Child support calculation", included: false }
      ],
      cta: "Add Consultation",
      route: "/consultation",
      popular: false
    },
  ];

  const addOns = [
    {
      name: "Emergency Filing Support",
      price: "$500",
      description: "Expedited processing and court filing assistance",
      features: [
        "48-hour document processing",
        "Court filing service",
        "Filing fee guidance",
        "Status updates",
        "Rush handling"
      ]
    },
    {
      name: "Modification Package",
      price: "$750",
      description: "Future modifications to your parenting plan",
      features: [
        "Plan modification questionnaire",
        "Updated court documents",
        "E-signature processing",
        "Filing instructions for modifications",
        "6-month access to updates"
      ]
    },
    {
      name: "Document Review Only",
      price: "$450",
      description: "Have your existing documents reviewed by an attorney",
      features: [
        "Attorney document review",
        "Feedback and recommendations",
        "Compliance verification",
        "48-hour turnaround",
        "Written summary report"
      ]
    }
  ];

  const comparisonFeatures = [
    { name: "Custom Parenting Plan Creation", diy: true, consultation: false, advanced: true },
    { name: "Florida-Specific Legal Compliance", diy: true, consultation: false, advanced: true },
    { name: "Secure E-Signature Platform", diy: true, consultation: false, advanced: true },
    { name: "Instant PDF Document Download", diy: true, consultation: false, advanced: true },
    { name: "Court Filing Instructions", diy: true, consultation: false, advanced: true },
    { name: "Email Support", diy: true, consultation: false, advanced: true },
    { name: "30-Day Document Access", diy: true, consultation: false, advanced: true },
    { name: "45-Minute Attorney Consultation", diy: false, consultation: true, advanced: true },
    { name: "Q&A Session", diy: false, consultation: true, advanced: true },
    { name: "State-Specific Guidance", diy: false, consultation: true, advanced: true },
    { name: "Video Conference Meeting", diy: false, consultation: true, advanced: true },
    { name: "Post-Meeting Notes", diy: false, consultation: true, advanced: true },
    { name: "Attorney Document Review", diy: false, consultation: false, advanced: true },
    { name: "Attorney Editing & Revisions", diy: false, consultation: false, advanced: true },
    { name: "Custody Application Preparation", diy: false, consultation: false, advanced: true },
    { name: "Financial Affidavits (Both Parents)", diy: false, consultation: false, advanced: true },
    { name: "Child Support Calculation", diy: false, consultation: false, advanced: true },
    { name: "Direct Attorney Messaging", diy: false, consultation: false, advanced: true }
  ];

  const testimonials = [
    {
      name: "Sarah M., Orlando",
      role: "Single Mother",
      content: "The DIY Plan saved us thousands in legal fees. We had our parenting plan ready in just two days!",
      rating: 5,
      plan: "DIY Essential"
    },
    {
      name: "Michael T., Miami",
      role: "Co-Parent",
      content: "The attorney review in the Advanced Plan caught important details we missed. Worth every penny for peace of mind.",
      rating: 5,
      plan: "Advanced Legal"
    },
    {
      name: "Jennifer L., Tampa",
      role: "Working Parent",
      content: "The consultation add-on gave me the confidence to file on my own. The attorney answered all my questions clearly.",
      rating: 5,
      plan: "Consultation Add-on"
    }
  ];

  const faqs = [
    {
      question: "Is the DIY Plan really court-ready?",
      answer: "Yes! Our DIY Plan creates Florida-compliant parenting plans that have a 100% court acceptance rate when properly completed."
    },
    {
      question: "What if I need help with my DIY Plan?",
      answer: "You can upgrade to the Advanced Plan at any time, or purchase a Consultation Add-on for specific guidance."
    },
    {
      question: "How long does the attorney review take?",
      answer: "Advanced Plan documents are typically reviewed and returned within 24-48 hours by our Florida family law attorneys."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment options. Contact our team to discuss payment plan arrangements that work for you."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
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
    <div className="min-h-screen bg-gradient-to-b from-white to-church-cream">
      <Header />
      {loading && <FullPageLoader />}
      
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
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold text-church-gold">Simple • Transparent • Affordable</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl md:text-4xl text-church-navy font-bold mb-6 mt-4 leading-tight"
            >
              Choose Your{' '}
              <span className="text-church-gold">Co-Parenting Plan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-church-navy font-light mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Clear pricing, no hidden fees. All plans include Florida-compliant documents 
              designed by family law attorneys to ensure court acceptance.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-church-gold rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-church-light-blue rounded-full opacity-30"></div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className="flex flex-col h-full"
              >
                <Card className={`church-card h-full flex flex-col relative overflow-hidden transition-all duration-300 ${
                  plan.highlighted 
                    ? 'border-2 border-church-gold shadow-golden lg:scale-105' 
                    : 'border border-church-navy/20 shadow-soft hover:shadow-divine'
                }`}>
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge 
                        variant={plan.badge.variant}
                        className="bg-gradient-to-r from-church-gold to-secondary-light text-church-navy font-semibold py-1 px-3 shadow-golden"
                      >
                        <plan.badge.icon className="w-3 h-3 mr-1" />
                        {plan.badge.text}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <h3 className="text-2xl font-bold text-church-navy">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-church-gold">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="flex-1 pb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            feature.included 
                              ? 'bg-church-gold/20 text-church-gold' 
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                            {feature.included ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <X className="w-3 h-3" />
                            )}
                          </div>
                          <span className={`text-sm ${feature.included ? 'text-church-navy' : 'text-gray-400'}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button 
                      onClick={() => handlePlanClick(plan.route, plan.name)}
                      className={`w-full py-6 text-base font-semibold ${
                        plan.highlighted 
                          ? 'church-button' 
                          : 'bg-church-navy hover:bg-church-navy/90 text-white shadow-divine'
                      }`}
                      size="lg"
                    >
                      {loading && loadingRoute === plan.name ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Loading...
                        </div>
                      ) : (
                        <>
                          {plan.cta}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Add-Ons Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-divine text-church-navy px-4 py-2 rounded-full mb-4">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Additional Services</span>
            </div>
            <h3 className="text-3xl font-bold text-church-navy mb-4">
              Enhance Your Plan
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {addOns.map((addOn, index) => (
              <motion.div
                key={addOn.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="church-card border border-church-navy/20 shadow-soft hover:shadow-divine transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-church-navy mb-2">{addOn.name}</h4>
                    <div className="text-2xl font-bold text-church-gold mb-3">{addOn.price}</div>
                    <p className="text-muted-foreground mb-4 text-sm">{addOn.description}</p>
                    <ul className="space-y-2">
                      {addOn.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-church-gold flex-shrink-0" />
                          <span className="text-church-navy">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
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
              <Target className="w-4 h-4" />
              <span className="text-sm font-semibold">Detailed Comparison</span>
            </div>
            <h3 className="text-3xl font-bold text-church-navy mb-4">
              Plan Feature Comparison
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See exactly what's included in each plan to make the best choice for your situation.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <Card className="church-card border border-church-navy/20 shadow-soft">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-church-navy/10">
                        <th className="text-left p-4 md:p-6 font-semibold text-church-navy text-sm md:text-base">Features</th>
                        <th className="text-center p-4 md:p-6 font-semibold text-church-navy text-sm md:text-base">DIY Essential</th>
                        <th className="text-center p-4 md:p-6 font-semibold text-church-navy text-sm md:text-base">Consultation</th>
                        <th className="text-center p-4 md:p-6 font-semibold text-church-gold text-sm md:text-base">Advanced Legal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((feature, index) => (
                        <tr key={feature.name} className="border-b border-church-navy/5 hover:bg-church-cream/50 transition-colors">
                          <td className="p-3 md:p-4 text-church-navy text-sm">{feature.name}</td>
                          <td className="text-center p-3 md:p-4">
                            {feature.diy ? (
                              <Check className="w-4 h-4 md:w-5 md:h-5 text-church-gold mx-auto" />
                            ) : (
                              <X className="w-4 h-4 md:w-5 md:h-5 text-gray-300 mx-auto" />
                            )}
                          </td>
                          <td className="text-center p-3 md:p-4">
                            {feature.consultation ? (
                              <Check className="w-4 h-4 md:w-5 md:h-5 text-church-gold mx-auto" />
                            ) : (
                              <X className="w-4 h-4 md:w-5 md:h-5 text-gray-300 mx-auto" />
                            )}
                          </td>
                          <td className="text-center p-3 md:p-4">
                            {feature.advanced ? (
                              <Check className="w-4 h-4 md:w-5 md:h-5 text-church-gold mx-auto" />
                            ) : (
                              <X className="w-4 h-4 md:w-5 md:h-5 text-gray-300 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              <Star className="w-4 h-4" />
              <span className="text-sm font-semibold">Success Stories</span>
            </div>
            <h3 className="text-3xl font-bold text-church-navy mb-4">
              What Parents Are Saying
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                      <div className="text-xs text-muted-foreground mt-1">Used: {testimonial.plan}</div>
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
              Ready to Create Your Parenting Plan?
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
              >
                <MessageCircle className="w-5 h-5 mr-2 text-church-gold" />
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;