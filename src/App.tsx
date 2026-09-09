import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { ConsultingCover } from './pages/ConsultingCover';
import { EditorialReader } from './pages/EditorialReader';
import { IntelligenceCenter } from './pages/IntelligenceCenter';
import { Admin } from './pages/Admin';
import { AdminLogin } from './pages/AdminLogin';
import { AdminLayout } from './components/layout/AdminLayout';
import { AppLayout } from './components/layout/AppLayout';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { ThemeProvider } from './theme/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider><AuthProvider><Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/home" element={<ProtectedRoute role="client"><AppLayout><Home /></AppLayout></ProtectedRoute>} />
        <Route path="/consulting" element={<ProtectedRoute role="client"><AppLayout><ConsultingCover /></AppLayout></ProtectedRoute>} />
        <Route path="/reader" element={<ProtectedRoute role="client"><AppLayout><EditorialReader /></AppLayout></ProtectedRoute>} />
        <Route path="/intelligence" element={<ProtectedRoute role="client"><AppLayout><IntelligenceCenter /></AppLayout></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout><Admin /></AdminLayout></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes></AuthProvider></ThemeProvider>
    </Router>
  );
}

export default App;
