import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import FeatureCards from "./components/sections/FeatureCards";
import Footer from "./components/sections/Footer";
import Hero from "./components/sections/Hero";
import LogoShowcase from "./components/sections/LogoShowcase";
import NavBar from "./components/sections/NavBar";
import ShowcaseSection from "./components/sections/ShowcaseSection";
import TechStack from "./components/sections/TechStack";
import Testimonials from "./components/sections/Testimonials";

const App = () => (
  <>
    <NavBar />
    <Hero />
    <ShowcaseSection />
    <LogoShowcase />

    <FeatureCards />
    <Experience />
    <TechStack />
    <Testimonials />
    <Contact />
    <Footer />
  </>
);

export default App;
