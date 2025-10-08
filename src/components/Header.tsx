import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/Parra_Harris-Final.png"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Practice Areas", href: "#practice-areas" },
    { label: "Attorneys", href: "#attorney" },
    { label: "About Us", href: "#about" },
    { label: "Resources", href: "#resources" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <header className="fixed top-0 w-full bg-transparent backdrop-blur-sm z-50 transition-all duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <a href="#home" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="Parra Harris Law"
              className="h-24 w-24 object-contain transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-bold text-white tracking-tight drop-shadow-lg">
              Parra Harri&apos;s Law
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white/90 hover:text-secondary transition-all duration-300 text-sm font-medium tracking-wide relative py-2 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
           <Button
            asChild
            className="bg-secondary hover:bg-secondary/70 text-white border border-white/30 backdrop-blur-sm font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
            <a href="#donate">Get Started</a>
           </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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
          <div className="lg:hidden animate-slide-down">
            <div className="py-6 space-y-1 border-t border-white/20 bg-black/80 backdrop-blur-xl rounded-b-2xl">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 font-normal transition-all duration-200 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-4">
                <Button
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm w-full font-medium py-3 rounded-full transition-all duration-300"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;