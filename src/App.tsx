import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import LoadingSpinner from "./components/ui/loading-spinner.tsx";

// Lazy load page components
const MusicPage = lazy(() => import("./pages/MusicPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const AcademyPage = lazy(() => import("./pages/AcademyPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const VideosPage = lazy(() => import("./pages/VideosPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // Get the base URL from the environment or default to '/'
  const basename = import.meta.env.BASE_URL;

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter basename={basename}>
          <TooltipProvider>
            <ErrorBoundary>
              <div className="flex flex-col min-h-screen w-full">
                <Navbar />
                <main className="flex-grow w-full">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/music" element={<MusicPage />} />
                      <Route path="/videos" element={<VideosPage />} />
                      <Route path="/gallery" element={<GalleryPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/academy" element={<AcademyPage />} />
                      <Route path="/events" element={<EventsPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </ErrorBoundary>
          </TooltipProvider>
        </BrowserRouter>
      </HelmetProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
