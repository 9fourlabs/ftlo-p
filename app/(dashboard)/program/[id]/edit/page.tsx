'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LiveProgramEditor } from '@/components/program/LiveProgramEditor';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditProgramPage() {
  const params = useParams();
  const router = useRouter();
  const programId = params.id as string;
  
  const { data: program, error, isLoading } = useSWR(
    `/api/programs/${programId}`,
    fetcher
  );

  const handleSave = async (data: any) => {
    try {
      const response = await fetch(`/api/programs/${programId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save program');
      }

      // If it's no longer a draft, redirect to dashboard
      if (!data.isDraft) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error saving program:', error);
      // Show error toast/notification
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading program...</p>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Program not found</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-primary hover:underline"
          >
            Return to dashboard
          </button>
        </div>
      </div>
    );
  }

  // For demo purposes, use sample data if API doesn't return full data
  const programData = {
    ...program,
    firstName: program.firstName || 'John',
    lastName: program.lastName || 'Doe',
    birthDate: program.birthDate || '1950-01-15',
    deathDate: program.deathDate || '2024-12-01',
    birthPlace: program.birthPlace || 'New York, NY',
    deathPlace: program.deathPlace || 'Los Angeles, CA',
    selectedTemplate: program.selectedTemplate || 'eternal-grace',
    obituary: program.obituary || '',
    lovedOneStory: program.lovedOneStory || '',
    serviceEvents: program.serviceEvents || [],
    photos: program.photos || [],
  };

  return (
    <LiveProgramEditor
      initialData={programData}
      programId={programId}
      onSave={handleSave}
    />
  );
}