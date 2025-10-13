import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, ArrowRight, CheckCircle, BadgeCheck, Crown, 
  Users, Phone, Mail, Calendar, Heart, Sparkles, Zap, ShieldCheck,
  Star, Book, MapPin, User, Minus, Plus, GraduationCap, Stethoscope
} from 'lucide-react';

// Helper function to get nested values from formData - ADD THIS AT THE TOP
const getNestedValue = (obj, path) => {
  if (!path) return undefined;
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

const QuestionRenderer = ({ question, formData, handleInputChange, showErrors, validationErrors }) => {
  const hasError = showErrors && validationErrors[question.id];
  
  const renderInput = () => {
    const currentValue = getNestedValue(formData, question.id);
    
    switch (question.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
            data-field={question.id}
          >
            <question.icon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 transition-colors duration-300 ${
              hasError ? 'text-red-500' : 'text-church-gold group-hover:text-amber-600'
            }`} />
            <input
              type={question.type}
              value={currentValue || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-4 transition-all duration-300 bg-white/90 backdrop-blur-sm group-hover:shadow-xl font-medium ${
                hasError 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 placeholder-red-300' 
                  : 'border-gray-300 focus:border-church-gold focus:ring-church-gold/20 text-gray-900 placeholder-gray-500 group-hover:border-church-gold/50'
              }`}
              placeholder={question.placeholder}
              required={question.required}
            />
            <AnimatePresence>
              {hasError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'select':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
            data-field={question.id}
          >
            <question.icon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 transition-colors duration-300 ${
              hasError ? 'text-red-500' : 'text-church-gold group-hover:text-amber-600'
            }`} />
            <select
              value={currentValue || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-4 transition-all duration-300 bg-white/90 backdrop-blur-sm appearance-none group-hover:shadow-xl font-medium cursor-pointer ${
                hasError 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900' 
                  : 'border-gray-300 focus:border-church-gold focus:ring-church-gold/20 text-gray-900 group-hover:border-church-gold/50'
              }`}
            >
              <option value="" className="text-gray-500">Select an option</option>
              {question.options.map(option => (
                <option key={option} value={option} className="text-gray-900">{option}</option>
              ))}
            </select>
            <ArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none transition-colors group-hover:text-gray-600" />
            <AnimatePresence>
              {hasError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2"
                >
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'number-selector':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-6 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200"
            data-field={question.id}
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const newValue = Math.max(question.min, (currentValue || 1) - 1);
                handleInputChange(question.id, newValue);
              }}
              disabled={(currentValue || 1) <= question.min}
              className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              <Minus className="w-6 h-6 text-gray-700" />
            </motion.button>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-church-gold mb-1">
                {currentValue || 1}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {(currentValue || 1) === 1 ? 'Child' : 'Children'}
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const newValue = Math.min(question.max, (currentValue || 1) + 1);
                handleInputChange(question.id, newValue);
              }}
              disabled={(currentValue || 1) >= question.max}
              className="w-12 h-12 bg-church-gold rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-600 transition-colors"
            >
              <Plus className="w-6 h-6 text-white" />
            </motion.button>
          </motion.div>
        );

      case 'card-select':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            data-field={question.id}
          >
            {question.options.map((option, index) => (
              <CardOption
                key={option.value || option.title}
                option={option}
                question={question}
                formData={formData}
                handleInputChange={handleInputChange}
                hasError={hasError}
                index={index}
              />
            ))}
          </motion.div>
        );

      case 'button-group':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4"
            data-field={question.id}
          >
            {question.options.map((option) => (
              <motion.button
                key={option}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`p-5 border-2 rounded-xl font-semibold transition-all duration-300 text-lg ${
                  currentValue === option
                    ? 'border-church-gold bg-gradient-to-br from-church-gold/10 to-amber-500/10 text-church-gold shadow-golden'
                    : hasError
                    ? 'border-red-300 text-red-700 hover:border-red-400 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:border-church-gold hover:text-church-gold bg-white hover:shadow-lg'
                }`}
                onClick={() => handleInputChange(question.id, option)}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        );

      case 'interactive-select':
        return (
          <motion.div 
            className="space-y-4" 
            data-field={question.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {question.options.map((option, index) => (
              <InteractiveOption
                key={option.value}
                option={option}
                question={question}
                formData={formData}
                handleInputChange={handleInputChange}
                hasError={hasError}
                index={index}
              />
            ))}
          </motion.div>
        );

      case 'interactive-checkbox':
        return (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
            data-field={question.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {question.options.map((option, index) => (
              <CheckboxOption
                key={option.value}
                option={option}
                question={question}
                formData={formData}
                handleInputChange={handleInputChange}
                hasError={hasError}
                index={index}
              />
            ))}
          </motion.div>
        );

      case 'slider':
        const sliderValue = currentValue || question.min;
        const percentage = ((sliderValue - question.min) / (question.max - question.min)) * 100;
        
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200"
            data-field={question.id}
          >
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              {question.steps.map((step, index) => (
                <div key={index} className="text-center flex-1">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-2 transition-all duration-300 ${
                    sliderValue >= index + 1 
                      ? hasError ? 'bg-red-500 shadow-red-200' : 'bg-church-gold shadow-golden'
                      : 'bg-gray-300'
                  } shadow-lg`} />
                  <div className="text-xs max-w-20 leading-tight text-gray-600">{step}</div>
                </div>
              ))}
            </div>
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={sliderValue}
              onChange={(e) => handleInputChange(question.id, parseInt(e.target.value))}
              className={`w-full h-3 rounded-lg appearance-none cursor-pointer slider transition-all duration-300 ${
                hasError ? 'bg-red-200' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              style={{
                background: `linear-gradient(to right, ${
                  hasError ? '#EF4444' : '#D4AF37'
                } 0%, ${
                  hasError ? '#EF4444' : '#D4AF37'
                } ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
              }}
            />
            <div className="text-center">
              <span className={`text-lg font-bold ${
                hasError ? 'text-red-600' : 'text-church-gold'
              }`}>
                {question.steps[sliderValue - 1]}
              </span>
            </div>
          </motion.div>
        );

      case 'dynamic-children':
        return (
          <DynamicChildrenForm
            question={question}
            formData={formData}
            handleInputChange={handleInputChange}
            hasError={hasError}
            validationErrors={validationErrors}
            showErrors={showErrors}
          />
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 bg-yellow-50 rounded-xl border border-yellow-200"
          >
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-yellow-700 font-medium">Unsupported question type: {question.type}</p>
          </motion.div>
        );
    }
  };

  return (
    <motion.div 
      className={`space-y-4 ${question.grid || 'md:col-span-3'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        <label className="block text-lg font-bold text-gray-800 tracking-tight">
          {question.label}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {question.description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {question.description}
          </p>
        )}
      </div>
      
      {renderInput()}
      
      <AnimatePresence>
        {showErrors && validationErrors[question.id] && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-500 flex items-center gap-2 font-medium bg-red-50 px-4 py-3 rounded-lg border border-red-200"
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {validationErrors[question.id]}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Dynamic Children Form Component
const DynamicChildrenForm = ({ question, formData, handleInputChange, hasError, validationErrors, showErrors }) => {
  const numberOfChildren = getNestedValue(formData, 'children.numberOfChildren') || 1;
  const childrenList = getNestedValue(formData, 'children.list') || [];

  // Initialize children list when number changes
  React.useEffect(() => {
    if (childrenList.length !== numberOfChildren) {
      const newChildrenList = Array.from({ length: numberOfChildren }, (_, index) => ({
        ...(childrenList[index] || {}),
        id: index + 1,
        name: childrenList[index]?.name || '',
        dateOfBirth: childrenList[index]?.dateOfBirth || '',
        gender: childrenList[index]?.gender || '',
        school: childrenList[index]?.school || '',
        grade: childrenList[index]?.grade || '',
        specialNeeds: childrenList[index]?.specialNeeds || '',
        medicalConditions: childrenList[index]?.medicalConditions || '',
        allergies: childrenList[index]?.allergies || '',
        medications: childrenList[index]?.medications || ''
      }));
      handleInputChange('children.list', newChildrenList);
    }
  }, [numberOfChildren, childrenList.length, handleInputChange]);

  const updateChildField = (childIndex, fieldId, value) => {
    const updatedChildren = [...childrenList];
    if (!updatedChildren[childIndex]) {
      updatedChildren[childIndex] = { id: childIndex + 1 };
    }
    updatedChildren[childIndex][fieldId] = value;
    handleInputChange('children.list', updatedChildren);
  };

  const getChildAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getAgeGroup = (age) => {
    if (age === null || age === undefined) return 'Unknown';
    if (age < 3) return 'Infant/Toddler';
    if (age < 5) return 'Preschool';
    if (age < 13) return 'School Age';
    if (age < 18) return 'Teenager';
    return 'Adult';
  };

  const renderChildField = (field, childIndex, childData) => {
    const value = childData?.[field.id] || '';
    const fieldError = validationErrors[`children.list.${childIndex}.${field.id}`];

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <motion.div className="relative group">
            <field.icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 ${
              fieldError ? 'text-red-500' : 'text-church-gold'
            }`} />
            <input
              type={field.type}
              value={value}
              onChange={(e) => updateChildField(childIndex, field.id, e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white group-hover:shadow-md ${
                fieldError 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 focus:border-church-gold focus:ring-church-gold/20'
              }`}
              placeholder={field.placeholder}
              required={field.required}
            />
          </motion.div>
        );

      case 'date':
        return (
          <motion.div className="relative group">
            <field.icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 ${
              fieldError ? 'text-red-500' : 'text-church-gold'
            }`} />
            <input
              type="date"
              value={value}
              onChange={(e) => updateChildField(childIndex, field.id, e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white group-hover:shadow-md ${
                fieldError 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 focus:border-church-gold focus:ring-church-gold/20'
              }`}
              required={field.required}
            />
          </motion.div>
        );

      case 'select':
        return (
          <motion.div className="relative group">
            <field.icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 ${
              fieldError ? 'text-red-500' : 'text-church-gold'
            }`} />
            <select
              value={value}
              onChange={(e) => updateChildField(childIndex, field.id, e.target.value)}
              className={`w-full pl-10 pr-8 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white appearance-none group-hover:shadow-md ${
                fieldError 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 focus:border-church-gold focus:ring-church-gold/20'
              }`}
            >
              <option value="">Select {field.label}</option>
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ArrowRight className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 rotate-90 pointer-events-none" />
          </motion.div>
        );

      case 'textarea':
        return (
          <motion.div className="relative group">
            <field.icon className={`absolute left-3 top-4 w-4 h-4 z-10 ${
              fieldError ? 'text-red-500' : 'text-church-gold'
            }`} />
            <textarea
              value={value}
              onChange={(e) => updateChildField(childIndex, field.id, e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white group-hover:shadow-md resize-none ${
                fieldError 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 focus:border-church-gold focus:ring-church-gold/20'
              }`}
              placeholder={field.placeholder}
              rows={3}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Children Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-4"
      >
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-blue-600" />
          <div>
            <h4 className="font-semibold text-blue-900">
              {numberOfChildren} {numberOfChildren === 1 ? 'Child' : 'Children'} Added
            </h4>
            <p className="text-blue-700 text-sm">
              The parenting plan will be customized for each child's age and needs
            </p>
          </div>
        </div>
      </motion.div>

      {Array.from({ length: numberOfChildren }, (_, index) => {
        const childData = childrenList[index] || {};
        const childErrors = validationErrors[`children.list.${index}`];
        const age = getChildAge(childData.dateOfBirth);
        const ageGroup = getAgeGroup(age);
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border-2 border-gray-200 hover:border-church-gold/30 transition-all duration-300 shadow-sm"
          >
            {/* Child Header with Age Info */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {childData.name || `Child ${index + 1}`}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Child {index + 1}</span>
                    {age !== null && (
                      <>
                        <span>•</span>
                        <span>{age} years old</span>
                        <span>•</span>
                        <span className="font-medium text-purple-600">{ageGroup}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Child Status Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                childData.name && childData.dateOfBirth && childData.gender
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              }`}>
                {childData.name && childData.dateOfBirth && childData.gender ? 'Complete' : 'Incomplete'}
              </div>
            </div>

            {/* Child Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {question.fields.map((field) => (
                <div key={field.id} className={`space-y-2 ${field.grid || ''}`}>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.description && (
                      <div className="text-xs text-gray-500 text-right">
                        {field.description}
                      </div>
                    )}
                  </div>
                  
                  {renderChildField(field, index, childData)}
                  
                  {showErrors && childErrors?.[field.id] && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      {childErrors[field.id]}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>

            {/* Age-Based Recommendations */}
            {age !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <div className="flex items-center gap-2 text-sm text-amber-800">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Age Recommendation:</span>
                  <span>
                    {ageGroup === 'Infant/Toddler' && 'Frequent transitions recommended for bonding'}
                    {ageGroup === 'Preschool' && 'Stable routines with gradual schedule increases'}
                    {ageGroup === 'School Age' && 'School-friendly schedules with minimal disruption'}
                    {ageGroup === 'Teenager' && 'Flexible schedules considering school and activities'}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// Enhanced Card Option Component
const CardOption = ({ option, question, formData, handleInputChange, hasError, index }) => {
  const { icon: Icon, title, description, popular, recommended, value } = option;
  const currentValue = getNestedValue(formData, question.id);
  const isSelected = currentValue === (value || title);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-8 border-2 rounded-3xl cursor-pointer transition-all duration-300 group overflow-hidden ${
        isSelected
          ? 'border-church-gold bg-gradient-to-br from-church-gold/5 to-amber-500/5 shadow-2xl shadow-church-gold/20'
          : hasError 
          ? 'border-red-300 bg-red-50 hover:border-red-400'
          : 'border-gray-300 bg-white hover:border-church-gold/50 hover:shadow-xl'
      }`}
      onClick={() => handleInputChange(question.id, value || title)}
    >
      {/* Background Gradient Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isSelected ? 'opacity-100' : ''
      } bg-gradient-to-br from-church-gold/5 to-transparent`} />
      
      {/* Badges */}
      <div className="relative z-10">
        {popular && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-3 -right-3"
          >
            <BadgeCheck className="w-8 h-8 text-church-gold bg-white rounded-full p-1 shadow-2xl" />
          </motion.div>
        )}
        {recommended && (
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-3 -right-3"
          >
            <Crown className="w-8 h-8 text-amber-500 bg-white rounded-full p-1 shadow-2xl" />
          </motion.div>
        )}

        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl mb-5 flex items-center justify-center transition-all duration-300 ${
          isSelected 
            ? 'bg-church-gold text-white shadow-golden' 
            : hasError && !isSelected
            ? 'bg-red-100 text-red-400'
            : 'bg-gray-100 text-church-gold group-hover:bg-church-gold/10'
        }`}>
          <Icon className="w-8 h-8" />
        </div>

        {/* Content */}
        <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
          {title}
        </h4>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
          {description}
        </p>

        {/* Selection Indicator */}
        <motion.div
          className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            isSelected
              ? 'bg-church-gold border-church-gold'
              : hasError
              ? 'border-red-400'
              : 'border-gray-300 group-hover:border-church-gold'
          }`}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <CheckCircle className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Interactive Option Component
const InteractiveOption = ({ option, question, formData, handleInputChange, hasError, index }) => {
  const { icon: Icon, title, description, value } = option;
  const currentValue = getNestedValue(formData, question.id);
  const isSelected = currentValue === value;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 group ${
        isSelected
          ? 'border-church-gold bg-gradient-to-r from-church-gold/5 to-amber-500/5 shadow-golden'
          : hasError
          ? 'border-red-300 bg-red-50 hover:border-red-400'
          : 'border-gray-300 hover:border-church-gold/50 hover:shadow-lg bg-white'
      }`}
      onClick={() => handleInputChange(question.id, value)}
    >
      <div className="flex items-start gap-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
          isSelected 
            ? 'bg-church-gold text-white' 
            : hasError && !isSelected
            ? 'bg-red-100 text-red-400'
            : 'bg-gray-100 text-church-gold group-hover:bg-church-gold/10'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-lg mb-2">{title}</h4>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          isSelected
            ? 'bg-church-gold border-church-gold'
            : hasError
            ? 'border-red-400'
            : 'border-gray-300 group-hover:border-church-gold'
        }`}>
          {isSelected && (
            <CheckCircle className="w-4 h-4 text-white" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Checkbox Option Component
const CheckboxOption = ({ option, question, formData, handleInputChange, hasError, index }) => {
  const { icon: Icon, label, description, value } = option;
  const currentValue = getNestedValue(formData, question.id) || [];
  const isSelected = currentValue.includes(value);
  
  return (
    <motion.label
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`relative p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 group ${
        isSelected
          ? 'border-church-gold bg-gradient-to-br from-church-gold/5 to-amber-500/5 shadow-golden'
          : hasError
          ? 'border-red-300 bg-red-50 hover:border-red-400'
          : 'border-gray-300 hover:border-church-gold/50 hover:shadow-lg bg-white'
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => {
          const current = getNestedValue(formData, question.id) || [];
          const updated = e.target.checked
            ? [...current, value]
            : current.filter(item => item !== value);
          handleInputChange(question.id, updated);
        }}
        className="absolute opacity-0"
      />
      
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          isSelected 
            ? 'bg-church-gold text-white' 
            : hasError && !isSelected
            ? 'bg-red-100 text-red-400'
            : 'bg-gray-100 text-church-gold group-hover:bg-church-gold/10'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <div className="font-semibold text-gray-900 mb-1">{label}</div>
          <div className="text-sm text-gray-600">{description}</div>
        </div>
        
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          isSelected
            ? 'bg-church-gold border-church-gold'
            : hasError
            ? 'border-red-400'
            : 'border-gray-400 group-hover:border-church-gold'
        }`}>
          {isSelected && (
            <CheckCircle className="w-3 h-3 text-white" />
          )}
        </div>
      </div>
    </motion.label>
  );
};

export default QuestionRenderer;