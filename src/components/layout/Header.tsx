import { Button } from '@/components/ui/button';
import { Heart, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-gray-700">
            <Heart className="h-4 w-4 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Memorial</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link 
            to="/create" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Create Program
          </Link>
          <Link 
            to="/templates" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Templates
          </Link>
          <Link 
            to="/how-it-works" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            How It Works
          </Link>
          <Link 
            to="/pricing" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/create">
            <Button size="sm" className="hidden sm:inline-flex">
              Start Creating
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}