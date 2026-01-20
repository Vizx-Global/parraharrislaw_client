import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock,
  Building
} from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const ContactSection = () => {
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
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-church-cream to-white relative overflow-hidden">
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
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-divine text-church-navy px-4 py-2 rounded-full mb-4">
            <Send className="w-4 h-4" />
            <span className="text-sm font-semibold">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-church-gold mb-4">
            <TypeAnimation
              sequence={[
                'Contact Parra Harris Law',
                2000,
                'Schedule Your Consultation',
                2000,
                'We\'re Here to Help',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-church-navy"
            />
          </h2>
          <p className="text-xl leading-relaxed font-light max-w-3xl mx-auto">
            Ready to discuss your family law matters? Contact us for a confidential consultation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
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
                    <p className="leading-relaxed font-light">1301 Riverplace Blvd, Suite 800<br />Jacksonville, FL 32207</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-church-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-church-navy text-lg">Phone</p>
                    <a href="tel:+19041234567" className="text-blue-300 hover:text-church-navy hover:underline text-lg leading-relaxed font-light transition-colors">
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
                  <span className="text-red-500 font-semibold">Apointments Only</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-divine p-6 border border-church-gold/30 shadow-soft hover:shadow-divine transition-all duration-300">
              <h4 className="text-lg font-bold text-church-navy mb-3">Emergency Legal Assistance</h4>
              <p className="text-church-navy/80 text-sm mb-4">
                For urgent family law matters requiring immediate attention
              </p>
              <Button className="church-button bg-church-gold hover:bg-church-gold/90 text-church-navy font-semibold py-3 rounded-full">
                <Phone className="w-4 h-4 mr-2" />
                Call Now: (904) 900-1617
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 border border-church-gold/20 shadow-soft hover:shadow-divine transition-all duration-300"
          >
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
              </Button>

              <p className="text-muted-foreground text-sm text-center">
                * All fields marked with an asterisk are required. Your information is confidential and protected.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;