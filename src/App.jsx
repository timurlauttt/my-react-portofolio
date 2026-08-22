import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";

import Navbar from "./Navbar";
import Hero from "./Hero";
import MyPortofolio from "./pages/user/MyPortofolio";
import SkillsSection from "./components/SkillsSection";
import MyActivities from "./pages/user/MyActivities";
import Contact from "./pages/user/Contact";
import AboutMe from "./pages/user/AboutMe";
import Footer from "./Footer";
import ScrollProgress from "./components/ScrollProgress";
import FloatingActionButton from "./components/FloatingActionButton";

import { AuthProvider } from "./contexts/AuthContext";
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));

const HomePage = ({ scrollTo }) => {
  useEffect(() => {
    if (scrollTo) {
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [scrollTo]);

  return (
    <div className="relative">
      <Navbar />
      <ScrollProgress />
      <main id="main-content">
        <Hero />
        <MyPortofolio />
        <SkillsSection />
        <MyActivities />
        <Contact />
        <AboutMe />
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

const AdminLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#74247A]"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<HomePage scrollTo="portfolio" />} />
              <Route path="/skills" element={<HomePage scrollTo="skills" />} />
              <Route path="/activities" element={<HomePage scrollTo="activities" />} />
              <Route path="/contact" element={<HomePage scrollTo="contact" />} />
              <Route path="/about" element={<HomePage scrollTo="about" />} />
              <Route
                path="/admin/*"
                element={
                  <AuthProvider>
                    <Suspense fallback={<AdminLoadingFallback />}>
                      <AdminRoutes />
                    </Suspense>
                  </AuthProvider>
                }
              />
            </Routes>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
