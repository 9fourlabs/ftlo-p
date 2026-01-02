import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Child {
  id: string;
  name: string;
}

interface Sibling {
  id: string;
  name: string;
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
}

interface Photo {
  id: string;
  file?: File;
  url: string;
  isPrimary: boolean;
}

interface LovedOneInfo {
  firstName: string;
  lastName: string;
  middleName: string;
  nickname: string;
  birthDate: string;
  deathDate: string;
  birthPlace: string;
  deathPlace: string;
  obituary: string;
}

interface FamilyInfo {
  parents: string;
  spouse: string;
  children: Child[];
  siblings: Sibling[];
}

interface ServiceInfo {
  serviceName: string;
  serviceDate: string;
  serviceTime: string;
  venue: string;
  venueAddress: string;
}

interface ProgramState {
  currentStep: number;
  lovedOne: LovedOneInfo;
  family: FamilyInfo;
  service: ServiceInfo;
  timeline: TimelineEvent[];
  photos: Photo[];
  selectedTemplate: string;
  customizations: Record<string, any>;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateLovedOne: (data: Partial<LovedOneInfo>) => void;
  updateFamily: (data: Partial<FamilyInfo>) => void;
  updateService: (data: Partial<ServiceInfo>) => void;
  addChild: (name: string) => void;
  removeChild: (id: string) => void;
  addSibling: (name: string) => void;
  removeSibling: (id: string) => void;
  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  updateTimelineEvent: (id: string, data: Partial<TimelineEvent>) => void;
  removeTimelineEvent: (id: string) => void;
  reorderTimeline: (events: TimelineEvent[]) => void;
  addPhoto: (photo: Omit<Photo, 'id'>) => void;
  removePhoto: (id: string) => void;
  setPrimaryPhoto: (id: string) => void;
  setTemplate: (templateId: string) => void;
  updateCustomizations: (data: Record<string, any>) => void;
  resetProgram: () => void;
}

const initialState = {
  currentStep: 0,
  lovedOne: {
    firstName: '',
    lastName: '',
    middleName: '',
    nickname: '',
    birthDate: '',
    deathDate: '',
    birthPlace: '',
    deathPlace: '',
    obituary: '',
  },
  family: {
    parents: '',
    spouse: '',
    children: [],
    siblings: [],
  },
  service: {
    serviceName: 'Homegoing Celebration',
    serviceDate: '',
    serviceTime: '',
    venue: '',
    venueAddress: '',
  },
  timeline: [],
  photos: [],
  selectedTemplate: 'classic-elegance',
  customizations: {},
};

export const useProgramStore = create<ProgramState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
      
      updateLovedOne: (data) => set((state) => ({
        lovedOne: { ...state.lovedOne, ...data }
      })),
      
      updateFamily: (data) => set((state) => ({
        family: { ...state.family, ...data }
      })),
      
      updateService: (data) => set((state) => ({
        service: { ...state.service, ...data }
      })),
      
      addChild: (name) => set((state) => ({
        family: {
          ...state.family,
          children: [...state.family.children, { id: crypto.randomUUID(), name }]
        }
      })),
      
      removeChild: (id) => set((state) => ({
        family: {
          ...state.family,
          children: state.family.children.filter(c => c.id !== id)
        }
      })),
      
      addSibling: (name) => set((state) => ({
        family: {
          ...state.family,
          siblings: [...state.family.siblings, { id: crypto.randomUUID(), name }]
        }
      })),
      
      removeSibling: (id) => set((state) => ({
        family: {
          ...state.family,
          siblings: state.family.siblings.filter(s => s.id !== id)
        }
      })),
      
      addTimelineEvent: (event) => set((state) => ({
        timeline: [...state.timeline, { ...event, id: crypto.randomUUID() }]
      })),
      
      updateTimelineEvent: (id, data) => set((state) => ({
        timeline: state.timeline.map(e => e.id === id ? { ...e, ...data } : e)
      })),
      
      removeTimelineEvent: (id) => set((state) => ({
        timeline: state.timeline.filter(e => e.id !== id)
      })),
      
      reorderTimeline: (events) => set({ timeline: events }),
      
      addPhoto: (photo) => set((state) => ({
        photos: [...state.photos, { ...photo, id: crypto.randomUUID() }]
      })),
      
      removePhoto: (id) => set((state) => ({
        photos: state.photos.filter(p => p.id !== id)
      })),
      
      setPrimaryPhoto: (id) => set((state) => ({
        photos: state.photos.map(p => ({ ...p, isPrimary: p.id === id }))
      })),
      
      setTemplate: (templateId) => set({ selectedTemplate: templateId }),
      
      updateCustomizations: (data) => set((state) => ({
        customizations: { ...state.customizations, ...data }
      })),
      
      resetProgram: () => set(initialState),
    }),
    {
      name: 'funeral-program-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);