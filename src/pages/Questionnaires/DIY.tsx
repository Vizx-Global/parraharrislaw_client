import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, User, Users, Calendar, Phone, Mail, MapPin, Book, Heart, Shield, 
  AlertCircle, HelpCircle, CreditCard, Lock, CheckCircle, Star, Zap, 
  ArrowRight, ArrowLeft, Crown, Sparkles, Gift, ShieldCheck, BadgeCheck,
  Amazon, DollarSign, Wallet, AlertTriangle
} from 'lucide-react';

export default function InteractiveCoParentingQuestionnaire() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  
  const [formData, setFormData] = useState({
    // Parent Information
    parent1Name: '', 
    parent1Address: '', 
    parent1Phone: '', 
    parent1Email: '',
    parent2Name: '', 
    parent2Address: '', 
    parent2Phone: '', 
    parent2Email: '',
    
    // Children Information
    child1Name: '',
    child1DOB: '',
    child1School: '',
    child1Grade: '',
    
    // Time-Sharing
    regularSchedule: '', 
    weekendSchedule: '', 
    holidaySchedule: {}, 
    summerSchedule: '',
    
    // Decision Making
    educationDecisions: '', 
    healthcareDecisions: '', 
    religiousDecisions: '',
    
    // Communication
    communicationMethod: [], 
    communicationFrequency: 1, 
    emergencyProtocol: '',
    
    // Financial
    healthInsurance: '', 
    medicalExpenses: '', 
    extracurricularCosts: '',
  });

  const sections = [
    {
      title: "Welcome & Parent Info",
      icon: User,
      description: "Let's start with basic information about both parents",
      color: "from-blue-500 to-cyan-500",
      questions: [
        {
          id: 'parent1Name',
          type: 'text',
          label: 'Your Full Legal Name',
          required: true,
          placeholder: 'John Michael Smith',
          icon: User,
          grid: 'md:col-span-2'
        },
        {
          id: 'parent1Email',
          type: 'email',
          label: 'Your Email',
          required: true,
          placeholder: 'john.smith@example.com',
          icon: Mail,
          grid: 'md:col-span-2'
        },
        {
          id: 'parent1Phone',
          type: 'tel',
          label: 'Your Phone',
          required: true,
          placeholder: '(555) 123-4567',
          icon: Phone,
          grid: 'md:col-span-1'
        },
        {
          id: 'parent1Address',
          type: 'text',
          label: 'Your Address',
          required: true,
          placeholder: '123 Main St, Jacksonville, FL 32216',
          icon: MapPin,
          grid: 'md:col-span-3'
        },
        {
          id: 'parent2Name',
          type: 'text',
          label: "Co-Parent's Legal Name",
          required: true,
          placeholder: 'Sarah Johnson Smith',
          icon: User,
          grid: 'md:col-span-2'
        },
        {
          id: 'parent2Email',
          type: 'email',
          label: "Co-Parent's Email",
          placeholder: 'sarah.smith@example.com',
          icon: Mail,
          grid: 'md:col-span-2'
        },
        {
          id: 'parent2Phone',
          type: 'tel',
          label: "Co-Parent's Phone",
          placeholder: '(555) 987-6543',
          icon: Phone,
          grid: 'md:col-span-1'
        },
        {
          id: 'parent2Address',
          type: 'text',
          label: "Co-Parent's Address",
          placeholder: '456 Oak Ave, Jacksonville, FL 32207',
          icon: MapPin,
          grid: 'md:col-span-3'
        }
      ]
    },
    {
      title: "Children Information",
      icon: Users,
      description: "Tell us about your wonderful children",
      color: "from-purple-500 to-pink-500",
      questions: [
        {
          id: 'child1Name',
          type: 'text',
          label: "Child's Full Name",
          required: true,
          placeholder: 'Emma Grace Smith',
          icon: Heart,
          grid: 'md:col-span-2'
        },
        {
          id: 'child1DOB',
          type: 'date',
          label: "Date of Birth",
          required: true,
          icon: Calendar,
          grid: 'md:col-span-1'
        },
        {
          id: 'child1School',
          type: 'text',
          label: 'School/Daycare',
          placeholder: 'Sunshine Elementary School',
          icon: Book,
          grid: 'md:col-span-2'
        },
        {
          id: 'child1Grade',
          type: 'select',
          label: 'Grade Level',
          options: ['Preschool', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', 'Middle School', 'High School'],
          icon: Star,
          grid: 'md:col-span-1'
        }
      ]
    },
    {
      title: "Time-Sharing Schedule",
      icon: Calendar,
      description: "Design your ideal parenting schedule",
      color: "from-amber-500 to-orange-500",
      questions: [
        {
          id: 'regularSchedule',
          type: 'card-select',
          label: 'Weekly Schedule Preference',
          required: true,
          options: [
            {
              title: 'Week On/Week Off',
              description: 'Alternate full weeks with each parent',
              icon: Calendar,
              popular: true
            },
            {
              title: '2-2-3 Rotation',
              description: '2 days with Parent A, 2 days with Parent B, 3 days alternating',
              icon: Zap,
              recommended: true
            },
            {
              title: 'Alternating Weekends',
              description: 'Weekdays with one parent, weekends alternating',
              icon: Heart
            },
            {
              title: 'Custom Schedule',
              description: 'Create a unique schedule that fits your needs',
              icon: Sparkles
            }
          ]
        },
        {
          id: 'weekendSchedule',
          type: 'button-group',
          label: 'Weekend Preference',
          required: true,
          options: ['Friday PM - Sunday PM', 'Saturday AM - Sunday PM', 'Flexible', 'Other'],
          grid: 'md:col-span-2'
        }
      ]
    },
    {
      title: "Decision Making",
      icon: Scale,
      description: "How will important decisions be made?",
      color: "from-green-500 to-emerald-500",
      questions: [
        {
          id: 'educationDecisions',
          type: 'interactive-select',
          label: 'Education Decisions',
          required: true,
          options: [
            {
              value: 'shared',
              title: 'Shared Decision-Making',
              description: 'Both parents discuss and agree on all education matters',
              icon: Users
            },
            {
              value: 'consultation',
              title: 'Primary with Consultation',
              description: 'One parent makes final decisions after consulting the other',
              icon: Phone
            },
            {
              value: 'sole',
              title: 'Sole Decision-Making',
              description: 'One parent has full authority over education decisions',
              icon: User
            }
          ]
        },
        {
          id: 'healthcareDecisions',
          type: 'interactive-select',
          label: 'Healthcare Decisions',
          required: true,
          options: [
            {
              value: 'shared',
              title: 'Shared for All Healthcare',
              description: 'Both parents involved in all medical decisions',
              icon: Users
            },
            {
              value: 'emergency',
              title: 'Emergency Only Separate',
              description: 'Either parent for emergencies, shared for routine care',
              icon: AlertCircle
            },
            {
              value: 'routine-separate',
              title: 'Routine Care Separate',
              description: 'Each parent handles routine care during their time',
              icon: Heart
            }
          ]
        }
      ]
    },
    {
      title: "Communication",
      icon: Phone,
      description: "How will you stay connected as co-parents?",
      color: "from-indigo-500 to-purple-500",
      questions: [
        {
          id: 'communicationMethod',
          type: 'interactive-checkbox',
          label: 'Preferred Communication Methods',
          required: true,
          options: [
            { value: 'text', label: 'Text Message', icon: Phone, description: 'Quick updates' },
            { value: 'email', label: 'Email', icon: Mail, description: 'Detailed discussions' },
            { value: 'app', label: 'Co-Parenting App', icon: ShieldCheck, description: 'Organized & secure' },
            { value: 'phone', label: 'Phone Calls', icon: Phone, description: 'Immediate discussions' },
            { value: 'in-person', label: 'In-Person Meetings', icon: Users, description: 'Monthly check-ins' }
          ]
        },
        {
          id: 'communicationFrequency',
          type: 'slider',
          label: 'Update Frequency Preference',
          min: 1,
          max: 5,
          required: true,
          steps: [
            'As needed only',
            'Weekly summaries',
            '2-3 times per week',
            'Daily updates',
            'Multiple times daily'
          ]
        }
      ]
    }
  ];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay securely with your card',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'amazon',
      name: 'Amazon Pay',
      icon: CreditCard,
      description: 'Fast checkout with Amazon',
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'cash',
      name: 'Cash App Pay',
      icon: DollarSign,
      description: 'Instant payment with Cash App',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const validateSection = (sectionIndex) => {
    const currentSectionData = sections[sectionIndex];
    const errors = {};
    
    currentSectionData.questions.forEach(question => {
      if (question.required) {
        const value = formData[question.id];
        
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

  const handleInputChange = (questionId, value) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[questionId]) {
      setValidationErrors(prev => ({
        ...prev,
        [questionId]: ''
      }));
    }
  };

  const nextSection = () => {
    const errors = validateSection(currentSection);
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setShowErrors(true);
      
      // Scroll to first error
      const firstErrorId = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[data-field="${firstErrorId}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Clear errors if validation passes
    setValidationErrors({});
    setShowErrors(false);
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowPayment(true);
    }
  };

  const prevSection = () => {
    // Clear errors when going back
    setValidationErrors({});
    setShowErrors(false);
    
    if (showPayment) {
      setShowPayment(false);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderQuestion = (question) => {
    const hasError = showErrors && validationErrors[question.id];
    
    switch (question.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative group ${question.grid || ''}`}
            data-field={question.id}
          >
            <question.icon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 ${
              hasError ? 'text-red-500' : 'text-church-gold'
            }`} />
            <input
              type={question.type}
              value={formData[question.id] || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover:shadow-lg ${
                hasError 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 focus:border-church-gold focus:ring-church-gold/20'
              }`}
              placeholder={question.placeholder}
              required={question.required}
            />
            {hasError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </motion.div>
            )}
          </motion.div>
        );

      case 'select':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative group ${question.grid || ''}`}
            data-field={question.id}
          >
            <question.icon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 ${
              hasError ? 'text-red-500' : 'text-church-gold'
            }`} />
            <select
              value={formData[question.id] || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none group-hover:shadow-lg ${
                hasError 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 focus:border-church-gold focus:ring-church-gold/20'
              }`}
            >
              <option value="">Select an option</option>
              {question.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
            {hasError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-10 top-1/2 transform -translate-y-1/2"
              >
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </motion.div>
            )}
          </motion.div>
        );

      case 'card-select':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-field={question.id}
          >
            {question.options.map((option, index) => (
              <motion.div
                key={option.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                  formData[question.id] === option.title
                    ? 'border-church-gold bg-church-gold/5 shadow-golden'
                    : hasError 
                    ? 'border-red-300 bg-red-50 hover:border-red-400'
                    : 'border-gray-200 hover:border-church-gold/50 hover:shadow-lg'
                }`}
                onClick={() => handleInputChange(question.id, option.title)}
              >
                {option.popular && (
                  <BadgeCheck className="absolute -top-2 -right-2 w-6 h-6 text-church-gold bg-white rounded-full p-1 shadow-lg" />
                )}
                {option.recommended && (
                  <Crown className="absolute -top-2 -right-2 w-6 h-6 text-amber-500 bg-white rounded-full p-1 shadow-lg" />
                )}
                <option.icon className={`w-8 h-8 mb-3 ${
                  hasError && formData[question.id] !== option.title ? 'text-red-400' : 'text-church-gold'
                }`} />
                <h4 className="font-semibold text-gray-900 mb-2">{option.title}</h4>
                <p className="text-sm text-gray-600">{option.description}</p>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'button-group':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-3"
            data-field={question.id}
          >
            {question.options.map((option) => (
              <motion.button
                key={option}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 border-2 rounded-xl font-medium transition-all duration-300 ${
                  formData[question.id] === option
                    ? 'border-church-gold bg-church-gold/5 text-church-gold'
                    : hasError
                    ? 'border-red-300 text-red-700 hover:border-red-400'
                    : 'border-gray-200 text-gray-700 hover:border-church-gold/50'
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
          <div className="space-y-4" data-field={question.id}>
            {question.options.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.01 }}
                className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                  formData[question.id] === option.value
                    ? 'border-church-gold bg-church-gold/5 shadow-golden'
                    : hasError
                    ? 'border-red-300 bg-red-50 hover:border-red-400'
                    : 'border-gray-200 hover:border-church-gold/50'
                }`}
                onClick={() => handleInputChange(question.id, option.value)}
              >
                <div className="flex items-start gap-4">
                  <option.icon className={`w-6 h-6 mt-1 flex-shrink-0 ${
                    hasError && formData[question.id] !== option.value ? 'text-red-400' : 'text-church-gold'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{option.title}</h4>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    formData[question.id] === option.value
                      ? 'bg-church-gold border-church-gold'
                      : hasError
                      ? 'border-red-400'
                      : 'border-gray-300'
                  }`}>
                    {formData[question.id] === option.value && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'interactive-checkbox':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-field={question.id}>
            {question.options.map((option) => (
              <motion.label
                key={option.value}
                whileHover={{ scale: 1.02 }}
                className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  formData[question.id]?.includes(option.value)
                    ? 'border-church-gold bg-church-gold/5 shadow-golden'
                    : hasError
                    ? 'border-red-300 bg-red-50 hover:border-red-400'
                    : 'border-gray-200 hover:border-church-gold/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData[question.id]?.includes(option.value) || false}
                  onChange={(e) => {
                    const current = formData[question.id] || [];
                    const updated = e.target.checked
                      ? [...current, option.value]
                      : current.filter(item => item !== option.value);
                    handleInputChange(question.id, updated);
                  }}
                  className="absolute opacity-0"
                />
                <option.icon className={`w-6 h-6 mb-2 ${
                  hasError && !formData[question.id]?.includes(option.value) ? 'text-red-400' : 'text-church-gold'
                }`} />
                <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                <div className="text-xs text-gray-600">{option.description}</div>
              </motion.label>
            ))}
          </div>
        );

      case 'slider':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            data-field={question.id}
          >
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              {question.steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                    formData[question.id] >= index + 1 
                      ? hasError ? 'bg-red-500' : 'bg-church-gold'
                      : 'bg-gray-300'
                  }`} />
                  <div className="text-xs max-w-16">{step}</div>
                </div>
              ))}
            </div>
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={formData[question.id] || question.min}
              onChange={(e) => handleInputChange(question.id, parseInt(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider ${
                hasError ? 'bg-red-200' : 'bg-gray-200'
              }`}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  const currentSectionData = sections[currentSection];

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Progress Bar */}
          <div className="bg-church-navy text-white p-6 rounded-3xl shadow-2xl mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Final Step: Payment</span>
              <span className="text-church-gold font-bold">100% Complete</span>
            </div>
            <div className="h-3 w-full bg-church-navy/50 rounded-full overflow-hidden">
              <div className="h-3 bg-gradient-to-r from-church-gold to-amber-500 rounded-full w-full" />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Payment Header */}
            <div className="bg-gradient-to-r from-church-gold to-amber-500 text-white p-8 text-center">
              <Lock className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Secure Payment</h2>
              <p className="text-amber-100">Your information is encrypted and secure</p>
            </div>

            <div className="p-8">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">DIY Co-Parenting Plan</span>
                    <span className="font-semibold">$999.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Florida compliance guarantee</span>
                    <span className="text-green-600">Included</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>$999.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      paymentMethod === method.id
                        ? 'border-church-gold bg-gradient-to-r bg-church-gold/5 shadow-golden'
                        : 'border-gray-200 hover:border-church-gold/50'
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center`}>
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id
                          ? 'bg-church-gold border-church-gold'
                          : 'border-gray-300'
                      }`}>
                        {paymentMethod === method.id && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Payment Actions */}
              <div className="flex gap-4">
                <button
                  onClick={prevSection}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-church-gold hover:text-church-gold"
                >
                  Back to Questionnaire
                </button>
                <button
                  onClick={() => alert('Payment processed! Generating your co-parenting plan...')}
                  disabled={!paymentMethod}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-3"
                >
                  <Lock className="w-5 h-5" />
                  Complete Payment & Generate Plan
                </button>
              </div>

              {/* Security Badges */}
              <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  SSL Encrypted
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BadgeCheck className="w-4 h-4 text-blue-500" />
                  PCI Compliant
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="bg-church-navy text-white p-6 rounded-3xl shadow-2xl mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Step {currentSection + 1} of {sections.length + 1}</span>
            <span className="text-church-gold font-bold">
              {Math.round(((currentSection + 1) / (sections.length + 1)) * 100)}% Complete
            </span>
          </div>
          <div className="h-3 w-full bg-church-navy/50 rounded-full overflow-hidden">
            <div 
              className="h-3 bg-gradient-to-r from-church-gold to-amber-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((currentSection + 1) / (sections.length + 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Section Header */}
          <div className={`bg-gradient-to-r ${currentSectionData.color} text-white p-8`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <currentSectionData.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentSectionData.title}</h2>
                <p className="text-white/80">{currentSectionData.description}</p>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="p-8">
            {/* Validation Summary */}
            {showErrors && Object.keys(validationErrors).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Please complete all required fields</span>
                </div>
                <ul className="text-sm text-red-600 list-disc list-inside space-y-1">
                  {Object.entries(validationErrors).map(([fieldId, error]) => (
                    <li key={fieldId}>{error}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSectionData.questions.map((question, index) => (
                <div key={question.id} className={`space-y-3 ${question.grid || 'md:col-span-3'}`}>
                  <label className="block text-sm font-semibold text-gray-700">
                    {question.label}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderQuestion(question)}
                  {showErrors && validationErrors[question.id] && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      {validationErrors[question.id]}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
              <button
                onClick={prevSection}
                disabled={currentSection === 0}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-church-gold hover:text-church-gold disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              
              <button
                onClick={nextSection}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-church-gold to-amber-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                {currentSection === sections.length - 1 ? 'Review & Pay' : 'Next Section'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}