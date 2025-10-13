import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentStep, totalSteps, percentage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-church-navy text-white p-6 rounded-3xl shadow-2xl mb-8"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Step {currentStep} of {totalSteps}</span>
        <span className="text-church-gold font-bold">
          {Math.round(percentage)}% Complete
        </span>
      </div>
      <div className="h-3 w-full bg-church-navy/50 rounded-full overflow-hidden">
        <motion.div 
          className="h-3 bg-gradient-to-r from-church-gold to-amber-500 rounded-full transition-all duration-700 ease-out"
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
        />
      </div>
    </motion.div>
  );
};

export default ProgressBar;