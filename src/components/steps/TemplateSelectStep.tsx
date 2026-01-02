import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useProgramStore } from '../../store/programStore';

const TEMPLATES = [
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    description: 'Traditional design with navy and gold accents',
    preview: '/template-previews/classic-elegance.jpg',
  },
  {
    id: 'modern-grace',
    name: 'Modern Grace',
    description: 'Clean, contemporary layout with soft colors',
    preview: '/template-previews/modern-grace.jpg',
    comingSoon: true,
  },
  {
    id: 'celebration-life',
    name: 'Celebration of Life',
    description: 'Vibrant and uplifting design for joyful remembrance',
    preview: '/template-previews/celebration-life.jpg',
    comingSoon: true,
  },
];

export function TemplateSelectStep() {
  const { selectedTemplate, setTemplate, nextStep, prevStep } = useProgramStore();
  
  const handleSubmit = () => {
    nextStep();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl text-navy-800 mb-3">
          Choose a Template
        </h2>
        <p className="text-navy-600 font-body">
          Select the design that best honors your loved one's memory
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: template.comingSoon ? 1 : 1.02 }}
            className={`relative rounded-lg border-2 transition-all cursor-pointer ${
              selectedTemplate === template.id
                ? 'border-gold-500 shadow-lg'
                : 'border-cream-300 hover:border-gold-300'
            } ${template.comingSoon ? 'opacity-60' : ''}`}
            onClick={() => !template.comingSoon && setTemplate(template.id)}
          >
            {/* Template Preview */}
            <div className="aspect-[8.5/11] bg-gradient-to-b from-navy-800 to-navy-600 
                            rounded-t-lg relative overflow-hidden">
              {/* Mock preview content */}
              <div className="absolute inset-4 border border-gold-500/30 rounded">
                <div className="p-6 text-center">
                  <div className="w-16 h-20 bg-cream-100/20 mx-auto mb-4 rounded"></div>
                  <div className="h-4 bg-cream-100/30 mb-2 rounded"></div>
                  <div className="h-3 bg-gold-400/40 mb-4 rounded w-3/4 mx-auto"></div>
                  <div className="space-y-1">
                    <div className="h-2 bg-cream-100/20 rounded"></div>
                    <div className="h-2 bg-cream-100/20 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
              
              {/* Coming Soon Badge */}
              {template.comingSoon && (
                <div className="absolute inset-0 bg-navy-900/80 flex items-center justify-center">
                  <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
            
            {/* Template Info */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg text-navy-800 mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-navy-600 font-body">
                    {template.description}
                  </p>
                </div>
                
                {selectedTemplate === template.id && !template.comingSoon && (
                  <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Navigation */}
      <div className="pt-8 flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-3 text-navy-700 font-body font-medium 
                     hover:text-navy-900 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-navy-800 text-cream-100 rounded-lg 
                     font-body font-medium hover:bg-navy-700 
                     transition-colors shadow-lg hover:shadow-xl"
        >
          Preview Program
        </button>
      </div>
    </motion.div>
  );
}