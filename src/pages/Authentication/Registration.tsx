import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { Scale, Users, FileText, Shield, Clock, Award, CheckCircle, User, Mail, Phone, Lock, ChevronRight, ArrowRight } from 'lucide-react';

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    urgency: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const handleSubmit = () => {
    console.log('Submitting form', formData);
    // send to backend (axios/fetch)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-divine">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-3xl bg-white overflow-hidden">
        
        {/* LEFT: Modern Form Steps */}
        <div className="p-10 lg:p-12 text-black">
          {/* Header */}
          <div className="text-center mb-8">
            <div className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-church-gold via-amber-500 to-orange-500 bg-clip-text text-transparent mb-2'>
              <TypeAnimation
                sequence={[
                  'Welcome to Parra Harris Law',
                  1500,
                  'Client Registration',
                  1500,
                  'Join Our Family',
                  1500,
                  'Get Legal Support',
                  1500,
                ]}
                wrapper="h2"
                speed={50}
                style={{ fontSize: 'inherit', fontWeight: 'bold' }}
                repeat={Infinity}
              />
            </div>
            <p className="text-gray-600 text-sm">Complete your registration in 3 simple steps</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-3">
              <span className="font-medium">Step {step} of 3</span>
              <span className="font-semibold text-church-gold">{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-3 bg-gradient-to-r from-church-gold to-amber-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">First Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-church-gold group-focus-within:text-church-gold transition-colors" />
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-church-gold focus:ring-2 focus:ring-church-gold/20 transition-all duration-300 bg-white/50"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Last Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-church-gold group-focus-within:text-church-gold transition-colors" />
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-church-gold focus:ring-2 focus:ring-church-gold/20 transition-all duration-300 bg-white/50"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-church-gold group-focus-within:text-church-gold transition-colors" />
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-church-gold focus:ring-2 focus:ring-church-gold/20 transition-all duration-300 bg-white/50"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-church-gold group-focus-within:text-church-gold transition-colors" />
                  <input
                    type="tel"
                    placeholder="(904) 555-0123"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-church-gold focus:ring-2 focus:ring-church-gold/20 transition-all duration-300 bg-white/50"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={next}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                className="w-full bg-gradient-to-r from-church-gold to-amber-500 hover:from-amber-500 hover:to-church-gold text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-3 group"
              >
                Continue to Next Step
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Step 2: Service Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Service Interested In</label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-church-gold transition-colors z-10" />
                  <select
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-church-gold focus:ring-2 focus:ring-church-gold/20 transition-all duration-300 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer"
                    value={formData.service}
                    onChange={(e) => handleChange('service', e.target.value)}
                  >
                    <option value="">Select a legal service</option>
                    <option value="divorce">Divorce & Separation</option>
                    <option value="custody">Child Custody</option>
                    <option value="adoption">Adoption</option>
                    <option value="support">Child Support</option>
                    <option value="domestic">Domestic Violence</option>
                    <option value="prenup">Prenuptial Agreements</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Level of Urgency</label>
                <div className="relative group">
                  <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-church-gold transition-colors z-10" />
                  <select
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-church-gold focus:ring-2 focus:ring-church-gold/20 transition-all duration-300 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer"
                    value={formData.urgency}
                    onChange={(e) => handleChange('urgency', e.target.value)}
                  >
                    <option value="">Select urgency level</option>
                    <option value="standard">Standard (1-2 weeks)</option>
                    <option value="urgent">Urgent (3-5 days)</option>
                    <option value="emergency">Emergency (24-48 hours)</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={back}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold transition-all duration-300 hover:border-church-gold hover:text-church-gold hover:scale-105 flex items-center justify-center gap-2"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back
                </button>
                <button
                  onClick={next}
                  disabled={!formData.service || !formData.urgency}
                  className="flex-1 bg-gradient-to-r from-church-gold to-amber-500 hover:from-amber-500 hover:to-church-gold text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Account Security */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-church-gold" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Secure Your Account</h4>
                    <p className="text-sm text-gray-600">Choose a strong password to protect your information</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-church-gold group-focus-within:text-church-gold transition-colors" />
                  <input
                    type="password"
                    placeholder="Create your password"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-church-gold focus:ring-2 focus:ring-church-gold/20 transition-all duration-300 bg-white/50"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-church-gold group-focus-within:text-church-gold transition-colors" />
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-church-gold focus:ring-2 focus:ring-church-gold/20 transition-all duration-300 bg-white/50"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={back}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold transition-all duration-300 hover:border-church-gold hover:text-church-gold hover:scale-105 flex items-center justify-center gap-2"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-church-gold to-amber-500 hover:from-amber-500 hover:to-church-gold text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Banner Info (Unchanged but kept for completeness) */}
        <div className="bg-gradient-to-br from-church-navy via-church-navy/95 to-church-light-blue/20 text-white p-8 hidden lg:flex flex-col relative items-center justify-start">
          <Link to="/" className="mb-6 mt-2">
            <Scale className="w-16 h-16 text-church-gold" />
          </Link>
          <h3 className="text-xl text-church-gold font-bold mb-4 text-center">Why Choose Parra Harris Law?</h3>

          <ul className="w-full space-y-4 text-sm">
            <li className="flex gap-3 items-start hover:scale-[1.03] transition-transform">
              <Users className="w-6 h-6 mt-1 text-church-gold" />
              <div>
                <span className="font-semibold">15+ Years Experience</span>
                <p className="text-xs text-white/80">Expert family law attorneys</p>
              </div>
            </li>
            <li className="flex gap-3 items-start hover:scale-[1.03] transition-transform">
              <FileText className="w-6 h-6 mt-1 text-church-gold" />
              <div>
                <span className="font-semibold">Free Case Evaluation</span>
                <p className="text-xs text-white/80">Initial assessment at no cost</p>
              </div>
            </li>
            <li className="flex gap-3 items-start hover:scale-[1.03] transition-transform">
              <Clock className="w-6 h-6 mt-1 text-church-gold" />
              <div>
                <span className="font-semibold">Quick Response</span>
                <p className="text-xs text-white/80">We respond within 2 hours</p>
              </div>
            </li>
            <li className="flex gap-3 items-start hover:scale-[1.03] transition-transform">
              <Award className="w-6 h-6 mt-1 text-church-gold" />
              <div>
                <span className="font-semibold">Award Winning</span>
                <p className="text-xs text-white/80">Recognized legal excellence</p>
              </div>
            </li>
            <li className="flex gap-3 items-start hover:scale-[1.03] transition-transform">
              <Shield className="w-6 h-6 mt-1 text-church-gold" />
              <div>
                <span className="font-semibold">Confidential & Secure</span>
                <p className="text-xs text-white/80">Your privacy protected</p>
              </div>
            </li>
            <li className="flex gap-3 items-start hover:scale-[1.03] transition-transform">
              <CheckCircle className="w-6 h-6 mt-1 text-church-gold" />
              <div>
                <span className="font-semibold">Proven Results</span>
                <p className="text-xs text-white/80">Successful case outcomes</p>
              </div>
            </li>
          </ul>

          <p className="mt-6 text-xs text-center">
            Already registered? <a href="/sign-in" className="underline text-church-gold font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}