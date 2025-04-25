import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Ticket, ExternalLink } from 'lucide-react';

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  image: string;
  ticketLink: string;
};

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Summer Beach Party",
    date: "June 15, 2025",
    time: "8:00 PM - 2:00 AM",
    venue: "Ocean Club",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    ticketLink: "https://tickets.example.com/event1"
  },
  {
    id: 2,
    title: "EDM Festival",
    date: "July 10, 2025",
    time: "6:00 PM - 3:00 AM",
    venue: "City Arena",
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1578736641330-3155e606cd40?q=80&w=2070&auto=format&fit=crop",
    ticketLink: "https://tickets.example.com/event2"
  },
  {
    id: 3,
    title: "Corporate Gala",
    date: "August 5, 2025",
    time: "7:00 PM - 12:00 AM",
    venue: "Grand Hotel",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    ticketLink: "https://tickets.example.com/event3"
  }
];

const EventsSection = () => {
  const [hoverEvent, setHoverEvent] = useState<number | null>(null);
  
  return (
    <section id="events" className="content-section bg-dj-gray/10">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Upcoming Events</h2>
        <p className="section-subtitle">
          Catch DJ MC Dave live at these upcoming performances
        </p>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <div 
              key={event.id} 
              className="glass-card overflow-hidden"
              onMouseEnter={() => setHoverEvent(event.id)}
              onMouseLeave={() => setHoverEvent(null)}
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoverEvent === event.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center text-dj-purple mb-1">
                    <Calendar size={16} className="mr-1" />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="text-white text-xl font-bold">{event.title}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start mb-2">
                  <MapPin size={16} className="text-dj-pink mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white">{event.venue}</p>
                    <p className="text-white/70 text-sm">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <Clock size={16} className="text-dj-blue mr-2" />
                  <p className="text-white/70">{event.time}</p>
                </div>
                
                <a 
                  href={event.ticketLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full p-2 bg-gradient-to-r from-dj-purple to-dj-pink rounded-md text-white hover:shadow-lg hover:shadow-dj-purple/30 transition-all"
                >
                  <Ticket size={16} className="mr-2" />
                  Get Tickets
                </a>
              </div>
            </div>
          ))}
        </div>
        
    
        
        {/* View All Events Button */}
        <div className="text-center mt-12">
          <Link to="/events" className="accent-btn">
            <Calendar className="mr-2" size={18} />
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
