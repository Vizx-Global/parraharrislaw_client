import React, { useState, useEffect } from 'react';
import ProgressBar from './Components/ProgressBar';
import SectionHeader from './Components/SectionHeader';
import QuestionRenderer from './Components/QuestionRenderer';
import NavigationButtons from './Components/NavigatioButtons';
import ValidationSummary from './Components/ValidationSummary';
import DocumentUploadCenter from './Components/DocumentUplaodCenter';
import FinancialSummary from './Components/FinancialSummary';
import ChildSupportCalculator from './Components/ChildSupporCalculatort';
import FinancialSectionRenderer from './Components/FinancialSectionRender';
import Header from '@/components/HeaderTwo'; 
import Footer from '@/components/Footer'; 
import { advancedSections, paymentMethods, initialAdvancedFormData } from './data/AdvanceFormData';

const getNestedValue = (obj, path) => {
  if (!path) return undefined;
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

export default function AdvancedCoParentingQuestionnaire() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [formData, setFormData] = useState(initialAdvancedFormData);
  const [autoCalculations, setAutoCalculations] = useState({});
  const [uploadedDocuments, setUploadedDocuments] = useState({});

  // Auto-calculations for financial sections
  useEffect(() => {
    calculateFinancialSummaries();
  }, [formData]);

  const calculateFinancialSummaries = () => {
    const calculations = {};
    
    // Parent 1 Net Income Calculation
    const parent1Gross = parseFloat(formData.parent1_income?.gross_monthly || 0);
    const parent1Deductions = calculateParentDeductions(formData.parent1_income);
    calculations.parent1_net_income = parent1Gross - parent1Deductions;
    
    // Parent 2 Net Income Calculation
    const parent2Gross = parseFloat(formData.parent2_income?.gross_monthly || 0);
    const parent2Deductions = calculateParentDeductions(formData.parent2_income);
    calculations.parent2_net_income = parent2Gross - parent2Deductions;
    
    // Combined calculations
    calculations.combined_net_income = calculations.parent1_net_income + calculations.parent2_net_income;
    calculations.parent1_income_percentage = calculations.combined_net_income > 0 ? 
      (calculations.parent1_net_income / calculations.combined_net_income) * 100 : 0;
    calculations.parent2_income_percentage = calculations.combined_net_income > 0 ? 
      (calculations.parent2_net_income / calculations.combined_net_income) * 100 : 0;
    
    setAutoCalculations(calculations);
  };

  const calculateParentDeductions = (incomeData) => {
    if (!incomeData) return 0;
    
    return (
      parseFloat(incomeData.federal_tax || 0) +
      parseFloat(incomeData.state_tax || 0) +
      parseFloat(incomeData.fica_tax || 0) +
      parseFloat(incomeData.union_dues || 0) +
      parseFloat(incomeData.mandatory_retirement || 0) +
      parseFloat(incomeData.health_insurance_self || 0)
    );
  };

  const validateSection = (sectionIndex) => {
    const currentSectionData = advancedSections[sectionIndex];
    const errors = {};
    
    currentSectionData.questions.forEach(question => {
      if (question.required) {
        const value = getNestedValue(formData, question.id);
        
        // Enhanced validation based on question type
        if (question.type === 'interactive-checkbox') {
          if (!value || value.length === 0) {
            errors[question.id] = question.validation?.error_message || 'Please select at least one option';
          }
        } else if (question.type === 'currency') {
          if (!value || isNaN(parseFloat(value)) || parseFloat(value) < 0) {
            errors[question.id] = 'Please enter a valid amount';
          }
        } else if (question.type === 'percentage') {
          if (!value || isNaN(parseFloat(value)) || parseFloat(value) < 0 || parseFloat(value) > 100) {
            errors[question.id] = 'Please enter a valid percentage (0-100)';
          }
        } else if (question.type === 'repeater') {
          if (!value || value.length === 0) {
            errors[question.id] = 'Please add at least one item';
          }
        } else if (question.type === 'file-upload') {
          if (question.required && (!uploadedDocuments[question.id] || uploadedDocuments[question.id].length === 0)) {
            errors[question.id] = 'Please upload required documents';
          }
        } else if (!value || value.toString().trim() === '') {
          errors[question.id] = question.validation?.error_message || 'This field is required';
        }
      }
      
      // Custom validation rules
      if (question.validation?.custom) {
        const customError = question.validation.custom(value, formData);
        if (customError) {
          errors[question.id] = customError;
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

  const handleRepeaterAdd = (path, template) => {
    setFormData(prev => {
      const currentArray = getNestedValue(prev, path) || [];
      return {
        ...prev,
        [path]: [...currentArray, { ...template }]
      };
    });
  };

  const handleRepeaterRemove = (path, index) => {
    setFormData(prev => {
      const currentArray = getNestedValue(prev, path) || [];
      const newArray = currentArray.filter((_, i) => i !== index);
      
      const keys = path.split('.');
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = newArray;
      return newData;
    });
  };

  const handleRepeaterChange = (path, index, field, value) => {
    setFormData(prev => {
      const currentArray = getNestedValue(prev, path) || [];
      const newArray = currentArray.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      );
      
      const keys = path.split('.');
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = newArray;
      return newData;
    });
  };

  const handleFileUpload = (field, files) => {
    setUploadedDocuments(prev => ({
      ...prev,
      [field]: files
    }));
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
    
    if (currentSection < advancedSections.length - 1) {
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

  const renderSectionSpecificComponents = () => {
    const currentSectionData = advancedSections[currentSection];
    
    switch (currentSectionData.section_id) {
      case 'section_14': // Child Support Calculation
        return (
          <ChildSupportCalculator
            formData={formData}
            autoCalculations={autoCalculations}
          />
        );
      
      case 'section_16': // Document Upload Center
        return (
          <DocumentUploadCenter
            uploadedDocuments={uploadedDocuments}
            onFileUpload={handleFileUpload}
            requiredDocuments={currentSectionData.requiredDocuments}
          />
        );
      
      case 'section_9':
      case 'section_10':
      case 'section_11':
      case 'section_12':
      case 'section_13':
        return (
          <FinancialSummary
            formData={formData}
            autoCalculations={autoCalculations}
            section={currentSectionData}
          />
        );
      
      default:
        return null;
    }
  };

  if (showPayment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <PaymentSection
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          prevSection={prevSection}
          paymentMethods={paymentMethods}
          tier="Advanced"
          price={2500}
        />
        <Footer />
      </div>
    );
  }

  const currentSectionData = advancedSections[currentSection];
  const progressPercentage = ((currentSection + 1) / (advancedSections.length + 1)) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50/30 mt-20 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold text-gray-900">Advanced Co-Parenting Plan</h1>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                $2,500 - Complete Package
              </span>
            </div>
            <ProgressBar
              currentStep={currentSection + 1}
              totalSteps={advancedSections.length + 1}
              percentage={progressPercentage}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <SectionHeader 
                  section={currentSectionData}
                  autoCalculations={autoCalculations}
                />

                <div className="p-8">
                  <ValidationSummary 
                    showErrors={showErrors}
                    validationErrors={validationErrors}
                  />

                  {/* Section-specific components */}
                  {renderSectionSpecificComponents()}

                  {/* Dynamic question grid based on section type */}
                  {currentSectionData.layout === 'financial' ? (
                    <div className="space-y-8">
                      {currentSectionData.questionGroups?.map((group, groupIndex) => (
                        <div key={groupIndex} className="border border-gray-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-4 text-gray-800">{group.groupName}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {group.questions.map((question, index) => (
                              <QuestionRenderer
                                key={question.id}
                                question={question}
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleRepeaterAdd={handleRepeaterAdd}
                                handleRepeaterRemove={handleRepeaterRemove}
                                handleRepeaterChange={handleRepeaterChange}
                                showErrors={showErrors}
                                validationErrors={validationErrors}
                                autoCalculations={autoCalculations}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentSectionData.questions.map((question, index) => (
                        <QuestionRenderer
                          key={question.id}
                          question={question}
                          formData={formData}
                          handleInputChange={handleInputChange}
                          handleRepeaterAdd={handleRepeaterAdd}
                          handleRepeaterRemove={handleRepeaterRemove}
                          handleRepeaterChange={handleRepeaterChange}
                          showErrors={showErrors}
                          validationErrors={validationErrors}
                          autoCalculations={autoCalculations}
                        />
                      ))}
                    </div>
                  )}

                  <NavigationButtons
                    currentSection={currentSection}
                    totalSections={advancedSections.length}
                    onPrevious={prevSection}
                    onNext={nextSection}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar - Financial Summary & Progress */}
            <div className="xl:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Financial Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parent 1 Net Income:</span>
                    <span className="font-medium">${autoCalculations.parent1_net_income?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parent 2 Net Income:</span>
                    <span className="font-medium">${autoCalculations.parent2_net_income?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-800 font-semibold">Combined Income:</span>
                    <span className="font-semibold text-blue-600">
                      ${autoCalculations.combined_net_income?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Navigation</h3>
                <div className="space-y-2">
                  {advancedSections.map((section, index) => (
                    <button
                      key={section.section_id}
                      onClick={() => setCurrentSection(index)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentSection === index
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {section.section_name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <h4 className="font-semibold text-yellow-800 mb-2">Need Help?</h4>
                <p className="text-yellow-700 text-sm mb-3">
                  Our legal team is available to assist with complex financial questions.
                </p>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Schedule Attorney Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}