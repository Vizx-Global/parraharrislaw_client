import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, MessageCircle, Download, FileText, Shield, ArrowRight } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "DIY Plan",
      price: "$999",
      description: "Perfect for amicable co-parents",
      badge: {
        text: "Most Popular",
        icon: Star,
        variant: "default" as const
      },
      features: [
        { icon: FileText, text: "Custom parenting plan" },
        { icon: Download, text: "20-30 question questionnaire" },
        { icon: Check, text: "E-signature for both parents" },
        { icon: Download, text: "Instant PDF download" },
        { icon: FileText, text: "Court filing instructions" },
        { icon: MessageCircle, text: "Email support" }
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Advanced Plan",
      price: "$2,500",
      description: "Complete legal package with attorney review",
      badge: {
        text: "Best Value",
        icon: Crown,
        variant: "secondary" as const
      },
      features: [
        { icon: Shield, text: "Everything in DIY, plus:" },
        { icon: Check, text: "Attorney review & editing" },
        { icon: FileText, text: "Custody application" },
        { icon: FileText, text: "Financial affidavit (both parents)" },
        { icon: FileText, text: "Child support guidelines" },
        { icon: MessageCircle, text: "Direct attorney messaging" },
        { icon: Check, text: "Custom clause insertion" }
      ],
      cta: "Get Started",
      highlighted: true
    },
    {
      name: "Consultation Add-on",
      price: "$350",
      description: "Add expert guidance to any plan",
      features: [
        { icon: MessageCircle, text: "45-minute attorney consultation" },
        { icon: Check, text: "Q&A session" },
        { icon: Shield, text: "State-specific guidance" },
        { icon: FileText, text: "Filing procedure clarification" },
        { icon: MessageCircle, text: "Video conference" },
        { icon: Download, text: "Post-meeting notes" }
      ],
      cta: "Add to Plan"
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

  const hoverVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="pricing" className="py-10 bg-gradient-to-b from-white to-church-cream">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-divine text-church-navy px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-semibold">Transparent Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-church-navy mb-4">
            Choose the Plan That's Right For You
          </h2>
          <p className="text-xl leading-relaxed font-light max-w-3xl mx-auto">
            Clear pricing, no hidden fees. All plans include Florida-compliant documents.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover="hover"
              className="flex flex-col h-full"
            >
              <Card className={`church-card h-full flex flex-col relative overflow-hidden ${
                plan.highlighted 
                  ? 'border-2 border-church-gold shadow-golden scale-105' 
                  : 'border border-border'
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

                {/* Card Header */}
                <CardHeader className="pb-4">
                  <h3 className="text-2xl font-bold text-church-navy">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-church-navy">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>

                {/* Card Content */}
                <CardContent className="flex-1 pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          feature.icon === Shield 
                            ? 'bg-church-light-blue text-church-navy' 
                            : 'bg-church-gold/20 text-church-gold'
                        }`}>
                          <feature.icon className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                {/* Card Footer */}
                <CardFooter>
                  <Button 
                    className={`w-full py-6 text-base font-semibold ${
                      plan.highlighted 
                        ? 'church-button' 
                        : 'bg-church-navy hover:bg-church-navy/90 text-white shadow-divine'
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a 
            href="/pricing" 
            className="inline-flex items-center gap-2 text-church-gold hover:text-church-navy font-semibold transition-colors duration-300 group"
          >
            See detailed pricing comparison
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-church-gold" />
              <span>Florida Bar Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-church-gold" />
              <span>Secure Document Handling</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-church-gold" />
              <span>Quality-service Guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;