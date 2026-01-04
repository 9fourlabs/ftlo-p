import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Hero Section */}
      <section className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Simple Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Heart className="w-8 h-8 text-primary fill-current" />
          </div>
          
          {/* Clean Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Memorial Programs
          </h1>
          
          {/* Simple Subtitle */}
          <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto">
            Create beautiful, personalized funeral programs to honor your loved ones with dignity and care.
          </p>
          
          {/* Single CTA */}
          <Button 
            asChild 
            size="lg" 
            className="h-12 px-8 font-medium text-lg"
          >
            <Link href="/dashboard">
              Create Program
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}