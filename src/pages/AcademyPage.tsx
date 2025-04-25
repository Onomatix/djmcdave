
import AcademySection from "../components/AcademySection";
import AcademyGallery from "../components/AcademyGallery";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect } from "react";

const AcademyPage = () => {
  useEffect(() => {
    // Set document title for the Academy page
    document.title = "DJ Academy | DJ MC Dave";
  }, []);

  return (
    <div className="pt-20">
      <ScrollToTop />
      <AcademySection />
      <AcademyGallery />
    </div>
  );
};

export default AcademyPage;
