import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Images, 
  Users, 
  ZoomIn, 
  X 
} from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageModule {
  default: string;
}

function formatImageTitle(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove file extension
    .split('/')
    .pop()!
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const AcademyGallery = () => {
  const [images, setImages] = useState<{ path: string; filename: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const modules = import.meta.glob<ImageModule>('../assets/academy/*.{webp,png,jpg,jpeg}', { eager: true });
        console.log('Found image modules:', modules);
        
        const loadedImages = Object.entries(modules)
          .filter(([path]) => !path.includes('Academy_Hero.png')) // Exclude Academy_Hero.png
          .map(([path, mod]) => {
            console.log('Processing path:', path, 'module:', mod);
            return {
              path: mod.default,
              filename: path.split('/').pop() || ''
            };
          });
        
        console.log('Loaded images:', loadedImages);
        setImages(loadedImages);
      } catch (error) {
        console.error('Error loading academy images:', error);
      }
    };

    loadImages();
  }, []);

  const openImage = (image: { path: string; filename: string }) => {
    setIsImageLoading(true);
    setSelectedImage(image.path);
  };

  const closeImage = () => setSelectedImage(null);
  const handleImageLoad = () => setIsImageLoading(false);

  return (
    <section className="content-section bg-dj-dark/70">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Academy Gallery</h2>
        <p className="section-subtitle">
          Meet our graduates and see our DJ training in action
        </p>

        {/* Main Carousel */}
        <div className="mb-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div 
                    className="overflow-hidden rounded-xl aspect-[16/9] relative group cursor-pointer"
                    onClick={() => openImage(image)}
                  >
                    <img
                      src={image.path}
                      alt={formatImageTitle(image.filename)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-dj-dark/60 p-2 rounded-full">
                        <ZoomIn className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-dj-dark/70 hover:bg-dj-dark text-white border-dj-purple" />
            <CarouselNext className="right-4 bg-dj-dark/70 hover:bg-dj-dark text-white border-dj-purple" />
          </Carousel>
        </div>

        <div className="glass-card p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-dj-purple/20">
              <Images className="h-6 w-6 text-dj-purple" />
            </div>
            <h3 className="text-2xl font-bold text-white">Student Success Stories</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-lg">
              <div className="text-dj-purple/90 mb-3">
                <Users className="h-5 w-5 inline mr-2" />
                <span className="font-medium">300+ Graduates</span>
              </div>
              <p className="text-white/80 text-sm">
                Join our growing community of successful DJs trained through our comprehensive academy program.
              </p>
            </div>
            <div className="glass-card p-4 rounded-lg">
              <div className="text-dj-pink/90 mb-3">
                <Users className="h-5 w-5 inline mr-2" />
                <span className="font-medium">Global Alumni</span>
              </div>
              <p className="text-white/80 text-sm">
                Our graduates represent countries worldwide, bringing diverse musical influences to their DJ careers.
              </p>
            </div>
            <div className="glass-card p-4 rounded-lg">
              <div className="text-dj-blue/90 mb-3">
                <Users className="h-5 w-5 inline mr-2" />
                <span className="font-medium">Industry Placement</span>
              </div>
              <p className="text-white/80 text-sm">
                Many of our graduates have successfully landed DJ gigs at clubs, events, and radio stations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={closeImage}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-transparent border-none">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="relative aspect-[16/9] w-full">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Academy Gallery Image"
                className="w-full h-full object-contain"
                onLoad={handleImageLoad}
              />
            )}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-dj-dark/50">
                <Skeleton className="w-12 h-12 rounded-full" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AcademyGallery;
