import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-gray-700">
                <Heart className="h-4 w-4 text-white fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Memorial</span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Create beautiful, personalized funeral programs to honor your loved ones with dignity and care.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/create" className="hover:text-gray-900 transition-colors">Create Program</Link></li>
              <li><Link to="/templates" className="hover:text-gray-900 transition-colors">Templates</Link></li>
              <li><Link to="/how-it-works" className="hover:text-gray-900 transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/help" className="hover:text-gray-900 transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-gray-900 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Memorial. Made with care for families everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}