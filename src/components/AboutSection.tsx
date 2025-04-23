
import { Link } from 'react-router-dom';
import { Music, Calendar, Mic, GraduationCap, Award, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="content-section bg-dj-gray/10">
      <div className="container mx-auto">
        <h2 className="section-title text-center">About DJ MC Dave</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop" 
                alt="DJ MC Dave" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 glass-card rounded-xl w-32 h-32 flex flex-col items-center justify-center">
              <p className="text-white text-3xl font-bold">30+</p>
              <p className="text-white/70 text-sm">Years Experience</p>
            </div>
          </div>
          
          {/* Bio Content */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Professional DJ, Remix Producer, & Educator</h3>
            
            <div className="space-y-4 text-white/80">
              <p>
                DJ MC Dave started his journey in the late 80s, mastering the art of Vinyl mixing 
                and developing an extensive knowledge of music across various genres.
              </p>
              
              <p>
                With performances spanning North America, Asia, and Europe, DJ MC Dave has 
                brought his unique sound to both private and corporate events. His versatility 
                allows him to excel in genres including Funk, Latin, Reggaeton, Retro, R&B, 
                Soul, Hip Hop, House, EDM, Kollywood, Bollywood Bhangra, and Top 40 Hits.
              </p>
              
              <p>
                Beyond DJing, Dave is a multi-talented Remix Producer, Emcee, and Rapper. 
                He's also the founder of SoundKontrols DJ Academy, which has successfully 
                trained over 300 students globally.
              </p>
              
              <p>
                His unique background includes a Degree in Electrical Engineering, an MBA, 
                and certification as an ACE Personal Trainer, bringing a distinctive blend of 
                technical knowledge and creative artistry to his work.
              </p>
            </div>
            
           {/*  <div className="mt-8">
              <Link to="/about" className="accent-btn">
                Read Full Bio
              </Link>
            </div> */}
          </div>
        </div>
        
        {/* Skills & Expertise */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-full bg-dj-purple/20 flex items-center justify-center mb-4">
              <Music size={24} className="text-dj-purple" />
            </div>
            <h4 className="text-white text-xl font-bold mb-2">Versatile Music Knowledge</h4>
            <p className="text-white/70">
              Expertise across Funk, Latin, Reggaeton, Retro, R&B, Soul, Hip Hop, House, EDM, Kollywood, Bollywood Bhangra, and Top 40 Hits.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-full bg-dj-pink/20 flex items-center justify-center mb-4">
              <Mic size={24} className="text-dj-pink" />
            </div>
            <h4 className="text-white text-xl font-bold mb-2">Multi-Talented Artist</h4>
            <p className="text-white/70">
              Beyond DJing, Dave is a skilled Remix Producer, Emcee, and Rapper, bringing versatility to any event.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-full bg-dj-blue/20 flex items-center justify-center mb-4">
              <GraduationCap size={24} className="text-dj-blue" />
            </div>
            <h4 className="text-white text-xl font-bold mb-2">Experienced Educator</h4>
            <p className="text-white/70">
              Founder of SoundKontrols DJ Academy with a track record of training over 300 students globally.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-full bg-dj-purple/20 flex items-center justify-center mb-4">
              <Calendar size={24} className="text-dj-purple" />
            </div>
            <h4 className="text-white text-xl font-bold mb-2">Global Performer</h4>
            <p className="text-white/70">
              Performed across North America, Asia, and Europe for both private and corporate events.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-full bg-dj-pink/20 flex items-center justify-center mb-4">
              <Award size={24} className="text-dj-pink" />
            </div>
            <h4 className="text-white text-xl font-bold mb-2">Unique Background</h4>
            <p className="text-white/70">
              Holds a Degree in Electrical Engineering, an MBA, and is an ACE Certified Personal Trainer.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-full bg-dj-blue/20 flex items-center justify-center mb-4">
              <Heart size={24} className="text-dj-blue" />
            </div>
            <h4 className="text-white text-xl font-bold mb-2">Creative Approach</h4>
            <p className="text-white/70">
              Values versatility and creativity in DJing, bringing a unique flair to every performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
