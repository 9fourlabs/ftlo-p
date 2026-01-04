'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Heart, Plus, FileText, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ProgramsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="h-[200px]">
          <CardHeader>
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

function RecentPrograms() {
  // TODO: Implement API call to get user's programs
  const { data: programs = [] } = useSWR('/api/programs', fetcher);

  if (programs.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No memorial programs yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first memorial program to honor a loved one
          </p>
          <Button asChild>
            <Link href="/dashboard/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Program
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {programs.map((program: any) => (
        <Card key={program.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">
                  {program.firstName} {program.lastName}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {program.birthDate} - {program.deathDate}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Service: {program.serviceDate || 'Not set'}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <FileText className="w-4 h-4 mr-2" />
                Template: {program.template || 'Classic'}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" asChild className="flex-1">
                <Link href={`/dashboard/edit/${program.id}`}>Edit</Link>
              </Button>
              <Button size="sm" asChild className="flex-1">
                <Link href={`/dashboard/preview/${program.id}`}>Preview</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Memorial Programs
          </h1>
          <p className="text-muted-foreground">
            Create and manage memorial programs for your loved ones
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link href="/dashboard/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Program
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ProgramsSkeleton />}>
        <RecentPrograms />
      </Suspense>
    </section>
  );
}