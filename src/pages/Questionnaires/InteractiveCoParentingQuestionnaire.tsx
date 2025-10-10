import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, User, Users, Calendar, Phone, Mail, MapPin, Book, Heart, Shield, 
  AlertCircle, HelpCircle, CreditCard, Lock, CheckCircle, Star, Zap, 
  ArrowRight, ArrowLeft, Crown, Sparkles, Gift, ShieldCheck, BadgeCheck,
  DollarSign, Wallet, AlertTriangle
} from 'lucide-react';

// Import components
import ProgressBar from './Components/ProgressiveBar';
import SectionHeader from './Components/SectionHeader';
import QuestionRenderer from './Components/QuestionRenderer';
import NavigationButtons from './Components/NavigationButtons';
import ValidationSummary from './Components/ValidationSummary';
import PaymentSection from './Components/PaymentSection';

// Import data
import { sections, paymentMethods, initialFormData } from './data/FormData'

// Helper function to get nested values
const getNestedValue = (obj, path) => {
  if (!path) return undefined;
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

export default function InteractiveCoParentingQuestionnaire() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const validateSection = (sectionIndex) => {
    const currentSectionData = sections[sectionIndex];
    const errors = {};
    
    currentSectionData.questions.forEach(question => {
      if (question.required) {
        const value = getNestedValue(formData, question.id);
        
        if (question.type === 'interactive-checkbox') {
          if (!value || value.length === 0) {
            errors[question.id] = 'Please select at least one option';
          }
        } else if (question.type === 'card-select' || question.type === 'interactive-select' || question.type === 'button-group') {
          if (!value || value === '') {
            errors[question.id] = 'Please select an option';
          }
        } else if (!value || value.toString().trim() === '') {
          errors[question.id] = 'This field is required';
        }
      }
    });
    
    return errors;
  };

  const handleInputChange = (path, value) => {
    setFormData(prev => {
      const keys = path.split('.');
      
      // Handle simple case (no dots in path)
      if (keys.length === 1) {
        return {
          ...prev,
          [path]: value
        };
      }
      
      // Handle nested paths
      const newData = { ...prev };
      let current = newData;
      
      // Navigate to the parent object
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        
        // Ensure the current level exists and is an object
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {};
        } else {
          current[key] = { ...current[key] };
        }
        current = current[key];
      }
      
      // Set the final value
      const lastKey = keys[keys.length - 1];
      current[lastKey] = value;
      
      return newData;
    });
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[path]) {
      setValidationErrors(prev => ({
        ...prev,
        [path]: ''
      }));
    }
  };

  const nextSection = () => {
    const errors = validateSection(currentSection);
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setShowErrors(true);
      
      const firstErrorId = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[data-field="${firstErrorId}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setValidationErrors({});
    setShowErrors(false);
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowPayment(true);
    }
  };

  const prevSection = () => {
    setValidationErrors({});
    setShowErrors(false);
    
    if (showPayment) {
      setShowPayment(false);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  if (showPayment) {
    return (
      <PaymentSection
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        prevSection={prevSection}
        paymentMethods={paymentMethods}
      />
    );
  }

  const currentSectionData = sections[currentSection];
  const progressPercentage = ((currentSection + 1) / (sections.length + 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <ProgressBar
          currentStep={currentSection + 1}
          totalSteps={sections.length + 1}
          percentage={progressPercentage}
        />

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <SectionHeader section={currentSectionData} />

          <div className="p-8">
            <ValidationSummary 
              showErrors={showErrors}
              validationErrors={validationErrors}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSectionData.questions.map((question, index) => (
                <QuestionRenderer
                  key={question.id}
                  question={question}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  showErrors={showErrors}
                  validationErrors={validationErrors}
                />
              ))}
            </div>

            <NavigationButtons
              currentSection={currentSection}
              totalSections={sections.length}
              onPrevious={prevSection}
              onNext={nextSection}
            />
          </div>
        </div>
      </div>
    </div>
  );
}