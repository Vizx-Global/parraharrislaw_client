import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/Parra_Harris-Final.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Practice Areas", href: "#practice-areas" },
    { label: "Attorneys", href: "#attorneys" },
    { label: "About Us", href: "#about" },
    { label: "Resources", href: "#resources" },
    { label: "Blog", href: "#blog" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      // Smooth scroll for anchor links
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Use navigate for route changes
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleGetStartedClick = () => {
    navigate("/sign-up");
    setIsMenuOpen(false);
  };

  return (
    <header 
      className="fixed top-0 w-full z-50 bg-church-navy shadow-2xl"
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo & Brand */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 group"
            aria-label="Parra Harris Law - Home"
          >
            <img
              src={logo}
              alt="Parra Harris Law"
              className="h-32 w-32 lg:h-32 lg:w-32 object-contain transition-transform duration-300 group-hover:scale-105"
              loading="eager"
            />
          </button>

          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex items-center space-x-1"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => handleNavClick(item.href)}
                className="font-medium px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 text-white/90 hover:text-white hover:bg-white/10"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Phone Button */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="font-medium px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 text-white/90 hover:text-white hover:bg-white/10"
            >
              <a href="tel:904-900-1617">
                <Phone className="w-4 h-4 mr-2" />
                (904) 900-1617
              </a>
            </Button>

            {/* Get Started Button */}
            <Button
              onClick={handleGetStartedClick}
              className="font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-church-gold to-amber-500 hover:from-amber-500 hover:to-church-gold text-white shadow-lg"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 rounded-xl transition-all duration-300 text-white hover:bg-white/10 hover:scale-105"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="py-4 space-y-2 border-t border-white/20 rounded-b-2xl bg-church-navy">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => handleNavClick(item.href)}
                  className="w-full justify-start px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 font-normal transition-all duration-200 rounded-lg"
                >
                  {item.label}
                </Button>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="px-4 pt-2 space-y-3">
                {/* Phone Button */}
                <Button
                  variant="ghost"
                  className="w-full justify-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 font-medium transition-all duration-200 rounded-lg"
                  asChild
                >
                  <a href="tel:904-900-1617">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </a>
                </Button>

                {/* Get Started Button */}
                <Button
                  onClick={handleGetStartedClick}
                  className="w-full bg-gradient-to-r from-church-gold to-amber-500 hover:from-amber-500 hover:to-church-gold text-white font-semibold py-3 rounded-full transition-all duration-300 hover:shadow-xl"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;