import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  percentage: number;
  tier?: 'basic' | 'advanced';
  sectionName?: string;
  estimatedTime?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  percentage,
  tier = 'advanced',
  sectionName,
  estimatedTime
}) => {
  // Section icons for visual representation
  const getSectionIcon = (step: number) => {
    const icons = {
      1: '👤', // Parent Info
      2: '👶', // Children
      3: '🏠', // Living Arrangements
      4: '📅', // Time-Sharing
      5: '🤝', // Decision-Making
      6: '💬', // Communication
      7: '⚡', // Special Provisions
      8: '🔄', // Modifications
      9: '💼', // Parent 1 Income
      10: '💼', // Parent 2 Income
      11: '💰', // Assets
      12: '🏦', // Liabilities
      13: '📊', // Expenses
      14: '🧮', // Child Support
      15: '⚖️', // Custody Application
      16: '📎', // Documents
      17: '👨‍💼', // Attorney Review
      18: '✅'  // Final Review
    };
    return icons[step as keyof typeof icons] || '📝';
  };

  const getSectionCategory = (step: number) => {
    if (step <= 8) return 'basic';
    if (step <= 16) return 'financial';
    return 'legal';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'bg-blue-500';
      case 'financial': return 'bg-green-500';
      case 'legal': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'basic': return 'Basic Info';
      case 'financial': return 'Financial Details';
      case 'legal': return 'Legal Process';
      default: return '';
    }
  };

  // Section names for tooltips
  const getSectionName = (step: number) => {
    const sections = {
      1: 'Parent Information',
      2: 'Children Details',
      3: 'Living Arrangements',
      4: 'Time-Sharing Schedule',
      5: 'Decision-Making',
      6: 'Communication',
      7: 'Special Provisions',
      8: 'Modifications',
      9: 'Parent 1 Income',
      10: 'Parent 2 Income',
      11: 'Assets & Property',
      12: 'Liabilities & Debts',
      13: 'Monthly Expenses',
      14: 'Child Support Calculation',
      15: 'Custody Application',
      16: 'Document Upload',
      17: 'Attorney Review',
      18: 'Final Review'
    };
    return sections[step as keyof typeof sections] || `Section ${step}`;
  };

  // Progress segments for visual breakdown
  const progressSegments = [
    { label: 'Basic Info', steps: 8, color: 'bg-blue-500' },
    { label: 'Financial', steps: 8, color: 'bg-green-500' },
    { label: 'Legal', steps: 2, color: 'bg-purple-500' }
  ];

  const getSegmentProgress = () => {
    if (currentStep <= 8) {
      return { activeSegment: 0, segmentProgress: (currentStep / 8) * 100 };
    } else if (currentStep <= 16) {
      return { activeSegment: 1, segmentProgress: ((currentStep - 8) / 8) * 100 };
    } else {
      return { activeSegment: 2, segmentProgress: ((currentStep - 16) / 2) * 100 };
    }
  };

  const { activeSegment, segmentProgress } = getSegmentProgress();

  return (
    <div className="w-full space-y-4">
      {/* Tier Badge */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            tier === 'advanced' 
              ? 'bg-purple-100 text-purple-800 border border-purple-200' 
              : 'bg-blue-100 text-blue-800 border border-blue-200'
          }`}>
            {tier === 'advanced' ? '🌟 Advanced Tier' : 'Basic Tier'}
          </span>
          {sectionName && (
            <span className="text-lg font-semibold text-gray-800">
              {sectionName}
            </span>
          )}
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </div>
          {estimatedTime && (
            <div className="text-xs text-gray-500">
              Estimated: {estimatedTime}
            </div>
          )}
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="relative">
        {/* Background Track */}
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          {/* Segmented Background */}
          <div className="flex h-full">
            {progressSegments.map((segment, index) => (
              <div
                key={segment.label}
                className={`flex-1 ${index > 0 ? 'border-l-2 border-white' : ''} ${
                  index < activeSegment ? segment.color : 'bg-gray-200'
                } transition-all duration-500 ease-out`}
                style={{
                  opacity: index === activeSegment ? 0.3 : index < activeSegment ? 0.6 : 1
                }}
              />
            ))}
          </div>
          
          {/* Progress Fill */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
          
          {/* Segment Progress Indicator */}
          {tier === 'advanced' && (
            <div
              className="absolute top-0 left-0 h-full bg-white/40 rounded-full transition-all duration-700 ease-out"
              style={{ 
                width: `${(activeSegment / progressSegments.length) * 100 + (segmentProgress / progressSegments.length)}%` 
              }}
            />
          )}
        </div>

        {/* Section Indicators */}
        <div className="flex justify-between mt-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            const isUpcoming = step > currentStep;
            const category = getSectionCategory(step);

            return (
              <div
                key={step}
                className="flex flex-col items-center relative"
                style={{ width: `${100 / totalSteps}%` }}
              >
                {/* Connection Line */}
                {step > 1 && (
                  <div
                    className={`absolute top-3 -left-1/2 w-full h-0.5 ${
                      step <= currentStep ? getCategoryColor(category) : 'bg-gray-300'
                    } transition-colors duration-500`}
                  />
                )}
                
                {/* Step Circle */}
                <div
                  className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    isCompleted
                      ? `${getCategoryColor(category)} text-white shadow-lg scale-110`
                      : isCurrent
                      ? 'bg-white border-2 border-blue-500 text-blue-500 shadow-lg scale-125'
                      : 'bg-gray-300 text-gray-600 border-2 border-gray-300'
                  }`}
                  title={getSectionName(step)}
                >
                  {isCompleted ? '✓' : getSectionIcon(step)}
                </div>
                
                {/* Step Number - Only show for smaller displays */}
                <div className="mt-1 text-xs text-gray-500 hidden sm:block">
                  {step}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Breakdown - Advanced View */}
      {tier === 'advanced' && (
        <div className="grid grid-cols-3 gap-4 text-xs">
          {progressSegments.map((segment, index) => (
            <div
              key={segment.label}
              className={`text-center p-2 rounded-lg transition-all duration-300 ${
                index === activeSegment
                  ? 'bg-white shadow-md border border-gray-200'
                  : index < activeSegment
                  ? 'bg-gray-50 text-gray-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              <div className="font-medium">{segment.label}</div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  index === activeSegment ? 'bg-blue-500 animate-pulse' :
                  index < activeSegment ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <span>
                  {index < activeSegment ? 'Completed' : 
                   index === activeSegment ? 'In Progress' : 'Upcoming'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Section Info */}
      <div className="text-center">
        <div className="text-sm text-gray-600">
          Currently: <span className="font-medium text-gray-800">{getSectionName(currentStep)}</span>
        </div>
        {tier === 'advanced' && (
          <div className="text-xs text-gray-500 mt-1">
            Category: <span className="font-medium">{getCategoryLabel(getSectionCategory(currentStep))}</span>
          </div>
        )}
      </div>

      {/* Time Estimation */}
      {tier === 'advanced' && (
        <div className="flex justify-between items-center text-xs text-gray-500 bg-blue-50/50 p-3 rounded-lg">
          <div>
            <span className="font-medium">Estimated Completion:</span>
            <span className="ml-2">
              {currentStep <= 8 ? '15-20 minutes remaining' :
               currentStep <= 16 ? '30-45 minutes remaining' :
               '5-10 minutes remaining'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Auto-saving...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;