import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Truck, 
  AlertTriangle, 
  Activity, 
  Users, 
  MapPin,
  TrendingUp,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole') || 'commander');
    setUserName(localStorage.getItem('userName') || 'User');
  }, []);

  const stats = [
    { 
      title: 'Total Assets', 
      value: '2,847', 
      icon: Shield, 
      change: '+12%',
      status: 'success'
    },
    { 
      title: 'Active Vehicles', 
      value: '156', 
      icon: Truck, 
      change: '+3%',
      status: 'success'
    },
    { 
      title: 'Critical Alerts', 
      value: '7', 
      icon: AlertTriangle, 
      change: '-23%',
      status: 'warning'
    },
    { 
      title: 'Personnel', 
      value: '1,234', 
      icon: Users, 
      change: '+8%',
      status: 'success'
    }
  ];

  const recentActivity = [
    { action: 'Asset Transfer', item: 'M1A2 Abrams Tank', from: 'Base Alpha', to: 'Base Bravo', time: '2 minutes ago', status: 'pending' },
    { action: 'Maintenance Complete', item: 'UH-60 Blackhawk', location: 'Base Charlie', time: '15 minutes ago', status: 'success' },
    { action: 'Low Ammunition Alert', item: '5.56mm NATO', location: 'Base Delta', time: '1 hour ago', status: 'warning' },
    { action: 'New Asset Registered', item: 'HMMWV M1151', location: 'Base Alpha', time: '2 hours ago', status: 'success' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-success text-success-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'pending': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Command Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {userName} • {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Access
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="status-indicator status-active"></div>
          <span className="text-sm text-muted-foreground">System Online</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="tactical-card animate-slide-in-left" style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className={`text-xs ${stat.status === 'success' ? 'text-success' : 'text-warning'}`}>
                  {stat.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 tactical-card animate-slide-in-right">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest asset movements and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.action}
                      </Badge>
                    </div>
                    <p className="font-medium text-foreground">{activity.item}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {activity.from ? `${activity.from} → ${activity.to}` : activity.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="tactical-card animate-slide-in-right" style={{animationDelay: '200ms'}}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used commands</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted/50 transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Request Asset</p>
                  <p className="text-xs text-muted-foreground">Submit new asset request</p>
                </div>
              </div>
            </button>

            <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted/50 transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                  <Truck className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Transfer Asset</p>
                  <p className="text-xs text-muted-foreground">Move asset between bases</p>
                </div>
              </div>
            </button>

            <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted/50 transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-accent/20 group-hover:bg-accent/30 transition-colors">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Report Issue</p>
                  <p className="text-xs text-muted-foreground">File maintenance report</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;