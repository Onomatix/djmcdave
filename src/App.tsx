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

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ErrorBoundary>
          <BrowserRouter>
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route
                  path="/music"
                  element={
                    <ErrorBoundary>
                      <MusicPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/videos"
                  element={
                    <ErrorBoundary>
                      <VideosPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/gallery"
                  element={
                    <ErrorBoundary>
                      <GalleryPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ErrorBoundary>
                      <AboutPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/academy"
                  element={
                    <ErrorBoundary>
                      <AcademyPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/events"
                  element={
                    <ErrorBoundary>
                      <EventsPage />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <ErrorBoundary>
                      <ContactPage />
                    </ErrorBoundary>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
