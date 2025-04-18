import ContactSection from "../components/ContactSection";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact | DJ MC Dave";
  }, []);

  return (
    <div className="pt-20">
      <ScrollToTop />
      <ContactSection />
      <Toaster />
    </div>
  );
};

export default ContactPage;
