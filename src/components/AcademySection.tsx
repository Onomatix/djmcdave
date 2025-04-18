import { Link } from 'react-router-dom';
import { CheckCircle, Download, Award, Users, Clock, BadgeCheck } from 'lucide-react';
import academyHero from '../assets/academy/Academy_Hero.png';

const AcademySection = () => {
  const benefits = [
    "Professional Digital Vinyl System training",
    "One-on-one personalized instruction",
    "Comprehensive theoretical knowledge",
    "Hands-on practical experience",
    "Portfolio building assistance",
    "Job placement support",
    "100% money-back guarantee"
  ];
  
  return (
    <section id="academy" className="content-section">
      <div className="container mx-auto">
        <h2 className="section-title text-center">SoundKontrols DJ Academy</h2>
        <p className="section-subtitle">
          Learn to DJ from an industry professional with over 30 years of experience
        </p>
        
        {/* Intro and Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Master the Art of DJing</h3>
            
            <div className="space-y-4 text-white/80">
              <p>
                SoundKontrols DJ Academy offers comprehensive DJ training with a focus on using 
                the Professional Digital Vinyl System. Our unique approach combines theoretical 
                knowledge with extensive hands-on practice.
              </p>
              
              <p>
                With our one-on-one training methodology, students receive personalized attention
                tailored to their learning style and goals. Whether you're a complete beginner or 
                looking to refine your skills, our program is designed for your success.
              </p>
              
              <p>
                Our exam structure includes both a theoretical multiple-choice component and a 
                practical nonstop mix evaluation, ensuring graduates have both the knowledge and 
                skills needed to succeed.
              </p>
            </div>
          </div>
          
          {/* Academy Image */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden">
              <img 
                src={academyHero}
                alt="DJ Academy Graduates" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dj-dark/80 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Guarantee, Benefits and CTA Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-dj-purple font-bold text-lg mb-8">
            We're so confident in our teaching methods that we offer a 100% money-back guarantee 
            if you don't master DJing skills within 8 weeks.
          </p>
          
          <ul className="space-y-3 inline-block text-left mb-8">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle size={20} className="text-dj-purple mr-3 flex-shrink-0" />
                <span className="text-white/80 text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
          
          <div className="space-y-6">
            <a 
              href="https://soundkontrols.com/v1/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="accent-btn text-lg px-8 py-4 rounded-full inline-block"
            >
              Learn More About The Academy
            </a>
            
            <div>
              <p className="text-white text-xl font-bold bg-dj-dark/70 px-6 py-3 rounded-lg inline-block">
                300+ Students Trained Globally
              </p>
            </div>
          </div>
        </div>
        
        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-dj-purple/20 flex items-center justify-center mb-4">
              <Users size={32} className="text-dj-purple" />
            </div>
            <h4 className="text-white text-xl font-bold mb-2">One-on-One Training</h4>
            <p className="text-white/70">
              Personalized instruction tailored to your learning style and goals
            </p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-dj-pink/20 flex items-center justify-center mb-4">
              <Clock size={32} className="text-dj-pink" />
            </div>
            <h4 className="text-white text-xl font-bold mb-2">8-Week Mastery</h4>
            <p className="text-white/70">
              Guaranteed mastery of essential DJ skills within 8 weeks
            </p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-dj-blue/20 flex items-center justify-center mb-4">
              <Award size={32} className="text-dj-blue" />
            </div>
            <h4 className="text-white text-xl font-bold mb-2">Job Placement</h4>
            <p className="text-white/70">
              Support and assistance finding DJ opportunities after graduation
            </p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-dj-purple/20 flex items-center justify-center mb-4">
              <BadgeCheck size={32} className="text-dj-purple" />
            </div>
            <h4 className="text-white text-xl font-bold mb-2">Certification</h4>
            <p className="text-white/70">
              Official SoundKontrols DJ Academy certification upon completion
            </p>
          </div>
        </div>
        
        {/* Course Brochure */}
        <div className="mt-12 text-center">
          <a href="#" className="accent-btn-outline">
            <Download size={18} className="mr-2" />
            Download Course Brochure
          </a>
        </div>
      </div>
    </section>
  );
};

export default AcademySection;
