import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Download, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Clock,
  Play,
  Award,
  Palette,
  Zap
} from 'lucide-react';

export function LandingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Glass Morphism */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-purple-50">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(at 20% 80%, hsla(15,100%,70%,0.3) 0px, transparent 60%),
                radial-gradient(at 80% 20%, hsla(200,50%,70%,0.2) 0px, transparent 60%),
                radial-gradient(at 40% 40%, hsla(270,95%,75%,0.15) 0px, transparent 60%)
              `
            }}
          />
          
          {/* Animated floating elements */}
          <motion.div
            style={{ 
              y: y1,
              background: 'linear-gradient(135deg, hsla(15,100%,70%,0.1) 0%, transparent 50%)',
              filter: 'blur(40px)',
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          />
          <motion.div
            style={{ 
              y: y2,
              background: 'linear-gradient(135deg, hsla(270,95%,75%,0.1) 0%, transparent 50%)',
              filter: 'blur(60px)',
            }}
            className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full"
          />
        </div>
        
        {/* Glass Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center glass-card px-6 py-3 rounded-full text-sm font-medium mb-8 border"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse" />
            <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
            Professional memorial programs made simple
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-display mb-8"
          >
            <span className="block">Honor Their</span>
            <span className="block gradient-text-primary font-serif italic">Legacy</span>
            <span className="block">With Dignity</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Create meaningful, professional memorial programs that celebrate a life well-lived. 
            Our compassionate platform combines elegant design with thoughtful functionality.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="cluster justify-center mb-16"
          >
            <Button 
              asChild 
              size="lg" 
              className="btn-primary text-lg px-10 py-6 font-semibold"
            >
              <Link to="/create">
                Create Memorial Program
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="btn-glass text-lg px-10 py-6 font-semibold"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ opacity }}
            className="cluster justify-center text-sm text-gray-500"
          >
            <div className="flex items-center glass-card px-4 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              No account needed
            </div>
            <div className="flex items-center glass-card px-4 py-2 rounded-lg">
              <Award className="w-4 h-4 text-orange-500 mr-2" />
              Professional quality
            </div>
            <div className="flex items-center glass-card px-4 py-2 rounded-lg">
              <Zap className="w-4 h-4 text-blue-500 mr-2" />
              Ready in minutes
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section - Elevated Design */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-headline mb-6 gradient-text-secondary">
              Everything you need for a beautiful tribute
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thoughtfully designed tools that help you create meaningful memorials with ease and elegance
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Heart,
                title: "Compassionate Design",
                description: "Beautiful, respectful templates crafted with sensitivity and care",
                color: "from-red-400 to-pink-500"
              },
              {
                icon: Palette,
                title: "Professional Templates",
                description: "Elegant layouts designed by professionals for both digital and print",
                color: "from-purple-400 to-indigo-500"
              },
              {
                icon: Clock,
                title: "Quick Creation",
                description: "Intuitive workflow that guides you through creation in minutes",
                color: "from-blue-400 to-cyan-500"
              },
              {
                icon: Download,
                title: "Instant Download",
                description: "High-resolution PDF ready for professional printing",
                color: "from-green-400 to-emerald-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-modern card-interactive p-8 h-full group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-spring`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-title mb-4 group-hover:gradient-text-primary transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-body leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Final CTA - Gradient Masterpiece */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, 
                hsla(15, 100%, 60%, 0.95) 0%, 
                hsla(25, 95%, 65%, 0.9) 35%,
                hsla(270, 95%, 75%, 0.85) 100%
              )
            `
          }}
        />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-white/10 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-white/10 blur-3xl"
          />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-headline text-white mb-6">
              Ready to honor their memory?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Create a meaningful tribute that celebrates their life, legacy, and the love they shared. 
              Start your memorial program today.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-50 text-xl px-12 py-6 font-semibold shadow-2xl border-0 transition-all duration-300"
              >
                <Link to="/create">
                  Begin Creating Now
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
            </motion.div>
            
            <p className="text-white/80 text-sm mt-6">
              Free to start • No account required • Professional results guaranteed
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}