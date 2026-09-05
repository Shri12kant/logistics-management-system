import { Navbar } from "../components/layout/Navbar.jsx";
import Hero from "../components/sections/Hero.jsx";
import About from "../Pages/About.jsx";
import RailwayFreight from "../components/sections/RailwayFreight.jsx";
import Services from "../components/sections/Services.jsx";
import Mission from "../components/sections/Mission.jsx";
import WhyChooseUs from "../components/sections/WhyChooseUs.jsx";
import WorkingProcess from "../components/sections/WorkingProcess.jsx";
import Contact from "../components/sections/Contact.jsx";
import Footer from "../components/layout/Footer.jsx";

function Home() {
    return (
        <div className="bg-fog">
            <Navbar />
            <Hero />
            <About />
            <RailwayFreight />
            <Services />
            <Mission />
            <WhyChooseUs />
            <WorkingProcess />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;
