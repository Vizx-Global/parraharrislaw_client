import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart,
  Target,
  Users,
  Shield,
  Award,
  Star,
  ArrowRight,
  Quote,
  Calendar,
  FileText,
  CheckCircle2,
  Globe,
  Clock,
  Zap
} from "lucide-react";
import teamImage from "@/assets/family.jpg";
import missionImage from "@/assets/Consultation.jpg";
import valuesImage from "@/assets/Strategy.jpg";
import Header from "@/components/HeaderTwo";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const stats = [
    { number: "500+", label: "Families Helped", icon: Users },
    { number: "100%", label: "Court Acceptance", icon: CheckCircle2 },
    { number: "98%", label: "Client Satisfaction", icon: Star },
    { number: "15+", label: "Years Experience", icon: Clock }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion First",
      description: "We understand that co-parenting is emotional. Our approach prioritizes your family's wellbeing above all else.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Shield,
      title: "Legal Excellence",
      description: "Every document is crafted to meet Florida's legal standards, backed by experienced family law attorneys.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We've revolutionized family law by making it accessible, affordable, and stress-free for Florida families.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "We measure success by your family's peaceful transition and the court's acceptance of your parenting plan.",
      color: "from-emerald-500 to-green-500"
    }
  ];

  const team = [
    {
      name: "Paola Parra Harris, Esq.",
      role: "Founder & Managing Attorney",
      bio: "With over 25 years of family law experience, Paola founded CoParent Florida to make legal services accessible to all families.",
      expertise: ["Family Law", "Mediation", "Bilingual Services"],
      image: "paola-image"
    },
    {
      name: "Legal Technology Team",
      role: "Platform Development",
      bio: "Our tech team ensures the platform is intuitive, secure, and always available when you need it.",
      expertise: ["Legal Tech", "Security", "User Experience"],
      image: "tech-team"
    },
    {
      name: "Support Specialists",
      role: "Client Success",
      bio: "Dedicated professionals ready to guide you through every step of creating your parenting plan.",
      expertise: ["Client Support", "Document Guidance", "Court Procedures"],
      image: "support-team"
    }
  ];

  const milestones = [
    { year: "2008", event: "Founded with vision to democratize family law" },
    { year: "2015", event: "Launched first digital parenting plan platform" },
    { year: "2020", event: "Helped 500+ Florida families" },
    { year: "2024", event: "Expanded to full-service co-parenting solutions" }
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
              <Heart className="w-4 h-4" />
              <span className="text-sm font-semibold text-church-gold">Our Story</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-church-navy mb-6 leading-tight"
            >
              Building <span className="text-church-gold">Better Futures</span> for Florida Families
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl text-church-navy font-light mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              We're revolutionizing family law by making it accessible, affordable, and compassionate. 
              Our mission is to help separated parents create peaceful co-parenting arrangements that put children first.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-church-gold rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-church-light-blue rounded-full opacity-30"></div>
      </section>

      {/* Mission & Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-divine text-church-navy px-4 py-2 rounded-full mb-6">
                <Target className="w-4 h-4" />
                <span className="text-sm font-semibold">Our Mission</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-church-navy mb-6">
                Transforming Family Law for the Better
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded by experienced family law attorney Paola Parra Harris, CoParent Florida was born from 
                  a simple observation: traditional legal services were too expensive, too slow, and too stressful 
                  for families navigating separation.
                </p>
                <p>
                  We set out to change that by creating a platform that combines legal expertise with modern technology, 
                  making court-ready parenting plans accessible to every Florida family.
                </p>
                <p>
                  Today, we've helped hundreds of parents create peaceful co-parenting arrangements that prioritize 
                  children's wellbeing while ensuring legal compliance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button className="church-button">
                  Meet Our Team
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="church-button-outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Our Approach
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-soft">
                <img 
                  src={missionImage} 
                  alt="Our mission to help families"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-church-gold rounded-2xl opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-church-cream to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <Card className="church-card border-0 shadow-soft hover:shadow-divine transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-church-gold to-secondary-light rounded-xl flex items-center justify-center text-white shadow-golden mx-auto mb-4">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-church-navy mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              <span className="text-sm font-semibold">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-church-navy mb-4">
              What Guides Everything We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles shape every interaction, every document, and every feature of our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="church-card border-0 shadow-soft hover:shadow-divine transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${value.color} text-white shadow-md mx-auto mb-4`}>
                      <value.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-church-navy mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-church-navy mb-4">
              The People Behind Your Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A dedicated team of legal experts and technology professionals working together for your family.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="church-card border-0 shadow-soft hover:shadow-divine transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-church-gold to-secondary-light rounded-2xl flex items-center justify-center text-white shadow-golden mx-auto mb-4">
                      <Users className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-church-navy mb-2">
                      {member.name}
                    </h3>
                    <p className="text-church-gold font-semibold text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-church-light-blue text-church-navy px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
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
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-church-navy mb-4">
              Building a Better Future
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="flex-1 text-center">
                  <div className="bg-gradient-divine rounded-2xl p-6 shadow-soft">
                    <div className="text-2xl font-bold text-church-gold mb-2">
                      {milestone.year}
                    </div>
                    <p className="text-church-navy">
                      {milestone.event}
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-church-gold rounded-full mx-8"></div>
                <div className="flex-1"></div>
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
              Ready to Start Your Co-Parenting Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the hundreds of Florida families who have found peace and clarity through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-church-gold hover:bg-church-gold/90 text-church-navy text-lg font-semibold py-4 px-8">
                Start Your Parenting Plan
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="border-white text-church-navy hover:bg-white hover:text-church-navy text-lg font-semibold py-4 px-8">
                <Calendar className="w-5 h-5 mr-2 text-church-gold" />
                Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;