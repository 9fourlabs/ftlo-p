import { motion } from 'framer-motion';
import { useProgramStore } from '../../store/programStore';

export function ObituaryStep() {
  const { lovedOne, updateLovedOne, nextStep, prevStep } = useProgramStore();
  
  const handleSubmit = () => {
    nextStep();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl text-navy-800 mb-3">
          Share Their Story
        </h2>
        <p className="text-navy-600 font-body">
          Write an obituary or life story to honor their memory
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <label className="block text-sm font-medium text-navy-700 mb-4">
          Obituary or Life Story
        </label>
        
        <textarea
          value={lovedOne.obituary}
          onChange={(e) => updateLovedOne({ obituary: e.target.value })}
          rows={20}
          className="w-full px-4 py-3 rounded-lg border border-cream-400 
                     focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                     transition-all bg-white font-body leading-relaxed resize-none"
          placeholder="Share their life story, achievements, passions, and the impact they had on those around them. Include details about their family, career, hobbies, and the legacy they leave behind..."
        />
        
        <div className="mt-4 text-sm text-navy-500">
          <p>Tips for writing a meaningful obituary:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Start with basic facts: full name, age, date and place of passing</li>
            <li>Share their personality, passions, and what made them unique</li>
            <li>Include career highlights and community involvement</li>
            <li>Mention family members and special relationships</li>
            <li>End with their lasting impact and how they'll be remembered</li>
          </ul>
        </div>
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
          Continue
        </button>
      </div>
    </motion.div>
  );
}