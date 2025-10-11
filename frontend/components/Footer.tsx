import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Send,
  ArrowRight
} from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const productLinks = [
    { label: 'Earphones', href: '/products/earphones' },
    { label: 'Headphones', href: '/products/headphones' },
    { label: 'Smartphones', href: '/products/smartphones' },
    { label: 'Laptops', href: '/products/laptops' },
    { label: 'Smart Watches', href: '/products/watches' },
    { label: 'Accessories', href: '/products/accessories' }
  ];

  const websiteLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Become Plus Member', href: '/membership' },
    { label: 'Create Your Store', href: '/create-store' }
  ];

  const supportLinks = [
    { label: 'Help Center', href: '/help' },
    { label: 'Track Order', href: '/track' },
    { label: 'Returns', href: '/returns' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'FAQs', href: '/faq' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
    { icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
    { icon: Linkedin, href: '#', color: 'hover:bg-blue-700' }
  ];

  return (
    <footer className={`bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 text-gray-300 ${className}`}>
      {/* Newsletter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                Subscribe to our Newsletter
              </h3>
              <p className="text-gray-400">
                Get the latest updates on new products and upcoming sales
              </p>
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-6 py-4 bg-gray-100 border border-gray-700 rounded-xl text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
      </div>



      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="text-3xl font-bold">
                <span className="text-emerald-500">go</span>
                <span className="text-gray-600">cart</span>
                <span className="text-emerald-500">.</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Welcome to gocart, your ultimate destination for the latest and smartest gadgets. 
              From smartphones and smartwatches to essential accessories, we bring you the best 
              in innovation — all in one place.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className={`w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-gray-600 font-bold text-lg mb-5 flex items-center">
              PRODUCTS
              <div className="ml-3 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-500 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Website */}
          <div>
            <h4 className="text-gray-600 font-bold text-lg mb-5 flex items-center">
              WEBSITE
              <div className="ml-3 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {websiteLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-500 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-600 font-bold text-lg mb-5 flex items-center">
              SUPPORT
              <div className="ml-3 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></div>
            </h4>
            <ul className="space-y-3 mb-6">
              {supportLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-500 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t border-gray-400">
              <a href="tel:+12124567890" className="flex items-center space-x-3 text-gray-400 hover:text-emerald-500 transition-colors group">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+1-212-456-7890</span>
              </a>
              
              <a href="mailto:contact@gocart.com" className="flex items-center space-x-3 text-gray-400 hover:text-emerald-500 transition-colors group">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">contact@gocart.com</span>
              </a>
              
              <div className="flex items-start space-x-3 text-gray-400">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">794 Francisco, 94102<br />San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-1/2 border-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              Copyright 2025 © <span className="text-emerald-500 font-semibold">gocart</span> All Right Reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-emerald-500 transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-700">|</span>
              <a href="/terms" className="text-gray-400 hover:text-emerald-500 transition-colors">
                Terms of Service
              </a>
              <span className="text-gray-700">|</span>
              <a href="/cookies" className="text-gray-400 hover:text-emerald-500 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;