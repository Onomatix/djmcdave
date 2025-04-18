import { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.current) return;
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(form.current);
      
      const response = await fetch('https://formspree.io/f/xqapwdqp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for your message! We will get back to you soon.",
          variant: "default",
        });
        
        // Reset form
        form.current.reset();
      } else {
        throw new Error('Failed to send message');
      }
      
    } catch (error) {
      console.error('Error:', error);
      
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="glass-card p-8 rounded-xl">
      <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
      
      <form ref={form} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white mb-2">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            className="w-full bg-dj-gray/30 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-dj-purple/50 focus:border-transparent"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required
            className="w-full bg-dj-gray/30 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-dj-purple/50 focus:border-transparent"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="subject" className="block text-white mb-2">Subject</label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            required
            className="w-full bg-dj-gray/30 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-dj-purple/50 focus:border-transparent"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-white mb-2">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows={5} 
            required
            className="w-full bg-dj-gray/30 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-dj-purple/50 focus:border-transparent"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-dj-purple to-dj-pink text-white rounded-md px-4 py-3 hover:shadow-lg hover:shadow-dj-purple/30 transition-all duration-300 flex items-center justify-center"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center">
              <Send size={18} className="mr-2" />
              Send Message
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
