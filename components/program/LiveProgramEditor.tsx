'use client';

import { useState, useCallback, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIObituaryGenerator } from './AIObituaryGenerator';
import { ServiceTimelineBuilder } from './ServiceTimelineBuilder';
import { TemplatePreview } from './TemplatePreview';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Save,
  Download,
  Printer,
  Share2,
  Undo,
  Redo,
  Eye,
  Edit3,
  Image as ImageIcon,
  FileText,
  Clock,
  Palette,
} from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface LiveProgramEditorProps {
  initialData: any;
  programId?: string;
  onSave: (data: any) => void;
}

export function LiveProgramEditor({ initialData, programId, onSave }: LiveProgramEditorProps) {
  const [programData, setProgramData] = useState(initialData);
  const [activeTab, setActiveTab] = useState('details');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [history, setHistory] = useState<any[]>([initialData]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Debounced data for auto-save
  const debouncedData = useDebounce(programData, 2000);

  // Auto-save functionality
  useEffect(() => {
    if (programId && debouncedData !== initialData) {
      handleAutoSave();
    }
  }, [debouncedData]);

  const handleAutoSave = async () => {
    setIsSaving(true);
    try {
      // Call save API
      await onSave({ ...programData, isDraft: true });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateProgramData = useCallback((updates: Partial<typeof programData>) => {
    const newData = { ...programData, ...updates };
    setProgramData(newData);
    
    // Add to history for undo/redo
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [programData, history, historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setProgramData(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setProgramData(history[historyIndex + 1]);
    }
  };

  const handleEditFromPreview = (section: string) => {
    setActiveTab(section);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b px-6 py-3 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Memorial Program Editor</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUndo}
              disabled={historyIndex === 0}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRedo}
              disabled={historyIndex === history.length - 1}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          {isSaving && (
            <span className="text-sm text-muted-foreground">Saving...</span>
          )}
          {lastSaved && !isSaving && (
            <span className="text-sm text-muted-foreground">
              Last saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button size="sm" onClick={() => onSave({ ...programData, isDraft: false })}>
            <Save className="h-4 w-4 mr-2" />
            Save Final
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className="flex-1 overflow-auto border-r">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="border-b px-6">
              <TabsList className="h-12 bg-transparent">
                <TabsTrigger value="details" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="obituary" className="gap-2">
                  <Edit3 className="h-4 w-4" />
                  Obituary
                </TabsTrigger>
                <TabsTrigger value="timeline" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Timeline
                </TabsTrigger>
                <TabsTrigger value="photos" className="gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Photos
                </TabsTrigger>
                <TabsTrigger value="design" className="gap-2">
                  <Palette className="h-4 w-4" />
                  Design
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="details" className="p-6 space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={programData.firstName}
                      onChange={(e) => updateProgramData({ firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Middle Name</Label>
                    <Input
                      value={programData.middleName || ''}
                      onChange={(e) => updateProgramData({ middleName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={programData.lastName}
                      onChange={(e) => updateProgramData({ lastName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nickname</Label>
                    <Input
                      value={programData.nickname || ''}
                      onChange={(e) => updateProgramData({ nickname: e.target.value })}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Life Story Notes</h2>
                <Textarea
                  value={programData.lovedOneStory || ''}
                  onChange={(e) => updateProgramData({ lovedOneStory: e.target.value })}
                  placeholder="Share memories, stories, and what made them special..."
                  className="min-h-[200px]"
                />
              </Card>
            </TabsContent>

            <TabsContent value="obituary" className="p-6">
              <AIObituaryGenerator
                lovedOneStory={programData.lovedOneStory || ''}
                basicInfo={{
                  firstName: programData.firstName,
                  middleName: programData.middleName,
                  lastName: programData.lastName,
                  nickname: programData.nickname,
                  birthDate: programData.birthDate ? new Date(programData.birthDate) : new Date(),
                  deathDate: programData.deathDate ? new Date(programData.deathDate) : new Date(),
                  birthPlace: programData.birthPlace || '',
                  deathPlace: programData.deathPlace || '',
                }}
                onUpdate={(obituary) => updateProgramData({ obituary })}
              />
            </TabsContent>

            <TabsContent value="timeline" className="p-6">
              <ServiceTimelineBuilder
                events={programData.serviceEvents || []}
                onUpdate={(events) => updateProgramData({ serviceEvents: events })}
              />
            </TabsContent>

            <TabsContent value="photos" className="p-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Photo Management</h2>
                <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Drag and drop photos here or click to browse
                  </p>
                  <Button variant="outline">Upload Photos</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="design" className="p-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Design Customization</h2>
                <p className="text-muted-foreground">
                  Template: {programData.selectedTemplate}
                </p>
                {/* Add color picker, font selector, etc. */}
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="flex-1 bg-muted/30">
          <TemplatePreview
            programData={{
              ...programData,
              birthDate: programData.birthDate ? new Date(programData.birthDate) : null,
              deathDate: programData.deathDate ? new Date(programData.deathDate) : null,
            }}
            onEdit={handleEditFromPreview}
          />
        </div>
      </div>
    </div>
  );
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}