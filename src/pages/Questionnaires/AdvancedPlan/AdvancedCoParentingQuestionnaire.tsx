import React, { useState } from 'react';
import ProgressBar from './Components/ProgressiveBar';
import SectionHeader from './Components/SectionHeader';
import QuestionRenderer from './Components/QuestionRenderer';
import NavigationButtons from './Components/NavigationButtons';
import ValidationSummary from './Components/ValidationSummary';
import DashboardLayout from '@/components/DashboardLayout';
import { sections, initialFormData } from './data/FormData'

const getNestedValue = (obj, path) => {
  if (!path) return undefined;
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

export default function AdvancedPlanQuestionnaire({ onComplete, onSaveDraft }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock user data for the dashboard layout
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'advanced' as const
  };

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
    
    // Auto-save draft for Advanced Plan
    if (onSaveDraft) {
      const draftData = {
        ...formData,
        [path]: value
      };
      onSaveDraft(draftData);
    }
    
    if (validationErrors[path]) {
      setValidationErrors(prev => ({
        ...prev,
        [path]: ''
      }));
    }
  };

  const handleSubmitForReview = async () => {
    setIsSubmitting(true);
    
    try {
      // System Actions for Advanced Plan:
      // 1. Generate Draft Parenting Plan (PDF)
      // 2. Set status: "Awaiting Attorney Review"
      // 3. Trigger attorney assignment
      // 4. Redirect to dashboard with success state
      
      console.log('Submitting for attorney review:', formData);
      
      if (onComplete) {
        await onComplete(formData);
      }
      
      // Optional: Redirect to dashboard or show success message
      // navigate('/dashboard?status=questionnaire_complete');
      
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSection = () => {
    // Validation is disabled to allow proceeding with null fields for presentation purposes.
    /*
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
    */
    
    setValidationErrors({});
    setShowErrors(false);
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Last section completed - submit for attorney review
      handleSubmitForReview();
    }
  };

  const prevSection = () => {
    setValidationErrors({});
    setShowErrors(false);
    
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const currentSectionData = sections[currentSection];
  const progressPercentage = ((currentSection + 1) / sections.length) * 100;

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6 p-6">
        {/* Welcome Banner - Full Width */}
        <div className="bg-gradient-to-r from-church-navy to-primary-glow rounded-xl p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">Advanced Legal Plan Questionnaire</h1>
              <p className="text-church-light-blue opacity-90">
                Complete your parenting plan details. Your assigned attorney will review and refine this document.
              </p>
            </div>
            <div className="mt-4 lg:mt-0 lg:text-right">
              <div className="bg-church-gold text-church-navy px-4 py-2 rounded-full text-sm font-semibold inline-block">
                Attorney Review Included
              </div>
              <p className="text-sm mt-2">$2,500 Plan • No Payment Required</p>
            </div>
          </div>
        </div>

        {/* Progress Bar - Full Width */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <ProgressBar
            currentStep={currentSection + 1}
            totalSteps={sections.length}
            percentage={progressPercentage}
          />
        </div>

        {/* Questionnaire Content - Full Width */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <SectionHeader section={currentSectionData} />

          <div className="p-6">
            {/* Advanced Plan Features Indicator */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900">Advanced Plan Feature</h4>
                  <p className="text-blue-700 text-sm">
                    Your responses will be professionally reviewed by your assigned attorney to ensure legal compliance and optimal outcomes.
                  </p>
                </div>
              </div>
            </div>

            <ValidationSummary 
              showErrors={showErrors}
              validationErrors={validationErrors}
            />

            {/* Responsive Grid for Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

            {/* Navigation Buttons */}
            <div className="mt-8">
              <NavigationButtons
                currentSection={currentSection}
                totalSections={sections.length}
                onPrevious={prevSection}
                onNext={nextSection}
                isSubmitting={isSubmitting}
                nextButtonText={
                  currentSection === sections.length - 1 
                    ? 'Submit for Attorney Review' 
                    : 'Continue'
                }
              />
            </div>

            {/* Auto-save Indicator */}
            <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Auto-save enabled - your progress is saved automatically</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation Help */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Use the sidebar to navigate to other sections of your Advanced Plan
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}