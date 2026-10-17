import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Practice from "../components/Practice";
import Team from "../components/Team";
import FloatingCalendar from "../components/FloatingCalendar";
import EquipeFormatrice from "../components/EquipeFormatrice";
import React, { useEffect } from "react";
import Info from "../components/Info";
import { ActualitesProvider } from "../contexts/ActualitesContext";


const Home = () => {
  useEffect(() => {
    // Réinitialise les plugins après le montage
    const timer = setTimeout(() => {
      if (window.jQuery && window.jQuery.fn.waypoint) {
        window.jQuery(".section").waypoint("refresh");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);
    return (
      <ActualitesProvider>
        <div id="page">
            <Nav />
            <About />
            <Practice />
            <Team />
            <EquipeFormatrice />
            <Info />
            <Contact />
            <Footer />
            <FloatingCalendar />
        </div>
      </ActualitesProvider>
    );
  };
  
  export default Home;
  