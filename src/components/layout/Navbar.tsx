
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Destinations", href: "/destinations" },
    { name: "Flights", href: "/flights" },
    { name: "Hotels", href: "/hotels" },
    { name: "Packages", href: "/packages" },
    { name: "Travel Agencies", href: "/agencies" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white bg-opacity-90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            aria-label="MargaDarshi"
          >
            <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
              <span className="text-off-white font-bold text-xl">M</span>
            </div>
            <span className="text-forest-green font-serif text-2xl font-bold tracking-wider">
              MargaDarshi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-forest-green hover:text-teal transition-colors duration-300 link-underline font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="text-forest-green hover:text-teal hover:bg-cream transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-forest-green text-forest-green hover:bg-forest-green hover:text-off-white transition-colors"
            >
              Login
            </Button>
            <Button className="bg-forest-green text-off-white hover:bg-teal transition-colors">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="text-forest-green hover:text-teal hover:bg-cream transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="text-forest-green hover:text-teal hover:bg-cream transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-off-white p-4 rounded-lg shadow-lg animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-forest-green hover:text-teal transition-colors duration-300 py-2 border-b border-cream"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant="outline"
                  className="border-forest-green text-forest-green hover:bg-forest-green hover:text-off-white transition-colors"
                >
                  Login
                </Button>
                <Button className="bg-forest-green text-off-white hover:bg-teal transition-colors">
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
