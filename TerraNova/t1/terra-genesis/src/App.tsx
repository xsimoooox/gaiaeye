import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import TimelineSection from './components/TimelineSection';

import TerraCube from './components/TerraCube';
import WhyUs from './components/WhyUs';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <TimelineSection />

      <TerraCube />
      <WhyUs />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
