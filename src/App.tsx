import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LandingPage } from '@/pages/LandingPage';
import { CreateProgram } from '@/pages/CreateProgram';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create" element={<CreateProgram />} />
                <Route path="/templates" element={<div className="container py-16">Templates page coming soon</div>} />
                <Route path="/how-it-works" element={<div className="container py-16">How it works page coming soon</div>} />
                <Route path="/pricing" element={<div className="container py-16">Pricing page coming soon</div>} />
                <Route path="/help" element={<div className="container py-16">Help page coming soon</div>} />
                <Route path="/contact" element={<div className="container py-16">Contact page coming soon</div>} />
                <Route path="/faq" element={<div className="container py-16">FAQ page coming soon</div>} />
                <Route path="/privacy" element={<div className="container py-16">Privacy policy coming soon</div>} />
                <Route path="/terms" element={<div className="container py-16">Terms of service coming soon</div>} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;