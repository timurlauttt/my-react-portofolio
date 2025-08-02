import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import MyPortofolio from "./MyPortofolio";
import MyActivities from "./MyActivities";
import Contact from "./Contact"; 
import Footer from "./Footer";

// New components
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import SkillsSection from "./components/SkillsSection";
import FloatingActionButton from "./components/FloatingActionButton";


function App() {
  return (
    <div>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar/>
      <Hero/>
      <AboutMe/>
      <SkillsSection />
      <MyPortofolio/>
      <MyActivities/>
      <Contact/>
      <Footer/>
      <FloatingActionButton />
    </div>
  );
}

export default App;