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

// Admin Components (Lazy loaded)
import { AuthProvider } from "./contexts/AuthContext";

// Lazy load admin components to reduce initial bundle size
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const AdminLayout = React.lazy(() => import("./components/AdminLayout"));
const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminAbout = React.lazy(() => import("./pages/admin/AdminAbout"));
const AdminAboutForm = React.lazy(() => import("./pages/admin/AdminAboutForm"));
const AdminSkills = React.lazy(() => import("./pages/admin/AdminSkills"));
const AdminSkillsForm = React.lazy(() => import("./pages/admin/AdminSkillsForm"));
const AdminPortfolio = React.lazy(() => import("./pages/admin/AdminPortfolio"));
const AdminPortfolioForm = React.lazy(() => import("./pages/admin/AdminPortfolioForm"));
const AdminActivities = React.lazy(() => import("./pages/admin/AdminActivities"));
const AdminActivitiesForm = React.lazy(() => import("./pages/admin/AdminActivitiesForm"));
const AdminContact = React.lazy(() => import("./pages/admin/AdminContact"));
const AdminContactForm = React.lazy(() => import("./pages/admin/AdminContactForm"));
const AdminCV = React.lazy(() => import("./pages/admin/AdminCV"));

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
          
          {/* Admin Routes - Lazy loaded with Suspense */}
          <Route path="/admin/login" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <AdminLogin />
            </Suspense>
          } />
          
          <Route path="/admin/dashboard" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/about" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminAbout />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/about/add" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminAboutForm />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/about/edit/:id" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminAboutForm />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/skills" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminSkills />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/skills/add" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminSkillsForm />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/skills/edit/:id" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminSkillsForm />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/portfolio" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ErrorBoundary>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminPortfolio />
                  </AdminLayout>
                </ProtectedRoute>
              </ErrorBoundary>
            </Suspense>
          } />
          
          <Route path="/admin/portfolio/add" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminPortfolioForm />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/portfolio/edit/:id" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminPortfolioForm />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/activities" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ErrorBoundary>
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminActivities />
                  </AdminLayout>
                </ProtectedRoute>
              </ErrorBoundary>
            </Suspense>
          } />
          
          <Route path="/admin/activities/add" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminActivitiesForm />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/activities/edit/:id" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminActivitiesForm />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/contact" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminContact />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/contact/add" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminContactForm />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/contact/edit/:id" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminContactForm />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          <Route path="/admin/cv" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminCV />
                </AdminLayout>
              </ProtectedRoute>
            </Suspense>
          } />
          
          {/* Redirect /admin to /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;