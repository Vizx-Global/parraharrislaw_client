import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/HeaderTwo";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock,
  Building,
  User,
  FileText,
  Zap,
  Shield,
  Award,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import hero from "@/assets/contact-hero.jpg";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks! We'll follow up shortly.");
  };

  const contactFeatures = [
    {
      icon: Zap,
      title: "Quick Response",
      description: "We respond to all inquiries within 24 hours",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Confidential",
      description: "Your information is protected and completely confidential",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: Award,
      title: "Expert Advice",
      description: "Get guidance from experienced family law attorneys",
      color: "from-blue-500 to-cyan-500"
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
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-semibold text-church-gold">Contact • Support • Guidance</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl md:text-4xl text-church-navy font-bold mb-6 mt-4 leading-tight"
            >
              Get in Touch with{' '}
              <span className="text-church-gold">Parra Harris Law</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-church-navy font-light mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Ready to discuss your family law matters? Contact us for a confidential consultation. 
              Our experienced team is here to guide you through every step of your legal journey.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-church-gold rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-church-light-blue rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-church-gold rounded-full opacity-25"></div>
      </section>

      {/* Contact Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="church-card border-0 shadow-soft hover:shadow-divine transition-all duration-300 p-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-md mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-church-navy mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-gradient-to-b from-church-cream to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto"
          >
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Office Information */}
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-church-gold/20 shadow-soft hover:shadow-divine transition-all duration-300">
                <h3 className="text-2xl font-bold text-church-navy mb-6 flex items-center gap-3">
                  <Building className="w-6 h-6 text-church-gold" />
                  Parra Harris Law Firm
                </h3>
                <div className="space-y-6 text-church-navy/80">
                  <div className="flex gap-4 items-start">
                    <MapPin className="w-5 h-5 text-church-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-church-navy text-lg">Jacksonville Office</p>
                      <p className="leading-relaxed font-light">6810 St. Augustine Road<br />Jacksonville, FL 32217</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Phone className="w-5 h-5 text-church-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-church-navy text-lg">Phone</p>
                      <a href="tel:+19049001617" className="text-blue-300 hover:text-church-navy hover:underline text-lg leading-relaxed font-light transition-colors">
                        (904) 900-1617
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Mail className="w-5 h-5 text-church-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-church-navy text-lg">Email</p>
                      <a href="mailto:info@parraharrislaw.com" className="text-blue-300 hover:text-church-navy hover:underline text-lg leading-relaxed font-light transition-colors">
                        info@parraharrislaw.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-church-gold/20 shadow-soft hover:shadow-divine transition-all duration-300">
                <h3 className="text-xl font-bold text-church-navy mb-6 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-church-gold" />
                  Office Hours
                </h3>
                <div className="text-church-navy/80 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-church-navy/10">
                    <span className="font-medium">Monday – Friday</span>
                    <span className="text-church-gold font-semibold">8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-church-navy/10">
                    <span className="font-medium">Saturday</span>
                    <span className="text-church-gold font-semibold">Appointments Only</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Sunday</span>
                    <span className="text-red-500 font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="rounded-2xl bg-gradient-divine p-6 border border-church-gold/30 shadow-soft hover:shadow-divine transition-all duration-300">
                <h4 className="text-lg font-bold text-church-navy mb-3">Emergency Legal Assistance</h4>
                <p className="text-church-navy/80 text-sm mb-4">
                  For urgent family law matters requiring immediate attention
                </p>
                <Button className="w-full church-button bg-church-gold hover:bg-church-gold/90 text-church-navy font-semibold py-3 rounded-xl">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: (904) 900-1617
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-church-gold/20 shadow-soft hover:shadow-divine transition-all duration-300">
                <h3 className="text-2xl font-bold text-church-navy mb-6 flex items-center gap-3">
                  <Send className="w-6 h-6 text-church-light-blue" />
                  Send Us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-church-navy text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-church-navy/20 rounded-lg px-4 py-3 text-church-navy placeholder-church-navy/50 focus:outline-none focus:ring-2 focus:ring-church-gold focus:border-church-gold transition-all duration-300"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-church-navy text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-church-navy/20 rounded-lg px-4 py-3 text-church-navy placeholder-church-navy/50 focus:outline-none focus:ring-2 focus:ring-church-gold focus:border-church-gold transition-all duration-300"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-church-navy text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-church-navy/20 rounded-lg px-4 py-3 text-church-navy placeholder-church-navy/50 focus:outline-none focus:ring-2 focus:ring-church-gold focus:border-church-gold transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-church-navy text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-church-navy/20 rounded-lg px-4 py-3 text-church-navy placeholder-church-navy/50 focus:outline-none focus:ring-2 focus:ring-church-gold focus:border-church-gold transition-all duration-300"
                        placeholder="(904) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-church-navy text-sm font-medium mb-2">
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-church-navy/20 rounded-lg px-4 py-3 text-church-navy focus:outline-none focus:ring-2 focus:ring-church-gold focus:border-church-gold transition-all duration-300"
                    >
                      <option value="">Select a service</option>
                      <option value="divorce">Divorce & Separation</option>
                      <option value="custody">Child Custody & Support</option>
                      <option value="adoption">Adoption</option>
                      <option value="domestic-violence">Domestic Violence</option>
                      <option value="prenuptial">Prenuptial Agreements</option>
                      <option value="other">Other Family Law Matter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-church-navy text-sm font-medium mb-2">
                      How Can We Help You? *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full bg-white border border-church-navy/20 rounded-lg px-4 py-3 text-church-navy placeholder-church-navy/50 focus:outline-none focus:ring-2 focus:ring-church-gold focus:border-church-gold transition-all duration-300 resize-none"
                      placeholder="Please describe your legal situation and how we can assist you..."
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full church-button bg-gradient-to-r from-church-gold to-secondary-light text-church-navy hover:from-church-gold/90 hover:to-secondary-light/90 font-semibold py-4 text-lg transition-all duration-300 shadow-golden hover:shadow-golden-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-muted-foreground text-sm text-center">
                    * All fields marked with an asterisk are required. Your information is confidential and protected.
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-divine text-church-navy px-4 py-2 rounded-full mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-semibold">Visit Our Office</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-church-navy mb-4">
              Our Location
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-soft hover:shadow-divine transition-all duration-300 border border-church-gold/20"
          >
            <iframe
              title="Parra Harris Law Map"
              className="w-full h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=6810%20St.%20Augustine%20Road%2C%20Jacksonville%2C%20FL%2032217&output=embed"
            />
          </motion.div>
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
              Ready to Start Your Consultation?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact us today for a confidential consultation and let us help you navigate your family law matters with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-church-gold hover:bg-church-gold/90 text-church-navy text-lg font-semibold py-4 px-8">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: (904) 900-1617
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-church-navy hover:bg-white hover:text-church-navy text-lg font-semibold py-4 px-8"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Send className="w-5 h-5 mr-2 text-church-gold" />
                Send Message
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;