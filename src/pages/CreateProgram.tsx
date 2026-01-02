import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-gray-700">
              <Heart className="h-5 w-5 text-white fill-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create Memorial Program
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Honor your loved one with a beautiful, personalized program
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Step {currentStep + 1} of {steps.length}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {isAutoSaving && (
                <>
                  <Save className="h-4 w-4 animate-pulse" />
                  <span>Auto-saving...</span>
                </>
              )}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Step Navigation - Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                      index === currentStep
                        ? 'bg-gray-900 text-white'
                        : index < currentStep
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => handleStepClick(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      index === currentStep
                        ? 'bg-white text-gray-900'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {step.title}
                      </p>
                      <p className="text-xs opacity-70 truncate">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="min-h-[600px]">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      {steps[currentStep].title}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      {steps[currentStep].description}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {currentStep + 1} of {steps.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CurrentStepComponent />
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="flex items-center space-x-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Draft</span>
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download Program</span>
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="flex items-center space-x-2"
                  >
                    <span>Continue</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}