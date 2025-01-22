import AboutSection from "./components/AboutSection";
import FeaturedProjects from "./components/FeaturedProjects";
import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <FeaturedProjects />
      <AboutSection />
      <FooterSection />

    </div>
  );
}
