import React, { useState, useRef, useEffect } from 'react';

interface Question {
  id: string;
  question_number: number;
  question_text: string;
  question_type: 'text' | 'dropdown' | 'currency' | 'percentage' | 'date' | 
                'interactive-checkbox' | 'interactive-select' | 'card-select' | 
                'button-group' | 'repeater' | 'file-upload' | 'textarea' | 'radio';
  required: boolean;
  options?: string[];
  placeholder?: string;
  tooltip?: string;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    error_message?: string;
    custom?: (value: any, formData: any) => string | null;
  };
  conditional_logic?: {
    show_if?: { field: string; value: any };
    hide_if?: { field: string; value: any };
    trigger_questions?: string[];
  };
  maps_to_pdf_field?: string;
  attorney_editable?: boolean;
  help_text?: string;
  repeater_template?: any;
}

interface QuestionRendererProps {
  question: Question;
  formData: any;
  handleInputChange: (path: string, value: any) => void;
  handleRepeaterAdd?: (path: string, template: any) => void;
  handleRepeaterRemove?: (path: string, index: number) => void;
  handleRepeaterChange?: (path: string, index: number, field: string, value: any) => void;
  showErrors: boolean;
  validationErrors: { [key: string]: string };
  autoCalculations?: any;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  formData,
  handleInputChange,
  handleRepeaterAdd,
  handleRepeaterRemove,
  handleRepeaterChange,
  showErrors,
  validationErrors,
  autoCalculations
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get current value from form data
  const getNestedValue = (obj: any, path: string) => {
    if (!path) return undefined;
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  const value = getNestedValue(formData, question.id);
  const error = showErrors ? validationErrors[question.id] : null;
  const hasError = !!error;

  // Check if question should be visible based on conditional logic
  const shouldShowQuestion = () => {
    if (!question.conditional_logic) return true;

    const { show_if, hide_if } = question.conditional_logic;

    if (show_if) {
      const fieldValue = getNestedValue(formData, show_if.field);
      return fieldValue === show_if.value;
    }

    if (hide_if) {
      const fieldValue = getNestedValue(formData, hide_if.field);
      return fieldValue !== hide_if.value;
    }

    return true;
  };

  if (!shouldShowQuestion()) {
    return null;
  }

  // Common input styles
  const getInputStyles = (hasError: boolean, isFocused: boolean) => {
    const baseStyles = "w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ";
    
    if (hasError) {
      return baseStyles + "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200";
    }
    
    if (isFocused) {
      return baseStyles + "border-blue-300 bg-white focus:border-blue-500 focus:ring-blue-200";
    }
    
    return baseStyles + "border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-blue-200";
  };

  // Render different question types
  const renderQuestion = () => {
    switch (question.question_type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={question.placeholder}
            className={getInputStyles(hasError, isFocused)}
            data-field={question.id}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={question.placeholder}
            rows={4}
            className={getInputStyles(hasError, isFocused) + " resize-vertical"}
            data-field={question.id}
          />
        );

      case 'dropdown':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={getInputStyles(hasError, isFocused)}
            data-field={question.id}
          >
            <option value="">Select an option</option>
            {question.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'currency':
        return (
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
              $
            </span>
            <input
              type="number"
              value={value || ''}
              onChange={(e) => handleInputChange(question.id, parseFloat(e.target.value) || 0)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={question.placeholder || '0.00'}
              min="0"
              step="0.01"
              className={getInputStyles(hasError, isFocused) + " pl-8"}
              data-field={question.id}
            />
          </div>
        );

      case 'percentage':
        return (
          <div className="relative">
            <input
              type="number"
              value={value || ''}
              onChange={(e) => handleInputChange(question.id, parseFloat(e.target.value) || 0)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={question.placeholder || '0'}
              min="0"
              max="100"
              step="0.1"
              className={getInputStyles(hasError, isFocused) + " pr-8"}
              data-field={question.id}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
              %
            </span>
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={getInputStyles(hasError, isFocused)}
            data-field={question.id}
          />
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'interactive-checkbox':
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => {
              const isSelected = Array.isArray(value) ? value.includes(option) : false;
              return (
                <label
                  key={index}
                  className={`flex items-center space-x-3 p-3 border rounded-lg transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      const currentValue = Array.isArray(value) ? value : [];
                      if (e.target.checked) {
                        handleInputChange(question.id, [...currentValue, option]);
                      } else {
                        handleInputChange(
                          question.id,
                          currentValue.filter((item: string) => item !== option)
                        );
                      }
                    }}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className={`font-medium ${
                    isSelected ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        );

      case 'card-select':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options?.map((option, index) => {
              const isSelected = value === option;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleInputChange(question.id, option)}
                  className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="font-medium text-gray-900">{option}</div>
                </button>
              );
            })}
          </div>
        );

      case 'button-group':
        return (
          <div className="flex flex-wrap gap-2">
            {question.options?.map((option, index) => {
              const isSelected = value === option;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleInputChange(question.id, option)}
                  className={`px-4 py-2 border rounded-lg font-medium transition-all duration-300 ${
                    isSelected
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        );

      case 'interactive-select':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {question.options?.map((option, index) => {
              const isSelected = value === option;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleInputChange(question.id, option)}
                  className={`p-4 border-2 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{option}</div>
                </button>
              );
            })}
          </div>
        );

      case 'repeater':
        if (!handleRepeaterAdd || !handleRepeaterRemove || !handleRepeaterChange) {
          console.warn('Repeater handlers not provided for question:', question.id);
          return null;
        }

        const repeaterItems = Array.isArray(value) ? value : [];

        return (
          <div className="space-y-4">
            {repeaterItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-900">
                    Item {index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleRepeaterRemove(question.id, index)}
                    className="text-red-500 hover:text-red-700 p-1 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(question.repeater_template || {}).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {field.replace(/_/g, ' ')}
                      </label>
                      <input
                        type={typeof question.repeater_template[field] === 'number' ? 'number' : 'text'}
                        value={item[field] || ''}
                        onChange={(e) => handleRepeaterChange(
                          question.id,
                          index,
                          field,
                          typeof question.repeater_template[field] === 'number' 
                            ? parseFloat(e.target.value) || 0 
                            : e.target.value
                        )}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleRepeaterAdd(question.id, question.repeater_template || {})}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium">Add New Item</span>
              </div>
            </button>
          </div>
        );

      case 'file-upload':
        return (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  // Handle file upload - this would integrate with your file handling logic
                  console.log('Files selected:', e.target.files);
                }
              }}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors bg-gray-50 hover:bg-blue-50"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">📎</div>
                <div className="font-semibold text-gray-700">Click to upload files</div>
                <div className="text-sm text-gray-500 mt-1">
                  PDF, JPG, PNG, DOC up to 10MB
                </div>
              </div>
            </button>

            {/* File preview area would go here */}
          </div>
        );

      default:
        return (
          <div className="text-red-500 text-sm">
            Unsupported question type: {question.question_type}
          </div>
        );
    }
  };

  // Render auto-calculated values for certain fields
  const renderAutoCalculation = () => {
    if (!autoCalculations) return null;

    // Example: Show net income calculation for income fields
    if (question.id.includes('gross_monthly') && question.id.includes('parent1_income')) {
      const netIncome = autoCalculations.parent1_net_income;
      if (netIncome !== undefined) {
        return (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-green-700 font-medium">Estimated Net Income:</span>
              <span className="text-green-800 font-bold">
                ${netIncome.toFixed(2)}
              </span>
            </div>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div 
      className={`question-container p-6 bg-white rounded-2xl border-2 transition-all duration-300 ${
        hasError 
          ? 'border-red-200 bg-red-50 animate-pulse' 
          : isFocused 
            ? 'border-blue-200 shadow-lg' 
            : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
      }`}
      data-field={question.id}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full">
              {question.question_number}
            </span>
            <label className="block text-lg font-semibold text-gray-900 leading-tight">
              {question.question_text}
              {question.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
          </div>

          {/* Tooltip and Help */}
          <div className="flex items-center space-x-3">
            {question.tooltip && (
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                {showTooltip && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-10">
                    {question.tooltip}
                    <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>
            )}

            {question.help_text && (
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors flex items-center space-x-1"
              >
                <span>💡</span>
                <span>Need help?</span>
              </button>
            )}

            {question.attorney_editable && (
              <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                ⚖️ Attorney Review
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Help Text */}
      {showHelp && question.help_text && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-800 leading-relaxed">
            {question.help_text}
          </div>
        </div>
      )}

      {/* Question Input */}
      <div className="mb-3">
        {renderQuestion()}
      </div>

      {/* Auto-calculation Display */}
      {renderAutoCalculation()}

      {/* Error Message */}
      {hasError && (
        <div className="flex items-center space-x-2 text-red-600 text-sm mt-2 animate-fade-in">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Character counter for textareas */}
      {(question.question_type === 'textarea' || question.question_type === 'text') && value && (
        <div className="text-right text-xs text-gray-500 mt-1">
          {value.length} characters
        </div>
      )}

      {/* PDF Field Mapping Indicator */}
      {question.maps_to_pdf_field && (
        <div className="mt-2 text-xs text-gray-400">
          Maps to: {question.maps_to_pdf_field}
        </div>
      )}
    </div>
  );
};

export default QuestionRenderer;