import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - store user role
    const role = credentials.username.toLowerCase().includes('admin') ? 'admin' : 
                 credentials.username.toLowerCase().includes('logistics') ? 'logistics' : 'commander';
    
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', credentials.username);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(144,238,144,0.1),transparent)]" />
      
      <Card className="w-full max-w-md tactical-card animate-fade-in-up relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-tactical rounded-full flex items-center justify-center animate-tactical-glow">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">M.A.M.S.</CardTitle>
            <CardDescription className="text-muted-foreground">
              Military Asset Management System
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                type="text"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="bg-input border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="bg-input border-border pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full tactical-button hover:animate-tactical-pulse"
            >
              Secure Login
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Demo Accounts:
            </p>
            <div className="mt-2 space-y-1 text-xs text-center">
              <div>Admin: <span className="text-primary">admin / password</span></div>
              <div>Logistics: <span className="text-secondary">logistics / password</span></div>
              <div>Commander: <span className="text-accent">commander / password</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;