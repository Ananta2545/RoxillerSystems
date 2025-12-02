import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import UpdatePassword from './pages/UpdatePassword';

import AdminDashboard from './pages/admin/AdminDashboard';
import AddUser from './pages/admin/AddUser';
import AddStore from './pages/admin/AddStore';
import UsersList from './pages/admin/UsersList';
import StoresList from './pages/admin/StoresList';

import UserStores from './pages/user/UserStores';

import StoreDashboard from './pages/store/StoreDashboard';

const HomePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'ADMIN':
      return <Navigate to="/admin/dashboard" replace />;
    case 'STORE_OWNER':
      return <Navigate to="/store/dashboard" replace />;
    case 'USER':
      return <Navigate to="/user/stores" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/update-password"
            element={
              <PrivateRoute allowedRoles={['ADMIN', 'USER', 'STORE_OWNER']}>
                <UpdatePassword />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <UsersList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users/new"
            element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <AddUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/stores"
            element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <StoresList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/stores/new"
            element={
              <PrivateRoute allowedRoles={['ADMIN']}>
                <AddStore />
              </PrivateRoute>
            }
          />

          <Route
            path="/user/stores"
            element={
              <PrivateRoute allowedRoles={['USER']}>
                <UserStores />
              </PrivateRoute>
            }
          />

          <Route
            path="/store/dashboard"
            element={
              <PrivateRoute allowedRoles={['STORE_OWNER']}>
                <StoreDashboard />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
