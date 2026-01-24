import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Main Portfolio Components
import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutMe from "./pages/user/AboutMe";
import MyPortofolio from "./pages/user/MyPortofolio";
import MyActivities from "./pages/user/MyActivities";
import Contact from "./pages/user/Contact"; 
import Footer from "./Footer";

// New components
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import SkillsSection from "./components/SkillsSection";
import FloatingActionButton from "./components/FloatingActionButton";
import ErrorBoundary from "./components/ErrorBoundary";

import { AuthProvider } from "./contexts/AuthContext";
import AdminRoutes from "./routes/AdminRoutes";

// Main Portfolio Page Component (Home Page - Only Hero)
const HomePage = () => {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

// Portfolio Page
const PortfolioPage = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="pb-24 md:pb-0">
        <MyPortofolio />
      </div>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

// Skills Page
const SkillsPage = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="pb-24 md:pb-0">
        <SkillsSection />
      </div>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

// Activities Page
const ActivitiesPage = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="pb-24 md:pb-0">
        <MyActivities />
      </div>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

// Contact Page
const ContactPage = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="pb-24 md:pb-0">
        <Contact />
      </div>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

// About Page
const AboutPage = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="pb-24 md:pb-0">
        <AboutMe />
      </div>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

// Loading fallback for admin components
const AdminLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#74247A]"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Admin routes are grouped into a single lazily-loaded chunk */}
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<AdminLoadingFallback />}>
                <AdminRoutes />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;