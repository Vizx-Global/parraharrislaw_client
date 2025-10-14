import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Shield,
  Scale,
  Users,
  FileText,
  ArrowRight,
  Heart,
  Crown,
  Home,
  User,
  BookOpen,
  Newspaper,
  Contact
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", icon: Home },
    { name: "About Us", icon: Users },
    { name: "Pricing", icon: Crown },
    { name: "How It Works", icon: BookOpen },
    { name: "Attorney", icon: User },
    { name: "Contact", icon: Contact }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {/* Brand Column */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-church-gold to-amber-400 rounded-xl flex items-center justify-center shadow-golden">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-church-gold bg-clip-text text-transparent">
                    Parra Harris Law
                  </h3>
                  <p className="text-church-gold text-sm font-semibold">Family Law Excellence</p>
                </div>
              </div>
              
              <p className="text-blue-100 leading-relaxed mb-6">
                Providing compassionate and expert legal representation for Florida families since 2008. 
                Your trusted partner in family law matters.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Shield className="w-4 h-4 text-church-gold" />
                  <span className="text-xs font-medium">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Crown className="w-4 h-4 text-church-gold" />
                  <span className="text-xs font-medium">Award Winning</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      backgroundColor: "rgba(255,255,255,0.15)"
                    }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:text-church-gold transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Quick Links Column with Icons */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-church-gold" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    {/* Icon Container */}
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-church-gold/20 transition-all duration-300">
                      <link.icon className="w-4 h-4 text-church-gold group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    {/* Link Text */}
                    <span className="text-blue-100 hover:text-church-gold transition-colors duration-300 text-sm flex-1">
                      {link.name}
                    </span>
                    
                    {/* Hover Arrow */}
                    <ArrowRight className="w-3 h-3 text-church-gold opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all duration-300" />
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info Column */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-church-gold" />
                Contact Info
              </h4>
              
              <div className="space-y-4">
                {/* Address */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-church-gold/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-church-gold/30 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-church-gold" />
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                      6810 St. Augustine Road<br />
                      Jacksonville, Florida 32217
                    </p>
                  </div>
                </motion.div>

                {/* Phone Numbers */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-church-gold/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-church-gold/30 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-church-gold" />
                  </div>
                  <div className="space-y-1">
                    <a href="tel:904-900-1617" className="text-blue-100 hover:text-church-gold transition-colors duration-300 text-sm block">
                      904-900-1617
                    </a>
                    <a href="tel:904-527-3390" className="text-blue-100 hover:text-church-gold transition-colors duration-300 text-sm block">
                      (904) 527-3390
                    </a>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-church-gold/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-church-gold/30 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-church-gold" />
                  </div>
                  <div>
                    <a href="mailto:trip@parrahamrislaw.com" className="text-blue-100 hover:text-church-gold transition-colors duration-300 text-sm break-all">
                      info@parrahamrislaw.com
                    </a>
                  </div>
                </motion.div>

                {/* Office Hours */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-church-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-church-gold" />
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm font-semibold">Office Hours</p>
                    <p className="text-blue-100 text-sm">Mon-Fri: 8:30AM - 5:30PM</p>
                    <p className="text-blue-100 text-sm">Emergency: 24/7 Available</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-blue-200 text-sm"
              >
                <span>© {currentYear} Parra Harris Law. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> for Florida Families
                </span>
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 text-sm"
              >
                <a href="#" className="text-blue-200 hover:text-church-gold transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-blue-200 hover:text-church-gold transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-blue-200 hover:text-church-gold transition-colors duration-300">
                  Disclaimer
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-church-gold/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-church-light-blue/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white/5 rounded-full blur-lg"></div>
    </footer>
  );
};

export default Footer;