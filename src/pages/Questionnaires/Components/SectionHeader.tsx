import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, BadgeCheck } from 'lucide-react';
import Parra_Harris_Logo from '@/assets/Parra_Harris-Final.png';

const SectionHeader = ({ section }) => {
  const { icon: Icon, title, description, color } = section;
  const navigate = useNavigate();

  return (
    <div className={`bg-gradient-to-r ${color} text-white p-8 relative overflow-hidden border-b-4 border-white/20`}>
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
      
      {/* Legal Badge Elements */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-3">
        <motion.div
          className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Shield className="w-3 h-3" />
          <span className="text-xs font-semibold">Florida Bar Certified</span>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with Logo */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo Section */}
          <motion.div
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="flex items-center justify-center border-2 border-white/30 rounded-full shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <img 
                  src={Parra_Harris_Logo} 
                  alt="Parra Harris Law" 
                  className="w-28 h-28 object-contain"
                />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-church-gold rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-3 h-3 text-white" />
              </motion.div>
            </div>
            
            <div className="text-left border-l-2 border-white/30 pl-4">
              <h3 className="font-bold text-white text-xl leading-tight tracking-wide">Parra Harris Law</h3>
              <p className="text-white/80 text-sm font-medium mt-1">Family Law & Co-Parenting Solutions</p>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/25">
              <BadgeCheck className="w-4 h-4 text-church-gold" />
              <span className="text-white font-semibold text-sm">Secure & Confidential</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Section Content */}
        <div className="flex items-center gap-8">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-white/25 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shadow-2xl">
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-xl -z-10"></div>
          </motion.div>
          
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-3 drop-shadow-2xl bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-white/90 text-xl font-medium max-w-3xl leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-church-gold to-amber-400"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, delay: 0.8 }}
      />
    </div>
  );
};

export default SectionHeader;