import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import ScrollProgress from "./components/ScrollProgress";
import FloatingActionButton from "./components/FloatingActionButton";

// All below-fold sections lazy-split to shrink initial bundle and defer Firestore fetches.
// Hero is the only eager above-fold content (LCP).
const MyPortofolio = lazy(() => import("./pages/user/MyPortofolio"));
const SkillsSection = lazy(() => import("./components/SkillsSection"));
const MyActivities = lazy(() => import("./pages/user/MyActivities"));
const Contact = lazy(() => import("./pages/user/Contact"));
const AboutMe = lazy(() => import("./pages/user/AboutMe"));

import { AuthProvider } from "./contexts/AuthContext";
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));

const SectionFallback = ({ minH = "min-h-[240px]" }) => (
  <div className={`${minH} flex items-center justify-center px-4 md:px-40 py-8`}>
    <div className="w-full max-w-3xl space-y-3">
      <div className="h-6 w-40 mx-auto shimmer-bg rounded" />
      <div className="h-4 w-full shimmer-bg rounded" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square shimmer-bg rounded border-2 border-black/10" />
        ))}
      </div>
    </div>
  </div>
);

const PAGE_TITLES = {
  portfolio: "Portfolio — Urip Yoga Pangestu | Web Developer",
  skills: "Skills — Urip Yoga Pangestu | Laravel, React, Django",
  activities: "Activities — Urip Yoga Pangestu | Organizations & Certifications",
  contact: "Contact — Urip Yoga Pangestu | Let's Collaborate",
  about: "About — Urip Yoga Pangestu | Information Systems Student",
};
const DEFAULT_TITLE = "Urip Yoga Pangestu - Portfolio Web Developer | Mahasiswa Sistem Informasi Telkom University Purwokerto";

const HomePage = ({ scrollTo }) => {
  useEffect(() => {
    document.title = scrollTo ? (PAGE_TITLES[scrollTo] || DEFAULT_TITLE) : DEFAULT_TITLE;
    // Keep OG title in sync for crawlers that read DOM
    const og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute('content', document.title);
  }, [scrollTo]);

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
        <Suspense fallback={<SectionFallback />}>
          <MyPortofolio />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MyActivities />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionFallback minH="min-h-[180px]" />}>
          <AboutMe />
        </Suspense>
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
