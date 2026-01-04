import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ProgramData } from '../MultiStepProgramForm';

interface TemplateSelectStepProps {
  data: ProgramData;
  updateData: (data: Partial<ProgramData>) => void;
}

const templates = [
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    description: 'A timeless design with gold accents and serif fonts',
    preview: '/templates/classic-elegance-preview.jpg',
    colors: ['#FFD700', '#1B1B3A', '#F5F5DC'],
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean, contemporary design with sans-serif typography',
    preview: '/templates/modern-minimal-preview.jpg',
    colors: ['#000000', '#FFFFFF', '#E5E5E5'],
  },
  {
    id: 'garden-memorial',
    name: 'Garden Memorial',
    description: 'Soft floral design with watercolor elements',
    preview: '/templates/garden-memorial-preview.jpg',
    colors: ['#E8B4B8', '#95B99E', '#F5E6D3'],
  },
  {
    id: 'heritage-tradition',
    name: 'Heritage & Tradition',
    description: 'Traditional design with ornate borders and classic typography',
    preview: '/templates/heritage-tradition-preview.jpg',
    colors: ['#4B0082', '#FFD700', '#FFFAF0'],
  },
];

export function TemplateSelectStep({ data, updateData }: TemplateSelectStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose Your Template</h2>
        <p className="text-muted-foreground">
          Select a design template for your memorial program.
        </p>
      </div>

      <RadioGroup
        value={data.selectedTemplate}
        onValueChange={(value) => updateData({ selectedTemplate: value })}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`relative cursor-pointer transition-all ${
                data.selectedTemplate === template.id
                  ? 'ring-2 ring-primary'
                  : 'hover:shadow-lg'
              }`}
            >
              <label
                htmlFor={template.id}
                className="block cursor-pointer p-4"
              >
                <div className="flex items-start space-x-4">
                  <RadioGroupItem
                    value={template.id}
                    id={template.id}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {template.description}
                    </p>
                    
                    {/* Color Preview */}
                    <div className="flex gap-2 mt-3">
                      {template.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    
                    {/* Template Preview Placeholder */}
                    <div className="mt-4 aspect-[8.5/11] bg-muted rounded flex items-center justify-center text-muted-foreground">
                      <span className="text-sm">Template Preview</span>
                    </div>
                  </div>
                </div>
              </label>
            </Card>
          ))}
        </div>
      </RadioGroup>

      <div className="text-sm text-muted-foreground">
        <p>Note: You can customize colors and fonts after selecting a template.</p>
      </div>
    </div>
  );
}