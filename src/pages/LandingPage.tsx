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
    <div className="min-h-screen">
      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-40">
          <div 
            className="absolute inset-0"
            style={{
              background: `var(--gradient-mesh)`
            }}
          />
          
          {/* Minimal floating elements */}
          <motion.div
            style={{ 
              y: y1,
              background: 'radial-gradient(circle, hsla(15,60%,60%,0.08) 0%, transparent 70%)',
            }}
            className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full"
          />
          <motion.div
            style={{ 
              y: y2,
              background: 'radial-gradient(circle, hsla(240,30%,70%,0.05) 0%, transparent 70%)',
            }}
            className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full"
          />
        </div>
        
        {/* Professional Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10 text-center max-w-4xl"
        >
          {/* Professional Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-muted/50 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-border/50 backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            Professional memorial programs made simple
          </motion.div>
          
          {/* Clean Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-display mb-6"
          >
            Honor Their{" "}
            <span className="gradient-text-primary font-serif italic">Legacy</span>
            {" "}With Dignity
          </motion.h1>
          
          {/* Professional Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-body-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Create meaningful, professional memorial programs that celebrate a life well-lived. 
            Elegant design meets thoughtful functionality.
          </motion.p>
          
          {/* Professional CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <Link to="/create">
                Create Memorial Program
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="h-12 px-8 font-medium border-border hover:bg-muted rounded-lg transition-all"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Play className="mr-2 w-4 h-4" />
              Watch Demo
            </Button>
          </motion.div>
          
          {/* Clean Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ opacity }}
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              No account needed
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 text-primary mr-2" />
              Professional quality
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-blue-600 mr-2" />
              Ready in minutes
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Professional Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-headline mb-4 text-foreground">
              Everything you need for a beautiful tribute
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
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
                <div className="card-modern p-6 h-full group hover:shadow-lg transition-all duration-200">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-title mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Professional Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-headline text-foreground mb-4">
              Ready to honor their memory?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Create a meaningful tribute that celebrates their life, legacy, and the love they shared.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-10 font-medium text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/create">
                  Begin Creating Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
            
            <p className="text-muted-foreground text-sm mt-6">
              Free to start • No account required • Professional results
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}