import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { InteriorDesign } from './pages/InteriorDesign';
import { EventPlanning } from './pages/EventPlanning';
import { Portfolio } from './pages/Portfolio';
import { ProjectDetails } from './pages/ProjectDetails';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';

// Scroll to top upon route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-[#120309] text-[#E9DFD2]">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/interior" element={<InteriorDesign />} />
          <Route path="/events" element={<EventPlanning />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
