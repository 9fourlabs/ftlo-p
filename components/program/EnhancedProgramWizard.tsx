'use client';

import { useState } from 'react';
import { AIAssistedProgramForm } from '@/components/program/AIAssistedProgramForm';
import { FamilyInformationForm, FamilyData } from '@/components/program/FamilyInformationForm';
import { ProfessionalTemplateSelect } from '@/components/program/ProfessionalTemplateSelect';
import { AIObituaryGenerator } from '@/components/program/AIObituaryGenerator';
import { ServiceTimelineBuilder } from '@/components/program/ServiceTimelineBuilder';
import { LiveProgramEditor } from '@/components/program/LiveProgramEditor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Save, Eye, Download } from 'lucide-react';
import { format } from 'date-fns';

type Step = 'story' | 'family' | 'service' | 'template' | 'obituary' | 'timeline' | 'preview';

interface CompleteProgramData {
  // Basic info
  lovedOneStory: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nickname: string;
  birthDate: Date | null;
  deathDate: Date | null;
  birthPlace: string;
  deathPlace: string;
  
  // Family information
  family: FamilyData;
  
  // Service details
  serviceName: string;
  serviceDate: Date | null;
  serviceTime: string;
  venue: string;
  venueAddress: string;
  officiant: string;
  additionalInfo: string;
  
  // Template and content
  selectedTemplate: string;
  obituary: string;
  aiGeneratedObituary: string;
  
  // Service timeline
  serviceEvents: Array<{
    id: string;
    type: string;
    title: string;
    description?: string;
    performer?: string;
    duration?: number;
  }>;
  
  // Photos
  photos: Array<{
    url: string;
    isPrimary: boolean;
    caption?: string;
  }>;
}

export default function EnhancedProgramWizard() {
  const [currentStep, setCurrentStep] = useState<Step>('story');
  const [programData, setProgramData] = useState<CompleteProgramData>({
    lovedOneStory: '',
    firstName: '',
    middleName: '',
    lastName: '',
    nickname: '',
    birthDate: null,
    deathDate: null,
    birthPlace: '',
    deathPlace: '',
    family: {
      spouse: '',
      children: [],
      grandchildrenCount: 0,
      greatGrandchildrenCount: 0,
      siblings: [],
      parents: [],
      otherFamily: [],
      pallbearers: [],
      honoraryPallbearers: [],
    },
    serviceName: '',
    serviceDate: null,
    serviceTime: '',
    venue: '',
    venueAddress: '',
    officiant: '',
    additionalInfo: '',
    selectedTemplate: 'classic-elegance',
    obituary: '',
    aiGeneratedObituary: '',
    serviceEvents: [],
    photos: [],
  });

  const steps: { id: Step; title: string; description: string }[] = [
    { id: 'story', title: 'Tell Their Story', description: 'Share memories and basic information' },
    { id: 'family', title: 'Family Information', description: 'Add family members and relationships' },
    { id: 'service', title: 'Service Details', description: 'When and where the service will be held' },
    { id: 'template', title: 'Choose Design', description: 'Select a professional template' },
    { id: 'obituary', title: 'Create Obituary', description: 'AI-powered obituary writing' },
    { id: 'timeline', title: 'Service Order', description: 'Plan the memorial service' },
    { id: 'preview', title: 'Preview & Save', description: 'Review and finalize your program' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleStoryAndBasicInfo = (data: any) => {
    setProgramData({ ...programData, ...data });
    setCurrentStep('family');
  };

  const handleFamilyInfo = (familyData: FamilyData) => {
    setProgramData({ ...programData, family: familyData });
    setCurrentStep('service');
  };

  const handleNext = () => {
    const stepOrder: Step[] = ['story', 'family', 'service', 'template', 'obituary', 'timeline', 'preview'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ['story', 'family', 'service', 'template', 'obituary', 'timeline', 'preview'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSave = async () => {
    // Transform data for database
    const dbData = {
      ...programData,
      birthDate: programData.birthDate ? format(programData.birthDate, 'yyyy-MM-dd') : '',
      deathDate: programData.deathDate ? format(programData.deathDate, 'yyyy-MM-dd') : '',
      serviceDate: programData.serviceDate ? format(programData.serviceDate, 'yyyy-MM-dd') : '',
      lifeHighlights: JSON.stringify([]), // Will be populated from AI
      favoriteMemories: programData.lovedOneStory,
    };

    // Save to database
    console.log('Saving program:', dbData);
    // TODO: Call API to save program
  };

  // Generate template variables for live preview
  const getTemplateVariables = () => {
    const fullName = [programData.firstName, programData.middleName, programData.lastName]
      .filter(Boolean)
      .join(' ');
    
    const lifeSpan = programData.birthDate && programData.deathDate
      ? `${format(programData.birthDate, 'MMMM d, yyyy')} - ${format(programData.deathDate, 'MMMM d, yyyy')}`
      : '';
    
    return {
      deceased: {
        fullName,
        firstName: programData.firstName,
        lastName: programData.lastName,
        nickname: programData.nickname,
        birthDate: programData.birthDate ? format(programData.birthDate, 'MMMM d, yyyy') : '',
        deathDate: programData.deathDate ? format(programData.deathDate, 'MMMM d, yyyy') : '',
        lifeSpan,
        birthPlace: programData.birthPlace,
        deathPlace: programData.deathPlace,
      },
      family: {
        spouse: programData.family.spouse,
        children: programData.family.children,
        childrenList: programData.family.children.join(', '),
        grandchildrenCount: programData.family.grandchildrenCount,
        greatGrandchildrenCount: programData.family.greatGrandchildrenCount,
        survivingFamily: [
          programData.family.spouse && `Beloved ${programData.family.spouse.includes('husband') ? 'husband' : 'wife'}, ${programData.family.spouse}`,
          programData.family.children.length > 0 && `Children: ${programData.family.children.join(', ')}`,
          programData.family.grandchildrenCount > 0 && `${programData.family.grandchildrenCount} grandchildren`,
          programData.family.greatGrandchildrenCount > 0 && `${programData.family.greatGrandchildrenCount} great-grandchildren`,
        ].filter(Boolean).join('; '),
      },
      service: {
        type: programData.serviceName || 'Memorial Service',
        date: programData.serviceDate ? format(programData.serviceDate, 'EEEE, MMMM d, yyyy') : '',
        time: programData.serviceTime,
        dateTime: `${programData.serviceDate ? format(programData.serviceDate, 'EEEE, MMMM d, yyyy') : ''} at ${programData.serviceTime}`,
        venue: programData.venue,
        address: programData.venueAddress,
        officiant: programData.officiant,
      },
      pallbearers: programData.family.pallbearers,
      honoraryPallbearers: programData.family.honoraryPallbearers,
      obituary: programData.obituary || programData.aiGeneratedObituary,
      serviceOrder: programData.serviceEvents,
    };
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Memorial Program</h1>
        <p className="text-muted-foreground">
          A guided process to create a beautiful memorial program
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
        {currentStep === 'story' && (
          <AIAssistedProgramForm onSubmit={handleStoryAndBasicInfo} />
        )}

        {currentStep === 'family' && (
          <FamilyInformationForm
            onSubmit={handleFamilyInfo}
            initialData={programData.family}
          />
        )}

        {currentStep === 'service' && (
          <Card className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Service Details</h2>
                <p className="text-muted-foreground">
                  Information about the memorial service
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Service Type</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g., Memorial Service, Celebration of Life"
                    value={programData.serviceName}
                    onChange={(e) => setProgramData({ ...programData, serviceName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Officiant/Celebrant</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Name of person leading the service"
                    value={programData.officiant}
                    onChange={(e) => setProgramData({ ...programData, officiant: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md"
                    value={programData.serviceDate ? format(programData.serviceDate, 'yyyy-MM-dd') : ''}
                    onChange={(e) => setProgramData({ 
                      ...programData, 
                      serviceDate: e.target.value ? new Date(e.target.value) : null 
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Time</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g., 2:00 PM"
                    value={programData.serviceTime}
                    onChange={(e) => setProgramData({ ...programData, serviceTime: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Venue Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Church or venue name"
                    value={programData.venue}
                    onChange={(e) => setProgramData({ ...programData, venue: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Venue Address</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Full address"
                    value={programData.venueAddress}
                    onChange={(e) => setProgramData({ ...programData, venueAddress: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Additional Information</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                    placeholder="Reception details, special instructions, etc."
                    value={programData.additionalInfo}
                    onChange={(e) => setProgramData({ ...programData, additionalInfo: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
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
          <LiveProgramEditor
            templateId={programData.selectedTemplate}
            templateVariables={getTemplateVariables()}
            onSave={handleSave}
          />
        )}
      </div>

      {/* Navigation */}
      {currentStep !== 'story' && currentStep !== 'preview' && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {currentStep !== 'template' && currentStep !== 'obituary' && currentStep !== 'timeline' && (
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