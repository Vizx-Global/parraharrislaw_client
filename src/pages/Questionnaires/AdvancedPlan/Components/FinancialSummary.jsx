import React, { useState, useMemo } from 'react';

const FinancialSummary = ({
  formData,
  autoCalculations,
  section,
  onEdit,
  onViewDetails
}) => {
  const [expandedView, setExpandedView] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('');

  // Comprehensive financial metrics
  const financialMetrics = useMemo(() => {
    const {
      parent1_net_income = 0,
      parent2_net_income = 0,
      combined_net_income = 0,
      parent1_income_percentage = 0,
      parent2_income_percentage = 0,
      total_assets = 0,
      total_liabilities = 0,
      net_worth = 0,
      debt_to_income_ratio = 0,
      monthly_expenses = 0,
      monthly_surplus = 0,
      child_support_amount = 0
    } = autoCalculations || {};

    return {
      // Income Metrics
      income: {
        parent1_net_income,
        parent2_net_income,
        combined_net_income,
        parent1_income_percentage,
        parent2_income_percentage,
        income_disparity: Math.abs(parent1_net_income - parent2_net_income)
      },
      
      // Asset & Liability Metrics
      balance_sheet: {
        total_assets,
        total_liabilities,
        net_worth,
        debt_to_asset_ratio: total_assets > 0 ? (total_liabilities / total_assets) * 100 : 0
      },
      
      // Cash Flow Metrics
      cash_flow: {
        monthly_expenses,
        monthly_surplus,
        savings_rate: combined_net_income > 0 ? ((monthly_surplus / combined_net_income) * 100) : 0,
        expense_to_income_ratio: combined_net_income > 0 ? (monthly_expenses / combined_net_income) * 100 : 0,
        debt_to_income_ratio
      },
      
      // Support Metrics
      support: {
        child_support_amount,
        support_percentage: combined_net_income > 0 ? (child_support_amount / combined_net_income) * 100 : 0,
        parent1_remaining: parent1_net_income - (child_support_amount > 0 ? child_support_amount : 0),
        parent2_remaining: parent2_net_income + (child_support_amount > 0 ? child_support_amount : 0)
      }
    };
  }, [autoCalculations]);

  // Get color based on metric value
  const getMetricColor = (value, type = 'neutral') => {
    if (type === 'positive') {
      return value >= 0 ? 'text-green-600' : 'text-red-600';
    }
    if (type === 'negative') {
      return value <= 0 ? 'text-green-600' : 'text-red-600';
    }
    if (type === 'percentage') {
      if (value < 30) return 'text-green-600';
      if (value < 50) return 'text-yellow-600';
      return 'text-red-600';
    }
    return 'text-gray-900';
  };

  // Get background color based on value
  const getMetricBgColor = (value, type) => {
    if (type === 'net_worth') {
      return value >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
    }
    if (type === 'debt_ratio') {
      if (value < 36) return 'bg-green-50 border-green-200';
      if (value < 43) return 'bg-yellow-50 border-yellow-200';
      return 'bg-red-50 border-red-200';
    }
    if (type === 'surplus') {
      return value >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
    }
    return 'bg-blue-50 border-blue-200';
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${(value || 0).toFixed(1)}%`;
  };

  // Individual metric card component
  const MetricCard = ({ title, value, format, trend, description, color, bgColor = 'bg-white', highlight = false }) => (
    <div className={`${bgColor} border rounded-xl p-4 transition-all duration-300 hover:shadow-md ${
      highlight ? 'ring-2 ring-purple-200' : ''
    }`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-600">{title}</h4>
        <div className={`p-1 rounded-lg ${
          trend === 'positive' ? 'bg-green-100 text-green-600' :
          trend === 'negative' ? 'bg-red-100 text-red-600' :
          'bg-blue-100 text-blue-600'
        }`}>
          {trend === 'positive' && '↗'}
          {trend === 'negative' && '↘'}
          {trend === 'neutral' && '➡'}
        </div>
      </div>
      
      <div className={`text-2xl font-bold mb-1 ${color}`}>
        {format === 'currency' ? formatCurrency(value) : formatPercentage(value)}
      </div>
      
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  );

  // Get section-specific summary
  const getSectionSummary = () => {
    const metrics = financialMetrics;
    
    switch (section?.section_type) {
      case 'income':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Parent 1 Net Income"
              value={metrics.income.parent1_net_income}
              format="currency"
              trend="neutral"
              description="Monthly net income after deductions"
              color={getMetricColor(metrics.income.parent1_net_income, 'positive')}
            />
            <MetricCard
              title="Parent 2 Net Income"
              value={metrics.income.parent2_net_income}
              format="currency"
              trend="neutral"
              description="Monthly net income after deductions"
              color={getMetricColor(metrics.income.parent2_net_income, 'positive')}
            />
            <MetricCard
              title="Combined Income"
              value={metrics.income.combined_net_income}
              format="currency"
              trend="positive"
              description="Total household net income"
              color="text-blue-600"
            />
            <MetricCard
              title="Income Ratio"
              value={metrics.income.parent1_income_percentage}
              format="percentage"
              trend="neutral"
              description="Parent 1's share of combined income"
              color="text-purple-600"
            />
          </div>
        );

      case 'assets':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Total Assets"
              value={metrics.balance_sheet.total_assets}
              format="currency"
              trend="positive"
              description="All combined assets and property"
              color="text-green-600"
            />
            <MetricCard
              title="Total Liabilities"
              value={metrics.balance_sheet.total_liabilities}
              format="currency"
              trend="negative"
              description="All combined debts and obligations"
              color="text-red-600"
            />
            <MetricCard
              title="Net Worth"
              value={metrics.balance_sheet.net_worth}
              format="currency"
              trend={metrics.balance_sheet.net_worth >= 0 ? 'positive' : 'negative'}
              description="Assets minus liabilities"
              color={getMetricColor(metrics.balance_sheet.net_worth, 'positive')}
              bgColor={getMetricBgColor(metrics.balance_sheet.net_worth, 'net_worth')}
            />
          </div>
        );

      case 'liabilities':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Debt-to-Income"
              value={metrics.cash_flow.debt_to_income_ratio}
              format="percentage"
              trend="negative"
              description="Monthly debt payments vs income"
              color={getMetricColor(metrics.cash_flow.debt_to_income_ratio, 'percentage')}
              bgColor={getMetricBgColor(metrics.cash_flow.debt_to_income_ratio, 'debt_ratio')}
            />
            <MetricCard
              title="Debt-to-Asset"
              value={metrics.balance_sheet.debt_to_asset_ratio}
              format="percentage"
              trend="negative"
              description="Total debt vs total assets"
              color={getMetricColor(metrics.balance_sheet.debt_to_asset_ratio, 'percentage')}
            />
            <MetricCard
              title="Monthly Debt Payments"
              value={metrics.cash_flow.monthly_expenses * 0.3}
              format="currency"
              trend="negative"
              description="Estimated monthly debt service"
              color="text-orange-600"
            />
          </div>
        );

      case 'expenses':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Monthly Expenses"
              value={metrics.cash_flow.monthly_expenses}
              format="currency"
              trend="negative"
              description="Total monthly living expenses"
              color="text-orange-600"
            />
            <MetricCard
              title="Monthly Surplus"
              value={metrics.cash_flow.monthly_surplus}
              format="currency"
              trend={metrics.cash_flow.monthly_surplus >= 0 ? 'positive' : 'negative'}
              description="Income minus expenses"
              color={getMetricColor(metrics.cash_flow.monthly_surplus, 'positive')}
              bgColor={getMetricBgColor(metrics.cash_flow.monthly_surplus, 'surplus')}
            />
            <MetricCard
              title="Expense Ratio"
              value={metrics.cash_flow.expense_to_income_ratio}
              format="percentage"
              trend="negative"
              description="Expenses as percentage of income"
              color={getMetricColor(metrics.cash_flow.expense_to_income_ratio, 'percentage')}
            />
            <MetricCard
              title="Savings Rate"
              value={metrics.cash_flow.savings_rate}
              format="percentage"
              trend="positive"
              description="Percentage of income saved"
              color={getMetricColor(metrics.cash_flow.savings_rate, 'positive')}
            />
          </div>
        );

      case 'support':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Child Support"
              value={metrics.support.child_support_amount}
              format="currency"
              trend="neutral"
              description="Monthly child support amount"
              color="text-purple-600"
              highlight={true}
            />
            <MetricCard
              title="Support Percentage"
              value={metrics.support.support_percentage}
              format="percentage"
              trend="neutral"
              description="Of combined net income"
              color="text-purple-600"
            />
            <MetricCard
              title="Parent 1 Remaining"
              value={metrics.support.parent1_remaining}
              format="currency"
              trend="positive"
              description="After child support payment"
              color={getMetricColor(metrics.support.parent1_remaining, 'positive')}
            />
            <MetricCard
              title="Parent 2 Remaining"
              value={metrics.support.parent2_remaining}
              format="currency"
              trend="positive"
              description="After child support receipt"
              color={getMetricColor(metrics.support.parent2_remaining, 'positive')}
            />
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Combined Net Income"
              value={metrics.income.combined_net_income}
              format="currency"
              trend="positive"
              description="Total household monthly income"
              color="text-blue-600"
            />
            <MetricCard
              title="Net Worth"
              value={metrics.balance_sheet.net_worth}
              format="currency"
              trend={metrics.balance_sheet.net_worth >= 0 ? 'positive' : 'negative'}
              description="Overall financial position"
              color={getMetricColor(metrics.balance_sheet.net_worth, 'positive')}
            />
            <MetricCard
              title="Monthly Cash Flow"
              value={metrics.cash_flow.monthly_surplus}
              format="currency"
              trend={metrics.cash_flow.monthly_surplus >= 0 ? 'positive' : 'negative'}
              description="Income minus expenses"
              color={getMetricColor(metrics.cash_flow.monthly_surplus, 'positive')}
            />
          </div>
        );
    }
  };

  // Ratio Bar Component
  const RatioBar = ({ label, value, max, thresholds, description }) => {
    const percentage = Math.min(((value || 0) / max) * 100, 100);
    const getBarColor = () => {
      if (value <= thresholds[0]) return 'bg-green-500';
      if (value <= thresholds[1]) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    return (
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700">{label}</span>
          <span className="font-medium">{(value || 0).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getBarColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{description}</span>
          <span>Max: {max}%</span>
        </div>
      </div>
    );
  };

  // Quick insights based on financial data
  const getFinancialInsights = () => {
    const insights = [];
    const metrics = financialMetrics;

    // Income insights
    if (metrics.income.income_disparity > metrics.income.combined_net_income * 0.3) {
      insights.push({
        type: 'warning',
        message: 'Significant income disparity between parents',
        icon: '⚖️'
      });
    }

    // Debt insights
    if (metrics.cash_flow.debt_to_income_ratio > 43) {
      insights.push({
        type: 'error',
        message: 'High debt-to-income ratio may impact support calculations',
        icon: '📉'
      });
    }

    // Net worth insights
    if (metrics.balance_sheet.net_worth < 0) {
      insights.push({
        type: 'error',
        message: 'Negative net worth indicates liabilities exceed assets',
        icon: '🏦'
      });
    }

    // Cash flow insights
    if (metrics.cash_flow.monthly_surplus < 0) {
      insights.push({
        type: 'warning',
        message: 'Monthly expenses exceed income - review budget',
        icon: '💸'
      });
    }

    // Support insights
    if (metrics.support.child_support_amount > 0) {
      if (metrics.support.parent1_remaining < metrics.cash_flow.monthly_expenses * 0.3) {
        insights.push({
          type: 'warning',
          message: 'Parent 1 may have limited disposable income after support',
          icon: '👤'
        });
      }
    }

    // Add positive insights
    if (metrics.cash_flow.savings_rate > 10) {
      insights.push({
        type: 'success',
        message: 'Healthy savings rate indicates good financial management',
        icon: '💰'
      });
    }

    if (metrics.balance_sheet.net_worth > metrics.income.combined_net_income * 12) {
      insights.push({
        type: 'success',
        message: 'Strong net worth position relative to income',
        icon: '📈'
      });
    }

    return insights.slice(0, 3);
  };

  const insights = getFinancialInsights();

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-3">
            <span className="text-2xl">📊</span>
            <span>Financial Summary</span>
          </h3>
          <p className="text-gray-600 mt-1">
            Real-time financial metrics and insights for your co-parenting plan
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setExpandedView(!expandedView)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-sm"
          >
            <span>{expandedView ? '📋' : '📈'}</span>
            <span>{expandedView ? 'Compact View' : 'Detailed View'}</span>
          </button>
          
          {onEdit && (
            <button
              onClick={() => onEdit(section?.section_id)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
            >
              <span>✏️</span>
              <span>Edit Data</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Metrics Grid */}
      {getSectionSummary()}

      {/* Expanded Detailed View */}
      {expandedView && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Financial Health Score */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <span>❤️</span>
              <span>Financial Health Score</span>
            </h4>
            
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">72</div>
                    <div className="text-sm text-gray-600">/100</div>
                  </div>
                </div>
                <div 
                  className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-green-500 border-t-transparent border-r-transparent transform -rotate-45"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 72%, 0 72%)' }}
                />
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Income Stability</span>
                <span className="font-medium">Good</span>
              </div>
              <div className="flex justify-between">
                <span>Debt Management</span>
                <span className="font-medium">Fair</span>
              </div>
              <div className="flex justify-between">
                <span>Asset Protection</span>
                <span className="font-medium">Excellent</span>
              </div>
            </div>
          </div>

          {/* Key Ratios */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Key Financial Ratios</h4>
            <div className="space-y-4">
              <RatioBar
                label="Debt-to-Income"
                value={financialMetrics.cash_flow.debt_to_income_ratio}
                max={100}
                thresholds={[36, 43]}
                description="Lower is better"
              />
              <RatioBar
                label="Expense-to-Income"
                value={financialMetrics.cash_flow.expense_to_income_ratio}
                max={100}
                thresholds={[80, 95]}
                description="Lower is better"
              />
              <RatioBar
                label="Savings Rate"
                value={financialMetrics.cash_flow.savings_rate}
                max={50}
                thresholds={[10, 20]}
                description="Higher is better"
              />
            </div>
          </div>
        </div>
      )}

      {/* Financial Insights */}
      {insights.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <span>💡</span>
            <span>Financial Insights</span>
          </h4>
          
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-3 rounded-lg border ${
                  insight.type === 'error' ? 'bg-red-50 border-red-200' :
                  insight.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-green-50 border-green-200'
                }`}
              >
                <span className="text-lg mt-0.5">{insight.icon}</span>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    insight.type === 'error' ? 'text-red-800' :
                    insight.type === 'warning' ? 'text-yellow-800' :
                    'text-green-800'
                  }`}>
                    {insight.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => onViewDetails?.('income')}
          className="flex-1 flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
        >
          <span>💰</span>
          <span>Income Details</span>
        </button>
        <button
          onClick={() => onViewDetails?.('assets')}
          className="flex-1 flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
        >
          <span>🏠</span>
          <span>Asset Details</span>
        </button>
        <button
          onClick={() => onViewDetails?.('expenses')}
          className="flex-1 flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
        >
          <span>📊</span>
          <span>Expense Details</span>
        </button>
      </div>
    </div>
  );
};

export default FinancialSummary;