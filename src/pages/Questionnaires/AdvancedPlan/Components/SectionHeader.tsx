import React from 'react';

interface SectionHeaderProps {
  section: {
    section_id: string;
    section_name: string;
    section_description?: string;
    icon?: string;
    tier_required?: string;
    estimated_time_minutes?: number;
    attorney_review_required?: boolean;
    priority?: 'low' | 'medium' | 'high' | 'critical';
  };
  autoCalculations?: any;
  currentProgress?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  section, 
  autoCalculations,
  currentProgress 
}) => {
  // Icon mapping for different sections
  const getSectionIcon = (sectionId: string) => {
    const iconMap: { [key: string]: string } = {
      'section_1': '👥',
      'section_2': '👶',
      'section_3': '🏠',
      'section_4': '📅',
      'section_5': '🤝',
      'section_6': '💬',
      'section_7': '⚡',
      'section_8': '🔄',
      'section_9': '💼',
      'section_10': '💼',
      'section_11': '💰',
      'section_12': '📉',
      'section_13': '📊',
      'section_14': '🧮',
      'section_15': '⚖️',
      'section_16': '📎',
      'section_17': '👨‍💼',
      'section_18': '✅'
    };
    return section.icon || iconMap[section.section_id] || '📝';
  };

  // Color schemes based on section type
  const getColorScheme = (sectionId: string) => {
    if (sectionId.includes('9') || sectionId.includes('10') || sectionId.includes('11') || 
        sectionId.includes('12') || sectionId.includes('13') || sectionId.includes('14')) {
      return {
        gradient: 'from-green-500 to-emerald-600',
        light: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        accent: 'text-green-600'
      };
    }
    if (sectionId.includes('15') || sectionId.includes('16') || sectionId.includes('17') || sectionId.includes('18')) {
      return {
        gradient: 'from-purple-500 to-indigo-600',
        light: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-800',
        accent: 'text-purple-600'
      };
    }
    return {
      gradient: 'from-blue-500 to-cyan-600',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      accent: 'text-blue-600'
    };
  };

  // Priority indicators
  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    
    const priorityConfig = {
      low: { color: 'bg-gray-100 text-gray-800', label: 'Low Priority' },
      medium: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium Priority' },
      high: { color: 'bg-orange-100 text-orange-800', label: 'High Priority' },
      critical: { color: 'bg-red-100 text-red-800', label: 'Critical' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.low;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color} border`}>
        {config.label}
      </span>
    );
  };

  const colors = getColorScheme(section.section_id);
  const sectionIcon = getSectionIcon(section.section_id);

  return (
    <div className={`relative overflow-hidden rounded-t-3xl ${colors.light} ${colors.border} border-b`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-64 -mt-32 -mr-32 bg-white rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 -mb-24 -ml-24 bg-white rounded-full blur-2xl opacity-30" />
      </div>

      {/* Main Header Content */}
      <div className="relative z-10">
        <div className="px-8 pt-8 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left Content - Title and Description */}
            <div className="flex-1">
              <div className="flex items-start space-x-4">
                {/* Icon Container */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-2xl shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                  {sectionIcon}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {section.section_name}
                    </h1>
                    
                    {/* Tier Badge */}
                    {section.tier_required === 'advanced' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md">
                        🌟 Advanced
                      </span>
                    )}
                    
                    {/* Priority Badge */}
                    {getPriorityBadge(section.priority)}
                  </div>

                  {/* Description */}
                  {section.section_description && (
                    <p className={`text-lg ${colors.text} leading-relaxed max-w-3xl`}>
                      {section.section_description}
                    </p>
                  )}

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4 mt-4">
                    {section.estimated_time_minutes && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span>Est. {section.estimated_time_minutes} min</span>
                      </div>
                    )}
                    
                    {section.attorney_review_required && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span>Attorney Review Required</span>
                      </div>
                    )}
                    
                    {currentProgress !== undefined && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>{currentProgress}% completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Financial Summary (for financial sections) */}
            {(section.section_id.includes('9') || section.section_id.includes('10') || 
              section.section_id.includes('11') || section.section_id.includes('12') ||
              section.section_id.includes('13') || section.section_id.includes('14')) && 
              autoCalculations && (
              <div className="lg:w-80 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Financial Summary
                </h3>
                <div className="space-y-2 text-sm">
                  {autoCalculations.parent1_net_income !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parent 1 Net:</span>
                      <span className="font-semibold">
                        ${autoCalculations.parent1_net_income?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  )}
                  {autoCalculations.parent2_net_income !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parent 2 Net:</span>
                      <span className="font-semibold">
                        ${autoCalculations.parent2_net_income?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  )}
                  {autoCalculations.combined_net_income !== undefined && (
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-800 font-semibold">Combined:</span>
                      <span className="font-bold text-green-600">
                        ${autoCalculations.combined_net_income?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar for Section */}
        {currentProgress !== undefined && (
          <div className="px-8 pb-6">
            <div className="max-w-2xl">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Section Progress</span>
                <span>{currentProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-1000 ease-out`}
                  style={{ width: `${currentProgress}%` }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-white/30 to-transparent animate-pulse rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Tips */}
        <div className="px-8 pb-6">
          <div className="flex flex-wrap gap-3">
            {section.section_id.includes('9') || section.section_id.includes('10') ? (
              <div className="flex items-center space-x-2 text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
                <span>💡</span>
                <span>Have your pay stubs and tax documents ready</span>
              </div>
            ) : section.section_id.includes('11') || section.section_id.includes('12') ? (
              <div className="flex items-center space-x-2 text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                <span>💡</span>
                <span>Gather bank statements and loan documents</span>
              </div>
            ) : section.section_id.includes('16') ? (
              <div className="flex items-center space-x-2 text-sm bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">
                <span>💡</span>
                <span>Use your phone camera to upload documents easily</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-sm bg-gray-50 text-gray-700 px-3 py-2 rounded-lg">
                <span>💡</span>
                <span>Take your time - accurate information is important</span>
              </div>
            )}
            
            {section.attorney_review_required && (
              <div className="flex items-center space-x-2 text-sm bg-purple-50 text-purple-700 px-3 py-2 rounded-lg">
                <span>⚖️</span>
                <span>This section requires attorney review</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 bg-white/20 rounded-full blur-xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 bg-white/10 rounded-full blur-lg" />
    </div>
  );
};

export default SectionHeader;