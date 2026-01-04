import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  GripVertical, 
  X, 
  Clock, 
  BookOpen, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useProgramStore } from '@/store/programStore';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  time?: string;
}

const COMMON_EVENTS = [
  { title: 'Prelude Music', description: 'Soft background music as guests arrive' },
  { title: 'Opening Prayer', description: '' },
  { title: 'Musical Selection', description: 'Hymn or favorite song' },
  { title: 'Scripture Reading', description: '' },
  { title: 'Obituary Reading', description: 'Life story and accomplishments' },
  { title: 'Eulogy', description: 'Personal reflections and memories' },
  { title: 'Musical Tribute', description: 'Special song or performance' },
  { title: 'Remarks', description: 'Family and friends sharing memories' },
  { title: 'Prayer of Comfort', description: '' },
  { title: 'Acknowledgements', description: 'Thank you to attendees and helpers' },
  { title: 'Benediction', description: 'Final blessing' },
  { title: 'Recessional', description: 'Closing music' },
];

export function TimelineStep() {
  const { program, updateProgram } = useProgramStore();
  const [timeline, setTimeline] = useState<TimelineEvent[]>(program.timeline || []);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  
  // Update store when timeline changes
  React.useEffect(() => {
    updateProgram({ timeline });
  }, [timeline, updateProgram]);

  const addTimelineEvent = (eventData: { title: string; description: string }) => {
    const newEvent: TimelineEvent = {
      id: `event_${Date.now()}_${Math.random()}`,
      title: eventData.title,
      description: eventData.description,
    };
    setTimeline(prev => [...prev, newEvent]);
  };

  const updateTimelineEvent = (id: string, updates: Partial<TimelineEvent>) => {
    setTimeline(prev => prev.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));
  };

  const removeTimelineEvent = (id: string) => {
    setTimeline(prev => prev.filter(event => event.id !== id));
  };

  const reorderTimeline = (reorderedTimeline: TimelineEvent[]) => {
    setTimeline(reorderedTimeline);
  };

  const handleQuickAdd = (eventData: { title: string; description: string }) => {
    addTimelineEvent(eventData);
    setShowQuickAdd(false);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Order of Service
        </h3>
        <p className="text-gray-600">
          Create the timeline for the memorial service. You can drag to reorder events.
        </p>
      </div>

      {/* Quick Add Common Events */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Common Service Events
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQuickAdd(!showQuickAdd)}
              className="flex items-center gap-2"
            >
              {showQuickAdd ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showQuickAdd ? 'Hide' : 'Show'} Quick Add
            </Button>
          </div>
        </CardHeader>
        
        <AnimatePresence>
          {showQuickAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {COMMON_EVENTS.map((event) => (
                    <Button
                      key={event.title}
                      variant="outline"
                      onClick={() => handleQuickAdd(event)}
                      className="justify-start h-auto p-3 text-left"
                    >
                      <div>
                        <div className="font-medium text-sm">{event.title}</div>
                        {event.description && (
                          <div className="text-xs text-gray-500 mt-1">{event.description}</div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Timeline Events */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Service Timeline
            {timeline.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {timeline.length} events
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {timeline.length > 0 ? (
            <Reorder.Group
              axis="y"
              values={timeline}
              onReorder={reorderTimeline}
              className="space-y-3"
            >
              {timeline.map((event, index) => (
                <Reorder.Item
                  key={event.id}
                  value={event}
                  className="bg-gray-50 rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center mt-1">
                      <GripVertical className="w-4 h-4 text-gray-400 mb-2" />
                      <div className="text-xs text-gray-500 font-medium">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <Label htmlFor={`title-${event.id}`} className="text-sm">Event Name</Label>
                        <Input
                          id={`title-${event.id}`}
                          value={event.title}
                          onChange={(e) => updateTimelineEvent(event.id, { title: e.target.value })}
                          placeholder="e.g., Opening Prayer, Musical Selection"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`description-${event.id}`} className="text-sm">Details (Optional)</Label>
                        <Input
                          id={`description-${event.id}`}
                          value={event.description}
                          onChange={(e) => updateTimelineEvent(event.id, { description: e.target.value })}
                          placeholder="e.g., Solo by Anne Williams, Psalm 23"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTimelineEvent(event.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">No events in the timeline yet</p>
              <p className="text-sm text-gray-400">
                Use Quick Add above or create custom events below
              </p>
            </div>
          )}

          {/* Add Custom Event */}
          <Button
            onClick={() => addTimelineEvent({ title: '', description: '' })}
            variant="outline"
            className="w-full mt-4 border-dashed border-2 h-12 text-gray-600 hover:text-gray-800"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Custom Event
          </Button>
        </CardContent>
      </Card>

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          💡 Service Planning Tips
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Drag events up or down to reorder the timeline</li>
          <li>• A typical service lasts 45-60 minutes</li>
          <li>• Consider including both formal elements and personal touches</li>
          <li>• Ask family members if they'd like to participate in specific events</li>
        </ul>
      </div>
    </div>
  );
}