import React from 'react';

interface NavigationButtonsProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onSave?: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  showSave?: boolean;
  isSubmitting?: boolean;
  sectionType?: 'basic' | 'financial' | 'legal';
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSave,
  isNextDisabled = false,
  nextLabel,
  previousLabel,
  showSave = false,
  isSubmitting = false,
  sectionType = 'basic'
}) => {
  // Color schemes based on section type
  const getColorScheme = (type: string) => {
    const schemes = {
      basic: {
        primary: 'from-blue-500 to-cyan-600',
        hover: 'from-blue-600 to-cyan-700',
        focus: 'ring-blue-500',
        secondary: 'text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300',
        progress: 'bg-blue-500'
      },
      financial: {
        primary: 'from-green-500 to-emerald-600',
        hover: 'from-green-600 to-emerald-700',
        focus: 'ring-green-500',
        secondary: 'text-green-600 hover:text-green-700 border-green-200 hover:border-green-300',
        progress: 'bg-green-500'
      },
      legal: {
        primary: 'from-purple-500 to-indigo-600',
        hover: 'from-purple-600 to-indigo-700',
        focus: 'ring-purple-500',
        secondary: 'text-purple-600 hover:text-purple-700 border-purple-200 hover:border-purple-300',
        progress: 'bg-purple-500'
      }
    };
    return schemes[type as keyof typeof schemes] || schemes.basic;
  };

  const colors = getColorScheme(sectionType);
  const isFirstSection = currentSection === 0;
  const isLastSection = currentSection === totalSections - 1;
  const progressPercentage = ((currentSection + 1) / totalSections) * 100;

  // Get appropriate labels
  const getNextLabel = () => {
    if (nextLabel) return nextLabel;
    if (isLastSection) return 'Review & Complete';
    if (currentSection === totalSections - 2) return 'Almost Done →';
    return 'Continue →';
  };

  const getPreviousLabel = () => {
    if (previousLabel) return previousLabel;
    return '← Back';
  };

  // Section type icons
  const getSectionIcon = () => {
    const icons = {
      basic: '📝',
      financial: '💰',
      legal: '⚖️'
    };
    return icons[sectionType as keyof typeof icons] || '📝';
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {currentSection + 1} of {totalSections}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${colors.primary} transition-all duration-700 ease-out relative overflow-hidden`}
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Left Side - Previous Button & Save */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            disabled={isFirstSection || isSubmitting}
            className={`
              flex items-center justify-center px-6 py-3 rounded-xl font-semibold
              transition-all duration-300 transform hover:scale-105 active:scale-95
              border-2 focus:outline-none focus:ring-4 focus:ring-opacity-50
              ${isFirstSection 
                ? 'text-gray-400 border-gray-200 bg-gray-100 cursor-not-allowed' 
                : `${colors.secondary} bg-white hover:shadow-lg border-current`
              }
              min-w-[120px]
            `}
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {getPreviousLabel()}
          </button>

          {/* Save Button */}
          {showSave && onSave && (
            <button
              onClick={onSave}
              disabled={isSubmitting}
              className="
                flex items-center justify-center px-6 py-3 rounded-xl font-semibold
                text-gray-600 border-2 border-gray-300 bg-white
                hover:text-gray-800 hover:border-gray-400 hover:shadow-lg
                focus:outline-none focus:ring-4 focus:ring-gray-200
                transition-all duration-300 transform hover:scale-105 active:scale-95
                min-w-[120px]
              "
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Progress
                </>
              )}
            </button>
          )}
        </div>

        {/* Right Side - Next Button with Enhanced Visuals */}
        <div className="w-full sm:w-auto">
          <button
            onClick={onNext}
            disabled={isNextDisabled || isSubmitting}
            className={`
              group relative w-full sm:w-auto flex items-center justify-center 
              px-8 py-4 rounded-xl font-bold text-white
              bg-gradient-to-r ${colors.primary} 
              hover:bg-gradient-to-r ${colors.hover}
              focus:outline-none focus:ring-4 focus:ring-opacity-50 ${colors.focus}
              transition-all duration-500 transform hover:scale-105 active:scale-95
              shadow-lg hover:shadow-xl
              ${(isNextDisabled || isSubmitting) 
                ? 'opacity-50 cursor-not-allowed hover:scale-100' 
                : 'hover:shadow-2xl'
              }
              min-w-[160px]
              overflow-hidden
            `}
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            {/* Button content */}
            <div className="relative flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Processing...
                </>
              ) : (
                <>
                  <span className="mr-3">{getNextLabel()}</span>
                  {!isLastSection && (
                    <svg 
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {isLastSection && (
                    <svg 
                      className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </>
              )}
            </div>

            {/* Pulse animation for attention */}
            {!isNextDisabled && !isSubmitting && isLastSection && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/30 to-transparent animate-pulse" />
            )}
          </button>

          {/* Helper text for next section */}
          {!isLastSection && (
            <div className="mt-2 text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-end text-xs text-gray-500">
                <span className="mr-1">{getSectionIcon()}</span>
                Next: {getNextSectionHint(currentSection)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Navigation Dots */}
      <div className="mt-6 flex justify-center">
        <div className="flex space-x-2">
          {Array.from({ length: totalSections }, (_, i) => i).map((index) => (
            <button
              key={index}
              onClick={() => {
                // This would need to be connected to a section jump function
                console.log('Navigate to section:', index);
              }}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === currentSection 
                  ? `${colors.progress} scale-125 shadow-md` 
                  : index < currentSection 
                  ? 'bg-gray-400 hover:bg-gray-500' 
                  : 'bg-gray-300 hover:bg-gray-400'
                }
                hover:scale-110
              `}
              title={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Auto-save indicator */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Auto-save enabled • All progress is secured</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to provide hints about next section
const getNextSectionHint = (currentSection: number): string => {
  const hints = [
    'Parent Information',
    'Children Details', 
    'Living Arrangements',
    'Time-Sharing Schedule',
    'Decision-Making',
    'Communication',
    'Special Provisions',
    'Modifications',
    'Parent 1 Income',
    'Parent 2 Income',
    'Assets & Property',
    'Liabilities & Debts',
    'Monthly Expenses',
    'Child Support Calculation',
    'Custody Application',
    'Document Upload',
    'Attorney Review',
    'Final Review'
  ];
  
  return hints[currentSection + 1] || 'Next Section';
};

export default NavigationButtons;