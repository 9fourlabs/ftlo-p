import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useProgramStore } from '../../store/programStore';

export function FamilyStep() {
  const { 
    family, 
    updateFamily, 
    addChild, 
    removeChild, 
    addSibling, 
    removeSibling, 
    nextStep, 
    prevStep 
  } = useProgramStore();
  
  const [childName, setChildName] = useState('');
  const [siblingName, setSiblingName] = useState('');
  
  const handleAddChild = () => {
    if (childName.trim()) {
      addChild(childName.trim());
      setChildName('');
    }
  };
  
  const handleAddSibling = () => {
    if (siblingName.trim()) {
      addSibling(siblingName.trim());
      setSiblingName('');
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl text-navy-800 mb-3">
          Family Information
        </h2>
        <p className="text-navy-600 font-body">
          Add family members to honor their memory
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Parents */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Parents
          </label>
          <input
            value={family.parents}
            onChange={(e) => updateFamily({ parents: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-cream-400 
                       focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                       transition-all bg-white font-body"
            placeholder="e.g., John and Mary Smith"
          />
        </div>
        
        {/* Spouse */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Spouse
          </label>
          <input
            value={family.spouse}
            onChange={(e) => updateFamily({ spouse: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-cream-400 
                       focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                       transition-all bg-white font-body"
            placeholder="Spouse's name"
          />
        </div>
        
        {/* Children */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Children
          </label>
          
          <div className="flex gap-2 mb-3">
            <input
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddChild()}
              className="flex-1 px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
              placeholder="Add child's name"
            />
            <button
              type="button"
              onClick={handleAddChild}
              className="px-4 py-3 bg-gold-500 text-white rounded-lg 
                         hover:bg-gold-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          
          {family.children.length > 0 && (
            <div className="space-y-2">
              {family.children.map((child) => (
                <div key={child.id} className="flex items-center justify-between 
                                                 bg-cream-100 px-4 py-2 rounded-lg">
                  <span className="font-body text-navy-700">{child.name}</span>
                  <button
                    onClick={() => removeChild(child.id)}
                    className="text-rose-500 hover:text-rose-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Siblings */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Siblings
          </label>
          
          <div className="flex gap-2 mb-3">
            <input
              value={siblingName}
              onChange={(e) => setSiblingName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSibling()}
              className="flex-1 px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
              placeholder="Add sibling's name"
            />
            <button
              type="button"
              onClick={handleAddSibling}
              className="px-4 py-3 bg-gold-500 text-white rounded-lg 
                         hover:bg-gold-600 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          
          {family.siblings.length > 0 && (
            <div className="space-y-2">
              {family.siblings.map((sibling) => (
                <div key={sibling.id} className="flex items-center justify-between 
                                                  bg-cream-100 px-4 py-2 rounded-lg">
                  <span className="font-body text-navy-700">{sibling.name}</span>
                  <button
                    onClick={() => removeSibling(sibling.id)}
                    className="text-rose-500 hover:text-rose-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
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
          onClick={nextStep}
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