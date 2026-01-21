import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Hero Section with warm gradient mesh */}
      <section className="relative flex items-center justify-center min-h-[80vh] px-4 overflow-hidden">
        {/* Gradient mesh background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.5) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%)'
          }}
        />
        
        <div className="relative text-center max-w-2xl mx-auto">
          {/* Warm icon with gradient */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-8 shadow-color">
            <Heart className="w-10 h-10 text-primary fill-current" />
          </div>
          
          {/* Elegant serif heading */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 tracking-tight">
            Memorial Programs
          </h1>
          
          {/* Warm, comforting subtitle */}
          <p className="text-xl text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
            Create beautiful eulogies and funeral programs that celebrate life and preserve precious memories.
          </p>
          
          {/* Gradient CTA button */}
          <Button 
            asChild 
            size="xl"
            variant="gradient"
            className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/dashboard">
              Begin Creating
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}