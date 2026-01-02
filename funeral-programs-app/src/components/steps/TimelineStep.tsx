import { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Plus, GripVertical, X, Clock } from 'lucide-react';
import { useProgramStore } from '../../store/programStore';

const COMMON_EVENTS = [
  { title: 'Musical Selection', description: '' },
  { title: 'Scripture Reading', description: '' },
  { title: 'Prayer', description: '' },
  { title: 'Solo', description: '' },
  { title: 'Remarks', description: '(2 minutes please)' },
  { title: 'Acknowledgements', description: '' },
  { title: 'Obituary Reading', description: '' },
  { title: 'Eulogy', description: '' },
  { title: 'Viewing', description: '' },
  { title: 'Benediction', description: '' },
  { title: 'Recessional', description: '' },
];

export function TimelineStep() {
  const { timeline, addTimelineEvent, updateTimelineEvent, removeTimelineEvent, reorderTimeline, nextStep, prevStep } = useProgramStore();
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  
  const handleQuickAdd = (event: typeof COMMON_EVENTS[0]) => {
    addTimelineEvent(event);
    setShowQuickAdd(false);
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
          Order of Service
        </h2>
        <p className="text-navy-600 font-body">
          Build the program timeline. Drag to reorder events.
        </p>
      </div>
      
      {/* Quick Add */}
      <div className="mb-6">
        <button
          onClick={() => setShowQuickAdd(!showQuickAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-cream-200 
                     hover:bg-cream-300 rounded-lg transition-colors font-body"
        >
          <Plus className="w-4 h-4" />
          Quick Add Common Events
        </button>
        
        {showQuickAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-4 bg-cream-100 rounded-lg"
          >
            <div className="flex flex-wrap gap-2">
              {COMMON_EVENTS.map((event) => (
                <button
                  key={event.title}
                  onClick={() => handleQuickAdd(event)}
                  className="px-3 py-1.5 bg-white border border-cream-300 
                             rounded-full text-sm font-body text-navy-700
                             hover:border-gold-400 hover:bg-gold-50 transition-colors"
                >
                  {event.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Timeline Events */}
      <Reorder.Group
        axis="y"
        values={timeline}
        onReorder={reorderTimeline}
        className="space-y-3"
      >
        {timeline.map((event) => (
          <Reorder.Item
            key={event.id}
            value={event}
            className="bg-white rounded-lg border border-cream-300 p-4 
                       shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-start gap-3">
              <GripVertical className="w-5 h-5 text-navy-400 mt-1 flex-shrink-0" />
              
              <div className="flex-1 space-y-2">
                <input
                  value={event.title}
                  onChange={(e) => updateTimelineEvent(event.id, { title: e.target.value })}
                  className="w-full font-body font-medium text-navy-800 
                             bg-transparent border-b border-transparent 
                             focus:border-gold-400 focus:outline-none"
                  placeholder="Event name"
                />
                <input
                  value={event.description}
                  onChange={(e) => updateTimelineEvent(event.id, { description: e.target.value })}
                  className="w-full text-sm font-body text-navy-600 
                             bg-transparent border-b border-transparent 
                             focus:border-gold-400 focus:outline-none"
                  placeholder="Details (e.g., Solo by Anne Williams)"
                />
              </div>
              
              <button
                onClick={() => removeTimelineEvent(event.id)}
                className="p-1 text-navy-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      
      {timeline.length === 0 && (
        <div className="text-center py-12 text-navy-500 font-body">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No events added yet. Use Quick Add or create your own.</p>
        </div>
      )}
      
      {/* Add Custom Event */}
      <button
        onClick={() => addTimelineEvent({ title: '', description: '' })}
        className="mt-4 w-full py-3 border-2 border-dashed border-cream-400 
                   rounded-lg text-navy-600 font-body hover:border-gold-400 
                   hover:text-navy-800 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Custom Event
      </button>
      
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