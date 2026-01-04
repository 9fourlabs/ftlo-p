import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


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


interface Program {
  // Basic information
  firstName?: string;
  lastName?: string;
  middleName?: string;
  nickname?: string;
  birthDate?: string;
  deathDate?: string;
  birthPlace?: string;
  deathPlace?: string;
  
  // Family
  parents?: string;
  spouse?: string;
  children?: string[];
  siblings?: string[];
  
  // Service
  serviceName?: string;
  serviceDate?: string;
  serviceTime?: string;
  venue?: string;
  venueAddress?: string;
  officiant?: string;
  additionalInfo?: string;
  
  // Content
  obituary?: string;
  timeline?: TimelineEvent[];
  photos?: Photo[];
  
  // Design
  template?: string;
  customizations?: Record<string, any>;
}

interface ProgramState {
  program: Program;
  
  // Actions
  updateProgram: (data: Partial<Program>) => void;
  saveProgram: (data: Program) => Promise<void>;
  resetProgram: () => void;
}

const initialProgram: Program = {
  firstName: '',
  lastName: '',
  middleName: '',
  nickname: '',
  birthDate: '',
  deathDate: '',
  birthPlace: '',
  deathPlace: '',
  parents: '',
  spouse: '',
  children: [],
  siblings: [],
  serviceName: '',
  serviceDate: '',
  serviceTime: '',
  venue: '',
  venueAddress: '',
  officiant: '',
  additionalInfo: '',
  obituary: '',
  timeline: [],
  photos: [],
  template: 'classic-elegance',
  customizations: {},
};

export const useProgramStore = create<ProgramState>()(
  persist(
    (set) => ({
      program: initialProgram,
      
      updateProgram: (data) => set((state) => ({
        program: { ...state.program, ...data }
      })),
      
      saveProgram: async (data) => {
        // In a real app, this would save to a backend
        set({ program: data });
        return Promise.resolve();
      },
      
      resetProgram: () => set({ program: initialProgram }),
    }),
    {
      name: 'funeral-program-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);