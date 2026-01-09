import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Commet } from "react-loading-indicators";
import { 
  Lock, ShieldCheck, BadgeCheck, CheckCircle, CreditCard, 
  DollarSign, Building, User, Calendar, MapPin, Eye, EyeOff,
  TrendingUp, Mail, AlertCircle, Star, Users, FileText,
  MessageSquare, Clock, X
} from 'lucide-react';

// Hardcoded test credentials
const TEST_CREDENTIALS = {
  cardNumber: '1234 5678 9101 1112',
  expiryDate: '12/25',
  cvv: '123',
  cardHolderName: 'Will Smith',
  zipCode: '12345'
};

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Pay securely with your credit or debit card',
    icon: CreditCard,
    color: 'from-church-gold to-amber-500'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: DollarSign,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    description: 'Direct bank transfer',
    icon: Building,
    color: 'from-purple-500 to-purple-600'
  }
];

// Full Page Loader Component with translucent overlay
const FullPageLoader = ({ message = "Processing your payment..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-md mx-4 border border-white/20"
      >
        <div className="text-center">
          <Commet color="#D4AF37" size="medium" text="" textColor="" />
          <p className="mt-4 text-church-navy font-semibold text-lg">{message}</p>
          <p className="text-gray-600 text-sm mt-2">Please wait while we process your payment</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Success Modal Component with translucent overlay
const SuccessModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-md w-full border border-white/20 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <h3 className="text-3xl font-bold text-church-navy mb-4">
            Payment Successful!
          </h3>
          <p className="text-gray-600 mb-2">
            Your Advanced Legal Plan has been activated successfully.
          </p>
          <p className="text-gray-600 mb-6">
            Redirecting you to your dashboard...
          </p>
          <div className="flex justify-center">
            <Commet 
              color="#D4AF37" 
              size="medium" 
              text="" 
              textColor=""
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Order Summary Component
const OrderSummary = () => (
  <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
    <h3 className="font-bold text-xl text-church-navy mb-4">Order Summary</h3>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-700">Advanced Legal Plan</span>
        <span className="font-bold text-lg">$2,500.00</span>
      </div>
      
      {/* Included Features */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Attorney Review & Collaboration</span>
          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Financial Documentation Support</span>
          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">1-Hour Attorney Consultation</span>
          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Court Filing Preparation</span>
          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">E-Signature Processing</span>
          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Priority Support</span>
          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">$2,500.00</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span>Legal Documentation Fee</span>
          <span>Included</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Attorney Services</span>
          <span>Included</span>
        </div>
        
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between items-center font-bold text-xl text-church-navy">
            <span>Total Due Today</span>
            <span>$2,500.00</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">One-time payment • No hidden fees</p>
        </div>
      </div>
    </div>
  </div>
);

// Advanced Plan Features Component
const AdvancedPlanFeatures = () => (
  <div className="bg-gradient-to-br from-church-navy/95 to-primary-glow/95 backdrop-blur-lg text-white rounded-3xl shadow-2xl p-6 border border-white/20">
    <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
      <Star className="w-5 h-5 text-church-gold" />
      Premium Benefits
    </h3>
    
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Users className="w-5 h-5 text-church-gold mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold">Dedicated Attorney</h4>
          <p className="text-church-light-blue text-sm">Personalized legal guidance throughout</p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <FileText className="w-5 h-5 text-church-gold mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold">Legal Compliance</h4>
          <p className="text-church-light-blue text-sm">Florida-specific legal requirements</p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <MessageSquare className="w-5 h-5 text-church-gold mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold">Secure Communication</h4>
          <p className="text-church-light-blue text-sm">Direct attorney messaging</p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-church-gold mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold">Priority Processing</h4>
          <p className="text-church-light-blue text-sm">Expedited document preparation</p>
        </div>
      </div>
      
      <div className="bg-church-gold/30 rounded-lg p-3 mt-4 backdrop-blur-sm">
        <p className="text-sm text-center font-semibold">
          🎉 Complete today and get immediate access to your attorney!
        </p>
      </div>
    </div>
  </div>
);

// Payment Methods Component
const PaymentMethods = ({ paymentMethod, setPaymentMethod }) => (
  <div className="space-y-4 mb-8">
    <h3 className="font-bold text-xl text-church-navy mb-4">Select Payment Method</h3>
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

// Payment Method Option Component
const PaymentMethodOption = ({ method, isSelected, onSelect }) => {
  const { icon: Icon, name, description, color } = method;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-sm ${
        isSelected
          ? 'border-church-gold bg-gradient-to-r bg-church-gold/10 shadow-golden'
          : 'border-gray-200/80 bg-white/80 hover:border-church-gold/50'
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

// Payment Form Component
const PaymentForm = ({ 
  paymentMethod, 
  cardDetails, 
  setCardDetails, 
  showCvv, 
  setShowCvv,
  paypalEmail,
  setPaypalEmail,
  bankDetails,
  setBankDetails,
  onQuickFill
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
          className="bg-gray-50/80 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-gray-200/80"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-church-gold" />
              Credit/Debit Card Details
            </h3>
            {onQuickFill && (
              <button
                onClick={onQuickFill}
                className="text-xs bg-blue-100/80 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200/80 transition-colors backdrop-blur-sm"
              >
                Auto-fill Test Card
              </button>
            )}
          </div>
          
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300/80 rounded-lg focus:ring-2 focus:ring-church-gold/20 focus:border-church-gold transition-all duration-300 bg-white/90"
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300/80 rounded-lg focus:ring-2 focus:ring-church-gold/20 focus:border-church-gold transition-all duration-300 bg-white/90"
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
                  className="w-full pl-10 pr-10 py-3 border-2 border-gray-300/80 rounded-lg focus:ring-2 focus:ring-church-gold/20 focus:border-church-gold transition-all duration-300 bg-white/90"
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300/80 rounded-lg focus:ring-2 focus:ring-church-gold/20 focus:border-church-gold transition-all duration-300 bg-white/90"
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300/80 rounded-lg focus:ring-2 focus:ring-church-gold/20 focus:border-church-gold transition-all duration-300 bg-white/90"
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
          className="bg-gray-50/80 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-gray-200/80"
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300/80 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/90"
                />
              </div>
            </div>

            <div className="bg-blue-50/80 border border-blue-200/80 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">You'll be redirected to PayPal</p>
                  <p className="mt-1">After clicking "Activate Plan", you'll be securely redirected to PayPal to complete your payment.</p>
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
          className="bg-gray-50/80 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-gray-200/80"
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300/80 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/90"
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300/80 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/90"
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
                className="w-full px-4 py-3 border-2 border-gray-300/80 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/90"
              >
                <option value="checking">Checking Account</option>
                <option value="savings">Savings Account</option>
              </select>
            </div>
          </div>

          <div className="mt-4 bg-amber-50/80 border border-amber-200/80 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-700">
                <p className="font-medium">Processing Time</p>
                <p className="mt-1">Bank transfers may take 2-3 business days to process. Your attorney will be assigned once payment is confirmed.</p>
              </div>
            </div>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
};

// Payment Actions Component
const PaymentActions = ({ 
  paymentMethod, 
  prevSection, 
  cardDetails, 
  paypalEmail, 
  bankDetails,
  onPayment 
}) => {
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

  return (
    <div className="flex gap-4">
      <button
        onClick={prevSection}
        className="flex-1 px-6 py-4 border-2 border-gray-300/80 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-church-gold hover:text-church-gold backdrop-blur-sm bg-white/80"
      >
        Back to Plan Details
      </button>
      <button
        onClick={onPayment}
        disabled={!isFormValid()}
        className="flex-1 px-6 py-4 bg-gradient-to-r from-church-gold to-amber-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-3 backdrop-blur-sm"
      >
        <Lock className="w-5 h-5" />
        Activate Advanced Plan - $2,500
      </button>
    </div>
  );
};

// Security Badges Component
const SecurityBadges = () => (
  <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-gray-200/80">
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

// Main Payment Section Component
const PaymentSection = ({ prevSection }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  // Auto-fill test credentials when component mounts
  useEffect(() => {
    setTimeout(() => {
      setCardDetails({
        number: TEST_CREDENTIALS.cardNumber,
        expiry: TEST_CREDENTIALS.expiryDate,
        cvv: TEST_CREDENTIALS.cvv,
        name: TEST_CREDENTIALS.cardHolderName,
        zipCode: TEST_CREDENTIALS.zipCode
      });
    }, 100);
  }, []);

  const simulatePaymentProcessing = () => {
    setIsProcessing(true);
    
    // Simulate 15-second payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Store payment success in localStorage for dashboard access
      localStorage.setItem('advancedPlanActive', 'true');
      localStorage.setItem('paymentDate', new Date().toISOString());
      
      // Redirect to dashboard after 2 seconds success display
      setTimeout(() => {
        navigate('/advance-plan-dashboard');
      }, 2000);
    }, 15000);
  };

  const handleCloseSuccess = () => {
    setPaymentSuccess(false);
    navigate('/advance-plan-dashboard');
  };

  return (
    <>
      <AnimatePresence>
        {isProcessing && (
          <FullPageLoader message="Activating Your Advanced Legal Plan" />
        )}
        
        {paymentSuccess && (
          <SuccessModal onClose={handleCloseSuccess} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Progress Bar for Payment */}
          <div className="bg-gradient-to-r from-church-navy to-primary-glow text-white p-6 rounded-3xl shadow-2xl mb-8 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Final Step: Activate Advanced Legal Plan</span>
              <span className="text-church-gold font-bold">100% Complete</span>
            </div>
            <div className="h-3 w-full bg-church-navy/50 rounded-full overflow-hidden">
              <div className="h-3 bg-gradient-to-r from-church-gold to-amber-500 rounded-full w-full" />
            </div>
          </div>

          {/* Development Mode Banner */}
          <div className="bg-green-50/90 border border-green-200/80 rounded-xl p-4 mb-6 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-900">Test Mode Active</h4>
                <p className="text-green-700 text-sm">
                  Card details auto-filled for testing. Click "Activate Advanced Plan" to simulate payment.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Summary & Features */}
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                {/* Payment Header */}
                <div className="bg-gradient-to-r from-church-gold to-amber-500 text-white p-8 text-center">
                  <Lock className="w-12 h-12 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">Advanced Legal Plan Activation</h2>
                  <p className="text-amber-100">Secure payment unlocks comprehensive attorney-guided parenting plan</p>
                </div>

                <div className="p-8">
                  {/* Payment Methods */}
                  <PaymentMethods 
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
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
                      onQuickFill={() => {
                        setCardDetails({
                          number: TEST_CREDENTIALS.cardNumber,
                          expiry: TEST_CREDENTIALS.expiryDate,
                          cvv: TEST_CREDENTIALS.cvv,
                          name: TEST_CREDENTIALS.cardHolderName,
                          zipCode: TEST_CREDENTIALS.zipCode
                        });
                      }}
                    />
                  )}

                  {/* Payment Actions */}
                  <PaymentActions 
                    paymentMethod={paymentMethod}
                    prevSection={prevSection}
                    cardDetails={cardDetails}
                    paypalEmail={paypalEmail}
                    bankDetails={bankDetails}
                    onPayment={simulatePaymentProcessing}
                  />

                  {/* Security Badges */}
                  <SecurityBadges />
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary & Features */}
            <div className="space-y-6">
              <OrderSummary />
              <AdvancedPlanFeatures />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSection;