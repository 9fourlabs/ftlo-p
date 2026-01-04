import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Palette, 
  Heart, 
  Star, 
  Sparkles, 
  Flower,
  Mountain,
  Sun
} from 'lucide-react';
import { useProgramStore } from '@/store/programStore';

const TEMPLATES = [
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    description: 'Traditional design with navy and gold accents',
    colors: ['#1e3a8a', '#f59e0b', '#f8fafc'],
    icon: Heart,
    features: ['Traditional layout', 'Navy & gold color scheme', 'Classic typography'],
  },
  {
    id: 'modern-grace',
    name: 'Modern Grace',
    description: 'Clean, contemporary layout with soft colors',
    colors: ['#6b7280', '#e5e7eb', '#ffffff'],
    icon: Sparkles,
    features: ['Clean design', 'Soft gray tones', 'Modern typography'],
  },
  {
    id: 'celebration-life',
    name: 'Celebration of Life',
    description: 'Vibrant and uplifting design for joyful remembrance',
    colors: ['#f59e0b', '#f97316', '#fef3c7'],
    icon: Sun,
    features: ['Bright colors', 'Uplifting theme', 'Joyful design'],
  },
  {
    id: 'gentle-remembrance',
    name: 'Gentle Remembrance',
    description: 'Soft, peaceful design with natural elements',
    colors: ['#10b981', '#d1fae5', '#065f46'],
    icon: Flower,
    features: ['Nature-inspired', 'Peaceful tones', 'Gentle imagery'],
  },
  {
    id: 'eternal-legacy',
    name: 'Eternal Legacy',
    description: 'Dignified design emphasizing lasting impact',
    colors: ['#7c3aed', '#ddd6fe', '#581c87'],
    icon: Mountain,
    features: ['Dignified style', 'Purple accents', 'Legacy focused'],
  },
  {
    id: 'cherished-memories',
    name: 'Cherished Memories',
    description: 'Warm design perfect for celebrating life stories',
    colors: ['#dc2626', '#fecaca', '#991b1b'],
    icon: Star,
    features: ['Warm colors', 'Story focused', 'Memory highlights'],
  },
];

export function TemplateSelectStep() {
  const { program, updateProgram } = useProgramStore();
  const [selectedTemplate, setSelectedTemplate] = useState(program.template || '');
  
  // Update store when template changes
  React.useEffect(() => {
    updateProgram({ template: selectedTemplate });
  }, [selectedTemplate, updateProgram]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Choose Template Design
        </h3>
        <p className="text-gray-600">
          Select the design that best honors your loved one's memory
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <Palette className="mr-2 h-5 w-5" />
            Available Templates
            {selectedTemplate && (
              <Badge variant="secondary" className="ml-2">
                {TEMPLATES.find(t => t.id === selectedTemplate)?.name}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((template) => {
              const IconComponent = template.icon;
              const isSelected = selectedTemplate === template.id;
              
              return (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative rounded-lg border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  {/* Template Preview */}
                  <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg"
                       style={{
                         background: `linear-gradient(135deg, ${template.colors[0]} 0%, ${template.colors[1]} 100%)`
                       }}>
                    
                    {/* Mock preview content */}
                    <div className="absolute inset-4 bg-white/90 rounded p-4 shadow-lg">
                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center"
                             style={{ backgroundColor: template.colors[0] }}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-300 rounded mx-auto w-3/4"></div>
                          <div className="h-2 bg-gray-200 rounded mx-auto w-1/2"></div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="h-1 bg-gray-200 rounded w-full"></div>
                          <div className="h-1 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                        </div>

                        <div className="flex justify-center space-x-1 mt-3">
                          {template.colors.slice(0, 3).map((color, index) => (
                            <div
                              key={index}
                              className="w-3 h-3 rounded-full border border-white/50"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
                          <IconComponent className="w-4 h-4 mr-2" style={{ color: template.colors[0] }} />
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {template.description}
                        </p>
                        
                        <div className="space-y-1">
                          {template.features.map((feature, index) => (
                            <div key={index} className="text-xs text-gray-500 flex items-center">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {!selectedTemplate && (
            <div className="text-center py-8">
              <Palette className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">Choose a template to continue</p>
              <p className="text-sm text-gray-400">
                You can always change the template later
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 rounded-lg border border-green-200"
        >
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm font-semibold text-green-900">
                Template Selected: {TEMPLATES.find(t => t.id === selectedTemplate)?.name}
              </p>
              <p className="text-xs text-green-700">
                You can preview and make final adjustments on the next step
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          💡 Template Selection Tips
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Each template has a unique personality and tone</li>
          <li>• Consider what style would best represent your loved one</li>
          <li>• Colors and fonts can be customized after template selection</li>
          <li>• You can switch templates anytime before final printing</li>
        </ul>
      </div>
    </div>
  );
}