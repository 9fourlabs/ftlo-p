import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  FileText, 
  Image, 
  Download, 
  Star, 
  Clock, 
  Shield, 
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Beautiful Templates",
    description: "Choose from professionally designed templates that honor your loved one's memory"
  },
  {
    icon: <Image className="h-6 w-6" />,
    title: "Photo Integration",
    description: "Easily add and arrange photos to create a personal tribute"
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "Print-Ready PDF",
    description: "Get high-quality PDFs ready for professional printing"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Quick Creation",
    description: "Complete your memorial program in minutes, not hours"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure & Private",
    description: "Your memories are protected with enterprise-grade security"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Family Collaboration",
    description: "Work together with family members to create the perfect tribute"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Daughter",
    content: "Creating my father's memorial program was so much easier than I expected. The templates are beautiful and the process was intuitive during such a difficult time.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Son",
    content: "The quality of the final program was outstanding. Everyone at the service commented on how professional and touching it was.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Spouse",
    content: "I was able to create a beautiful tribute to my husband in just 30 minutes. The drag-and-drop interface made it so simple.",
    rating: 5
  }
];

const steps = [
  {
    number: "1",
    title: "Share Their Story",
    description: "Tell us about your loved one - their life, achievements, and what made them special."
  },
  {
    number: "2",
    title: "Add Photos & Memories",
    description: "Upload cherished photos and create a visual timeline of their life."
  },
  {
    number: "3",
    title: "Customize Design",
    description: "Choose a template and customize colors, fonts, and layout to reflect their personality."
  },
  {
    number: "4",
    title: "Download & Print",
    description: "Get your professional-quality PDF ready for printing or digital sharing."
  }
];

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.1)_50%,transparent_75%,transparent)] bg-[length:20px_20px]"></div>
        <div className="container relative mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Heart className="mr-1 h-3 w-3 fill-current" />
              Trusted by 10,000+ families
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Honor Their Memory with{' '}
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Beautiful Programs
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
              Create professional funeral programs in minutes. Our compassionate platform helps you honor your loved one with dignity, beautiful design, and heartfelt care.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/create">
                <Button size="xl" className="group">
                  Create Memorial Program
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" size="xl">
                  View Templates
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Free to start • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to create a lasting tribute
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines beautiful design with thoughtful features to help you create meaningful memorial programs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 text-white group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple steps to honor their memory
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Creating a beautiful memorial program is easy with our guided process.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-gray-700 text-white text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/create">
              <Button size="lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by families everywhere
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See what families are saying about Memorial
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-base text-gray-900">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start creating their memorial today
          </h2>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of families who have trusted us to help honor their loved ones. 
            Create a beautiful memorial program in minutes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/create">
              <Button size="xl" variant="secondary">
                Create Memorial Program
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Free to start
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Professional quality
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}