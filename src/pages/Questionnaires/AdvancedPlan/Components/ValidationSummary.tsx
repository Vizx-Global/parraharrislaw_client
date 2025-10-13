import React, { useState, useEffect } from 'react';

interface ValidationError {
  [key: string]: string;
}

interface ValidationSummaryProps {
  showErrors: boolean;
  validationErrors: ValidationError;
  errorCount?: number;
  warningCount?: number;
  onScrollToError?: (fieldId: string) => void;
  onDismiss?: () => void;
  severity?: 'error' | 'warning' | 'info';
  autoHide?: boolean;
  position?: 'top' | 'bottom' | 'floating';
}

const ValidationSummary: React.FC<ValidationSummaryProps> = ({
  showErrors,
  validationErrors,
  errorCount,
  warningCount,
  onScrollToError,
  onDismiss,
  severity = 'error',
  autoHide = false,
  position = 'top'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  const errorEntries = Object.entries(validationErrors);
  const actualErrorCount = errorCount || errorEntries.length;
  const hasErrors = showErrors && actualErrorCount > 0;

  // Auto-show/hide logic
  useEffect(() => {
    if (hasErrors) {
      setIsVisible(true);
      setHasBeenShown(true);
      
      if (autoHide) {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 8000);
        return () => clearTimeout(timer);
      }
    } else if (hasBeenShown && !hasErrors) {
      // Smooth hide when errors are fixed
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasErrors, autoHide, hasBeenShown]);

  // Don't render if no errors and not visible
  if (!hasErrors && !isVisible) return null;

  const getSeverityConfig = () => {
    switch (severity) {
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200',
          text: 'text-amber-800',
          icon: '⚠️',
          title: 'Attention Required',
          button: 'bg-amber-100 hover:bg-amber-200 text-amber-800',
          countBg: 'bg-amber-500'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          icon: '💡',
          title: 'Helpful Tips',
          button: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
          countBg: 'bg-blue-500'
        };
      case 'error':
      default:
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          icon: '❌',
          title: 'Validation Errors',
          button: 'bg-red-100 hover:bg-red-200 text-red-800',
          countBg: 'bg-red-500'
        };
    }
  };

  const config = getSeverityConfig();

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl w-[95%]';
      case 'floating':
        return 'fixed top-24 right-6 z-50 max-w-sm w-80';
      case 'top':
      default:
        return 'relative w-full mb-6';
    }
  };

  const handleErrorClick = (fieldId: string) => {
    if (onScrollToError) {
      onScrollToError(fieldId);
    } else {
      // Enhanced scroll behavior with better field targeting
      let element = document.querySelector(`[data-field="${fieldId}"]`);
      
      // If direct field not found, try to find the question container
      if (!element) {
        element = document.querySelector(`[data-field="${fieldId}"]`) || 
                 document.querySelector(`[data-field="${fieldId.split('.')[0]}"]`) ||
                 document.querySelector(`#${fieldId}`) ||
                 document.querySelector(`[name="${fieldId}"]`);
      }

      if (element) {
        // Scroll to element with better positioning
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });

        // Enhanced visual highlight
        element.classList.add('ring-4', 'ring-red-300', 'ring-opacity-70', 'transition-all', 'duration-1000');
        
        // Focus on input if it's an input field
        const inputElement = element.querySelector('input, select, textarea') || element;
        if (inputElement && 'focus' in inputElement) {
          (inputElement as HTMLElement).focus();
        }

        // Remove highlight after delay
        setTimeout(() => {
          element.classList.remove('ring-4', 'ring-red-300', 'ring-opacity-70', 'transition-all', 'duration-1000');
        }, 3000);
      }
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  const getErrorMessage = (fieldId: string, message: string) => {
    // Enhanced field ID to friendly name mapping
    const fieldNames: { [key: string]: string } = {
      'parent1_income.employment_status': 'Employment Status',
      'parent1_income.gross_monthly': 'Parent 1 Gross Income',
      'parent1_income.gross_monthly': 'Gross Monthly Income',
      'parent2_income.gross_monthly': 'Parent 2 Gross Income',
      'parent2_income.employment_status': 'Parent 2 Employment Status',
      'assets.bank_accounts': 'Bank Accounts',
      'assets.real_estate': 'Real Estate',
      'liabilities.credit_cards': 'Credit Card Debt',
      'children.birth_dates': 'Children Birth Dates',
      'time_sharing.regular_schedule': 'Time-Sharing Schedule',
      'parent1_income.federal_tax': 'Federal Tax',
      'parent1_income.state_tax': 'State Tax',
      'parent1_income.health_insurance_self': 'Health Insurance',
      'parent2_income.federal_tax': 'Parent 2 Federal Tax',
      'parent2_income.state_tax': 'Parent 2 State Tax',
      'expenses.housing.rent_mortgage': 'Housing Payment',
      'expenses.utilities.electricity': 'Electricity Bill',
      'expenses.transportation.car_payments': 'Car Payment',
      'child_support.calculated_amount': 'Child Support Amount',
      'custody_application.case_type': 'Case Type',
      'custody_application.filing_county': 'Filing County'
    };

    // Extract the last part of the field ID and convert to friendly name
    const lastPart = fieldId.split('.').pop() || '';
    const defaultName = lastPart
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    const friendlyName = fieldNames[fieldId] || defaultName;

    return `${friendlyName}: ${message}`;
  };

  const renderMinimizedView = () => (
    <div className={`${config.bg} border rounded-2xl shadow-lg p-4 animate-fade-in`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full ${config.countBg} flex items-center justify-center text-white text-sm font-bold`}>
            {actualErrorCount}
          </div>
          <div>
            <h3 className={`font-semibold ${config.text}`}>
              {config.title}
            </h3>
            <p className="text-sm text-gray-600">
              {actualErrorCount} issue{actualErrorCount !== 1 ? 's' : ''} need{actualErrorCount !== 1 ? '' : 's'} attention
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(false)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${config.button}`}
          >
            Show Details
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  const renderExpandedView = () => (
    <div className={`${config.bg} border rounded-2xl shadow-xl overflow-hidden animate-slide-down`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-opacity-20 border-current">
        <div className="flex items-center space-x-3">
          <span className="text-xl">{config.icon}</span>
          <div>
            <h3 className={`font-bold ${config.text}`}>
              {config.title}
            </h3>
            <p className="text-sm opacity-75">
              Please fix the following {actualErrorCount} issue{actualErrorCount !== 1 ? 's' : ''} to continue
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {errorEntries.length > 3 && (
            <button
              onClick={() => setIsMinimized(true)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${config.button}`}
            >
              Minimize
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-white hover:bg-opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Error List */}
      <div className="max-h-64 overflow-y-auto">
        {errorEntries.slice(0, 10).map(([fieldId, message], index) => (
          <button
            key={fieldId}
            onClick={() => handleErrorClick(fieldId)}
            className="w-full text-left p-4 border-b border-opacity-10 border-current last:border-b-0 hover:bg-white hover:bg-opacity-30 transition-colors group focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-6 h-6 rounded-full ${config.countBg} flex items-center justify-center text-white text-xs font-bold mt-0.5 flex-shrink-0`}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${config.text} group-hover:underline truncate`}>
                  {getErrorMessage(fieldId, message)}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">Click to jump to field</span>
                  <svg className="w-3 h-3 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}
        
        {errorEntries.length > 10 && (
          <div className="p-4 text-center border-t border-opacity-10 border-current">
            <p className="text-sm text-gray-600">
              ... and {errorEntries.length - 10} more issue{errorEntries.length - 10 !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white bg-opacity-50 border-t border-opacity-10 border-current">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Click any error to jump to field</span>
            </div>
          </div>
          
          {warningCount && warningCount > 0 && (
            <div className="flex items-center space-x-1 text-amber-600 text-sm">
              <span>⚠️</span>
              <span>{warningCount} warning{warningCount !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${getPositionClasses()} ${!isVisible ? 'animate-fade-out' : ''}`}>
      {isMinimized && errorEntries.length > 0 ? renderMinimizedView() : renderExpandedView()}
      
      {/* Success message when errors are fixed */}
      {!hasErrors && hasBeenShown && (
        <div className="bg-green-50 border border-green-200 rounded-2xl shadow-lg p-4 animate-fade-in mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-green-800">All Issues Resolved!</h3>
              <p className="text-sm text-green-600">You can now proceed to the next section</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced CSS Animations
const styles = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-out {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
}

@keyframes slide-down {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-fade-out {
  animation: fade-out 0.3s ease-out;
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
}

/* Enhanced focus styles for better accessibility */
[data-field]:focus-within {
  transition: all 0.3s ease;
}

/* Custom ring animation for error highlighting */
.ring-highlight {
  animation: ring-pulse 2s ease-in-out;
}

@keyframes ring-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
}
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default ValidationSummary;