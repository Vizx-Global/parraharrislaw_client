import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, ShieldCheck, BadgeCheck, CheckCircle, CreditCard, 
  DollarSign, Building, User, Calendar, MapPin, Eye, EyeOff,
  TrendingUp, Mail, Phone, AlertCircle
} from 'lucide-react';

const PaymentSection = ({ paymentMethod, setPaymentMethod, prevSection, paymentMethods }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    zipCode: ''
  });
  const [showCvv, setShowCvv] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar for Payment */}
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
            <OrderSummary />

            {/* Payment Methods */}
            <PaymentMethods 
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              paymentMethods={paymentMethods}
            />

            {/* Dynamic Payment Form */}
            {paymentMethod && (
              <PaymentForm 
                paymentMethod={paymentMethod}
                cardDetails={cardDetails}
                setCardDetails={setCardDetails}
                showCvv={showCvv}
                setShowCvv={setShowCvv}
                paypalEmail={paypalEmail}
                setPaypalEmail={setPaypalEmail}
                bankDetails={bankDetails}
                setBankDetails={setBankDetails}
              />
            )}

            {/* Payment Actions */}
            <PaymentActions 
              paymentMethod={paymentMethod}
              prevSection={prevSection}
              cardDetails={cardDetails}
              paypalEmail={paypalEmail}
              bankDetails={bankDetails}
            />

            {/* Security Badges */}
            <SecurityBadges />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components for Payment Section
const OrderSummary = () => (
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
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Document preparation & review</span>
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
);

const PaymentMethods = ({ paymentMethod, setPaymentMethod, paymentMethods }) => (
  <div className="space-y-4 mb-8">
    <h3 className="font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
    {paymentMethods.map((method) => (
      <PaymentMethodOption
        key={method.id}
        method={method}
        isSelected={paymentMethod === method.id}
        onSelect={() => setPaymentMethod(method.id)}
      />
    ))}
  </div>
);

const PaymentMethodOption = ({ method, isSelected, onSelect }) => {
  const { icon: Icon, name, description, color } = method;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-church-gold bg-gradient-to-r bg-church-gold/5 shadow-golden'
          : 'border-gray-200 hover:border-church-gold/50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isSelected
            ? 'bg-church-gold border-church-gold'
            : 'border-gray-300'
        }`}>
          {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
        </div>
      </div>
    </motion.div>
  );
};

// Dynamic Payment Form Component
const PaymentForm = ({ 
  paymentMethod, 
  cardDetails, 
  setCardDetails, 
  showCvv, 
  setShowCvv,
  paypalEmail,
  setPaypalEmail,
  bankDetails,
  setBankDetails
}) => {
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  const handleBankInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'accountNumber' || field === 'routingNumber') {
      formattedValue = value.replace(/\D/g, '');
    }
    
    setBankDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  switch (paymentMethod) {
    case 'card':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-church-gold" />
            Credit/Debit Card Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card Number */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={cardDetails.number}
                  onChange={(e) => handleCardInputChange('number', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-church-gold/20 focus:border-church-gold transition-all duration-300"
                  maxLength={19}
                />
              </div>
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                  placeholder="MM/YY"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-church-gold/20 focus:border-church-gold transition-all duration-300"
                  maxLength={5}
                />
              </div>
            </div>

            {/* CVV */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showCvv ? "text" : "password"}
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                  placeholder="123"
                  className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-church-gold/20 focus:border-church-gold transition-all duration-300"
                  maxLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowCvv(!showCvv)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={cardDetails.name}
                  onChange={(e) => handleCardInputChange('name', e.target.value)}
                  placeholder="John Smith"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-church-gold/20 focus:border-church-gold transition-all duration-300"
                />
              </div>
            </div>

            {/* ZIP Code */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP/Postal Code
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={cardDetails.zipCode}
                  onChange={(e) => handleCardInputChange('zipCode', e.target.value)}
                  placeholder="12345"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-church-gold/20 focus:border-church-gold transition-all duration-300"
                  maxLength={10}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Your card details are encrypted and secure
          </div>
        </motion.div>
      );

    case 'paypal':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-500" />
            PayPal Checkout
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PayPal Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">You'll be redirected to PayPal</p>
                  <p className="mt-1">After clicking "Complete Payment", you'll be securely redirected to PayPal to complete your payment.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );

    case 'bank-transfer':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-purple-500" />
            Bank Transfer Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Routing Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Routing Number
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={bankDetails.routingNumber}
                  onChange={(e) => handleBankInputChange('routingNumber', e.target.value)}
                  placeholder="123456789"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                  maxLength={9}
                />
              </div>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => handleBankInputChange('accountNumber', e.target.value)}
                  placeholder="Your account number"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Account Type */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <select
                value={bankDetails.accountType}
                onChange={(e) => handleBankInputChange('accountType', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
              >
                <option value="checking">Checking Account</option>
                <option value="savings">Savings Account</option>
              </select>
            </div>
          </div>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-700">
                <p className="font-medium">Processing Time</p>
                <p className="mt-1">Bank transfers may take 2-3 business days to process. Your documents will be prepared once payment is confirmed.</p>
              </div>
            </div>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
};

const PaymentActions = ({ paymentMethod, prevSection, cardDetails, paypalEmail, bankDetails }) => {
  const isFormValid = () => {
    if (!paymentMethod) return false;

    switch (paymentMethod) {
      case 'card':
        return cardDetails.number.replace(/\s/g, '').length === 16 &&
               cardDetails.expiry.length === 5 &&
               cardDetails.cvv.length >= 3 &&
               cardDetails.name.trim() &&
               cardDetails.zipCode.trim();
      
      case 'paypal':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail);
      
      case 'bank-transfer':
        return bankDetails.routingNumber.length === 9 &&
               bankDetails.accountNumber.trim().length >= 4;
      
      default:
        return false;
    }
  };

  const handlePayment = () => {
    if (!isFormValid()) return;

    // Simulate payment processing
    alert(`Payment processed successfully with ${paymentMethod}! Generating your co-parenting plan...`);
    
    // In a real app, you would:
    // 1. Send payment details to your backend
    // 2. Process the payment
    // 3. Generate the co-parenting plan
    // 4. Redirect to success page or download
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={prevSection}
        className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-church-gold hover:text-church-gold"
      >
        Back to Questionnaire
      </button>
      <button
        onClick={handlePayment}
        disabled={!isFormValid()}
        className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-3"
      >
        <Lock className="w-5 h-5" />
        Complete Payment & Generate Plan
      </button>
    </div>
  );
};

const SecurityBadges = () => (
  <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-gray-200">
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <ShieldCheck className="w-4 h-4 text-green-500" />
      SSL Encrypted
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <BadgeCheck className="w-4 h-4 text-blue-500" />
      PCI Compliant
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Lock className="w-4 h-4 text-purple-500" />
      Secure Payment
    </div>
  </div>
);

export default PaymentSection;