import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Image, Music, Video, MapPin, Calendar, Smartphone, Instagram, Youtube, Facebook } from 'lucide-react';
import ScrollToTop from "../components/ScrollToTop";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    venue: '',
    services: [] as string[],
    message: ''
  });

  useEffect(() => {
    document.title = "Contact | DJ MC Dave";
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleWhatsAppSubmit = () => {
    const phoneNumber = "+60162169474";
    
    // Build the WhatsApp message
    let message = `🎵 *DJ MC Dave - Event Consultation Request*\n\n`;
    message += `*Contact Information:*\n`;
    message += `Name: ${formData.firstName} ${formData.lastName}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Phone: ${formData.phone}\n\n`;
    
    message += `*Event Details:*\n`;
    message += `Event Type: ${formData.eventType}\n`;
    message += `Date: ${formData.eventDate}\n`;
    message += `Expected Guests: ${formData.guestCount}\n`;
    message += `Budget Range: ${formData.budget}\n`;
    message += `Venue: ${formData.venue}\n\n`;
    
    if (formData.services.length > 0) {
      message += `*Services Needed:*\n`;
      message += `${formData.services.join(', ')}\n\n`;
    }
    
    if (formData.message) {
      message += `*Additional Details:*\n`;
      message += `${formData.message}\n\n`;
    }
    
    message += `---\n`;
    message += `This inquiry was sent via the DJ MC Dave website contact form.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+60162169474',
      action: 'tel:+60162169474'
    },
    {
      icon: Smartphone,
      title: 'WhatsApp',
      details: '+60162169474',
      action: 'https://wa.me/60162169474'
    },
    {
      icon: Music,
      title: 'Email',
      details: 'dave.ramana@soundkontrols.com',
      action: 'mailto:dave.ramana@soundkontrols.com'
    },
    {
      icon: MapPin,
      title: 'Academy Location',
      details: 'SK Events, 27, Jalan 14/57, Petaling Jaya, 46100, Selangor',
      action: null
    }
  ];

  const socialLinks = [
    { icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/djmcdave' },
    { icon: Facebook, name: 'Facebook', url: 'https://www.facebook.com/soundkontrolsdjacademy' },
    { icon: Youtube, name: 'YouTube', url: 'https://www.youtube.com/@mcdavedj' },
    { icon: Video, name: 'TikTok', url: 'https://www.tiktok.com/@soundkontrols_djacademy' }
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-dj-dark">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Ready to make your event unforgettable? Contact DJ MC Dave today for a personalized quote 
            and consultation. We're here to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="glass-card p-8 border-dj-gray/30">
              <h2 className="text-2xl font-bold text-white mb-6">
                Event Consultation Form
              </h2>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleWhatsAppSubmit(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John" 
                      className="bg-dj-gray/50 border-dj-gray text-white placeholder:text-white/50" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe" 
                      className="bg-dj-gray/50 border-dj-gray text-white placeholder:text-white/50" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com" 
                    className="bg-dj-gray/50 border-dj-gray text-white placeholder:text-white/50" 
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+60162169474" 
                    className="bg-dj-gray/50 border-dj-gray text-white placeholder:text-white/50" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventType" className="text-white">Event Type</Label>
                    <select 
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-dj-gray/50 border border-dj-gray rounded-md text-white"
                    >
                      <option value="">Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Club Performance">Club Performance</option>
                      <option value="Festival/Concert">Festival/Concert</option>
                      <option value="Beach Resort">Beach Resort</option>
                      <option value="Private Party">Private Party</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="eventDate" className="text-white">Event Date</Label>
                    <Input 
                      id="eventDate" 
                      name="eventDate"
                      type="date" 
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="bg-dj-gray/50 border-dj-gray text-white" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guestCount" className="text-white">Expected Guests</Label>
                    <Input 
                      id="guestCount" 
                      name="guestCount"
                      type="number" 
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      placeholder="50" 
                      className="bg-dj-gray/50 border-dj-gray text-white placeholder:text-white/50" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget" className="text-white">Budget Range</Label>
                    <select 
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-dj-gray/50 border border-dj-gray rounded-md text-white"
                    >
                      <option value="">Select budget range</option>
                      <option value="MYR 1000-2500">MYR 1,000 - 2,500</option>
                      <option value="MYR 2500-5000">MYR 2,500 - 5,000</option>
                      <option value="MYR 5000-10000">MYR 5,000 - 10,000</option>
                      <option value="MYR 10000+">MYR 10,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="venue" className="text-white">Venue/Location</Label>
                  <Input 
                    id="venue" 
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    placeholder="Event venue or address" 
                    className="bg-dj-gray/50 border-dj-gray text-white placeholder:text-white/50" 
                  />
                </div>

                <div>
                  <Label className="text-white">Services Needed</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {['Sound System', 'Lighting', 'DJ Services', 'MC Services', 'Event Planning', 'Academy Training'].map((service) => (
                      <label key={service} className="flex items-center space-x-2 text-white/80">
                        <input 
                          type="checkbox" 
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                          className="rounded border-dj-gray bg-dj-gray/50" 
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">Additional Details</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your event, special requirements, or questions..."
                    className="bg-dj-gray/50 border-dj-gray text-white placeholder:text-white/50 min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-dj-purple to-dj-pink hover:opacity-90 text-lg py-6"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Send via WhatsApp
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            {/* Contact Methods */}
            <Card className="glass-card p-12 border-dj-gray/30">
              <h2 className="text-2xl font-bold text-white mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <contact.icon className="w-6 h-6 text-dj-purple" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{contact.title}</div>
                      {contact.action ? (
                        <a 
                          href={contact.action}
                          className="text-white/70 hover:text-dj-purple transition-colors"
                        >
                          {contact.details}
                        </a>
                      ) : (
                        <div className="text-white/70">{contact.details}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Business Hours */}
            <Card className="glass-card p-12 border-dj-gray/30">
              <h3 className="text-xl font-bold text-white mb-6">
                Business Hours
              </h3>
              <div className="space-y-2 text-white/70">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>12:00 PM - 4:00 PM</span>
                </div>

              </div>
            </Card>

            {/* Social Media */}
            <Card className="glass-card p-12 border-dj-gray/30">
              <h3 className="text-xl font-bold text-white mb-6">
                Follow DJ MC Dave
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-dj-gray/30 rounded-lg hover:bg-dj-gray/50 transition-colors group"
                  >
                    <social.icon className="w-5 h-5 text-dj-purple group-hover:text-dj-pink transition-colors" />
                    <span className="text-white/70 group-hover:text-white transition-colors">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </Card>


          </div>
        </div>
      </div>
      <ScrollToTop />
      <Toaster />
    </div>
  );
};

export default ContactPage;
