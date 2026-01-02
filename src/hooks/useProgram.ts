import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type CreateProgramData } from '../lib/api';

export function useProgram(programId?: string) {
  return useQuery({
    queryKey: ['program', programId],
    queryFn: () => api.getProgram(programId!),
    enabled: !!programId,
  });
}

export function usePrograms() {
  return useQuery({
    queryKey: ['programs'],
    queryFn: () => api.listPrograms(),
  });
}

export function useCreateProgram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateProgramData) => api.createProgram(data),
    onSuccess: (program) => {
      queryClient.setQueryData(['program', program.id], program);
      queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
  });
}

export function useUpdateProgram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateProgramData> }) => 
      api.updateProgram(id, data),
    onSuccess: (program) => {
      queryClient.setQueryData(['program', program.id], program);
      queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => api.deleteProgram(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['program', id] });
      queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
  });
}

export function useUploadPhoto() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ programId, file }: { programId: string; file: File }) => 
      api.uploadPhoto(programId, file),
    onSuccess: (_, { programId }) => {
      queryClient.invalidateQueries({ queryKey: ['program', programId] });
    },
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (photoId: string) => api.deletePhoto(photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['program'] });
    },
  });
}

export function useSetPrimaryPhoto() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (photoId: string) => api.setPrimaryPhoto(photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['program'] });
    },
  });
}