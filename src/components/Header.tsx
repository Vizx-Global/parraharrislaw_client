import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/Parra_Harris-Final.png"; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        setIsScrolled(window.scrollY > heroHeight - 100);
      } else {
        setIsScrolled(window.scrollY > window.innerHeight - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Practice Areas", href: "#practice-areas" },
    { label: "Attorneys", href: "#attorney" },
    { label: "About Us", href: "#about" },
    { label: "Resources", href: "#resources" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-church-navy shadow-lg' 
        : 'bg-transparent backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <a href="#home" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="Parra Harris Law"
              className="h-32 w-32 object-contain transition-transform group-hover:scale-110"
            />
            {/* <span className={`text-xl font-bold tracking-tight transition-colors duration-500 ${
              isScrolled ? 'text-white' : 'text-white drop-shadow-lg'
            }`}>
              Parra Harris Law
            </span> */}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-all duration-300 text-sm font-medium tracking-wide relative py-2 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                  isScrolled 
                    ? 'text-white/90 hover:text-white after:bg-white' 
                    : 'text-white/90 hover:text-secondary after:bg-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className={`font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                isScrolled
                  ? 'bg-secondary hover:bg-secondary/90 text-white border border-secondary'
                  : 'bg-secondary hover:bg-secondary/70 text-white border border-white/30 backdrop-blur-sm'
              }`}
            >
              <a href="#donate">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors backdrop-blur-sm ${
              isScrolled 
                ? 'text-white hover:bg-white/10' 
                : 'text-white hover:bg-white/10'
            }`}
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
            <div className={`py-6 space-y-1 border-t rounded-b-2xl ${
              isScrolled
                ? 'bg-church-navy border-white/20'
                : 'bg-black/80 backdrop-blur-xl border-white/20'
            }`}>
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
                  className={`w-full font-medium py-3 rounded-full transition-all duration-300 ${
                    isScrolled
                      ? 'bg-secondary hover:bg-secondary/90 text-white'
                      : 'bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm'
                  }`}
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