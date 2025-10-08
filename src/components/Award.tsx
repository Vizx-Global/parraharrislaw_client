import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Trophy, 
  Star, 
  Users, 
  Shield, 
  TrendingUp,
  ChevronRight,
  Quote
} from "lucide-react";
import awardBadge from "@/assets/Expertise2021.png";
import communityImage from "@/assets/community-spotlight.jpg";
import excellenceAward from "@/assets/excellence-award.png";

const CommunitySpotlight = () => {
  const awards = [
    {
      category: "Professional Excellence",
      items: [
        "Automotive Business: James - Ultimate Adelaide",
        "Safety Management: Robert - Ultimate Adelaide, Harvey (SUS)",
        "Corporate Governance: Charles - Finance & Finance Group and General Counsel (GPS)",
        "Managing Director: Jennifer - Finance & Finance Group",
        "Marketing: Stephen University Consulting Partners of the Year (SUS)",
        "Marketing: Richard O'Connor (SUS)",
        "Customer Relationships: James - Vice Chairman (SUS)",
        "Executive Vice President: John L. McWilliams (SUS)"
      ],
      icon: Trophy,
      color: "from-blue-500 to-cyan-400"
    },
    {
      category: "Industry Leadership",
      items: [
        "Solutions - Stuart Schmuck, Stuart Kane (SUS), Leonard",
        "Manufacturing Products: Nick Hinton, Michael Tucker, Freddy Eckhardt (SUS), James",
        "Marketing Products: David Wickham, Chris Clay, Howard Whitworth (SUS)",
        "Marketing Products: Gary Williams, Jessica Fowler",
        "Retail & Company Product: Jonathan C. Green",
        "Online Chartered Accountants: Brian Lewis (SUS)",
        "Marketing Products: Andrew D. Davis, David Jones (SUS)",
        "Business Development: Jason R. Brown (SUS), James"
      ],
      icon: TrendingUp,
      color: "from-green-500 to-emerald-400"
    },
    {
      category: "Client Excellence",
      items: [
        "Financial Services: Alexander Corporation, New York (NYU) (SUS)",
        "Insurance: Mr. MacLean, Mr. Chandra, Michael Lee (SUS)",
        "Finance & Finance Group: John L. McWilliams (SUS)",
        "Corporate Governance: John L. McWilliams, James",
        "Financial Support: Michael R. Brown (SUS)"
      ],
      icon: Users,
      color: "from-amber-500 to-yellow-400"
    }
  ];

  const stats = [
    { number: "50+", label: "Industry Awards", icon: Trophy },
    { number: "100+", label: "Happy Clients", icon: Users },
    { number: "15+", label: "Years Excellence", icon: Star },
    { number: "99%", label: "Success Rate", icon: TrendingUp }
  ];

  const testimonials = [
    {
      quote: "Outstanding legal expertise combined with genuine care for clients.",
      author: "James Robertson",
      role: "Corporate Client"
    },
    {
      quote: "Transformed our family's legal journey with compassion and professionalism.",
      author: "Sarah Chen",
      role: "Family Law Client"
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

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-10 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-24 -right-24 w-48 h-48 bg-church-gold/10 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-church-light-blue/10 rounded-full"
        />
        
        {/* Floating Award Icons */}
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="absolute top-1/4 left-1/6"
        >
          <Trophy className="w-8 h-8 text-church-gold/30" />
        </motion.div>
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          transition={{ delay: 0.5 }}
          className="absolute top-1/3 right-1/5"
        >
          <Star className="w-6 h-6 text-church-light-blue/30" />
        </motion.div>
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute bottom-1/4 left-1/3"
        >
          <Award className="w-10 h-10 text-church-gold/20" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex items-center gap-2 bg-gradient-divine text-primary px-4 py-2 rounded-full mb-4"
          >
            <Award className="w-4 h-4" />
            <span className="text-sm  leading-relaxed font-light">Recognition & Awards</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Community Spotlight
          </h2>
          <p className="text-xl leading-relaxed text-primary font-light max-w-3xl mx-auto">
            Celebrating excellence and recognition in legal services and community leadership
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Awards Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {awards.map((award, index) => (
              <motion.div
                key={award.category}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <Card className="bg-gradient-divine hover:border-church-gold/50 transition-all duration-300">
                  <CardContent className="p-6">
                    {/* Award Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${award.color} flex items-center justify-center text-white shadow-lg`}>
                        <award.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {award.category}
                        </h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-church-gold to-transparent rounded-full mt-1" />
                      </div>
                    </div>

                    {/* Award Items */}
                    <ul className="space-y-2">
                      {award.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2 text-sm leading-relaxed font-light"
                        >
                          <div className="w-2 h-2 bg-church-gold rounded-full mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Visual Elements & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Main Award Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="aspect-video bg-gradient-to-br from-church-gold to-church-light-blue flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-20 h-20 mx-auto mb-4"
                  >
                    <img 
                      src={awardBadge} 
                      alt="Award Badge"
                      className="w-full h-full rounded-full object-contain"
                    />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Excellence in Legal Services</h3>
                  <p className="text-white/80">Recognized for outstanding client service and community impact</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <Star className="w-6 h-6 text-church-gold" />
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="church-card border-2 border-church-gold/40 bg-gradient-to-br from-white to-church-cream/50 backdrop-blur-sm hover:border-church-gold/40 hover:shadow-golden rounded-xl p-4 text-center border border-white/20 hover:border-church-gold/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-church-gold to-secondary-light flex items-center justify-center text-white">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-church-gold">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-church-navy to-church-navy/70 rounded-2xl p-6 backdrop-blur-sm border border-white/20"
            >
              <div className="flex items-start gap-3 mb-4">
                <Quote className="w-8 h-8 text-church-gold flex-shrink-0" />
                <h3 className="text-xl font-bold text-white">Client Testimonials</h3>
              </div>
              
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <p className="text-white/90 text-sm italic mb-2">"{testimonial.quote}"</p>
                    <div className="text-right">
                      <div className="text-church-gold font-semibold text-sm">{testimonial.author}</div>
                      <div className="text-white/60 text-xs">{testimonial.role}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button className="church-button bg-white text-church-navy hover:bg-white/90 font-semibold py-4 px-8 text-lg rounded-full">
                View Full Awards Gallery
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySpotlight;