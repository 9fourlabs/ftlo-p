'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LovedOneStep } from './steps/LovedOneStep';
import { FamilyStep } from './steps/FamilyStep';
import { ServiceStep } from './steps/ServiceStep';
import { PhotoUploadStep } from './steps/PhotoUploadStep';
import { TimelineStep } from './steps/TimelineStep';
import { ObituaryStep } from './steps/ObituaryStep';
import { TemplateSelectStep } from './steps/TemplateSelectStep';

const steps = [
  { id: 'loved-one', title: 'About Your Loved One', component: LovedOneStep },
  { id: 'family', title: 'Family Information', component: FamilyStep },
  { id: 'service', title: 'Service Details', component: ServiceStep },
  { id: 'photos', title: 'Photos & Memories', component: PhotoUploadStep },
  { id: 'timeline', title: 'Order of Service', component: TimelineStep },
  { id: 'obituary', title: 'Life Story', component: ObituaryStep },
  { id: 'template', title: 'Choose Template', component: TemplateSelectStep },
];

export type ProgramData = {
  // Loved One Information
  firstName: string;
  lastName: string;
  middleName?: string;
  nickname?: string;
  birthDate?: string;
  deathDate?: string;
  birthPlace?: string;
  deathPlace?: string;
  
  // Family Information
  familyMembers: Array<{
    id: string;
    name: string;
    relationship: string;
    isDeceased: boolean;
  }>;
  
  // Service Details
  serviceName?: string;
  serviceDate?: string;
  serviceTime?: string;
  venue?: string;
  venueAddress?: string;
  officiant?: string;
  additionalInfo?: string;
  
  // Photos
  photos: Array<{
    id: string;
    url: string;
    caption?: string;
    isPrimary: boolean;
  }>;
  
  // Timeline/Order of Service
  timeline: Array<{
    id: string;
    time?: string;
    title: string;
    description?: string;
    participants?: string;
  }>;
  
  // Obituary
  obituary?: string;
  favoriteMemories?: string;
  
  // Template
  selectedTemplate: string;
  accentColor?: string;
  font?: string;
};

interface MultiStepProgramFormProps {
  programId?: string;
  initialData?: Partial<ProgramData>;
}

export function MultiStepProgramForm({ programId, initialData }: MultiStepProgramFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const [formData, setFormData] = useState<ProgramData>({
    firstName: '',
    lastName: '',
    familyMembers: [],
    photos: [],
    timeline: [],
    selectedTemplate: 'classic-elegance',
    ...initialData,
  });

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (programId && formData.firstName && formData.lastName) {
        handleAutoSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(saveTimer);
  }, [formData, programId]);

  const handleAutoSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/programs/${programId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    try {
      const url = programId ? `/api/programs/${programId}` : '/api/programs';
      const method = programId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, isDraft: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to save draft');
      }

      const program = await response.json();
      if (!programId) {
        router.push(`/dashboard/edit/${program.id}`);
      } else {
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const url = programId ? `/api/programs/${programId}` : '/api/programs';
      const method = programId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, isDraft: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to create program');
      }

      const program = await response.json();
      router.push(`/dashboard/preview/${program.id}`);
    } catch (error) {
      console.error('Error creating program:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (stepData: Partial<ProgramData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const StepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{steps[currentStep].title}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Navigation Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {steps.map((step, index) => (
          <Button
            key={step.id}
            variant={index === currentStep ? 'default' : index < currentStep ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => goToStep(index)}
            disabled={index > currentStep && !formData.firstName}
          >
            {index + 1}. {step.title}
          </Button>
        ))}
      </div>

      {/* Current Step */}
      <Card>
        <CardContent className="p-6">
          <StepComponent 
            data={formData} 
            updateData={updateFormData}
          />
        </CardContent>
      </Card>

      {/* Navigation and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <div className="flex gap-2 order-2 sm:order-1">
          <Button
            variant="outline"
            onClick={() => goToStep(currentStep - 1)}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => goToStep(currentStep + 1)}
              disabled={!formData.firstName || !formData.lastName}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={isLoading || !formData.firstName || !formData.lastName}
            >
              {isLoading ? 'Creating...' : 'Create Program'}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4 order-1 sm:order-2">
          {lastSaved && (
            <span className="text-sm text-muted-foreground">
              Last saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
          {isSaving && (
            <span className="text-sm text-muted-foreground">Saving...</span>
          )}
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isLoading || isSaving || !formData.firstName}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        </div>
      </div>
    </div>
  );
}