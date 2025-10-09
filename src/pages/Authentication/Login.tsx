import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Mail, Lock, Eye, EyeOff, AlertCircle, Users, Shield, Clock, Award, CheckCircle, FileText } from 'lucide-react';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate loading for demo
    setTimeout(() => {
      console.log('Sign in data:', formData);
      setIsLoading(false);
    }, 1500);
  };

  const benefits = [
    {
      icon: Users,
      title: '15+ Years Experience',
      description: 'Expert family law attorneys'
    },
    {
      icon: FileText,
      title: 'Case Management',
      description: 'Track your case progress'
    },
    {
      icon: Shield,
      title: 'Secure Portal',
      description: 'Your information is protected'
    },
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Access your documents anytime'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Successful case outcomes'
    },
    {
      icon: CheckCircle,
      title: 'Quick Updates',
      description: 'Real-time case notifications'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-divine p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden">
        
        {/* LEFT: Welcome Section */}
        <div className="bg-gradient-to-br from-church-navy/90 via-church-navy/95 to-church-light-blue/30 text-white p-8 lg:p-12 hidden lg:flex flex-col relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px]"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-church-gold to-amber-500 rounded-xl flex items-center justify-center shadow-golden">
                <Scale className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-church-gold bg-clip-text text-transparent">
                  Parra Harris Law
                </h1>
                <p className="text-church-gold text-sm font-semibold">Family Law Excellence</p>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Welcome Back</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Access your client portal to manage your case, view documents, and communicate with your legal team.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Client Portal Features</h3>
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="flex gap-4 items-start group hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                    <benefit.icon className="w-5 h-5 text-church-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
                    <p className="text-sm text-blue-100 leading-relaxed font-light">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Shield className="w-4 h-4 text-church-gold" />
                <span className="text-xs font-medium">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <CheckCircle className="w-4 h-4 text-church-gold" />
                <span className="text-xs font-medium">GDPR Compliant</span>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-church-gold/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-church-light-blue/10 rounded-full blur-xl"></div>
        </div>

        {/* RIGHT: Sign In Form */}
        <div className="bg-white/95 backdrop-blur-lg p-8 lg:p-12">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-church-gold to-amber-500 rounded-2xl flex items-center justify-center">
                <Scale className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your client portal</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In to Your Account</h1>
            <p className="text-gray-600">Access your case information and legal documents</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-church-gold transition-colors" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-church-gold/20 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-church-gold'
                  }`}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-church-gold hover:text-amber-600 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-church-gold transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-2 focus:ring-church-gold/20 transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-church-gold'
                  }`}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-church-gold transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-church-gold border-gray-300 rounded focus:ring-church-gold focus:ring-2"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me for 30 days
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-church-gold to-amber-500 hover:from-amber-500 hover:to-church-gold text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In to Portal
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/sign-up" 
                className="text-church-gold hover:text-amber-600 font-semibold underline underline-offset-2 transition-colors"
              >
                Create account here
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              © 2024 Parra Harris Law. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}