import React, { useState, useMemo } from 'react';

interface ChildSupportData {
  parent1_net_income?: number;
  parent2_net_income?: number;
  combined_net_income?: number;
  parent1_income_percentage?: number;
  parent2_income_percentage?: number;
  child_support_amount?: number;
  children_count?: number;
  overnight_stays_parent1?: number;
  overnight_stays_parent2?: number;
  health_insurance_cost?: number;
  childcare_cost?: number;
}

interface ChildSupportCalculatorProps {
  formData: any;
  autoCalculations: ChildSupportData;
  onAdjustSupport?: (amount: number, reason: string) => void;
  onSaveCalculation?: (calculation: any) => void;
  editable?: boolean;
}

const ChildSupportCalculator: React.FC<ChildSupportCalculatorProps> = ({
  formData,
  autoCalculations,
  onAdjustSupport,
  onSaveCalculation,
  editable = true
}) => {
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [deviationReasons, setDeviationReasons] = useState<string[]>([]);
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Florida Child Support Guidelines calculation
  const calculation = useMemo(() => {
    const {
      parent1_net_income = 0,
      parent2_net_income = 0,
      combined_net_income = 0,
      parent1_income_percentage = 0,
      parent2_income_percentage = 0,
      children_count = 1,
      overnight_stays_parent1 = 182, // Default 50/50
      overnight_stays_parent2 = 183,
      health_insurance_cost = 0,
      childcare_cost = 0
    } = autoCalculations;

    // Basic child support obligation from Florida guidelines
    const getBasicSupportObligation = (income: number, children: number) => {
      // Simplified Florida child support schedule (2024)
      const schedule = [
        { min: 0, max: 1000, 1: 300, 2: 450, 3: 568, 4: 660, 5: 750 },
        { min: 1001, max: 1500, 1: 350, 2: 525, 3: 662, 4: 770, 5: 875 },
        { min: 1501, max: 2000, 1: 400, 2: 600, 3: 756, 4: 880, 5: 1000 },
        { min: 2001, max: 2500, 1: 450, 2: 675, 3: 851, 4: 990, 5: 1125 },
        { min: 2501, max: 3000, 1: 500, 2: 750, 3: 945, 4: 1100, 5: 1250 },
        { min: 3001, max: 3500, 1: 550, 2: 825, 3: 1040, 4: 1210, 5: 1375 },
        { min: 3501, max: 4000, 1: 600, 2: 900, 3: 1134, 4: 1320, 5: 1500 },
        { min: 4001, max: 4500, 1: 650, 2: 975, 3: 1229, 4: 1430, 5: 1625 },
        { min: 4501, max: 5000, 1: 700, 2: 1050, 3: 1323, 4: 1540, 5: 1750 },
        { min: 5001, max: 5500, 1: 750, 2: 1125, 3: 1418, 4: 1650, 5: 1875 },
        { min: 5501, max: 6000, 1: 800, 2: 1200, 3: 1512, 4: 1760, 5: 2000 },
        { min: 6001, max: 6500, 1: 850, 2: 1275, 3: 1607, 4: 1870, 5: 2125 },
        { min: 6501, max: 7000, 1: 900, 2: 1350, 3: 1701, 4: 1980, 5: 2250 },
        { min: 7001, max: 7500, 1: 950, 2: 1425, 3: 1796, 4: 2090, 5: 2375 },
        { min: 7501, max: 8000, 1: 1000, 2: 1500, 3: 1890, 4: 2200, 5: 2500 }
      ];

      const bracket = schedule.find(b => income >= b.min && income <= b.max);
      if (!bracket) {
        // For incomes above schedule, use percentage method
        const percentages = [0.18, 0.27, 0.32, 0.35, 0.37];
        return income * (percentages[Math.min(children - 1, 4)] || 0.37);
      }

      return bracket[children as keyof typeof bracket] as number || bracket[5];
    };

    const basicObligation = getBasicSupportObligation(combined_net_income, children_count);
    
    // Pro-rata share
    const parent1Share = basicObligation * parent1_income_percentage / 100;
    const parent2Share = basicObligation * parent2_income_percentage / 100;

    // Health insurance adjustment
    const healthInsuranceShare = {
      parent1: health_insurance_cost * parent1_income_percentage / 100,
      parent2: health_insurance_cost * parent2_income_percentage / 100
    };

    // Childcare adjustment
    const childcareShare = {
      parent1: childcare_cost * parent1_income_percentage / 100,
      parent2: childcare_cost * parent2_income_percentage / 100
    };

    // Time-sharing adjustment (Florida Statute 61.30(11)(b))
    const totalOvernights = overnight_stays_parent1 + overnight_stays_parent2;
    const parent1OvernightPercentage = overnight_stays_parent1 / totalOvernights;
    const parent2OvernightPercentage = overnight_stays_parent2 / totalOvernights;

    let timeSharingAdjustment = 0;
    if (parent1OvernightPercentage >= 0.2 || parent2OvernightPercentage >= 0.2) {
      // Substantial time-sharing adjustment
      timeSharingAdjustment = basicObligation * 0.05 * Math.abs(parent1OvernightPercentage - 0.5);
    }

    // Final calculation
    const baseSupport = parent1Share - parent2Share;
    const adjustments = healthInsuranceShare.parent1 - healthInsuranceShare.parent2 + 
                       childcareShare.parent1 - childcareShare.parent2;
    
    let finalAmount = baseSupport + adjustments;
    
    // Apply time-sharing adjustment
    if (parent1OvernightPercentage > 0.5) {
      finalAmount -= timeSharingAdjustment;
    } else if (parent2OvernightPercentage > 0.5) {
      finalAmount += timeSharingAdjustment;
    }

    // Ensure amount is positive and reasonable
    finalAmount = Math.max(finalAmount, 0);
    finalAmount = Math.min(finalAmount, combined_net_income * 0.4); // Cap at 40% of combined income

    const payingParent = finalAmount > 0 ? 'parent1' : 'parent2';
    const receivingParent = finalAmount > 0 ? 'parent2' : 'parent1';
    const supportAmount = Math.abs(finalAmount);

    return {
      basicObligation,
      parent1Share,
      parent2Share,
      healthInsuranceShare,
      childcareShare,
      timeSharingAdjustment,
      finalAmount: supportAmount,
      payingParent,
      receivingParent,
      parent1OvernightPercentage: parent1OvernightPercentage * 100,
      parent2OvernightPercentage: parent2OvernightPercentage * 100
    };
  }, [autoCalculations]);

  // Deviation factors for Florida guidelines
  const deviationFactors = [
    { id: 'extraordinary_medical', label: 'Extraordinary medical expenses', checked: false },
    { id: 'special_needs', label: 'Special needs of child', checked: false },
    { id: 'educational_needs', label: 'Educational needs', checked: false },
    { id: 'independent_income', label: 'Independent income of child', checked: false },
    { id: 'seasonal_income', label: 'Seasonal income variations', checked: false },
    { id: 'total_assets', label: 'Total assets available', checked: false },
    { id: 'support_would_be_unjust', label: 'Guidelines would be unjust', checked: false }
  ];

  const handleDeviationToggle = (factorId: string) => {
    setDeviationReasons(prev =>
      prev.includes(factorId)
        ? prev.filter(id => id !== factorId)
        : [...prev, factorId]
    );
  };

  const handleCustomAmountChange = (amount: number) => {
    setCustomAmount(amount);
    onAdjustSupport?.(amount, deviationReasons.join(', '));
  };

  const steps = [
    { id: 1, title: 'Income Calculation', description: 'Combined net income determination' },
    { id: 2, title: 'Basic Support', description: 'Guideline amount calculation' },
    { id: 3, title: 'Adjustments', description: 'Insurance, childcare, time-sharing' },
    { id: 4, title: 'Final Amount', description: 'Court-ready support order' }
  ];

  const getSupportImpact = () => {
    const amount = calculation.finalAmount;
    const combinedIncome = autoCalculations.combined_net_income || 1;
    const percentage = (amount / combinedIncome) * 100;

    if (percentage < 10) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage < 20) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  const impact = getSupportImpact();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
              <span className="text-3xl">👨‍👩‍👧‍👦</span>
              <span>Florida Child Support Calculator</span>
            </h2>
            <p className="text-gray-600 mt-1">
              Based on Florida Statute 61.30 Child Support Guidelines
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ${calculation.finalAmount.toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">Monthly Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculation Steps</h3>
        
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className={`flex flex-col items-center flex-1 ${index < steps.length - 1 ? 'md:mr-4' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mb-2 ${
                  activeStep >= index ? 'bg-purple-500' : 'bg-gray-300'
                }`}>
                  {activeStep > index ? '✓' : step.id}
                </div>
                <div className="text-center">
                  <div className={`text-sm font-medium ${
                    activeStep >= index ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 hidden md:block">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden md:block flex-1 h-1 ${
                  activeStep > index ? 'bg-purple-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {/* Step 1: Income Calculation */}
          {activeStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-blue-600 font-medium">Parent 1 Net Income</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${autoCalculations.parent1_net_income?.toFixed(0) || '0'}
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  {autoCalculations.parent1_income_percentage?.toFixed(1)}% of combined
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-blue-600 font-medium">Parent 2 Net Income</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${autoCalculations.parent2_net_income?.toFixed(0) || '0'}
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  {autoCalculations.parent2_income_percentage?.toFixed(1)}% of combined
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-600 font-medium">Combined Net Income</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${autoCalculations.combined_net_income?.toFixed(0) || '0'}
                </div>
                <div className="text-xs text-green-600 mt-1">Monthly total</div>
              </div>
            </div>
          )}

          {/* Step 2: Basic Support */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="text-sm text-yellow-600 font-medium">Basic Support Obligation</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${calculation.basicObligation.toFixed(0)}
                </div>
                <div className="text-xs text-yellow-600 mt-1">
                  Florida Guidelines for {autoCalculations.children_count || 1} child{autoCalculations.children_count !== 1 ? 'ren' : ''}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600">Parent 1 Share</div>
                  <div className="text-xl font-semibold text-gray-900">
                    ${calculation.parent1Share.toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {autoCalculations.parent1_income_percentage?.toFixed(1)}% of obligation
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600">Parent 2 Share</div>
                  <div className="text-xl font-semibold text-gray-900">
                    ${calculation.parent2Share.toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {autoCalculations.parent2_income_percentage?.toFixed(1)}% of obligation
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Adjustments */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="text-sm text-orange-600 font-medium">Health Insurance</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${autoCalculations.health_insurance_cost?.toFixed(0) || '0'}
                  </div>
                  <div className="text-xs text-orange-600 mt-1">Monthly cost</div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="text-sm text-orange-600 font-medium">Childcare Costs</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${autoCalculations.childcare_cost?.toFixed(0) || '0'}
                  </div>
                  <div className="text-xs text-orange-600 mt-1">Monthly cost</div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="text-sm text-purple-600 font-medium">Time-Sharing</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {calculation.parent1OvernightPercentage.toFixed(0)}% / {calculation.parent2OvernightPercentage.toFixed(0)}%
                  </div>
                  <div className="text-xs text-purple-600 mt-1">Parent 1 / Parent 2</div>
                </div>
              </div>
              
              {calculation.timeSharingAdjustment > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm text-blue-600 font-medium">Time-Sharing Adjustment</div>
                  <div className="text-lg font-semibold text-gray-900">
                    -${calculation.timeSharingAdjustment.toFixed(0)}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    Applied for substantial time-sharing
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Final Amount */}
          {activeStep === 3 && (
            <div className="space-y-6">
              {/* Final Support Amount */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 text-center">
                <div className="text-sm text-green-600 font-medium mb-2">FINAL CHILD SUPPORT AMOUNT</div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${calculation.finalAmount.toFixed(0)}
                </div>
                <div className="text-lg text-green-600 font-semibold">
                  {calculation.payingParent === 'parent1' ? 'Parent 1' : 'Parent 2'} pays{' '}
                  {calculation.receivingParent === 'parent1' ? 'Parent 1' : 'Parent 2'}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Due monthly • Effective upon court order
                </div>
              </div>

              {/* Impact Assessment */}
              <div className={`rounded-lg p-4 border ${impact.bg} ${impact.color.replace('text', 'border')}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Financial Impact: {impact.level}</div>
                    <div className="text-sm opacity-75">
                      {((calculation.finalAmount / (autoCalculations.combined_net_income || 1)) * 100).toFixed(1)}% of combined income
                    </div>
                  </div>
                  <div className="text-2xl">
                    {impact.level === 'Low' ? '✅' : impact.level === 'Moderate' ? '⚠️' : '📊'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={activeStep === steps.length - 1}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Deviation Factors */}
      {editable && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deviation Factors</h3>
          <p className="text-gray-600 mb-4">
            The court may deviate from guideline support for these reasons:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {deviationFactors.map(factor => (
              <label key={factor.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={deviationReasons.includes(factor.id)}
                  onChange={() => handleDeviationToggle(factor.id)}
                  className="mt-1 text-purple-500 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">{factor.label}</span>
              </label>
            ))}
          </div>

          {/* Custom Amount */}
          {deviationReasons.length > 0 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Propose Custom Amount</h4>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="number"
                    value={customAmount || calculation.finalAmount}
                    onChange={(e) => handleCustomAmountChange(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    min="0"
                    max={autoCalculations.combined_net_income}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  ${customAmount?.toFixed(0) || calculation.finalAmount.toFixed(0)}/month
                </div>
              </div>
              <p className="text-xs text-yellow-700 mt-2">
                You must provide justification for any deviation from guideline amount
              </p>
            </div>
          )}
        </div>
      )}

      {/* Support Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Schedule */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Amount:</span>
              <span className="font-semibold">${calculation.finalAmount.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Annual Total:</span>
              <span className="font-semibold">${(calculation.finalAmount * 12).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Due Date:</span>
              <span className="font-semibold">1st of each month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-semibold">Until child turns 18</span>
            </div>
          </div>
        </div>

        {/* Additional Provisions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Provisions</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Health insurance costs shared proportionally</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Unreimbursed medical expenses shared</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Childcare costs shared proportionally</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Automatic income-based adjustments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setShowDetailedView(!showDetailedView)}
          className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
        >
          <span>{showDetailedView ? '📋' : '📊'}</span>
          <span>{showDetailedView ? 'Hide Details' : 'Show Calculation Worksheet'}</span>
        </button>
        
        {onSaveCalculation && (
          <button
            onClick={() => onSaveCalculation(calculation)}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
          >
            <span>💾</span>
            <span>Save Calculation</span>
          </button>
        )}
      </div>

      {/* Florida Guidelines Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-500 text-lg">ℹ️</span>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-800">Florida Child Support Guidelines</h4>
            <p className="text-blue-700 text-sm mt-1">
              This calculation follows Florida Statute 61.30. The court has discretion to deviate 
              from guideline amounts based on specific circumstances. Support continues until the 
              child turns 18 or graduates high school (whichever is later), up to age 19.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildSupportCalculator;