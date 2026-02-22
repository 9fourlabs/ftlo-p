'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AIAssistedProgramFormProps {
  onSubmit: (data: any) => void;
}

export function AIAssistedProgramForm({ onSubmit }: AIAssistedProgramFormProps) {
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    // Initial free-form story
    lovedOneStory: '',
    
    // Basic information
    firstName: '',
    middleName: '',
    lastName: '',
    nickname: '',
    birthDate: null as Date | null,
    deathDate: null as Date | null,
    birthPlace: '',
    deathPlace: '',
    
    // Generated content
    obituaryText: '',
    lifeHighlights: [] as string[],
    
    // Service details
    serviceEvents: [] as Array<{
      type: string;
      description: string;
      performer?: string;
      duration?: string;
    }>,
  });

  const handleInitialStorySubmit = async () => {
    setIsProcessing(true);
    
    // Here we would call an AI API to extract structured data
    // For now, we'll move to the next step
    setTimeout(() => {
      setIsProcessing(false);
      setStep(1);
    }, 1500);
  };

  const prompts = [
    {
      title: "Tell me about your loved one",
      subtitle: "Share memories, stories, and what made them special",
      placeholder: "You can write freely here. Tell me about their life, their passions, what they loved, funny stories, their accomplishments, or anything else you'd like to share. Don't worry about structure - just write from your heart.",
    },
    {
      title: "Let's capture some important details",
      subtitle: "This helps us create a complete memorial program",
    },
    {
      title: "Plan the memorial service",
      subtitle: "Add events like eulogies, music, readings, and prayers",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step 0: Free-form story collection */}
      {step === 0 && (
        <Card className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{prompts[0].title}</h2>
              <p className="text-muted-foreground">{prompts[0].subtitle}</p>
            </div>
            
            <Textarea
              value={formData.lovedOneStory}
              onChange={(e) => setFormData({ ...formData, lovedOneStory: e.target.value })}
              placeholder={prompts[0].placeholder}
              className="min-h-[300px] text-lg leading-relaxed"
            />
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Write as much or as little as you'd like
              </p>
              
              <Button 
                onClick={handleInitialStorySubmit}
                disabled={!formData.lovedOneStory.trim() || isProcessing}
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <Sparkles className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <Card className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{prompts[1].title}</h2>
              <p className="text-muted-foreground">{prompts[1].subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="First name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  placeholder="Middle name (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Last name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  placeholder="Nickname (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.birthDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.birthDate ? format(formData.birthDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.birthDate}
                      onSelect={(date) => setFormData({ ...formData, birthDate: date || null })}
                      initialFocus
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Date of Passing</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.deathDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deathDate ? format(formData.deathDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.deathDate}
                      onSelect={(date) => setFormData({ ...formData, deathDate: date || null })}
                      initialFocus
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthPlace">Place of Birth</Label>
                <Input
                  id="birthPlace"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  placeholder="City, State/Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deathPlace">Place of Passing</Label>
                <Input
                  id="deathPlace"
                  value={formData.deathPlace}
                  onChange={(e) => setFormData({ ...formData, deathPlace: e.target.value })}
                  placeholder="City, State/Country"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button 
                onClick={() => setStep(2)}
                disabled={!formData.firstName || !formData.lastName}
              >
                Continue
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 2: Service Events */}
      {step === 2 && (
        <Card className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{prompts[2].title}</h2>
              <p className="text-muted-foreground">{prompts[2].subtitle}</p>
            </div>

            <div className="space-y-4">
              {formData.serviceEvents.map((event, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{event.type}</h4>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      {event.performer && (
                        <p className="text-sm mt-1">By: {event.performer}</p>
                      )}
                      {event.duration && (
                        <p className="text-sm">Duration: {event.duration}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newEvents = formData.serviceEvents.filter((_, i) => i !== index);
                        setFormData({ ...formData, serviceEvents: newEvents });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}

              <Card className="p-4 border-dashed">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // This would open a modal to add event details
                    const newEvent = {
                      type: 'Eulogy',
                      description: 'Personal memories shared',
                      performer: '',
                      duration: '5 minutes',
                    };
                    setFormData({
                      ...formData,
                      serviceEvents: [...formData.serviceEvents, newEvent],
                    });
                  }}
                >
                  Add Service Event
                </Button>
              </Card>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                <strong>Common service events:</strong> Welcome & Opening Prayer, Eulogy, Scripture Reading, 
                Musical Selection, Personal Tributes, Closing Prayer, Recessional
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => onSubmit(formData)}>
                Continue to Template Selection
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}