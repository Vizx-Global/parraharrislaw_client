import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './Components/ProgressiveBar';
import SectionHeader from './Components/SectionHeader';
import QuestionRenderer from './Components/QuestionRenderer';
import NavigationButtons from './Components/NavigationButtons';
import ValidationSummary from './Components/ValidationSummary';
import PaymentSection from './Components/PaymentSection';
import Header from '@/components/HeaderTwo'; 
import Footer from '@/components/Footer'; 
import { sections, paymentMethods, initialFormData } from './data/FormData'

// Mock authentication check with test credentials
const checkAuthStatus = () => {
  // Check if user is already authenticated
  const userData = localStorage.getItem('userData');
  if (userData) {
    return true;
  }
  
  // For development: Auto-authenticate with test credentials
  const testCredentials = {
    email: 'client@gmail.com',
    password: '12Client12**',
    name: 'Test Client',
    plan: 'advanced'
  };
  
  // Auto-login for development
  localStorage.setItem('userData', JSON.stringify(testCredentials));
  localStorage.setItem('authToken', 'dev-test-token-' + Date.now());
  
  return true;
};

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const authStatus = checkAuthStatus();
    setIsAuthenticated(authStatus);
    setAuthChecked(true);
    
    // Development log
    if (authStatus) {
      console.log('🔐 Auto-authenticated with test credentials: client@gmail.com');
    }
  }, []);

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
      
      if (keys.length === 1) {
        return {
          ...prev,
          [path]: value
        };
      }
  
      const newData = { ...prev };
      let current = newData;
 
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
  
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {};
        } else {
          current[key] = { ...current[key] };
        }
        current = current[key];
      }
  
      const lastKey = keys[keys.length - 1];
      current[lastKey] = value;
      
      return newData;
    });
    
    if (validationErrors[path]) {
      setValidationErrors(prev => ({
        ...prev,
        [path]: ''
      }));
    }
  };

  const handleAuthenticationRequired = () => {
    // Store current form data and progress before redirecting to login
    const progressData = {
      currentSection,
      formData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('questionnaireProgress', JSON.stringify(progressData));
    
    // Redirect to sign-in page
    navigate('/sign-in', { 
      state: { 
        returnTo: '/diy-plan',
        message: 'Please sign in to complete your payment and generate your parenting plan'
      }
    });
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
      // Check authentication before showing payment
      if (checkAuthStatus()) {
        setShowPayment(true);
      } else {
        handleAuthenticationRequired();
      }
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

  // Show loading while checking authentication
  if (!authChecked) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Setting up your account...</p>
            <p className="text-sm text-gray-500 mt-2">Auto-login with test credentials</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (showPayment && isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <PaymentSection
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          prevSection={prevSection}
          paymentMethods={paymentMethods}
        />
        <Footer />
      </div>
    );
  }

  const currentSectionData = sections[currentSection];
  const progressPercentage = ((currentSection + 1) / (sections.length + 1)) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50/30 mt-20 py-6">
        <div className="max-w-6xl mx-auto px-4">
          {/* Development Mode Banner */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-900">Development Mode Active</h4>
                <p className="text-green-700 text-sm">
                  Auto-logged in as: <strong>client@gmail.com</strong> • You can proceed directly to payment
                </p>
              </div>
            </div>
          </div>

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
                nextButtonText={
                  currentSection === sections.length - 1 
                    ? 'Proceed to Payment' 
                    : 'Continue'
                }
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}