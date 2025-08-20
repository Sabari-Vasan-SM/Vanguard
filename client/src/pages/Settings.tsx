import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Palette,
  Database,
  Network,
  Lock,
  Key,
  Mail,
  Phone,
  Globe,
  Server,
  AlertTriangle,
  CheckCircle,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Users,
  Clock,
  MapPin,
  Smartphone
} from 'lucide-react';

interface SystemSettings {
  general: {
    systemName: string;
    timezone: string;
    language: string;
    dateFormat: string;
    autoLogout: number;
  };
  security: {
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      expiryDays: number;
    };
    sessionTimeout: number;
    maxLoginAttempts: number;
    twoFactorAuth: boolean;
    ipWhitelist: string[];
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    criticalAlerts: boolean;
    maintenanceReminders: boolean;
    transferNotifications: boolean;
  };
  audit: {
    enableAuditLog: boolean;
    retentionPeriod: number;
    logLevel: 'minimal' | 'standard' | 'detailed' | 'verbose';
    autoArchive: boolean;
  };
  backup: {
    autoBackup: boolean;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
    retentionCount: number;
    backupLocation: string;
  };
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      systemName: 'Military Asset Management System',
      timezone: 'UTC-05:00',
      language: 'English (US)',
      dateFormat: 'MM/DD/YYYY',
      autoLogout: 30
    },
    security: {
      passwordPolicy: {
        minLength: 12,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expiryDays: 90
      },
      sessionTimeout: 60,
      maxLoginAttempts: 3,
      twoFactorAuth: true,
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8']
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      criticalAlerts: true,
      maintenanceReminders: true,
      transferNotifications: true
    },
    audit: {
      enableAuditLog: true,
      retentionPeriod: 365,
      logLevel: 'detailed',
      autoArchive: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionCount: 30,
      backupLocation: '/backup/military-assets'
    }
  });

  const [userProfile, setUserProfile] = useState({
    username: 'admin',
    fullName: 'System Administrator',
    email: 'admin@military.gov',
    phone: '+1-555-0123',
    role: 'admin',
    lastLogin: '2024-08-20T14:30:00Z',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const systemStats = [
    {
      title: 'System Health',
      value: '98.5%',
      icon: CheckCircle,
      status: 'success',
      description: 'All systems operational'
    },
    {
      title: 'Active Users',
      value: '89',
      icon: Users,
      status: 'success',
      description: '12 online now'
    },
    {
      title: 'Database Size',
      value: '2.4 GB',
      icon: Database,
      status: 'warning',
      description: '78% of allocated space'
    },
    {
      title: 'Last Backup',
      value: '2 hours ago',
      icon: Server,
      status: 'success',
      description: 'Auto backup successful'
    }
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'audit', label: 'Audit & Logs', icon: AlertTriangle },
    { id: 'backup', label: 'Backup', icon: Database },
    { id: 'system', label: 'System Status', icon: Server }
  ];

  const updateSetting = (section: keyof SystemSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const updateNestedSetting = (section: keyof SystemSettings, nestedKey: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedKey]: {
          ...(prev[section] as any)[nestedKey],
          [key]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setHasChanges(false);
    setIsLoading(false);
  };

  const handleResetSettings = () => {
    // Reset to default values
    setHasChanges(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">
            Configure system preferences and security settings
          </p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <Button 
              variant="outline" 
              onClick={handleResetSettings}
              className="border-border hover:bg-muted"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )}
          <Button 
            onClick={handleSaveSettings}
            disabled={!hasChanges || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index} className="tactical-card animate-slide-in-left" style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${getStatusColor(stat.status)}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <Card className="tactical-card">
          <CardContent className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <Card className="tactical-card animate-slide-in-right">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="w-5 h-5 text-primary" />
                  General Settings
                </CardTitle>
                <CardDescription>Basic system configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">System Name</label>
                    <Input 
                      value={settings.general.systemName}
                      onChange={(e) => updateSetting('general', 'systemName', e.target.value)}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Timezone</label>
                    <Select 
                      value={settings.general.timezone} 
                      onValueChange={(value) => updateSetting('general', 'timezone', value)}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="UTC-05:00">UTC-05:00 (Eastern)</SelectItem>
                        <SelectItem value="UTC-06:00">UTC-06:00 (Central)</SelectItem>
                        <SelectItem value="UTC-07:00">UTC-07:00 (Mountain)</SelectItem>
                        <SelectItem value="UTC-08:00">UTC-08:00 (Pacific)</SelectItem>
                        <SelectItem value="UTC+00:00">UTC+00:00 (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Language</label>
                    <Select 
                      value={settings.general.language} 
                      onValueChange={(value) => updateSetting('general', 'language', value)}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="English (US)">English (US)</SelectItem>
                        <SelectItem value="English (UK)">English (UK)</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Date Format</label>
                    <Select 
                      value={settings.general.dateFormat} 
                      onValueChange={(value) => updateSetting('general', 'dateFormat', value)}
                    >
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Auto Logout (minutes)</label>
                  <Input 
                    type="number"
                    value={settings.general.autoLogout}
                    onChange={(e) => updateSetting('general', 'autoLogout', parseInt(e.target.value))}
                    className="bg-input border-border text-foreground max-w-xs"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card className="tactical-card animate-slide-in-right">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Configure system security and access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Password Policy */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Password Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Minimum Length</label>
                        <Input 
                          type="number"
                          value={settings.security.passwordPolicy.minLength}
                          onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                          className="bg-input border-border text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Password Expiry (days)</label>
                        <Input 
                          type="number"
                          value={settings.security.passwordPolicy.expiryDays}
                          onChange={(e) => updateNestedSetting('security', 'passwordPolicy', 'expiryDays', parseInt(e.target.value))}
                          className="bg-input border-border text-foreground"
                        />
                      </div>
                    </div>
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">Require Uppercase Letters</label>
                        <Switch 
                          checked={settings.security.passwordPolicy.requireUppercase}
                          onCheckedChange={(checked) => updateNestedSetting('security', 'passwordPolicy', 'requireUppercase', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">Require Numbers</label>
                        <Switch 
                          checked={settings.security.passwordPolicy.requireNumbers}
                          onCheckedChange={(checked) => updateNestedSetting('security', 'passwordPolicy', 'requireNumbers', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">Require Special Characters</label>
                        <Switch 
                          checked={settings.security.passwordPolicy.requireSpecialChars}
                          onCheckedChange={(checked) => updateNestedSetting('security', 'passwordPolicy', 'requireSpecialChars', checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Session & Access */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Session & Access</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Session Timeout (minutes)</label>
                        <Input 
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="bg-input border-border text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Max Login Attempts</label>
                        <Input 
                          type="number"
                          value={settings.security.maxLoginAttempts}
                          onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                          className="bg-input border-border text-foreground"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <label className="text-sm font-medium text-foreground">Two-Factor Authentication</label>
                      <Switch 
                        checked={settings.security.twoFactorAuth}
                        onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* User Profile */}
          {activeTab === 'profile' && (
            <Card className="tactical-card animate-slide-in-right">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  User Profile
                </CardTitle>
                <CardDescription>Manage your personal information and credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input 
                      value={userProfile.fullName}
                      onChange={(e) => setUserProfile(prev => ({...prev, fullName: e.target.value}))}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Username</label>
                    <Input 
                      value={userProfile.username}
                      disabled
                      className="bg-muted border-border text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input 
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile(prev => ({...prev, email: e.target.value}))}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input 
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile(prev => ({...prev, phone: e.target.value}))}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Role</label>
                    <Input 
                      value={userProfile.role}
                      disabled
                      className="bg-muted border-border text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Last Login</label>
                    <Input 
                      value={new Date(userProfile.lastLogin).toLocaleString()}
                      disabled
                      className="bg-muted border-border text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Current Password</label>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          value={userProfile.currentPassword}
                          onChange={(e) => setUserProfile(prev => ({...prev, currentPassword: e.target.value}))}
                          className="bg-input border-border text-foreground pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">New Password</label>
                        <Input 
                          type="password"
                          value={userProfile.newPassword}
                          onChange={(e) => setUserProfile(prev => ({...prev, newPassword: e.target.value}))}
                          className="bg-input border-border text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Confirm Password</label>
                        <Input 
                          type="password"
                          value={userProfile.confirmPassword}
                          onChange={(e) => setUserProfile(prev => ({...prev, confirmPassword: e.target.value}))}
                          className="bg-input border-border text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Card className="tactical-card animate-slide-in-right">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure how you receive system notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <div>
                        <label className="text-sm font-medium text-foreground">Email Notifications</label>
                        <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-primary" />
                      <div>
                        <label className="text-sm font-medium text-foreground">SMS Notifications</label>
                        <p className="text-xs text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.notifications.smsNotifications}
                      onCheckedChange={(checked) => updateSetting('notifications', 'smsNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-primary" />
                      <div>
                        <label className="text-sm font-medium text-foreground">Push Notifications</label>
                        <p className="text-xs text-muted-foreground">Receive browser push notifications</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <div>
                          <label className="text-sm font-medium text-foreground">Critical Alerts</label>
                          <p className="text-xs text-muted-foreground">Security breaches and system failures</p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.notifications.criticalAlerts}
                        onCheckedChange={(checked) => updateSetting('notifications', 'criticalAlerts', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-warning" />
                        <div>
                          <label className="text-sm font-medium text-foreground">Maintenance Reminders</label>
                          <p className="text-xs text-muted-foreground">Scheduled and overdue maintenance</p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.notifications.maintenanceReminders}
                        onCheckedChange={(checked) => updateSetting('notifications', 'maintenanceReminders', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <div>
                          <label className="text-sm font-medium text-foreground">Transfer Notifications</label>
                          <p className="text-xs text-muted-foreground">Asset transfer updates and approvals</p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.notifications.transferNotifications}
                        onCheckedChange={(checked) => updateSetting('notifications', 'transferNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Status Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <Card className="tactical-card animate-slide-in-right">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-primary" />
                    System Status
                  </CardTitle>
                  <CardDescription>Current system health and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">System Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Version:</span>
                          <span className="text-foreground">v2.1.4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Uptime:</span>
                          <span className="text-foreground">15 days, 7 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Server:</span>
                          <span className="text-foreground">mil-server-01.local</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Database:</span>
                          <span className="text-foreground">PostgreSQL 15.2</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Resource Usage</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">CPU Usage:</span>
                            <span className="text-foreground">23%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-success h-2 rounded-full" style={{width: '23%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Memory Usage:</span>
                            <span className="text-foreground">67%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-warning h-2 rounded-full" style={{width: '67%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Disk Usage:</span>
                            <span className="text-foreground">45%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-success h-2 rounded-full" style={{width: '45%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
