import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api/axios";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminLayout from "./layout/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SlidesManager from "./pages/slides/SlidesManager";
import SectionsManager from "./pages/sections/SectionsManager";
import OverviewManager from './pages/overview/OverviewManager';
import SectorsManager from './pages/sectors/SectorsManager'; 
import LogosManager from './pages/logos/LogosManager';
import CertificationsManager from './pages/certifications/CertificationsManager';
import ServicePagesManager from "./pages/services/ServicePagesManager";
import JobsManager from "./pages/Jobs/JobsManager";
import NewsManager from "./pages/news/NewsManager";

export default function App() {
  const [isAuthed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await api.get("/api/auth/me");
        setAuthed(true);
      } catch {
        setAuthed(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <Routes>
      <Route
        path="/admin/login"
        element={<Login onAuthed={() => setAuthed(true)} />}
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAuthed={isAuthed}>
            <AdminLayout onLogout={() => setAuthed(false)} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="slides" element={<SlidesManager />} />
        <Route path="sections" element={<SectionsManager />} />
        <Route path="overview" element={<OverviewManager />} />
        <Route path="sectors" element={<SectorsManager />} />
        <Route path="logos" element={<LogosManager />} />
        <Route path="certifications" element={<CertificationsManager />} />
        <Route path="services" element={<ServicePagesManager />} />
        <Route path="jobs" element={<JobsManager />} />
        <Route path="news" element={<NewsManager />} />

      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
