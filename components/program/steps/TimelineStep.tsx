import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, X, GripVertical } from 'lucide-react';
import { ProgramData } from '../MultiStepProgramForm';

interface TimelineStepProps {
  data: ProgramData;
  updateData: (data: Partial<ProgramData>) => void;
}

export function TimelineStep({ data, updateData }: TimelineStepProps) {
  const [newEvent, setNewEvent] = useState({
    time: '',
    title: '',
    description: '',
    participants: '',
  });

  const addTimelineEvent = () => {
    if (newEvent.title) {
      const updatedTimeline = [...data.timeline, {
        id: Date.now().toString(),
        ...newEvent,
      }];
      updateData({ timeline: updatedTimeline });
      setNewEvent({ time: '', title: '', description: '', participants: '' });
    }
  };

  const removeTimelineEvent = (id: string) => {
    const updatedTimeline = data.timeline.filter(event => event.id !== id);
    updateData({ timeline: updatedTimeline });
  };

  const moveEvent = (index: number, direction: 'up' | 'down') => {
    const newTimeline = [...data.timeline];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newTimeline.length) {
      [newTimeline[index], newTimeline[newIndex]] = [newTimeline[newIndex], newTimeline[index]];
      updateData({ timeline: newTimeline });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Order of Service</h2>
        <p className="text-muted-foreground">
          Create the timeline for the memorial service.
        </p>
      </div>

      {/* Existing Timeline Events */}
      {data.timeline.length > 0 && (
        <div className="space-y-3">
          <Label>Service Order</Label>
          {data.timeline.map((event, index) => (
            <Card key={event.id} className="p-4">
              <div className="flex gap-3">
                <div className="flex flex-col gap-1 pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveEvent(index, 'up')}
                    disabled={index === 0}
                    className="h-6 w-6 p-0"
                  >
                    <GripVertical className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      {event.time && (
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTimelineEvent(event.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  )}
                  {event.participants && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Participants:</span> {event.participants}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Timeline Event */}
      <Card className="p-4">
        <div className="space-y-4">
          <h3 className="font-medium">Add Service Element</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventTitle">Event Title *</Label>
              <Input
                id="eventTitle"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Opening Prayer, Eulogy, Musical Selection..."
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="eventTime">Time (optional)</Label>
              <Input
                id="eventTime"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                placeholder="10:00 AM"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="eventDescription">Description (optional)</Label>
            <Textarea
              id="eventDescription"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Additional details about this part of the service..."
              className="mt-2"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="eventParticipants">Participants (optional)</Label>
            <Input
              id="eventParticipants"
              value={newEvent.participants}
              onChange={(e) => setNewEvent({ ...newEvent, participants: e.target.value })}
              placeholder="Rev. John Smith, Mary Johnson, Church Choir..."
              className="mt-2"
            />
          </div>

          <Button
            type="button"
            onClick={addTimelineEvent}
            disabled={!newEvent.title}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Service Order
          </Button>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>Common service elements include: Processional, Welcome, Opening Prayer, Scripture Reading, 
        Musical Selection, Eulogy, Remembrances, Closing Prayer, Recessional</p>
      </div>
    </div>
  );
}