import { useEffect, useState } from 'react';
import { ZoomIn, X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

function toTitleCase(str: string) {
  return str
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatImageTitle(filename: string): string {
  // Remove the prefix (everything before first underscore or hyphen) and file extension
  const withoutPrefix = filename.split(/[-_]/).slice(1).join(' ');
  const withoutExtension = withoutPrefix.replace(/\.[^/.]+$/, '');
  return toTitleCase(withoutExtension);
}

interface ImageModule {
  default: string;
}

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [imagesByCategory, setImagesByCategory] = useState<Record<string, { path: string; filename: string }[]>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      const images = import.meta.glob<ImageModule>('../assets/gallery/*.{webp,png,jpg,jpeg}', { eager: true });
      const grouped: Record<string, { path: string; filename: string }[]> = {};

      Object.entries(images).forEach(([path, module]) => {
        const filename = path.split('/').pop()!;
        const prefix = filename.split(/[-_]/)[0];
        const category = toTitleCase(prefix);
        
        if (!grouped[category]) {
          grouped[category] = [];
        }
        
        grouped[category].push({
          path: module.default,
          filename: filename
        });
      });

      setImagesByCategory(grouped);
    };

    loadImages();
  }, []);

  const categories = ['All', ...Object.keys(imagesByCategory)];
  const filteredImages = activeCategory === 'All'
    ? Object.values(imagesByCategory).flat()
    : imagesByCategory[activeCategory] || [];

  const openImage = (image: { path: string; filename: string }) => {
    setIsImageLoading(true);
    setSelectedImage(image.path);
  };

  const closeImage = () => setSelectedImage(null);
  const handleImageLoad = () => setIsImageLoading(false);

  return (
    <section id="gallery" className="content-section">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Photo Gallery</h2>
        <p className="section-subtitle">
          A visual journey through performances, resort events, and DJ sessions around the world
        </p>

        {/* Category Tabs */}
        <div className="mb-6 sm:mb-10 overflow-x-auto py-2">
          <div className="flex flex-nowrap sm:flex-wrap gap-2 justify-start sm:justify-center min-w-min sm:min-w-0 px-4 sm:px-0">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn whitespace-nowrap ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Carousel */}
        <div className="mb-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {filteredImages.slice(0, 5).map((image, index) => (
                <CarouselItem key={index}>
                  <div className="overflow-hidden rounded-xl aspect-[16/9] relative group cursor-pointer" onClick={() => openImage(image)}>
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h4 className="text-white text-base font-medium">
                        {formatImageTitle(image.filename)}
                      </h4>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-dj-dark/70 hover:bg-dj-dark text-white border-dj-purple" />
            <CarouselNext className="right-4 bg-dj-dark/70 hover:bg-dj-dark text-white border-dj-purple" />
          </Carousel>
        </div>

        {/* Gallery Grid */}
        <div className="glass-card p-8 rounded-xl">
          <ScrollArea className="w-full h-[600px] rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-1">
              {filteredImages.map((image, index) => (
                <div key={index} className="relative group cursor-pointer" onClick={() => openImage(image)}>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={image.path}
                      alt={formatImageTitle(image.filename)}
                      className="w-full aspect-square object-cover transition-all duration-300 group-hover:opacity-90 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-dj-dark/60 p-1.5 rounded-full">
                      <ZoomIn className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <h4 className="text-white text-sm font-medium">
                      {formatImageTitle(image.filename)}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
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
                alt="Gallery image"
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

export default GallerySection;
