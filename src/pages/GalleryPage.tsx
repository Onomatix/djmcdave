
import GallerySection from "../components/GallerySection";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect } from "react";

const GalleryPage = () => {
  useEffect(() => {
    // Set document title for the Gallery page
    document.title = "Gallery | DJ MC Dave";
  }, []);

  return (
    <div className="pt-20">
      <ScrollToTop />
      <GallerySection />
    </div>
  );
};

export default GalleryPage;
