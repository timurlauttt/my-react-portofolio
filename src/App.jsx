import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Main Portfolio Components
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
import ErrorBoundary from "./components/ErrorBoundary";

// Admin Components (Lazy loaded)
import { AuthProvider } from "./contexts/AuthContext";

// Utils
import { testNavigation } from "./utils/navigationTest";

// Lazy load admin components to reduce initial bundle size
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const AdminLayout = React.lazy(() => import("./components/AdminLayout"));
const AdminLogin = React.lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const AdminAbout = React.lazy(() => import("./pages/AdminAbout"));
const AdminAboutForm = React.lazy(() => import("./pages/AdminAboutForm"));
const AdminSkills = React.lazy(() => import("./pages/AdminSkills"));
const AdminSkillsForm = React.lazy(() => import("./pages/AdminSkillsForm"));
const AdminPortfolio = React.lazy(() => import("./pages/AdminPortfolio"));
const AdminPortfolioForm = React.lazy(() => import("./pages/AdminPortfolioForm"));
const AdminActivities = React.lazy(() => import("./pages/AdminActivities"));
const AdminActivitiesForm = React.lazy(() => import("./pages/AdminActivitiesForm"));
const AdminContact = React.lazy(() => import("./pages/AdminContact"));
const AdminContactForm = React.lazy(() => import("./pages/AdminContactForm"));
const TestAdmin = React.lazy(() => import("./pages/TestAdmin"));
const BypassLogin = React.lazy(() => import("./pages/BypassLogin"));
const DebugLayout = React.lazy(() => import("./components/DebugLayout"));

// Main Portfolio Page Component
const PortfolioPage = () => {
  useEffect(() => {
    // Test navigation after component mounts
    setTimeout(() => {
      const navTest = testNavigation();
      if (navTest.allSectionsExist) {
        console.log('✅ All navbar sections are properly linked!');
      } else {
        console.log('⚠️  Some sections might be missing');
      }
    }, 2000);
  }, []);

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
          {/* Main Portfolio Route - Always loads fast */}
          <Route path="/" element={<PortfolioPage />} />
          
          {/* Bypass login for development */}
          <Route path="/dev-login" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <BypassLogin />
            </Suspense>
          } />
          
          {/* Test Admin Route - For debugging */}
          <Route path="/test-admin" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <TestAdmin />
            </Suspense>
          } />
          
          {/* Debug Admin Dashboard - No auth required */}
          <Route path="/debug-admin" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </Suspense>
          } />
          
          {/* Debug Admin Dashboard - No auth required */}
          <Route path="/debug-admin" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <DebugLayout>
                <AdminDashboard />
              </DebugLayout>
            </Suspense>
          } />
          
          {/* Debug Admin Pages - No auth required */}
          <Route path="/debug-about" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <DebugLayout>
                <AdminAbout />
              </DebugLayout>
            </Suspense>
          } />
          
          <Route path="/debug-skills" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <DebugLayout>
                <AdminSkills />
              </DebugLayout>
            </Suspense>
          } />
          
          <Route path="/debug-activities" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <DebugLayout>
                <AdminActivities />
              </DebugLayout>
            </Suspense>
          } />
          
          <Route path="/debug-contact" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <DebugLayout>
                <AdminContact />
              </DebugLayout>
            </Suspense>
          } />
          
          {/* Debug Admin Portfolio - No auth required */}
          <Route path="/debug-portfolio" element={
            <Suspense fallback={<AdminLoadingFallback />}>
              <DebugLayout>
                <AdminPortfolio />
              </DebugLayout>
            </Suspense>
          } />
          
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
          
          {/* Redirect /admin to /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;