'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Clock, 
  Music, 
  Book, 
  Mic,
  Heart,
  Users,
  Church,
  Flower,
  X,
  Edit2
} from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ServiceEvent {
  id: string;
  type: string;
  title: string;
  description?: string;
  performer?: string;
  duration?: number;
  notes?: string;
}

const eventTypes = [
  { value: 'processional', label: 'Processional', icon: Church },
  { value: 'welcome', label: 'Welcome & Opening', icon: Users },
  { value: 'prayer', label: 'Prayer', icon: Church },
  { value: 'scripture', label: 'Scripture Reading', icon: Book },
  { value: 'eulogy', label: 'Eulogy', icon: Mic },
  { value: 'tribute', label: 'Personal Tribute', icon: Heart },
  { value: 'music', label: 'Musical Selection', icon: Music },
  { value: 'poem', label: 'Poem Reading', icon: Book },
  { value: 'slideshow', label: 'Photo/Video Tribute', icon: Heart },
  { value: 'moment-silence', label: 'Moment of Silence', icon: Clock },
  { value: 'closing', label: 'Closing Prayer', icon: Church },
  { value: 'recessional', label: 'Recessional', icon: Church },
  { value: 'custom', label: 'Custom Event', icon: Plus },
];

const commonTemplates = [
  {
    name: 'Traditional Christian Service',
    events: [
      { type: 'processional', title: 'Processional Music' },
      { type: 'welcome', title: 'Welcome & Opening Prayer' },
      { type: 'scripture', title: 'Scripture Reading' },
      { type: 'eulogy', title: 'Eulogy' },
      { type: 'music', title: 'Hymn' },
      { type: 'tribute', title: 'Family Tributes' },
      { type: 'closing', title: 'Closing Prayer & Benediction' },
      { type: 'recessional', title: 'Recessional' },
    ],
  },
  {
    name: 'Celebration of Life',
    events: [
      { type: 'welcome', title: 'Welcome & Introduction' },
      { type: 'slideshow', title: 'Photo Montage' },
      { type: 'tribute', title: 'Family & Friends Share Memories' },
      { type: 'music', title: 'Favorite Songs' },
      { type: 'eulogy', title: 'Life Story' },
      { type: 'custom', title: 'Toast to Life' },
    ],
  },
  {
    name: 'Simple Memorial',
    events: [
      { type: 'welcome', title: 'Opening Words' },
      { type: 'eulogy', title: 'Remembrance' },
      { type: 'moment-silence', title: 'Moment of Reflection' },
      { type: 'closing', title: 'Closing' },
    ],
  },
];

function SortableEvent({ event, onEdit, onDelete }: {
  event: ServiceEvent;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const EventIcon = eventTypes.find(t => t.value === event.type)?.icon || Plus;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`p-4 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div
          {...attributes}
          {...listeners}
          className="mt-1 cursor-move text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 mb-1">
              <EventIcon className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-semibold">{event.title}</h4>
              {event.duration && (
                <Badge variant="secondary" className="text-xs">
                  {event.duration} min
                </Badge>
              )}
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {event.performer && (
            <p className="text-sm text-muted-foreground">By: {event.performer}</p>
          )}
          {event.description && (
            <p className="text-sm mt-1">{event.description}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

interface ServiceTimelineBuilderProps {
  events: ServiceEvent[];
  onUpdate: (events: ServiceEvent[]) => void;
}

export function ServiceTimelineBuilder({ events, onUpdate }: ServiceTimelineBuilderProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ServiceEvent | null>(null);
  const [formData, setFormData] = useState<Partial<ServiceEvent>>({
    type: 'eulogy',
    title: '',
    description: '',
    performer: '',
    duration: undefined,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = events.findIndex((e) => e.id === active.id);
      const newIndex = events.findIndex((e) => e.id === over?.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        onUpdate(arrayMove(events, oldIndex, newIndex));
      }
    }
  };

  const handleAddEvent = () => {
    if (!formData.title) return;

    const newEvent: ServiceEvent = {
      id: `event-${Date.now()}`,
      type: formData.type || 'custom',
      title: formData.title,
      description: formData.description,
      performer: formData.performer,
      duration: formData.duration,
    };

    if (editingEvent) {
      onUpdate(events.map(e => e.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : e));
      setEditingEvent(null);
    } else {
      onUpdate([...events, newEvent]);
    }

    setFormData({
      type: 'eulogy',
      title: '',
      description: '',
      performer: '',
      duration: undefined,
    });
    setShowAddForm(false);
  };

  const handleDeleteEvent = (id: string) => {
    onUpdate(events.filter(e => e.id !== id));
  };

  const handleEditEvent = (event: ServiceEvent) => {
    setEditingEvent(event);
    setFormData({
      type: event.type,
      title: event.title,
      description: event.description,
      performer: event.performer,
      duration: event.duration,
    });
    setShowAddForm(true);
  };

  const loadTemplate = (template: typeof commonTemplates[0]) => {
    const newEvents = template.events.map((e, index) => ({
      ...e,
      id: `event-${Date.now()}-${index}`,
    }));
    onUpdate(newEvents);
  };

  const getTotalDuration = () => {
    return events.reduce((sum, event) => sum + (event.duration || 0), 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Service Timeline</h3>
        <p className="text-muted-foreground">
          Organize the order of events for the memorial service
        </p>
      </div>

      {/* Quick Templates */}
      {events.length === 0 && (
        <Card className="p-6 border-dashed">
          <h4 className="font-semibold mb-3">Start with a template:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {commonTemplates.map((template) => (
              <Button
                key={template.name}
                variant="outline"
                className="justify-start h-auto py-3"
                onClick={() => loadTemplate(template)}
              >
                <div className="text-left">
                  <p className="font-semibold">{template.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {template.events.length} events
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Timeline */}
      <div className="space-y-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={events.map(e => e.id)}
            strategy={verticalListSortingStrategy}
          >
            {events.map((event) => (
              <SortableEvent
                key={event.id}
                event={event}
                onEdit={() => handleEditEvent(event)}
                onDelete={() => handleDeleteEvent(event.id)}
              />
            ))}
          </SortableContext>
        </DndContext>

        {/* Add Event Button/Form */}
        {showAddForm ? (
          <Card className="p-4 border-primary">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">
                  {editingEvent ? 'Edit Event' : 'Add Service Event'}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingEvent(null);
                    setFormData({
                      type: 'eulogy',
                      title: '',
                      description: '',
                      performer: '',
                      duration: undefined,
                    });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Event Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Opening Prayer"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Performer/Speaker (optional)</Label>
                  <Input
                    value={formData.performer}
                    onChange={(e) => setFormData({ ...formData, performer: e.target.value })}
                    placeholder="e.g., Rev. Smith"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      duration: e.target.value ? parseInt(e.target.value) : undefined 
                    })}
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description/Notes (optional)</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about this part of the service..."
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent} disabled={!formData.title}>
                  {editingEvent ? 'Save Changes' : 'Add Event'}
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Button
            variant="outline"
            className="w-full border-dashed"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service Event
          </Button>
        )}
      </div>

      {/* Timeline Summary */}
      {events.length > 0 && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Total service time: <strong>{getTotalDuration()} minutes</strong>
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {events.length} events
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}