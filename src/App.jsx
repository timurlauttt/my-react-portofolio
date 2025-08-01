import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import MyPortofolio from "./MyPortofolio";
import MyActivities from "./MyActivities";
import Contact from "./Contact"; 
import Footer from "./Footer";


function App() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <AboutMe/>
      <MyPortofolio/>
      <MyActivities/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;