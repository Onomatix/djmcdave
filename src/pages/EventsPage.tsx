import { useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink 
} from "@/components/ui/pagination";
import EventsSection from "../components/EventsSection";
import ScrollToTop from "../components/ScrollToTop";

// Import event images
import djSetupWedding from '../assets/events/dj-setup-wedding-reception.png';
import weddingReceptionGuests from '../assets/events/wedding-reception-guests.png';
import premiumTableWedding from '../assets/events/premium-table-wedding-reception.png';
import weddingCeremony from '../assets/events/wedding-ceremony-performance.png';
import beachDjSetup from '../assets/events/beach-dj-setup.png';
import sunsetBeachDj from '../assets/events/sunset-beach-dj-performance.png';
import beachsideEvening from '../assets/events/beachside-evening-event.png';
import corporateEventHall from '../assets/events/corporate-event-hall-setup.png';
import discoFeverPoster from '../assets/events/disco-fever-event-poster.png';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: djSetupWedding,
    alt: "DJ setup at wedding reception",
    category: "Weddings"
  },
  {
    id: 2,
    src: corporateEventHall,
    alt: "Corporate event hall setup",
    category: "Corporate"
  },
  {
    id: 3,
    src: weddingReceptionGuests,
    alt: "Wedding reception with guests",
    category: "Weddings"
  },
  {
    id: 4,
    src: premiumTableWedding,
    alt: "Premium table setup at wedding reception",
    category: "Weddings"
  },
  {
    id: 5,
    src: weddingCeremony,
    alt: "Wedding ceremony performance",
    category: "Weddings"
  },
  {
    id: 6,
    src: beachDjSetup,
    alt: "Beach DJ setup",
    category: "Beach"
  },
  {
    id: 7,
    src: sunsetBeachDj,
    alt: "Sunset beach DJ performance",
    category: "Beach"
  },
  {
    id: 8,
    src: beachsideEvening,
    alt: "Beachside evening event",
    category: "Beach"
  },
  {
    id: 9,
    src: discoFeverPoster,
    alt: "Disco Fever event poster",
    category: "Nightlife"
  }
];

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", "Weddings", "Corporate", "Beach", "Nightlife"];

  const filteredImages = galleryImages.filter(
    img => activeCategory === "All" || img.category === activeCategory
  );

  return (
    <div className="pt-20 bg-dj-dark min-h-screen">
      <ScrollToTop />

      {/* Featured Image Carousel */}
      <section className="py-8 bg-dj-gray/10">
        <div className="container mx-auto px-4">
          <h1 className="section-title text-center mb-8">Events Gallery</h1>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {galleryImages.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="p-1">
                    <div className="aspect-video overflow-hidden rounded-xl">
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-dj-purple/80 text-white border-none hover:bg-dj-purple" />
            <CarouselNext className="right-2 bg-dj-purple/80 text-white border-none hover:bg-dj-purple" />
          </Carousel>
        </div>
      </section>

      {/* Gallery with Filters */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Browse Event Photos</h2>

        {/* Category Filters */}
        <div className="mb-6 overflow-x-auto py-2">
          <div className="flex flex-nowrap sm:flex-wrap gap-2 justify-start sm:justify-center min-w-min sm:min-w-0">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map(image => (
            <div 
              key={image.id} 
              className="gallery-item aspect-square"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="gallery-item-overlay">
                <span className="text-dj-purple text-xs sm:text-sm font-medium">{image.category}</span>
                <h3 className="text-white text-base sm:text-xl font-bold">{image.alt}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink isActive href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
};

export default EventsPage;
