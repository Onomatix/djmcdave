import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO 
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Return to DJ McDave's homepage."
      />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full px-6 py-12 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return Home
            </Link>
            <Link
              to="/contact"
              className="inline-block w-full px-6 py-3 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
