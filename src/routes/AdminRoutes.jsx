import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../components/AdminLayout';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminAbout from '../pages/admin/AdminAbout';
import AdminAboutForm from '../pages/admin/AdminAboutForm';
import AdminSkills from '../pages/admin/AdminSkills';
import AdminSkillsForm from '../pages/admin/AdminSkillsForm';
import AdminPortfolio from '../pages/admin/AdminPortfolio';
import AdminPortfolioForm from '../pages/admin/AdminPortfolioForm';
import AdminActivities from '../pages/admin/AdminActivities';
import AdminActivitiesForm from '../pages/admin/AdminActivitiesForm';
import AdminContact from '../pages/admin/AdminContact';
import AdminContactForm from '../pages/admin/AdminContactForm';
import AdminCV from '../pages/admin/AdminCV';
import ErrorBoundary from '../components/ErrorBoundary';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="about"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminAbout />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="about/add"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminAboutForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="about/edit/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminAboutForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="skills"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminSkills />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="skills/add"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminSkillsForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="skills/edit/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminSkillsForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="portfolio"
        element={
          <ErrorBoundary>
            <ProtectedRoute>
              <AdminLayout>
                <AdminPortfolio />
              </AdminLayout>
            </ProtectedRoute>
          </ErrorBoundary>
        }
      />

      <Route
        path="portfolio/add"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminPortfolioForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="portfolio/edit/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminPortfolioForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="activities"
        element={
          <ErrorBoundary>
            <ProtectedRoute>
              <AdminLayout>
                <AdminActivities />
              </AdminLayout>
            </ProtectedRoute>
          </ErrorBoundary>
        }
      />

      <Route
        path="activities/add"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminActivitiesForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="activities/edit/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminActivitiesForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="contact"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminContact />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="contact/add"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminContactForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="contact/edit/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminContactForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="cv"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminCV />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path="" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
