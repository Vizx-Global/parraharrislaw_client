import { 
  User, Users, Calendar, Phone, Mail, MapPin, Book, Heart, Shield, 
  AlertCircle, CreditCard, CheckCircle, Star, Zap, Crown, Sparkles, 
  ShieldCheck, Building, DollarSign, Plus, Minus, Clock, MessageCircle,
  FileText, Home, Car, GraduationCap, Stethoscope, Church, Gift,
  TrendingUp, ShieldOff, Users2, Smartphone, Laptop, Moon, Briefcase
} from 'lucide-react';

export const initialFormData = {
  // Parent Information
  parent1: {
    name: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    employer: '',
    workPhone: '',
    dateOfBirth: '',
    income: '',
    workHours: ''
  },
  parent2: {
    name: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    employer: '',
    workPhone: '',
    dateOfBirth: '',
    income: '',
    workHours: ''
  },
  
  // Relationship Information
  relationship: {
    marriageDate: '',
    separationDate: '',
    divorceFilingDate: '',
    marriageState: 'Florida',
    currentRelationship: 'amicable',
    livingSituation: 'separate' // separate, together, other
  },
  
  // Children Information - FLEXIBLE FOR MULTIPLE CHILDREN
  children: {
    numberOfChildren: 1,
    scheduleApproach: 'same-schedule', // same-schedule, age-based, child-specific
    list: [
      {
        id: 1,
        name: '',
        dateOfBirth: '',
        gender: '',
        school: '',
        grade: '',
        specialNeeds: '',
        medicalConditions: '',
        allergies: '',
        medications: '',
        schedulePreferences: {
          overnightPreference: 'same-as-siblings',
          specialConsiderations: ''
        }
      }
    ]
  },
  
  // Time-Sharing - FLEXIBLE FOR MULTIPLE CHILDREN
  timeSharing: {
    // Global schedule that applies to all children
    globalSchedule: {
      regularSchedule: '',
      weekendSchedule: '',
      summerSchedule: '',
      holidayApproach: 'same-for-all' // same-for-all, rotating, alternating
    },
    
    // Child-specific schedules (will be populated based on number of children)
    childSchedules: {
      // This will be dynamically populated: child1: { schedule: '', specialNeeds: '' }, etc.
    },
    
    // Logistics
    pickupDropoff: {
      location: 'home', // home, school, neutral
      time: '',
      responsibleParty: 'alternating',
      meetingPoint: ''
    },
    transportation: {
      method: 'personal-vehicle',
      costSharing: 'proportional'
    },
    
    // Holiday Schedule - APPLIES TO ALL CHILDREN
    holidaySchedule: {
      christmas: 'split-holiday', // split-holiday, alternating-years, other
      thanksgiving: 'alternating-years',
      easter: 'alternating-years',
      mothersDay: 'with-mother',
      fathersDay: 'with-father',
      springBreak: 'alternating-years',
      summerBreak: 'extended-time',
      winterBreak: 'split-break',
      childBirthday: 'with-resident-parent',
      parentBirthday: 'flexible'
    }
  },
  
  // Decision Making - CAN BE DIFFERENT PER CHILD
  decisionMaking: {
    approach: 'same-for-all', // same-for-all, child-specific
    education: {
      primary: 'shared',
      consultationRequired: true,
      schoolChoice: 'shared',
      extracurricular: 'shared',
      tutoring: 'shared'
    },
    healthcare: {
      primary: 'shared',
      emergency: 'either',
      routine: 'shared',
      insurance: 'shared',
      mentalHealth: 'shared'
    },
    religious: {
      upbringing: 'shared',
      activities: 'shared'
    },
    travel: {
      domestic: 'notification',
      international: 'consent'
    }
  },
  
  // Communication
  communication: {
    methods: ['text', 'email'],
    frequency: 2,
    responseTime: '24h',
    emergencyProtocol: 'immediate-call',
    disputeResolution: 'mediator',
    sharedCalendar: true,
    communicationApp: 'our-family-wizard',
    holidayCommunication: 'advance-discussion'
  },
  
  // Financial Arrangements
  financial: {
    childSupport: {
      calculated: true, // true = calculated by guidelines, false = agreed amount
      amount: '',
      frequency: 'monthly',
      startDate: '',
      reviewPeriod: 'annually',
      modificationTerms: 'income-change'
    },
    healthInsurance: {
      primary: 'parent1',
      costSharing: 'proportional',
      uncoveredExpenses: 'proportional',
      dentalVision: 'included'
    },
    expenses: {
      education: 'proportional',
      extracurricular: 'proportional',
      childcare: 'proportional',
      medical: 'proportional',
      other: 'proportional'
    },
    college: {
      contribution: 'yes',
      amount: 'proportional',
      savingsPlan: 'joint-account',
      proportionalShare: 'income-based'
    }
  },
  
  // Safety & Special Provisions
  safety: {
    substanceAbuse: {
      concerns: false,
      testing: false,
      restrictions: ''
    },
    domesticViolence: {
      history: false,
      protectiveOrders: false,
      restrictions: ''
    },
    mentalHealth: {
      concerns: false,
      treatment: false,
      restrictions: ''
    },
    relocation: {
      restrictions: 'mutual-consent',
      notificationPeriod: '60-days',
      distanceLimit: '50-miles'
    }
  },
  
  // Additional Provisions
  additional: {
    rightOfFirstRefusal: {
      enabled: true,
      timeThreshold: '8-hours',
      terms: 'both-parents'
    },
    parentingCoordinator: {
      enabled: false,
      selection: 'mutual',
      costSharing: 'equal'
    },
    modificationTerms: 'best-interest',
    enforcementMechanisms: 'mediation-first',
    specialHolidays: 'cultural-considerations'
  },
  
  // Metadata
  metadata: {
    created: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    version: '2.0',
    status: 'draft',
    progress: 0
  }
};

export const sections = [
  {
    id: 'parent-info',
    title: "Parent Information",
    icon: User,
    description: "Complete information about both parents - this helps us create fair and appropriate arrangements",
    color: "from-blue-500 to-cyan-500",
    category: "basic",
    questions: [
      {
        id: 'parent1.name',
        type: 'text',
        label: 'Your Full Legal Name',
        required: true,
        placeholder: 'John Michael Smith',
        icon: User,
        grid: 'md:col-span-2',
        category: 'personal',
        description: 'As it appears on legal documents'
      },
      {
        id: 'parent1.email',
        type: 'email',
        label: 'Your Email Address',
        required: true,
        placeholder: 'john.smith@example.com',
        icon: Mail,
        grid: 'md:col-span-2',
        category: 'contact',
        description: 'For important communications and documents'
      },
      {
        id: 'parent1.phone',
        type: 'tel',
        label: 'Your Primary Phone',
        required: true,
        placeholder: '(555) 123-4567',
        icon: Phone,
        grid: 'md:col-span-1',
        category: 'contact'
      },
      {
        id: 'parent1.address',
        type: 'text',
        label: 'Your Residential Address',
        required: true,
        placeholder: '123 Main St, Jacksonville, FL 32216',
        icon: MapPin,
        grid: 'md:col-span-3',
        category: 'personal',
        description: 'Current living address for legal purposes'
      },
      {
        id: 'parent1.occupation',
        type: 'text',
        label: 'Your Occupation',
        required: true,
        placeholder: 'Software Engineer',
        icon: Briefcase,
        grid: 'md:col-span-2',
        category: 'employment'
      },
      {
        id: 'parent1.employer',
        type: 'text',
        label: 'Your Employer',
        placeholder: 'Tech Solutions Inc.',
        icon: Building,
        grid: 'md:col-span-2',
        category: 'employment'
      },
      {
        id: 'parent1.income',
        type: 'text',
        label: 'Annual Income',
        placeholder: '$85,000',
        icon: DollarSign,
        grid: 'md:col-span-2',
        category: 'financial',
        description: 'For child support calculation purposes'
      },
      {
        id: 'parent2.name',
        type: 'text',
        label: "Co-Parent's Legal Name",
        required: true,
        placeholder: 'Sarah Johnson Smith',
        icon: User,
        grid: 'md:col-span-2',
        category: 'personal'
      },
      {
        id: 'parent2.email',
        type: 'email',
        label: "Co-Parent's Email",
        placeholder: 'sarah.smith@example.com',
        icon: Mail,
        grid: 'md:col-span-2',
        category: 'contact'
      },
      {
        id: 'parent2.phone',
        type: 'tel',
        label: "Co-Parent's Phone",
        placeholder: '(555) 987-6543',
        icon: Phone,
        grid: 'md:col-span-1',
        category: 'contact'
      },
      {
        id: 'parent2.address',
        type: 'text',
        label: "Co-Parent's Address",
        placeholder: '456 Oak Ave, Jacksonville, FL 32207',
        icon: MapPin,
        grid: 'md:col-span-3',
        category: 'personal'
      }
    ]
  },
  {
    id: 'children-info',
    title: "Children Information",
    icon: Users,
    description: "Tell us about your children - we'll customize the parenting plan for each child's age and needs",
    color: "from-purple-500 to-pink-500",
    category: "basic",
    questions: [
      {
        id: 'children.numberOfChildren',
        type: 'number-selector',
        label: 'How many children do you have?',
        required: true,
        min: 1,
        max: 8,
        icon: Users,
        grid: 'md:col-span-1',
        category: 'basic',
        description: 'You can add up to 8 children. Each child can have customized arrangements.'
      },
      {
        id: 'children.scheduleApproach',
        type: 'interactive-select',
        label: 'Schedule Approach for Multiple Children',
        required: true,
        description: 'How would you like to handle schedules for your children?',
        options: [
          {
            value: 'same-schedule',
            title: 'Same Schedule for All Children',
            description: 'All children follow the same parenting time schedule - simplest approach',
            icon: Users,
            recommended: true
          },
          {
            value: 'age-based',
            title: 'Age-Based Schedules',
            description: 'Different schedules based on children\'s ages and developmental needs',
            icon: Calendar
          },
          {
            value: 'child-specific',
            title: 'Custom Schedule for Each Child',
            description: 'Create completely different schedules tailored to each child\'s activities',
            icon: Sparkles
          }
        ]
      },
      {
        id: 'children.list',
        type: 'dynamic-children',
        label: 'Children Details',
        required: true,
        description: 'Please provide details for each child. The system will suggest age-appropriate schedules.',
        fields: [
          {
            id: 'name',
            type: 'text',
            label: 'Full Legal Name',
            required: true,
            placeholder: 'Emma Grace Smith',
            icon: User,
            grid: 'md:col-span-2'
          },
          {
            id: 'dateOfBirth',
            type: 'date',
            label: 'Date of Birth',
            required: true,
            icon: Calendar,
            grid: 'md:col-span-1',
            description: 'Age-appropriate schedules will be suggested'
          },
          {
            id: 'gender',
            type: 'select',
            label: 'Gender',
            required: true,
            options: ['Male', 'Female', 'Prefer not to say'],
            icon: Heart,
            grid: 'md:col-span-1'
          },
          {
            id: 'school',
            type: 'text',
            label: 'Current School/Daycare',
            placeholder: 'Sunshine Elementary School',
            icon: Book,
            grid: 'md:col-span-2',
            description: 'Helps with school district considerations'
          },
          {
            id: 'grade',
            type: 'select',
            label: 'Grade Level',
            options: [
              'Infant (0-1)', 'Toddler (1-3)', 'Preschool (3-5)', 
              'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', 
              '4th Grade', '5th Grade', 'Middle School', 'High School', 'College'
            ],
            icon: GraduationCap,
            grid: 'md:col-span-1'
          },
          {
            id: 'specialNeeds',
            type: 'textarea',
            label: 'Special Needs, Medical Conditions, or Accommodations',
            placeholder: 'Describe any special needs, medical conditions, allergies, medications, or educational accommodations that might affect parenting time...',
            icon: Stethoscope,
            grid: 'md:col-span-3',
            description: 'This helps us create appropriate care plans and schedules'
          }
        ]
      }
    ]
  },
  {
    id: 'time-sharing',
    title: "Time-Sharing Schedule",
    icon: Calendar,
    description: "Design parenting schedules that work for your family - flexible for single or multiple children",
    color: "from-amber-500 to-orange-500",
    category: "schedule",
    questions: [
      {
        id: 'timeSharing.globalSchedule.regularSchedule',
        type: 'card-select',
        label: 'Primary Weekly Schedule',
        required: true,
        description: 'Select the main schedule pattern that works best for your family',
        options: [
          {
            title: 'Week On/Week Off',
            description: 'Children alternate full weeks with each parent - great for school-age children and stability',
            icon: Calendar,
            popular: true,
            value: 'week-on-week-off',
            recommendedAges: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', 'Middle School', 'High School']
          },
          {
            title: '2-2-3 Rotation',
            description: '2 days with Parent A, 2 days with Parent B, 3 days alternating - good for younger children who need frequent contact',
            icon: Zap,
            recommended: true,
            value: '2-2-3-rotation',
            recommendedAges: ['Toddler (1-3)', 'Preschool (3-5)', 'Kindergarten']
          },
          {
            title: '2-2-5-5 Rotation',
            description: 'More stable than 2-2-3, provides longer blocks while maintaining frequent contact',
            icon: Clock,
            value: '2-2-5-5-rotation',
            recommendedAges: ['Preschool (3-5)', 'Kindergarten', '1st Grade', '2nd Grade']
          },
          {
            title: 'Alternating Weekends',
            description: 'Weekdays with one parent, weekends alternating - common when parents live some distance apart',
            icon: Heart,
            value: 'alternating-weekends',
            recommendedAges: ['All ages when distance is factor']
          },
          {
            title: 'Primary with Visitation',
            description: 'One parent has primary custody with scheduled visitation - for specific circumstances',
            icon: Home,
            value: 'primary-with-visitation'
          },
          {
            title: 'Custom Schedule',
            description: 'Create a unique schedule that fits your family\'s specific needs and routines',
            icon: Sparkles,
            value: 'custom'
          }
        ]
      },
      {
        id: 'timeSharing.globalSchedule.weekendSchedule',
        type: 'button-group',
        label: 'Weekend Time Arrangement',
        required: true,
        description: 'How would you like to handle weekend parenting time?',
        options: [
          'Friday PM - Sunday PM',
          'Saturday AM - Sunday PM', 
          'Saturday AM - Monday AM',
          'Flexible based on activities',
          'Other arrangement'
        ],
        grid: 'md:col-span-2'
      },
      {
        id: 'timeSharing.pickupDropoff.responsibleParty',
        type: 'interactive-select',
        label: 'Transportation Responsibility',
        required: true,
        description: 'Who will handle transportation for exchanges?',
        options: [
          {
            value: 'alternating',
            title: 'Alternating Transportation',
            description: 'Each parent provides transportation when child is coming to their home - most common and fair',
            icon: Car,
            recommended: true
          },
          {
            value: 'parent1',
            title: 'Primary Your Responsibility',
            description: 'You handle most transportation arrangements',
            icon: User
          },
          {
            value: 'parent2',
            title: 'Primary Co-Parent Responsibility',
            description: 'Co-parent handles most transportation arrangements',
            icon: Users
          },
          {
            value: 'meet-halfway',
            title: 'Meet at Neutral Location',
            description: 'Both parents meet at a mutually convenient neutral location',
            icon: MapPin
          },
          {
            value: 'school-based',
            title: 'School-Based Exchanges',
            description: 'Exchanges happen at school to minimize conflict',
            icon: GraduationCap
          }
        ]
      },
      {
        id: 'timeSharing.globalSchedule.holidayApproach',
        type: 'interactive-select',
        label: 'Holiday Schedule Approach',
        required: true,
        description: 'How would you like to handle holidays for multiple children?',
        options: [
          {
            value: 'same-for-all',
            title: 'Same Schedule for All Children',
            description: 'All children follow the same holiday schedule - keeps siblings together',
            icon: Users,
            recommended: true
          },
          {
            value: 'alternating-children',
            title: 'Alternating by Child',
            description: 'Different children with different parents each year - for large families',
            icon: Zap
          },
          {
            value: 'child-preferences',
            title: 'Based on Child Preferences',
            description: 'Consider each child\'s preferences and activities',
            icon: Heart
          }
        ]
      }
    ]
  },
  {
    id: 'decision-making',
    title: "Decision Making Authority",
    icon: Shield,
    description: "How important decisions will be made for your children - can be customized per child if needed",
    color: "from-green-500 to-emerald-500",
    category: "authority",
    questions: [
      {
        id: 'decisionMaking.approach',
        type: 'interactive-select',
        label: 'Decision-Making Approach',
        required: true,
        description: 'How would you like to handle decision-making for multiple children?',
        options: [
          {
            value: 'same-for-all',
            title: 'Same for All Children',
            description: 'All children have the same decision-making arrangements - simplest approach',
            icon: Users,
            recommended: true
          },
          {
            value: 'age-based',
            title: 'Age-Based Authority',
            description: 'Different decision-making based on children\'s ages and maturity',
            icon: Calendar
          },
          {
            value: 'child-specific',
            title: 'Custom for Each Child',
            description: 'Tailored decision-making authority based on each child\'s needs',
            icon: Sparkles
          }
        ]
      },
      {
        id: 'decisionMaking.education.primary',
        type: 'interactive-select',
        label: 'Education Decision Making',
        required: true,
        description: 'Who makes important education decisions?',
        options: [
          {
            value: 'shared',
            title: 'Shared Decision-Making',
            description: 'Both parents discuss and agree on all education matters including school choice, extracurricular activities, and educational planning',
            icon: Users,
            recommended: true
          },
          {
            value: 'parent1',
            title: 'Your Primary Authority',
            description: 'You have final decision-making authority after consulting with co-parent',
            icon: User
          },
          {
            value: 'parent2',
            title: 'Co-Parent Primary Authority',
            description: 'Co-parent has final decision-making authority after consulting with you',
            icon: Users2
          },
          {
            value: 'hybrid',
            title: 'Hybrid Approach',
            description: 'Different types of education decisions assigned to different parents based on expertise',
            icon: ShieldCheck
          }
        ]
      },
      {
        id: 'decisionMaking.healthcare.primary',
        type: 'interactive-select',
        label: 'Healthcare Decision Making',
        required: true,
        description: 'How should healthcare decisions be handled?',
        options: [
          {
            value: 'shared',
            title: 'Shared for All Healthcare',
            description: 'Both parents involved in all medical decisions including routine care, emergencies, and major procedures',
            icon: Users
          },
          {
            value: 'emergency-separate',
            title: 'Emergency Only Separate',
            description: 'Either parent can make emergency decisions, shared authority for routine care - practical for busy families',
            icon: AlertCircle,
            recommended: true
          },
          {
            value: 'routine-separate',
            title: 'Routine Care Separate',
            description: 'Each parent handles routine care during their parenting time',
            icon: Heart
          },
          {
            value: 'primary-care',
            title: 'Primary Care Provider Designated',
            description: 'One parent designated as primary for healthcare decisions with consultation',
            icon: Stethoscope
          }
        ]
      }
    ]
  },
  {
    id: 'communication',
    title: "Communication & Coordination",
    icon: MessageCircle,
    description: "How you will communicate and coordinate as co-parents - essential for successful co-parenting",
    color: "from-indigo-500 to-purple-500",
    category: "communication",
    questions: [
      {
        id: 'communication.methods',
        type: 'interactive-checkbox',
        label: 'Preferred Communication Methods',
        required: true,
        description: 'Select all communication methods you\'re comfortable using',
        options: [
          { 
            value: 'text', 
            label: 'Text Message', 
            icon: Smartphone, 
            description: 'Quick updates, schedule changes, immediate concerns',
            recommended: true
          },
          { 
            value: 'email', 
            label: 'Email', 
            icon: Mail, 
            description: 'Detailed discussions, formal communication, documentation' 
          },
          { 
            value: 'app', 
            label: 'Co-Parenting App', 
            icon: ShieldCheck, 
            description: 'OurFamilyWizard, TalkingParents, or similar apps - best for conflict reduction',
            popular: true
          },
          { 
            value: 'phone', 
            label: 'Phone Calls', 
            icon: Phone, 
            description: 'Scheduled calls for important discussions, emergencies' 
          },
          { 
            value: 'in-person', 
            label: 'In-Person Meetings', 
            icon: Users, 
            description: 'Monthly check-ins at neutral locations for major decisions' 
          },
          { 
            value: 'video-call', 
            label: 'Video Calls', 
            icon: Laptop, 
            description: 'Zoom, FaceTime for detailed discussions when in-person not possible' 
          }
        ]
      },
      {
        id: 'communication.frequency',
        type: 'slider',
        label: 'Communication Frequency Preference',
        min: 1,
        max: 5,
        required: true,
        description: 'How often would you like to communicate about routine matters?',
        steps: [
          'Emergency contact only',
          'Weekly summaries',
          '2-3 times per week',
          'Daily updates',
          'Multiple times daily (as needed)'
        ]
      },
      {
        id: 'communication.responseTime',
        type: 'interactive-select',
        label: 'Expected Response Time',
        required: true,
        description: 'What response time is reasonable for different types of communication?',
        options: [
          {
            value: '4h',
            title: 'Within 4 Hours',
            description: 'For urgent matters requiring immediate attention',
            icon: Clock
          },
          {
            value: '24h',
            title: 'Within 24 Hours',
            description: 'For routine matters and general updates - recommended for most families',
            icon: Calendar,
            recommended: true
          },
          {
            value: '48h',
            title: 'Within 48 Hours',
            description: 'For non-urgent matters and planning discussions',
            icon: Clock
          },
          {
            value: 'flexible',
            title: 'Flexible Response Time',
            description: 'Response time varies based on urgency and circumstances',
            icon: Zap
          }
        ]
      }
    ]
  },
  {
    id: 'financial',
    title: "Financial Arrangements",
    icon: DollarSign,
    description: "Child support, expenses, and financial responsibilities - calculated fairly for your situation",
    color: "from-red-500 to-rose-500",
    category: "financial",
    questions: [
      {
        id: 'financial.childSupport.calculated',
        type: 'interactive-select',
        label: 'Child Support Approach',
        required: true,
        description: 'How should child support be determined?',
        options: [
          {
            value: true,
            title: 'Calculate by Florida Guidelines',
            description: 'Use Florida child support guidelines based on income, time-sharing, and expenses - ensures fairness',
            icon: TrendingUp,
            recommended: true
          },
          {
            value: false,
            title: 'Agreed Amount Between Parents',
            description: 'Parents agree on a specific amount outside the guidelines',
            icon: CheckCircle
          }
        ]
      },
      {
        id: 'financial.healthInsurance.primary',
        type: 'interactive-select',
        label: 'Health Insurance Coverage',
        required: true,
        description: 'Who will provide health insurance for the children?',
        options: [
          {
            value: 'parent1',
            title: 'You Provide Insurance',
            description: 'You will maintain health insurance coverage for the children',
            icon: User
          },
          {
            value: 'parent2',
            title: 'Co-Parent Provides Insurance',
            description: 'Co-parent will maintain health insurance coverage for the children',
            icon: Users2
          },
          {
            value: 'shared-cost',
            title: 'Shared Insurance Cost',
            description: 'Both parents share the cost of health insurance premiums based on income',
            icon: Users,
            recommended: true
          },
          {
            value: 'employer-based',
            title: 'Based on Better Coverage',
            description: 'Parent with better employer coverage provides insurance, other parent contributes',
            icon: ShieldCheck
          }
        ]
      },
      {
        id: 'financial.expenses.education',
        type: 'interactive-select',
        label: 'Education Expense Sharing',
        required: true,
        description: 'How should education-related costs be shared?',
        options: [
          {
            value: 'proportional-income',
            title: 'Proportional to Income',
            description: 'Education costs shared based on income percentage - Florida standard approach',
            icon: TrendingUp,
            recommended: true
          },
          {
            value: 'shared-equal',
            title: 'Shared Equally',
            description: 'Both parents share education costs 50/50',
            icon: Users
          },
          {
            value: 'primary-responsibility',
            title: 'Primary Parent Responsibility',
            description: 'One parent primarily responsible for education costs',
            icon: User
          },
          {
            value: 'alternating',
            title: 'Alternating Responsibility',
            description: 'Parents alternate responsibility for different expenses or children',
            icon: Zap
          }
        ]
      }
    ]
  },
  {
    id: 'additional-provisions',
    title: "Additional Provisions",
    icon: FileText,
    description: "Special arrangements and additional terms to make your parenting plan work for your family",
    color: "from-teal-500 to-cyan-500",
    category: "legal",
    questions: [
      {
        id: 'additional.rightOfFirstRefusal.enabled',
        type: 'interactive-select',
        label: 'Right of First Refusal',
        description: 'Should parents offer parenting time to each other before using childcare?',
        required: true,
        options: [
          {
            value: true,
            title: 'Yes, Include Right of First Refusal',
            description: 'Parents must offer time to each other before using babysitters or childcare for extended periods - promotes parent-child time',
            icon: CheckCircle,
            recommended: true
          },
          {
            value: false,
            title: 'No Right of First Refusal',
            description: 'Parents can use their own discretion for childcare arrangements - more flexibility',
            icon: ShieldOff
          }
        ]
      },
      {
        id: 'additional.rightOfFirstRefusal.timeThreshold',
        type: 'select',
        label: 'Time Threshold for Right of First Refusal',
        required: true,
        description: 'When should the right of first refusal apply?',
        options: ['4 hours', '8 hours', '12 hours', '24 hours', '48 hours'],
        icon: Clock,
        grid: 'md:col-span-2'
      },
      {
        id: 'safety.relocation.restrictions',
        type: 'interactive-select',
        label: 'Relocation Restrictions',
        required: true,
        description: 'What restrictions should apply if a parent wants to move?',
        options: [
          {
            value: 'mutual-consent',
            title: 'Mutual Consent Required',
            description: 'Both parents must agree to any relocation - protects parenting time',
            icon: Users,
            recommended: true
          },
          {
            value: 'court-approval',
            title: 'Court Approval Required',
            description: 'Relocation requires court approval based on best interests',
            icon: ShieldCheck
          },
          {
            value: 'distance-based',
            title: 'Distance-Based Restrictions',
            description: 'Specific distance limits with notification requirements',
            icon: MapPin
          }
        ]
      }
    ]
  }
];

export const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Secure payment with Visa, Mastercard, or American Express',
    color: 'from-blue-500 to-cyan-500',
    recommended: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: DollarSign,
    description: 'Pay with your PayPal account or credit card',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'amazon',
    name: 'Amazon Pay',
    icon: CreditCard,
    description: 'Fast and secure checkout with Amazon',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    icon: TrendingUp,
    description: 'Direct bank transfer or ACH payment',
    color: 'from-purple-500 to-pink-500'
  }
];

// Enhanced Helper Functions for Multiple Children
export const initializeChildren = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: '',
    dateOfBirth: '',
    gender: '',
    school: '',
    grade: '',
    specialNeeds: '',
    medicalConditions: '',
    allergies: '',
    medications: '',
    schedulePreferences: {
      overnightPreference: 'same-as-siblings',
      specialConsiderations: ''
    }
  }));
};

export const initializeChildSchedules = (childrenList, globalSchedule) => {
  const childSchedules = {};
  childrenList.forEach((child, index) => {
    childSchedules[`child${index + 1}`] = {
      schedule: globalSchedule.regularSchedule,
      specialNeeds: child.specialNeeds,
      ageConsiderations: calculateAgeConsiderations(child.dateOfBirth)
    };
  });
  return childSchedules;
};

export const calculateAgeConsiderations = (dateOfBirth) => {
  if (!dateOfBirth) return '';
  const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  
  if (age < 3) return 'infant-toddler';
  if (age < 6) return 'preschool';
  if (age < 13) return 'school-age';
  if (age < 18) return 'teenager';
  return 'adult';
};

export const getRecommendedSchedule = (ageGroup) => {
  const recommendations = {
    'infant-toddler': '2-2-3-rotation',
    'preschool': '2-2-5-5-rotation',
    'school-age': 'week-on-week-off',
    'teenager': 'week-on-week-off',
    'adult': 'flexible'
  };
  return recommendations[ageGroup] || 'week-on-week-off';
};

export const validateChildren = (children) => {
  const errors = [];
  
  children.forEach((child, index) => {
    const childErrors = {};
    if (!child.name?.trim()) {
      childErrors.name = 'Child name is required';
    }
    if (!child.dateOfBirth) {
      childErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(child.dateOfBirth);
      const today = new Date();
      if (birthDate > today) {
        childErrors.dateOfBirth = 'Date of birth cannot be in the future';
      }
    }
    if (!child.gender) {
      childErrors.gender = 'Gender is required';
    }
    if (Object.keys(childErrors).length > 0) {
      errors[index] = childErrors;
    }
  });
  
  return errors;
};

export const calculateProgress = (formData) => {
  const totalFields = countTotalFields(initialFormData);
  const completedFields = countCompletedFields(formData);
  return Math.round((completedFields / totalFields) * 100);
};

const countTotalFields = (obj, depth = 0) => {
  if (depth > 5) return 0;
  
  if (typeof obj !== 'object' || obj === null) {
    return 1;
  }
  
  if (Array.isArray(obj)) {
    return obj.reduce((sum, item) => sum + countTotalFields(item, depth + 1), 0);
  }
  
  return Object.values(obj).reduce((sum, value) => sum + countTotalFields(value, depth + 1), 0);
};

const countCompletedFields = (obj, depth = 0) => {
  if (depth > 5) return 0;
  
  if (typeof obj !== 'object' || obj === null) {
    return obj !== '' && obj !== undefined && obj !== null ? 1 : 0;
  }
  
  if (Array.isArray(obj)) {
    return obj.reduce((sum, item) => sum + countCompletedFields(item, depth + 1), 0);
  }
  
  return Object.values(obj).reduce((sum, value) => sum + countCompletedFields(value, depth + 1), 0);
};

// Export categories for filtering
export const questionCategories = {
  basic: 'Basic Information',
  schedule: 'Time-Sharing Schedule', 
  authority: 'Decision Making',
  communication: 'Communication',
  financial: 'Financial Matters',
  legal: 'Legal Provisions'
};

export default {
  initialFormData,
  sections,
  paymentMethods,
  initializeChildren,
  initializeChildSchedules,
  validateChildren,
  calculateProgress,
  calculateAgeConsiderations,
  getRecommendedSchedule,
  questionCategories
};