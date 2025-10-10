import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const NavigationButtons = ({ currentSection, totalSections, onPrevious, onNext }) => {
  return (
    <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
      <button
        onClick={onPrevious}
        disabled={currentSection === 0}
        className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-church-gold hover:text-church-gold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="w-4 h-4" />
        Previous
      </button>
      
      <button
        onClick={onNext}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-church-gold to-amber-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
      >
        {currentSection === totalSections - 1 ? 'Review & Pay' : 'Next Section'}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NavigationButtons;