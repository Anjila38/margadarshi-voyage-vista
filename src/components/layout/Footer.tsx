
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-green text-off-white pt-16 pb-8">
      <div className="container-custom">
        {/* Footer main sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-sand-gold flex items-center justify-center">
                <span className="text-off-black font-bold text-xl">M</span>
              </div>
              <span className="text-off-white font-serif text-2xl font-bold tracking-wider">
                MargaDarshi
              </span>
            </div>
            <p className="text-muted-blue text-sm">
              Your trusted guide to extraordinary travel experiences across the globe. 
              Discover, explore, and journey with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-sand-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-sand-gold transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-sand-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-sand-gold transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4 text-sand-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="hover:text-sand-gold transition-colors text-sm">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-sand-gold transition-colors text-sm">
                  Flights
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-sand-gold transition-colors text-sm">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-sand-gold transition-colors text-sm">
                  Travel Packages
                </Link>
              </li>
              <li>
                <Link to="/agencies" className="hover:text-sand-gold transition-colors text-sm">
                  Travel Agencies
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-sand-gold transition-colors text-sm">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4 text-sand-gold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="hover:text-sand-gold transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sand-gold transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sand-gold transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-sand-gold transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-sand-gold transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-sand-gold transition-colors text-sm">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4 text-sand-gold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-muted-blue flex-shrink-0 mt-1" />
                <span className="text-sm">123 Travel Avenue, Journey City, World 54321</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-muted-blue flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-muted-blue flex-shrink-0" />
                <span className="text-sm">info@margadarshi.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-b border-muted-blue/30 my-8 py-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-serif text-xl font-semibold mb-2 text-sand-gold">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-muted-blue text-sm mb-4">
              Stay updated with travel tips, exclusive offers, and destination insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md bg-off-white/10 border border-muted-blue/30 focus:outline-none focus:border-sand-gold"
              />
              <button className="bg-sand-gold hover:bg-copper text-off-black font-medium px-6 py-2 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-muted-blue text-sm">
          <p>&copy; {currentYear} MargaDarshi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
