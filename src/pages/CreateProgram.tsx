import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Download, 
  Heart,
  User,
  Users,
  Calendar,
  Camera,
  Clock,
  FileText,
  Palette,
  CheckCircle
} from 'lucide-react';
import { useProgramStore } from '@/store/programStore';

// Import the old step components for now - we'll redesign these next
import { LovedOneStep } from '@/components/steps/LovedOneStep';
import { FamilyStep } from '@/components/steps/FamilyStep';
import { ServiceStep } from '@/components/steps/ServiceStep';
import { PhotoUploadStep } from '@/components/steps/PhotoUploadStep';
import { TimelineStep } from '@/components/steps/TimelineStep';
import { ObituaryStep } from '@/components/steps/ObituaryStep';
import { TemplateSelectStep } from '@/components/steps/TemplateSelectStep';

const steps = [
  {
    id: 0,
    title: 'About Your Loved One',
    description: 'Tell us about the person being honored',
    icon: <User className="h-5 w-5" />,
    component: LovedOneStep,
  },
  {
    id: 1,
    title: 'Family Information',
    description: 'Add family members and relationships',
    icon: <Users className="h-5 w-5" />,
    component: FamilyStep,
  },
  {
    id: 2,
    title: 'Service Details',
    description: 'When and where the service will be held',
    icon: <Calendar className="h-5 w-5" />,
    component: ServiceStep,
  },
  {
    id: 3,
    title: 'Photos & Memories',
    description: 'Upload meaningful photos',
    icon: <Camera className="h-5 w-5" />,
    component: PhotoUploadStep,
  },
  {
    id: 4,
    title: 'Order of Service',
    description: 'Create the timeline for the service',
    icon: <Clock className="h-5 w-5" />,
    component: TimelineStep,
  },
  {
    id: 5,
    title: 'Life Story',
    description: 'Share their story and achievements',
    icon: <FileText className="h-5 w-5" />,
    component: ObituaryStep,
  },
  {
    id: 6,
    title: 'Choose Template',
    description: 'Select a beautiful design',
    icon: <Palette className="h-5 w-5" />,
    component: TemplateSelectStep,
  },
];

export function CreateProgram() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const { program } = useProgramStore();

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  // Auto-save functionality
  useEffect(() => {
    const autoSave = async () => {
      if (program.firstName || program.lastName) {
        setIsAutoSaving(true);
        try {
          // Auto-save is handled by the store persistence
          setTimeout(() => setIsAutoSaving(false), 1000);
        } catch (error) {
          setIsAutoSaving(false);
        }
      }
    };

    const interval = setInterval(autoSave, 30000); // Auto-save every 30 seconds
    return () => clearInterval(interval);
  }, [program]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'linear-gradient(135deg, hsla(15,100%,70%,0.1) 0%, transparent 50%)',
            filter: 'blur(40px)',
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'linear-gradient(135deg, hsla(270,95%,75%,0.1) 0%, transparent 50%)',
            filter: 'blur(60px)',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-xl">
                <Heart className="h-8 w-8 text-white fill-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full shadow-md" />
            </div>
          </motion.div>
          <h1 className="text-display mb-4 gradient-text-primary">
            Create Memorial Program
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Honor your loved one with a beautiful, personalized program that celebrates their life and legacy
          </p>
        </motion.div>

        {/* Progress Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-title text-gray-900">
                  Step {currentStep + 1} of {steps.length}
                </h2>
                <p className="text-gray-600 mt-1">
                  {steps[currentStep].title}
                </p>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                {isAutoSaving && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 glass-card px-3 py-1 rounded-full"
                  >
                    <Save className="h-4 w-4 animate-pulse text-orange-500" />
                    <span>Auto-saving...</span>
                  </motion.div>
                )}
              </div>
            </div>
            <div className="progress-modern h-3 mb-2">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center">
              {Math.round(progress)}% complete
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Step Navigation - Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="card-modern glass-card sticky top-8 overflow-hidden">
              <CardHeader className="border-b border-white/20 bg-white/30">
                <CardTitle className="text-lg gradient-text-secondary">Steps Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`flex items-center space-x-3 p-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                      index === currentStep
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : index < currentStep
                        ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                        : 'bg-white/50 text-gray-600 hover:bg-white/80 border border-white/20'
                    }`}
                    onClick={() => handleStepClick(index)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                        index === currentStep
                          ? 'bg-white/20 text-white'
                          : index < currentStep
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                      }`}
                      whileHover={{ rotate: index === currentStep ? 5 : 0 }}
                    >
                      {index < currentStep ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        step.icon
                      )}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {step.title}
                      </p>
                      <p className="text-xs opacity-80 truncate">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="card-modern glass-card min-h-[700px] overflow-hidden">
              <CardHeader className="border-b border-white/20 bg-white/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-title text-gray-900">
                      {steps[currentStep].title}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      {steps[currentStep].description}
                    </p>
                  </div>
                  <div className="glass-card px-4 py-2 rounded-full">
                    <Badge variant="secondary" className="bg-transparent border-0 text-gray-600">
                      {currentStep + 1} of {steps.length}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <CurrentStepComponent />
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </div>

            {/* Navigation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center justify-between mt-8"
            >
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="btn-glass flex items-center space-x-2 px-6 py-3"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  className="btn-glass flex items-center space-x-2 px-6 py-3"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Draft</span>
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button className="btn-primary flex items-center space-x-2 px-8 py-3 text-base">
                    <Download className="h-5 w-5" />
                    <span>Download Program</span>
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="btn-primary flex items-center space-x-2 px-8 py-3 text-base"
                  >
                    <span>Continue</span>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}