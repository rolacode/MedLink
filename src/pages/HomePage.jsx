import Footer from "../components/Footer";
import Header from "../components/Header";
import ContactUs from "../components/HomePage/ContactUs";
import Doctors from "../components/HomePage/Doctors";
import HealthTips from "../components/HomePage/HealthTips";
import Hero from "../components/HomePage/Hero";
import Services from "../components/HomePage/Services";
import Testimonials from "../components/HomePage/Testimonials";
import WhyChooseUs from "../components/HomePage/WhyChooseUs";

const HomePage = () => {
  return (
    <div className="w-full bg-white font-sans">
      <Header />
      <main className="flex flex-col">
        <Hero /> {/* background image will be handled here */}
        <Services />
        <Doctors />
        <HealthTips />
        <WhyChooseUs />
        <Testimonials />
        <ContactUs />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;