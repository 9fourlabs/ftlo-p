'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Check, 
  Wand2,
  FileText,
  Heart,
  Clock
} from 'lucide-react';

interface AIObituaryGeneratorProps {
  lovedOneStory: string;
  basicInfo: {
    firstName: string;
    middleName?: string;
    lastName: string;
    nickname?: string;
    birthDate: Date;
    deathDate: Date;
    birthPlace: string;
    deathPlace: string;
  };
  onUpdate: (obituary: string) => void;
}

export function AIObituaryGenerator({ 
  lovedOneStory, 
  basicInfo, 
  onUpdate 
}: AIObituaryGeneratorProps) {
  const [generatedObituary, setGeneratedObituary] = useState('');
  const [editedObituary, setEditedObituary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<'formal' | 'warm' | 'celebratory'>('warm');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  
  // Simulated AI-generated sections
  const [sections, setSections] = useState({
    opening: '',
    earlyLife: '',
    career: '',
    family: '',
    hobbies: '',
    legacy: '',
    serviceInfo: '',
  });

  const toneDescriptions = {
    formal: 'Traditional and respectful tone',
    warm: 'Personal and heartfelt tone',
    celebratory: 'Uplifting celebration of life',
  };

  const lengthDescriptions = {
    short: '150-250 words',
    medium: '300-500 words',
    long: '600-800 words',
  };

  const generateObituary = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // This would be replaced with actual AI API call
      const fullName = [basicInfo.firstName, basicInfo.middleName, basicInfo.lastName]
        .filter(Boolean)
        .join(' ');
        
      const nickname = basicInfo.nickname ? ` "${basicInfo.nickname}"` : '';
      
      const sampleObituary = `With heavy hearts and profound love, we announce the passing of ${fullName}${nickname}, who left us peacefully on ${basicInfo.deathDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} in ${basicInfo.deathPlace}. Born on ${basicInfo.birthDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} in ${basicInfo.birthPlace}, ${basicInfo.firstName} lived a life filled with purpose, love, and endless compassion.

${basicInfo.firstName} was a beacon of light to all who knew them. Their warmth, generosity, and infectious smile could brighten even the darkest days. Whether sharing stories over coffee, lending a helping hand to neighbors, or simply being present for those in need, ${basicInfo.firstName} embodied the true meaning of kindness.

Throughout their life, ${basicInfo.firstName} touched countless hearts and left an indelible mark on our community. Their legacy of love, laughter, and unwavering faith will continue to inspire us all.

${basicInfo.firstName} is survived by [family members to be added]. They were preceded in death by [to be added].

A celebration of ${basicInfo.firstName}'s life will be held on [date] at [location]. In lieu of flowers, the family requests donations be made to [charity] in ${basicInfo.firstName}'s memory.

Though our hearts are heavy with loss, we find comfort in knowing that ${basicInfo.firstName}'s spirit lives on in the memories we cherish and the love they shared so freely.`;

      setGeneratedObituary(sampleObituary);
      setEditedObituary(sampleObituary);
      
      // Generate sections for easy editing
      setSections({
        opening: `With heavy hearts and profound love, we announce the passing of ${fullName}${nickname}...`,
        earlyLife: 'Born on [date] in [place], [name] grew up...',
        career: '[Name] dedicated their professional life to...',
        family: '[Name] was a devoted [spouse/parent/grandparent]...',
        hobbies: 'In their free time, [name] enjoyed...',
        legacy: '[Name]\'s legacy will live on through...',
        serviceInfo: 'A celebration of life will be held...',
      });
      
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedObituary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerateSection = (section: keyof typeof sections) => {
    // This would call AI to regenerate just one section
    console.log('Regenerating section:', section);
  };

  useEffect(() => {
    if (lovedOneStory && basicInfo.firstName) {
      generateObituary();
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Obituary Generator
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!editedObituary}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={generateObituary}
                disabled={isGenerating}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                Regenerate
              </Button>
            </div>
          </div>

          {/* Generation Options */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tone</label>
              <div className="flex gap-2">
                {Object.entries(toneDescriptions).map(([key, description]) => (
                  <Button
                    key={key}
                    variant={tone === key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTone(key as typeof tone)}
                    className="flex-1"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {toneDescriptions[tone]}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Length</label>
              <div className="flex gap-2">
                {Object.entries(lengthDescriptions).map(([key, description]) => (
                  <Button
                    key={key}
                    variant={length === key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLength(key as typeof length)}
                    className="flex-1"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {lengthDescriptions[length]}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="full" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="full">Full Obituary</TabsTrigger>
          <TabsTrigger value="sections">Edit by Section</TabsTrigger>
        </TabsList>

        <TabsContent value="full" className="space-y-4">
          <Card className="p-6">
            <Textarea
              value={editedObituary}
              onChange={(e) => {
                setEditedObituary(e.target.value);
                onUpdate(e.target.value);
              }}
              placeholder="Your obituary will appear here..."
              className="min-h-[400px] font-serif text-lg leading-relaxed"
            />
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {editedObituary.split(' ').length} words
              </div>
              <Button onClick={() => onUpdate(editedObituary)}>
                Save Changes
              </Button>
            </div>
          </Card>

          {/* AI Suggestions */}
          <Alert>
            <Wand2 className="h-4 w-4" />
            <AlertDescription>
              <strong>AI Suggestions:</strong> Consider adding specific achievements, 
              memorable qualities, or favorite sayings that capture their essence.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="sections" className="space-y-4">
          {Object.entries(sections).map(([key, content]) => (
            <Card key={key} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {key === 'opening' && <FileText className="h-4 w-4" />}
                  {key === 'family' && <Heart className="h-4 w-4" />}
                  {key === 'serviceInfo' && <Clock className="h-4 w-4" />}
                  <h4 className="font-semibold capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => regenerateSection(key as keyof typeof sections)}
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
              <Textarea
                value={content}
                onChange={(e) => {
                  setSections({ ...sections, [key]: e.target.value });
                }}
                className="min-h-[100px]"
              />
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Writing Tips */}
      <Card className="p-6 bg-muted/50">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Writing Tips
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Include specific stories or moments that capture their personality</li>
          <li>• Mention their proudest accomplishments and passions</li>
          <li>• Share how they impacted others' lives</li>
          <li>• Consider including a favorite quote or saying</li>
          <li>• End with information about services and memorial preferences</li>
        </ul>
      </Card>
    </div>
  );
}