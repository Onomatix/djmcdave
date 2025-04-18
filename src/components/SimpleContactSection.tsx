
import { Instagram, Youtube, Facebook, Smartphone } from 'lucide-react';
import ContactForm from './ContactForm';

const SimpleContactSection = () => {
  const handleWhatsAppClick = () => {
    // WhatsApp phone number with country code (Malaysia +60)
    const phoneNumber = "+60162169474";
    // Optional pre-filled message
    const message = encodeURIComponent("Hi DJ MC Dave, I'd like to book you for an event!");
    // Open WhatsApp with the phone number and message
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };
  
  return (
    <section id="contact" className="content-section">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Get In Touch</h2>
        <p className="section-subtitle">
          Book DJ MC Dave for your next event or reach out with any inquiries
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />
          
          {/* Contact Info & Social Media */}
          <div>
            <div className="glass-card p-8 rounded-xl mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Connect With DJ MC Dave</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Booking & Inquiries</h4>
                  <p className="text-white/70">dave.ramana@soundkontrols.com</p>
                  <p className="text-white/70">+60162169474</p>
                  
                  {/* WhatsApp Direct Contact Button */}
                  <button 
                    onClick={handleWhatsAppClick}
                    className="mt-3 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    <Smartphone size={18} />
                    <span>Contact via WhatsApp</span>
                  </button>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">SK Events</h4>
                  <p className="text-white/70">info@soundkontrols.com</p>
                  <p className="text-white/70">+60162169474</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Management & Press</h4>
                  <p className="text-white/70">info@soundkontrols.com</p>
                  <p className="text-white/70">+60162169474</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Academy Location</h4>
                  <p className="text-white/70">SK Events</p>
                  <p className="text-white/70">27, Jalan 14/57, Petaling Jaya,</p>
                  <p className="text-white/70">46100, Selangor</p>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Follow DJ MC Dave</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://www.instagram.com/djmcdave?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-dj-gray/30 rounded-lg hover:bg-dj-gray/50 transition-colors"
                >
                  <Instagram size={24} className="text-pink-500 mr-3" />
                  <span className="text-white">Instagram</span>
                </a>
                
                <a 
                  href="https://www.youtube.com/@vrsimha" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-dj-gray/30 rounded-lg hover:bg-dj-gray/50 transition-colors"
                >
                  <Youtube size={24} className="text-red-500 mr-3" />
                  <span className="text-white">YouTube</span>
                </a>
                
                <a 
                  href="https://www.facebook.com/soundkontrolsdjacademy?mibextid=ZbWKwL" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-dj-gray/30 rounded-lg hover:bg-dj-gray/50 transition-colors"
                >
                  <Facebook size={24} className="text-blue-500 mr-3" />
                  <span className="text-white">Facebook</span>
                </a>
                
                <a 
                  href="https://www.tiktok.com/@soundkontrols_djacademy?_t=ZS-8vNvSC2msZM&_r=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-dj-gray/30 rounded-lg hover:bg-dj-gray/50 transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 448 512" 
                    fill="currentColor" 
                    className="text-white mr-3"
                  >
                    <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3v178.8A162.6 162.6 0 1 1 185 188.3v89.9a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2 121.4 121.4 0 0 0 66.6 93.9A121.5 121.5 0 0 0 448 209.9z" />
                  </svg>
                  <span className="text-white">TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleContactSection;
