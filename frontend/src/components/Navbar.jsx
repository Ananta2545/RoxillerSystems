import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleName = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'System Administrator';
      case 'STORE_OWNER':
        return 'Store Owner';
      case 'USER':
        return 'Normal User';
      default:
        return '';
    }
  };

  const getHomeLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'ADMIN': return '/admin/dashboard';
      case 'STORE_OWNER': return '/store/dashboard';
      case 'USER': return '/user/stores';
      default: return '/';
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={getHomeLink()} className="text-lg sm:text-xl font-bold hover:text-blue-100 transition truncate max-w-[200px] sm:max-w-none">
            Store Rating System
          </Link>
          {user && (
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm hidden md:block truncate max-w-[150px] lg:max-w-none">
                {user.name} ({getRoleName(user.role)})
              </span>
              <Link
                to="/update-password"
                className="bg-blue-700 hover:bg-blue-800 px-2 sm:px-4 py-1.5 sm:py-2 rounded transition text-xs sm:text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">Change Password</span>
                <span className="sm:hidden">Password</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-2 sm:px-4 py-1.5 sm:py-2 rounded transition text-xs sm:text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
