
import VideoSection from "../components/VideoSection";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect } from "react";

const VideosPage = () => {
  useEffect(() => {
    // Set document title for the Videos page
    document.title = "Videos | DJ MC Dave";
  }, []);

  return (
    <div className="pt-20">
      <ScrollToTop />
      <VideoSection />
    </div>
  );
};

export default VideosPage;
