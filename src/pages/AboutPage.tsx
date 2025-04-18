
import AboutSection from "../components/AboutSection";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    // Set document title for the About page
    document.title = "About | DJ MC Dave";
  }, []);

  return (
    <div className="pt-20">
      <ScrollToTop />
      <AboutSection />
    </div>
  );
};

export default AboutPage;
