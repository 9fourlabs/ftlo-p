import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/create', label: 'Create Program' },
    { href: '/templates', label: 'Templates' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full glass-header border-0"
      >
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Heart className="h-5 w-5 text-white fill-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full opacity-70 group-hover:opacity-90 transition-opacity" />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-display text-gray-900 group-hover:gradient-text-primary transition-all">
                Memorial
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wide">
                PROGRAMS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Link 
                  to={item.href} 
                  className="relative text-sm font-medium text-gray-600 hover:text-gray-900 transition-all duration-200 group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/create">
                <Button 
                  size="sm" 
                  className="btn-primary text-sm px-6 py-2 font-semibold group"
                >
                  <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                  Start Creating
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:hidden"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="glass-card border-0 hover:bg-white/80"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden glass-card border-0 border-t border-white/20 overflow-hidden"
          >
            <nav className="container py-6 space-y-4">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-medium text-gray-700 hover:text-gray-900 hover:gradient-text-primary transition-all py-2"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigationItems.length * 0.1 }}
                className="pt-4 border-t border-white/20"
              >
                <Link to="/create" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button 
                    size="lg" 
                    className="btn-primary w-full text-lg py-4 font-semibold"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Creating
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}