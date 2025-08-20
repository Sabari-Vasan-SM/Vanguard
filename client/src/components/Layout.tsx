import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  LayoutDashboard, 
  Package, 
  ArrowRightLeft, 
  FileText, 
  History,
  Settings,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    if (!role) {
      navigate('/login');
      return;
    }
    setUserRole(role);
    setUserName(name || 'User');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/dashboard', 
      roles: ['admin', 'commander', 'logistics'] 
    },
    { 
      title: 'Asset Management', 
      icon: Package, 
      path: '/assets', 
      roles: ['admin', 'commander', 'logistics'] 
    },
    { 
      title: 'Transfers', 
      icon: ArrowRightLeft, 
      path: '/transfers', 
      roles: ['admin', 'commander', 'logistics'] 
    },
    { 
      title: 'Reports', 
      icon: FileText, 
      path: '/reports', 
      roles: ['admin', 'commander'] 
    },
    { 
      title: 'Audit History', 
      icon: History, 
      path: '/audit', 
      roles: ['admin'] 
    },
    { 
      title: 'Settings', 
      icon: Settings, 
      path: '/settings', 
      roles: ['admin'] 
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'w-64' : 'w-16'} 
        bg-card border-r border-border transition-all duration-300 ease-in-out
        flex flex-col animate-slide-in-left
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-tactical rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in-up">
                <h1 className="font-bold text-lg">M.A.M.S.</h1>
                <p className="text-xs text-muted-foreground">Military Asset Management</p>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-secondary-foreground" />
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in-up">
                <p className="font-medium text-sm">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                    ${active 
                      ? 'bg-primary text-primary-foreground shadow-tactical' 
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {sidebarOpen && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            onClick={handleLogout}
            variant="outline"
            className={`
              ${sidebarOpen ? 'w-full justify-start' : 'w-10 h-10 p-0'}
              text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground
            `}
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>

          <div className="flex items-center gap-2">
            <div className="status-indicator status-active"></div>
            <span className="text-sm text-muted-foreground">System Secure</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;