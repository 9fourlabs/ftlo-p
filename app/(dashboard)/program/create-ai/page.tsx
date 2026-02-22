'use client';

import { useState } from 'react';
import { AIAssistedProgramForm } from '@/components/program/AIAssistedProgramForm';
import { ProfessionalTemplateSelect } from '@/components/program/ProfessionalTemplateSelect';
import { AIObituaryGenerator } from '@/components/program/AIObituaryGenerator';
import { ServiceTimelineBuilder } from '@/components/program/ServiceTimelineBuilder';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Save, Eye, Download } from 'lucide-react';

type Step = 'collect' | 'template' | 'obituary' | 'timeline' | 'preview';

export default function CreateAIProgramPage() {
  const [currentStep, setCurrentStep] = useState<Step>('collect');
  const [programData, setProgramData] = useState({
    // Basic info from AI form
    lovedOneStory: '',
    firstName: '',
    middleName: '',
    lastName: '',
    nickname: '',
    birthDate: null as Date | null,
    deathDate: null as Date | null,
    birthPlace: '',
    deathPlace: '',
    
    // Template
    selectedTemplate: '',
    
    // Generated content
    obituary: '',
    
    // Service timeline
    serviceEvents: [] as Array<{
      id: string;
      type: string;
      title: string;
      description?: string;
      performer?: string;
      duration?: number;
    }>,
  });

  const steps: { id: Step; title: string; description: string }[] = [
    { id: 'collect', title: 'Tell Their Story', description: 'Share memories and information' },
    { id: 'template', title: 'Choose Design', description: 'Select a professional template' },
    { id: 'obituary', title: 'Create Obituary', description: 'AI-powered obituary writing' },
    { id: 'timeline', title: 'Service Order', description: 'Plan the memorial service' },
    { id: 'preview', title: 'Preview & Save', description: 'Review your program' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleDataCollection = (data: any) => {
    setProgramData({ ...programData, ...data });
    setCurrentStep('template');
  };

  const handleNext = () => {
    const stepOrder: Step[] = ['collect', 'template', 'obituary', 'timeline', 'preview'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ['collect', 'template', 'obituary', 'timeline', 'preview'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSave = async () => {
    // Save to database
    console.log('Saving program:', programData);
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Memorial Program</h1>
        <p className="text-muted-foreground">
          Let AI help you create a beautiful memorial program to honor your loved one
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <Progress value={progress} className="h-2 mb-4" />
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                index <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                index <= currentStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                {index + 1}
              </div>
              <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 'collect' && (
          <AIAssistedProgramForm onSubmit={handleDataCollection} />
        )}

        {currentStep === 'template' && (
          <ProfessionalTemplateSelect
            selectedTemplate={programData.selectedTemplate}
            onSelectTemplate={(id) => setProgramData({ ...programData, selectedTemplate: id })}
            onContinue={handleNext}
          />
        )}

        {currentStep === 'obituary' && (
          <AIObituaryGenerator
            lovedOneStory={programData.lovedOneStory}
            basicInfo={{
              firstName: programData.firstName,
              middleName: programData.middleName,
              lastName: programData.lastName,
              nickname: programData.nickname,
              birthDate: programData.birthDate!,
              deathDate: programData.deathDate!,
              birthPlace: programData.birthPlace,
              deathPlace: programData.deathPlace,
            }}
            onUpdate={(obituary) => setProgramData({ ...programData, obituary })}
          />
        )}

        {currentStep === 'timeline' && (
          <ServiceTimelineBuilder
            events={programData.serviceEvents}
            onUpdate={(events) => setProgramData({ ...programData, serviceEvents: events })}
          />
        )}

        {currentStep === 'preview' && (
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold">Review & Finalize Your Program</h2>
            <p className="text-muted-foreground">
              Make any final adjustments before saving or printing
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      {currentStep !== 'collect' && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {currentStep !== 'preview' && currentStep !== 'template' && (
            <Button onClick={handleNext}>
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}