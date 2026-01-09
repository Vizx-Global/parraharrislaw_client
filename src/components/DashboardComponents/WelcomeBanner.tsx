import { Shield, Star, Clock } from 'lucide-react';

export default function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-church-navy to-primary-glow rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-24 h-24 bg-church-gold rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-church-light-blue rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-church-gold" />
              <h1 className="text-3xl font-bold">Welcome to Your Advanced Legal Plan</h1>
            </div>
            <p className="text-church-light-blue text-lg mb-4 max-w-3xl">
              Your comprehensive parenting plan is being crafted with expert attorney guidance. 
              We're here to ensure every detail supports your family's future.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-church-gold" />
                <span className="text-sm">Premium Legal Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-church-gold" />
                <span className="text-sm">Estimated Completion: 7-10 days</span>
              </div>
            </div>
          </div>
          
          {/* Plan Status Badge */}
          <div className="mt-4 lg:mt-0 lg:text-right">
            <div className="bg-church-gold/20 backdrop-blur-sm border border-church-gold/30 rounded-2xl p-4">
              <div className="text-church-gold font-semibold text-lg">Advanced Legal Plan</div>
              <div className="text-church-light-blue text-sm">$2,500 • Comprehensive Package</div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm">Active & In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}