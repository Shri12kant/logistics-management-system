import React from 'react';
import {Navbar} from "../components/layout/Navbar.jsx";
import Hero from "../components/sections/Hero.jsx";
import About from "../Pages/About.jsx";
import Services  from "../components/sections/Services.jsx";
import WhyChooseUs from "../components/sections/WhyChooseUs.jsx";
import Fleet from "../components/sections/Fleet.jsx";
import WorkingProcess   from "../components/sections/WorkingProcess.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import Contact from "../components/sections/Contact.jsx";
import Footer from "../components/layout/Footer.jsx";
function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <About />
            <Services />
            <WhyChooseUs />
            <Fleet />
            <WorkingProcess />
            <Testimonials />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;