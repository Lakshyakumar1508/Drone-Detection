import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AlertsPage from "./pages/Alert";
import ReportsPage from "./pages/Reports";
import MapView from "./components/MapView";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        {/* Map route */}
        <Route 
          path="/map" 
          element={
            <PrivateRoute>
              <MapView />
            </PrivateRoute>
          } 
        />

        {/* Admin page - only for admins */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } 
        />

        {/* Alerts page */}
        <Route 
          path="/alerts" 
          element={
            <PrivateRoute>
              <AlertsPage />
            </PrivateRoute>
          } 
        />

        {/* Reports page */}
        <Route 
          path="/reports" 
          element={
            <PrivateRoute>
              <ReportsPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;