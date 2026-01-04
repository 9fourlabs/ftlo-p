'use client';

import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MultiStepProgramForm } from '@/components/program/MultiStepProgramForm';

export default function CreateProgramPage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
            <Heart className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Create Memorial Program
          </h1>
        </div>
      </div>

      <MultiStepProgramForm />
    </section>
  );
}