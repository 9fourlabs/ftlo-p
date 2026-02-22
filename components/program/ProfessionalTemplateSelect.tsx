'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, Download, Edit, Check } from 'lucide-react';
import Image from 'next/image';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  thumbnail: string;
  isPremium?: boolean;
  colors: string[];
  fonts: {
    heading: string;
    body: string;
  };
}

const templates: Template[] = [
  // Traditional Templates
  {
    id: 'eternal-grace',
    name: 'Eternal Grace',
    category: 'traditional',
    description: 'Classic design with gold foil accents and elegant serif typography',
    tags: ['classic', 'elegant', 'formal'],
    thumbnail: '/templates/eternal-grace.jpg',
    colors: ['#D4AF37', '#1A1A1A', '#FDFBF7'],
    fonts: { heading: 'Playfair Display', body: 'Crimson Text' },
  },
  {
    id: 'peaceful-journey',
    name: 'Peaceful Journey',
    category: 'traditional',
    description: 'Serene design with soft blue tones and dove imagery',
    tags: ['peaceful', 'religious', 'comforting'],
    thumbnail: '/templates/peaceful-journey.jpg',
    colors: ['#4A7C7E', '#F0F4F8', '#E8D5C4'],
    fonts: { heading: 'Cormorant Garamond', body: 'Lora' },
  },
  {
    id: 'heavenly-gates',
    name: 'Heavenly Gates',
    category: 'traditional',
    description: 'Traditional religious theme with cross and ornate borders',
    tags: ['christian', 'traditional', 'ornate'],
    thumbnail: '/templates/heavenly-gates.jpg',
    colors: ['#8B7355', '#FFF8DC', '#4B0082'],
    fonts: { heading: 'Old Standard TT', body: 'Merriweather' },
  },
  
  // Modern Templates
  {
    id: 'celebration-life',
    name: 'Celebration of Life',
    category: 'modern',
    description: 'Vibrant, uplifting design celebrating a life well-lived',
    tags: ['celebration', 'colorful', 'modern'],
    thumbnail: '/templates/celebration-life.jpg',
    isPremium: true,
    colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
    fonts: { heading: 'Montserrat', body: 'Open Sans' },
  },
  {
    id: 'minimal-memory',
    name: 'Minimal Memory',
    category: 'modern',
    description: 'Clean, contemporary design with focus on photography',
    tags: ['minimal', 'photo-focused', 'clean'],
    thumbnail: '/templates/minimal-memory.jpg',
    colors: ['#000000', '#FFFFFF', '#F5F5F5'],
    fonts: { heading: 'Helvetica Neue', body: 'Inter' },
  },
  {
    id: 'artistic-tribute',
    name: 'Artistic Tribute',
    category: 'modern',
    description: 'Creative design with watercolor elements and modern typography',
    tags: ['artistic', 'creative', 'unique'],
    thumbnail: '/templates/artistic-tribute.jpg',
    isPremium: true,
    colors: ['#E8B4B8', '#A8DADC', '#F1FAEE'],
    fonts: { heading: 'Raleway', body: 'Source Sans Pro' },
  },
  
  // Nature Templates
  {
    id: 'garden-remembrance',
    name: 'Garden Remembrance',
    category: 'nature',
    description: 'Beautiful floral design with roses and garden imagery',
    tags: ['floral', 'garden', 'feminine'],
    thumbnail: '/templates/garden-remembrance.jpg',
    colors: ['#F8B195', '#F67280', '#C06C84'],
    fonts: { heading: 'Playfair Display', body: 'Crimson Pro' },
  },
  {
    id: 'sunset-farewell',
    name: 'Sunset Farewell',
    category: 'nature',
    description: 'Warm sunset theme symbolizing peaceful transition',
    tags: ['sunset', 'warm', 'peaceful'],
    thumbnail: '/templates/sunset-farewell.jpg',
    colors: ['#FF6B35', '#F7931E', '#FCEE21'],
    fonts: { heading: 'Merriweather', body: 'Lato' },
  },
  {
    id: 'ocean-serenity',
    name: 'Ocean Serenity',
    category: 'nature',
    description: 'Calming ocean waves and beach imagery',
    tags: ['ocean', 'beach', 'calming'],
    thumbnail: '/templates/ocean-serenity.jpg',
    isPremium: true,
    colors: ['#006994', '#B4D6CD', '#FFF5E1'],
    fonts: { heading: 'Libre Baskerville', body: 'Nunito' },
  },
  
  // Military/Patriotic Templates
  {
    id: 'honor-valor',
    name: 'Honor & Valor',
    category: 'patriotic',
    description: 'Military honors template with flag and eagle imagery',
    tags: ['military', 'patriotic', 'veteran'],
    thumbnail: '/templates/honor-valor.jpg',
    colors: ['#002868', '#BF0A30', '#FFFFFF'],
    fonts: { heading: 'Oswald', body: 'Roboto' },
  },
  {
    id: 'service-sacrifice',
    name: 'Service & Sacrifice',
    category: 'patriotic',
    description: 'Dignified design for military and first responders',
    tags: ['military', 'police', 'firefighter'],
    thumbnail: '/templates/service-sacrifice.jpg',
    colors: ['#000080', '#FFD700', '#FFFFFF'],
    fonts: { heading: 'Bebas Neue', body: 'PT Sans' },
  },
];

interface ProfessionalTemplateSelectProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  onContinue: () => void;
}

export function ProfessionalTemplateSelect({ 
  selectedTemplate, 
  onSelectTemplate, 
  onContinue 
}: ProfessionalTemplateSelectProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'traditional', label: 'Traditional' },
    { id: 'modern', label: 'Modern' },
    { id: 'nature', label: 'Nature' },
    { id: 'patriotic', label: 'Military/Patriotic' },
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Choose Your Memorial Program Design</h2>
        <p className="text-muted-foreground">
          Select from our collection of professionally designed templates
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto">
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <ScrollArea className="h-[600px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`group relative overflow-hidden cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'ring-2 ring-primary shadow-lg'
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => onSelectTemplate(template.id)}
                >
                  {/* Selected indicator */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}

                  {/* Premium badge */}
                  {template.isPremium && (
                    <Badge className="absolute top-2 left-2 z-10" variant="secondary">
                      Premium
                    </Badge>
                  )}

                  {/* Template preview */}
                  <div className="aspect-[8.5/11] bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                    
                    {/* Simulated template preview */}
                    <div className="absolute inset-4 bg-white shadow-lg rounded-sm p-4">
                      <div className="space-y-2">
                        <div 
                          className="h-1 rounded" 
                          style={{ backgroundColor: template.colors[0] }}
                        />
                        <div className="text-center space-y-1">
                          <div className="h-8 bg-gray-200 rounded mx-auto w-3/4" />
                          <div className="h-4 bg-gray-100 rounded mx-auto w-1/2" />
                        </div>
                        <div className="flex justify-center gap-1 my-4">
                          {template.colors.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="space-y-1">
                          <div className="h-3 bg-gray-100 rounded" />
                          <div className="h-3 bg-gray-100 rounded w-5/6" />
                          <div className="h-3 bg-gray-100 rounded w-4/6" />
                        </div>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTemplate(template);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTemplate(template.id);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Select
                      </Button>
                    </div>
                  </div>

                  {/* Template info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <p>Fonts: {template.fonts.heading} & {template.fonts.body}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center sticky bottom-0 bg-background pt-4">
        <p className="text-sm text-muted-foreground">
          All templates are fully customizable with your content, photos, and preferences
        </p>
        <Button 
          size="lg" 
          onClick={onContinue}
          disabled={!selectedTemplate}
        >
          Continue to Customization
        </Button>
      </div>
    </div>
  );
}