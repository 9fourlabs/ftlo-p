import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Eye } from 'lucide-react';
import { useProgramStore } from '../store/programStore';
import { LovedOneStep } from '../components/steps/LovedOneStep';
import { FamilyStep } from '../components/steps/FamilyStep';
import { ServiceStep } from '../components/steps/ServiceStep';
import { PhotoUploadStep } from '../components/steps/PhotoUploadStep';
import { TimelineStep } from '../components/steps/TimelineStep';
import { ObituaryStep } from '../components/steps/ObituaryStep';
import { TemplateSelectStep } from '../components/steps/TemplateSelectStep';
import { ClassicEleganceTemplate } from '../components/templates/ClassicEleganceTemplate';
import { useState } from 'react';

const STEPS = [
  { title: 'Loved One', component: LovedOneStep },
  { title: 'Family', component: FamilyStep },
  { title: 'Service', component: ServiceStep },
  { title: 'Photos', component: PhotoUploadStep },
  { title: 'Timeline', component: TimelineStep },
  { title: 'Obituary', component: ObituaryStep },
  { title: 'Template', component: TemplateSelectStep },
];

export function CreateProgram() {
  const { currentStep, setStep } = useProgramStore();
  const [showPreview, setShowPreview] = useState(false);
  
  const CurrentStepComponent = STEPS[currentStep]?.component;
  
  if (showPreview) {
    return (
      <div className="min-h-screen bg-cream-200 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => setShowPreview(false)}
              className="flex items-center gap-2 px-4 py-2 text-navy-700 
                         hover:text-navy-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Editor
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="px-6 py-2 bg-navy-800 text-cream-100 rounded-lg 
                           font-body font-medium hover:bg-navy-700 
                           transition-colors shadow-lg"
              >
                Print Program
              </button>
              <button
                className="px-6 py-2 bg-gold-500 text-white rounded-lg 
                           font-body font-medium hover:bg-gold-600 
                           transition-colors shadow-lg"
              >
                Export PDF
              </button>
            </div>
          </div>
          
          <ClassicEleganceTemplate />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-cream-200">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-cream-300">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl text-navy-800">
                Funeral Program Builder
              </h1>
              <p className="font-body text-navy-600 text-sm">
                Create a beautiful memorial program in minutes
              </p>
            </div>
            
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 bg-cream-200 
                         hover:bg-cream-300 text-navy-700 rounded-lg 
                         transition-colors font-body"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white border-b border-cream-300">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-body text-sm text-navy-600">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="font-body text-sm text-navy-600">
              {Math.round(((currentStep + 1) / STEPS.length) * 100)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-cream-200 rounded-full h-2">
            <motion.div
              className="bg-gold-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          
          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {STEPS.map((step, index) => (
              <button
                key={step.title}
                onClick={() => setStep(index)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  index <= currentStep ? 'text-navy-800' : 'text-navy-400'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${
                  index < currentStep 
                    ? 'bg-gold-500' 
                    : index === currentStep 
                    ? 'bg-navy-800' 
                    : 'bg-cream-400'
                }`} />
                <span className="text-xs font-body">{step.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {CurrentStepComponent && (
            <CurrentStepComponent key={currentStep} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}