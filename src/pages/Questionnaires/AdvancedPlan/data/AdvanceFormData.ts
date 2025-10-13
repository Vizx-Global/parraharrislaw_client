// AdvancedFormData.tsx

export interface Question {
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
  attorney_review_flag_conditions?: string[];
  help_text?: string;
  repeater_template?: any;
}

export interface Section {
  section_id: string;
  section_name: string;
  section_description?: string;
  section_order: number;
  tier_required: 'basic' | 'advanced';
  estimated_time_minutes: number;
  questions: Question[];
  layout?: 'standard' | 'financial' | 'document' | 'legal';
  questionGroups?: {
    groupName: string;
    questions: Question[];
  }[];
  attorney_review_required?: boolean;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  icon?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  fee?: number;
  processing_time?: string;
}

// Initial form data structure for Advanced Tier
export const initialAdvancedFormData = {
  // Section 1-8: Basic Information (from DIY tier)
  parent_info: {
    parent1: {
      full_name: '',
      date_of_birth: '',
      social_security: '',
      address: '',
      phone: '',
      email: ''
    },
    parent2: {
      full_name: '',
      date_of_birth: '',
      social_security: '',
      address: '',
      phone: '',
      email: ''
    }
  },
  
  children: {
    children_list: []
  },

  // Section 9: Parent 1 Income
  parent1_income: {
    employment_status: '',
    employer_info: {
      company_name: '',
      address: '',
      job_title: '',
      start_date: '',
      hours_per_week: 0,
      supervisor_info: ''
    },
    pay_frequency: '',
    gross_monthly: 0,
    annual_gross: 0,
    overtime_income: 0,
    bonuses_commissions: 0,
    tips: 0,
    other_income_sources: [],
    other_income_details: [],
    federal_tax: 0,
    state_tax: 0,
    fica_tax: 0,
    union_dues: 0,
    mandatory_retirement: 0,
    health_insurance_self: 0,
    health_insurance_children: 0,
    dental_insurance_children: 0,
    vision_insurance_children: 0,
    childcare_costs: 0,
    childcare_provider: {
      name: '',
      address: '',
      type: '',
      children_count: 0,
      days_per_week: 0
    },
    health_insurance_provider: ''
  },

  // Section 10: Parent 2 Income
  parent2_income: {
    employment_status: '',
    employer_info: {
      company_name: '',
      address: '',
      job_title: '',
      start_date: '',
      hours_per_week: 0,
      supervisor_info: ''
    },
    pay_frequency: '',
    gross_monthly: 0,
    annual_gross: 0,
    overtime_income: 0,
    bonuses_commissions: 0,
    tips: 0,
    other_income_sources: [],
    other_income_details: [],
    federal_tax: 0,
    state_tax: 0,
    fica_tax: 0,
    union_dues: 0,
    mandatory_retirement: 0,
    health_insurance_self: 0,
    health_insurance_children: 0,
    dental_insurance_children: 0,
    vision_insurance_children: 0,
    childcare_costs: 0,
    childcare_provider: {
      name: '',
      address: '',
      type: '',
      children_count: 0,
      days_per_week: 0
    },
    health_insurance_provider: ''
  },

  // Section 11: Assets
  assets: {
    bank_accounts: [],
    real_estate: [],
    vehicles: [],
    retirement_accounts: [],
    investments: [],
    business_interests: [],
    other_assets: [],
    life_insurance: []
  },

  // Section 12: Liabilities
  liabilities: {
    credit_cards: [],
    student_loans: [],
    personal_loans: [],
    medical_debt: [],
    tax_debt: [],
    other_debts: []
  },

  // Section 13: Monthly Expenses
  expenses: {
    housing: {
      rent_mortgage: 0,
      property_taxes: 0,
      insurance: 0,
      hoa_fees: 0,
      maintenance: 0
    },
    utilities: {
      electricity: 0,
      water_sewer: 0,
      natural_gas: 0,
      trash: 0,
      internet: 0,
      cable_tv: 0,
      landline: 0,
      cell_phone: 0
    },
    transportation: {
      car_payments: 0,
      auto_insurance: 0,
      registration: 0,
      gasoline: 0,
      maintenance: 0,
      tolls_parking: 0,
      public_transportation: 0
    },
    food_household: {
      groceries: 0,
      dining_out: 0,
      work_lunches: 0,
      pet_food: 0
    },
    children_expenses: {
      school_tuition: 0,
      school_lunches: 0,
      school_supplies: 0,
      clothing: 0,
      allowance: 0,
      toys_entertainment: 0,
      sports_fees: 0,
      music_lessons: 0,
      summer_camps: 0,
      birthday_parties: 0,
      babysitting: 0
    },
    medical_healthcare: {
      health_insurance: 0,
      dental_insurance: 0,
      vision_insurance: 0,
      doctor_copays: 0,
      prescriptions: 0,
      otc_medications: 0,
      dental_care: 0,
      vision_care: 0,
      mental_health: 0,
      physical_therapy: 0,
      medical_equipment: 0,
      gym_membership: 0
    },
    insurance: {
      life_insurance: 0,
      disability_insurance: 0,
      umbrella_insurance: 0,
      other_insurance: 0
    },
    personal_care: {
      haircuts: 0,
      cosmetics: 0,
      clothing: 0,
      shoes: 0,
      dry_cleaning: 0
    },
    professional: {
      licenses: 0,
      association_dues: 0,
      uniforms: 0,
      tools_equipment: 0,
      continuing_education: 0
    },
    support_payments: {
      child_support_other: 0,
      alimony_other: 0
    },
    entertainment: {
      streaming_services: 0,
      hobbies: 0,
      movies_events: 0,
      vacations: 0,
      books_magazines: 0,
      app_subscriptions: 0
    },
    pet_expenses: {
      pet_food: 0,
      veterinary: 0,
      pet_insurance: 0,
      grooming: 0,
      pet_supplies: 0
    },
    miscellaneous: {
      gifts: 0,
      charitable: 0,
      religious: 0,
      subscriptions: 0,
      tobacco: 0,
      alcohol: 0,
      lottery: 0,
      storage_unit: 0,
      bank_fees: 0,
      postage: 0,
      legal_fees: 0,
      tax_preparation: 0
    },
    savings: {
      retirement_contributions: 0,
      regular_savings: 0,
      investment_contributions: 0,
      college_savings: 0,
      emergency_fund: 0
    }
  },

  // Section 14: Child Support Calculation
  child_support: {
    calculated_amount: 0,
    paying_parent: '',
    receiving_parent: '',
    deviation_factors: [],
    custom_amount: 0,
    justification: '',
    additional_notes: ''
  },

  // Section 15: Custody Application
  custody_application: {
    case_type: '',
    florida_residency: '',
    residency_parent: '',
    filing_county: '',
    previous_cases: false,
    previous_case_details: [],
    domestic_violence: '',
    domestic_violence_details: {
      injunction: false,
      active_injunction: false,
      injunction_case_number: '',
      expiration_date: '',
      police_called: false,
      supervised_visitation: false,
      safety_plan_needed: false
    },
    paternity_established: '',
    paternity_methods: [],
    paternity_date: '',
    other_children: '',
    other_children_details: {
      parent1_other_children: 0,
      parent1_pays_support: false,
      parent1_support_amount: 0,
      parent1_children_live_with: false,
      parent1_days_per_year: 0,
      parent2_other_children: 0,
      parent2_pays_support: false,
      parent2_support_amount: 0,
      parent2_children_live_with: false,
      parent2_days_per_year: 0
    },
    property_division: '',
    spousal_support: '',
    name_change: '',
    name_change_details: {
      parent1_restore: false,
      parent1_name_to: '',
      parent1_reason: '',
      parent2_restore: false,
      parent2_name_to: '',
      parent2_reason: ''
    },
    attorney_representation: {
      parent1_represented: '',
      parent1_attorney_name: '',
      parent1_firm_name: '',
      parent1_bar_number: '',
      parent1_contact_info: '',
      parent2_represented: '',
      parent2_attorney_name: '',
      parent2_firm_name: '',
      parent2_bar_number: '',
      parent2_contact_info: ''
    },
    service_of_process: '',
    service_date: '',
    service_method: '',
    urgency_circumstances: false,
    urgency_details: '',
    desired_relief: [],
    case_filed: '',
    case_details: {
      case_number: '',
      filed_date: '',
      judge: '',
      next_court_date: ''
    },
    consent_level: ''
  },

  // Section 16: Document Uploads
  documents: {
    uploaded_files: {}
  },

  // Section 17: Attorney Review (managed by attorney)
  attorney_review: {
    case_status: 'new_submission',
    assigned_attorney: '',
    priority_level: 'normal',
    estimated_completion: '',
    complexity_rating: '',
    estimated_hours: 0,
    litigation_risk: '',
    red_flags: [],
    section_reviews: {},
    child_support_review: {
      calculation_correct: true,
      discrepancy_explanation: '',
      recommend_deviation: false,
      proposed_amount: 0,
      deviation_factors: [],
      legal_justification: '',
      case_law_citations: ''
    },
    parenting_plan_modifications: {
      recommended: false,
      time_sharing_changes: '',
      decision_making_changes: '',
      communication_changes: '',
      additional_provisions: '',
      special_clauses: '',
      rationale: ''
    },
    missing_information_requests: [],
    financial_affidavit_review: {
      appears_accurate: true,
      asset_concerns: '',
      liability_concerns: '',
      expense_concerns: '',
      additional_discovery_needed: false,
      discovery_methods: []
    },
    custody_application_review: {
      jurisdiction_confirmed: true,
      proper_venue: true,
      parties_identified: true,
      previous_orders_accounted: true,
      service_plan: '',
      anticipated_response: '',
      motions_needed: []
    },
    legal_strategy_notes: '',
    referrals_needed: [],
    timeline_next_steps: {
      document_finalization: '',
      client_review_signature: '',
      filing_date: '',
      service_date: '',
      response_deadline: '',
      mediation_date: '',
      hearing_trial_date: ''
    },
    tasks: [],
    consultation_notes: {
      consultation_date: '',
      duration: 0,
      topics_discussed: '',
      advice_provided: '',
      client_questions: '',
      follow_up_needed: false,
      follow_up_tasks: '',
      next_consultation: ''
    },
    attorney_approval: {
      reviewed: false,
      accurate_complete: false,
      ready_for_generation: false,
      attorney_signature: '',
      approval_date: '',
      bar_number: ''
    }
  },

  // Section 18: Final Review
  final_review: {
    client_acknowledgments: {
      information_accurate: false,
      no_false_information: false,
      understand_calculation: false,
      legally_binding: false,
      future_modifications: false,
      asked_questions: false,
      proceed_generation: false
    },
    next_steps_understood: false,
    contact_preferences: {
      primary_contact: 'email',
      secondary_contact: 'phone',
      best_time: '',
      special_instructions: ''
    },
    feedback: {
      experience_rating: 0,
      comments: '',
      improvements_suggested: ''
    }
  }
};

// Payment Methods for Advanced Tier
export const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit_card',
    name: 'Credit Card',
    description: 'Secure payment via Stripe',
    icon: '💳',
    fee: 0.029,
    processing_time: 'Instant'
  },
  {
    id: 'debit_card',
    name: 'Debit Card',
    description: 'Direct bank payment',
    icon: '🏦',
    fee: 0.025,
    processing_time: 'Instant'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    description: 'ACH transfer from your bank',
    icon: '🔗',
    fee: 0.01,
    processing_time: '2-3 business days'
  },
  {
    id: 'payment_plan',
    name: 'Payment Plan',
    description: 'Split into 3 monthly payments',
    icon: '📅',
    fee: 0.05,
    processing_time: 'Immediate access'
  }
];

// Advanced Tier Sections Configuration
export const advancedSections: Section[] = [
  {
    section_id: 'section_9',
    section_name: 'Employment & Income - Parent 1',
    section_description: 'Complete financial information for child support calculation and financial affidavit preparation',
    section_order: 9,
    tier_required: 'advanced',
    estimated_time_minutes: 15,
    layout: 'financial',
    icon: '💼',
    priority: 'high',
    attorney_review_required: true,
    questions: [
      {
        id: 'parent1_income.employment_status',
        question_number: 73,
        question_text: 'What is your current employment status?',
        question_type: 'dropdown',
        required: true,
        options: [
          'Employed full-time (W-2)',
          'Employed part-time',
          'Self-employed/Business owner',
          'Independent contractor (1099)',
          'Military active duty',
          'Military reserves',
          'Unemployed - seeking work',
          'Unemployed - disability',
          'Student',
          'Retired',
          'Homemaker',
          'Other'
        ],
        tooltip: 'Select your primary employment status',
        maps_to_pdf_field: 'parent1_employment_status',
        attorney_editable: true,
        validation: {
          required: true,
          error_message: 'Employment status is required for child support calculation'
        }
      },
      {
        id: 'parent1_income.gross_monthly',
        question_number: 74,
        question_text: 'What is your gross monthly income (BEFORE taxes and deductions)?',
        question_type: 'currency',
        required: true,
        placeholder: '$0.00',
        tooltip: 'This is your total income before any taxes or deductions. Include salary, hourly wages, overtime, and regular bonuses.',
        maps_to_pdf_field: 'parent1_gross_monthly',
        attorney_editable: true,
        validation: {
          required: true,
          min: 0,
          max: 999999,
          error_message: 'Please enter a valid gross monthly income'
        }
      },
      {
        id: 'parent1_income.other_income_sources',
        question_number: 75,
        question_text: 'Select any additional income sources you receive:',
        question_type: 'interactive-checkbox',
        required: false,
        options: [
          'Rental income',
          'Investment income (dividends, interest)',
          'Social Security benefits',
          'Social Security Disability (SSDI)',
          'Supplemental Security Income (SSI)',
          'Unemployment benefits',
          'Workers compensation',
          'Pension or retirement income',
          'Trust fund or inheritance income',
          'Spousal support from previous relationship',
          'Child support from other relationships',
          'Military allowances (BAH, BAS, etc.)',
          'VA disability benefits',
          'Royalties or residual income',
          'Cryptocurrency or investment gains',
          'Side business or freelance income',
          'None of the above'
        ],
        tooltip: 'Select all additional income sources that apply',
        maps_to_pdf_field: 'parent1_other_income',
        attorney_editable: true
      }
    ]
  },
  {
    section_id: 'section_10',
    section_name: 'Employment & Income - Parent 2',
    section_description: 'Complete financial information for the second parent',
    section_order: 10,
    tier_required: 'advanced',
    estimated_time_minutes: 15,
    layout: 'financial',
    icon: '💼',
    priority: 'high',
    attorney_review_required: true,
    questions: [
      {
        id: 'parent2_income.employment_status',
        question_number: 94,
        question_text: 'What is Parent 2\'s current employment status?',
        question_type: 'dropdown',
        required: true,
        options: [
          'Employed full-time (W-2)',
          'Employed part-time',
          'Self-employed/Business owner',
          'Independent contractor (1099)',
          'Military active duty',
          'Military reserves',
          'Unemployed - seeking work',
          'Unemployed - disability',
          'Student',
          'Retired',
          'Homemaker',
          'Other'
        ],
        tooltip: 'Select Parent 2\'s primary employment status',
        maps_to_pdf_field: 'parent2_employment_status',
        attorney_editable: true
      }
    ]
  },
  {
    section_id: 'section_11',
    section_name: 'Financial Affidavit - Assets & Property',
    section_description: 'Complete inventory of all assets for court financial disclosure',
    section_order: 11,
    tier_required: 'advanced',
    estimated_time_minutes: 20,
    layout: 'financial',
    icon: '💰',
    priority: 'high',
    attorney_review_required: true,
    questionGroups: [
      {
        groupName: 'Bank Accounts & Cash',
        questions: [
          {
            id: 'assets.bank_accounts',
            question_number: 115,
            question_text: 'Bank Accounts, Checking, and Savings',
            question_type: 'repeater',
            required: true,
            tooltip: 'List all bank accounts including checking, savings, money market, and CDs',
            maps_to_pdf_field: 'bank_accounts_list',
            attorney_editable: true,
            repeater_template: {
              institution: '',
              type: '',
              last_four: '',
              owner: '',
              balance: 0,
              property_type: ''
            }
          }
        ]
      },
      {
        groupName: 'Real Estate & Property',
        questions: [
          {
            id: 'assets.real_estate',
            question_number: 116,
            question_text: 'Real Estate and Property Holdings',
            question_type: 'repeater',
            required: false,
            tooltip: 'Include primary residence, rental properties, vacation homes, and land',
            maps_to_pdf_field: 'real_estate_list',
            attorney_editable: true,
            repeater_template: {
              address: '',
              type: '',
              owner: '',
              purchase_date: '',
              purchase_price: 0,
              current_value: 0,
              value_method: '',
              mortgage_balance: 0,
              lender: '',
              monthly_payment: 0,
              property_type: ''
            }
          }
        ]
      }
    ]
  },
  {
    section_id: 'section_12',
    section_name: 'Financial Affidavit - Liabilities & Debts',
    section_description: 'Complete disclosure of all debts and financial obligations',
    section_order: 12,
    tier_required: 'advanced',
    estimated_time_minutes: 15,
    layout: 'financial',
    icon: '📉',
    priority: 'high',
    attorney_review_required: true,
    questions: []
  },
  {
    section_id: 'section_13',
    section_name: 'Monthly Living Expenses',
    section_description: 'Detailed breakdown of household and personal expenses',
    section_order: 13,
    tier_required: 'advanced',
    estimated_time_minutes: 12,
    layout: 'financial',
    icon: '📊',
    priority: 'medium',
    attorney_review_required: true,
    questions: []
  },
  {
    section_id: 'section_14',
    section_name: 'Florida Child Support Calculation',
    section_description: 'Automatic calculation using Florida Child Support Guidelines',
    section_order: 14,
    tier_required: 'advanced',
    estimated_time_minutes: 5,
    layout: 'financial',
    icon: '🧮',
    priority: 'critical',
    attorney_review_required: true,
    questions: []
  },
  {
    section_id: 'section_15',
    section_name: 'Custody Application Preparation',
    section_description: 'Information for Florida custody and dissolution paperwork',
    section_order: 15,
    tier_required: 'advanced',
    estimated_time_minutes: 10,
    layout: 'legal',
    icon: '⚖️',
    priority: 'high',
    attorney_review_required: true,
    questions: []
  },
  {
    section_id: 'section_16',
    section_name: 'Document Upload Center',
    section_description: 'Upload all required supporting documents',
    section_order: 16,
    tier_required: 'advanced',
    estimated_time_minutes: 8,
    layout: 'document',
    icon: '📎',
    priority: 'high',
    attorney_review_required: true,
    questions: []
  },
  {
    section_id: 'section_17',
    section_name: 'Attorney Review & Collaboration',
    section_description: 'Professional legal review and case management',
    section_order: 17,
    tier_required: 'advanced',
    estimated_time_minutes: 0,
    layout: 'legal',
    icon: '👨‍💼',
    priority: 'critical',
    attorney_review_required: true,
    questions: []
  },
  {
    section_id: 'section_18',
    section_name: 'Final Review & Next Steps',
    section_description: 'Review complete package and prepare for court filing',
    section_order: 18,
    tier_required: 'advanced',
    estimated_time_minutes: 5,
    layout: 'standard',
    icon: '✅',
    priority: 'medium',
    attorney_review_required: false,
    questions: []
  }
];

// Validation rules for advanced form
export const advancedValidationRules = {
  income: {
    gross_monthly: (value: number) => value >= 0 && value <= 999999,
    federal_tax: (value: number, formData: any) => value <= (formData.gross_monthly || 0),
    net_income: (value: number, formData: any) => {
      const gross = formData.gross_monthly || 0;
      return value >= gross * 0.6 && value <= gross * 0.85;
    }
  },
  assets: {
    balance: (value: number) => value >= 0,
    ownership_percentage: (value: number) => value >= 0 && value <= 100
  },
  expenses: {
    amount: (value: number) => value >= 0,
    housing_ratio: (value: number, formData: any) => {
      const income = (formData.parent1_income?.gross_monthly || 0) + (formData.parent2_income?.gross_monthly || 0);
      return value <= income * 0.5;
    }
  }
};

// Attorney review flag conditions
export const attorneyReviewFlags = {
  income: [
    { condition: 'parent1_income.net_income < parent1_income.gross_monthly * 0.6', message: 'Net income seems unusually low' },
    { condition: 'parent1_income.gross_monthly === 0 && parent1_income.employment_status !== "Unemployed"', message: 'Employed but no income reported' },
    { condition: 'parent1_income.health_insurance_self > 1500', message: 'Health insurance cost seems unusually high' }
  ],
  assets: [
    { condition: 'assets.total_assets < 1000', message: 'Total assets seem unusually low' },
    { condition: 'assets.real_estate.some(property => property.current_value - property.mortgage_balance < 0)', message: 'Property with negative equity' },
    { condition: 'assets.business_interests.length > 0 && assets.business_interests.some(business => !business.tax_returns_uploaded)', message: 'Business ownership without tax returns' }
  ],
  child_support: [
    { condition: 'child_support.calculated_amount > combined_net_income * 0.4', message: 'Support amount exceeds 40% of combined income' },
    { condition: 'child_support.deviation_factors.length > 0 && !child_support.justification', message: 'Deviation requested without justification' }
  ]
};

// PDF field mappings for Florida court forms
export const pdfFieldMappings = {
  'parent1_gross_monthly': 'parent1_gross_income',
  'parent1_net_monthly': 'parent1_net_income',
  'parent2_gross_monthly': 'parent2_gross_income',
  'parent2_net_monthly': 'parent2_net_income',
  'child_support.calculated_amount': 'guideline_amount',
  'child_support.paying_parent': 'obligor',
  'child_support.receiving_parent': 'obligee',
  'custody_application.filing_county': 'county',
  'custody_application.case_type': 'type_of_action'
};

// Helper functions for form management
export const FormHelpers = {
  calculateNetIncome: (incomeData: any) => {
    const gross = incomeData.gross_monthly || 0;
    const deductions = (incomeData.federal_tax || 0) +
                      (incomeData.state_tax || 0) +
                      (incomeData.fica_tax || 0) +
                      (incomeData.union_dues || 0) +
                      (incomeData.mandatory_retirement || 0) +
                      (incomeData.health_insurance_self || 0);
    
    return gross - deductions;
  },

  calculateCombinedNetIncome: (formData: any) => {
    const parent1Net = FormHelpers.calculateNetIncome(formData.parent1_income);
    const parent2Net = FormHelpers.calculateNetIncome(formData.parent2_income);
    return parent1Net + parent2Net;
  },

  calculateIncomePercentages: (formData: any) => {
    const combined = FormHelpers.calculateCombinedNetIncome(formData);
    if (combined === 0) return { parent1: 0, parent2: 0 };
    
    const parent1Net = FormHelpers.calculateNetIncome(formData.parent1_income);
    const parent2Net = FormHelpers.calculateNetIncome(formData.parent2_income);
    
    return {
      parent1: (parent1Net / combined) * 100,
      parent2: (parent2Net / combined) * 100
    };
  },

  validateSection: (sectionId: string, formData: any) => {
    const section = advancedSections.find(s => s.section_id === sectionId);
    const errors: Record<string, string> = {};

    if (!section) return errors;

    section.questions.forEach(question => {
      if (question.required) {
        const value = getNestedValue(formData, question.id);
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors[question.id] = question.validation?.error_message || 'This field is required';
        }
      }
    });

    return errors;
  },

  getSectionProgress: (sectionId: string, formData: any) => {
    const section = advancedSections.find(s => s.section_id === sectionId);
    if (!section) return 0;

    const requiredQuestions = section.questions.filter(q => q.required);
    if (requiredQuestions.length === 0) return 100;

    const completedQuestions = requiredQuestions.filter(question => {
      const value = getNestedValue(formData, question.id);
      return value !== undefined && value !== null && value !== '' && 
             (!Array.isArray(value) || value.length > 0) &&
             (typeof value !== 'number' || value !== 0);
    });

    return Math.round((completedQuestions.length / requiredQuestions.length) * 100);
  }
};

// Helper function to get nested values from form data
export const getNestedValue = (obj: any, path: string) => {
  if (!path) return undefined;
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
};

export default {
  initialAdvancedFormData,
  advancedSections,
  paymentMethods,
  advancedValidationRules,
  attorneyReviewFlags,
  pdfFieldMappings,
  FormHelpers
};