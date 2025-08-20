import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { 
  History, 
  Search, 
  Filter, 
  Calendar, 
  User,
  Shield,
  Eye,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  FileText,
  Edit,
  Trash2,
  Plus,
  ArrowRightLeft
} from 'lucide-react';

interface AuditEntry {
  id: string;
  timestamp: string;
  action: 'create' | 'update' | 'delete' | 'transfer' | 'view' | 'login' | 'logout';
  entity: 'asset' | 'user' | 'transfer' | 'report' | 'system';
  entityId: string;
  entityName: string;
  user: string;
  userRole: string;
  location: string;
  ipAddress: string;
  details: string;
  oldValue?: string;
  newValue?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  success: boolean;
}

const AuditHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterEntity, setFilterEntity] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const auditEntries: AuditEntry[] = [
    {
      id: 'AUD-001',
      timestamp: '2024-08-20T14:30:25Z',
      action: 'transfer',
      entity: 'asset',
      entityId: 'AST-001',
      entityName: 'M1A2 Abrams Tank',
      user: 'Commander Smith',
      userRole: 'commander',
      location: 'Base Alpha',
      ipAddress: '192.168.1.101',
      details: 'Asset transfer approved from Base Alpha to Base Bravo',
      oldValue: 'Base Alpha',
      newValue: 'Base Bravo',
      severity: 'medium',
      success: true
    },
    {
      id: 'AUD-002',
      timestamp: '2024-08-20T14:15:42Z',
      action: 'update',
      entity: 'asset',
      entityId: 'AST-002',
      entityName: 'UH-60 Blackhawk',
      user: 'Tech Sergeant Johnson',
      userRole: 'logistics',
      location: 'Base Bravo',
      ipAddress: '192.168.1.102',
      details: 'Asset status changed from active to maintenance',
      oldValue: 'active',
      newValue: 'maintenance',
      severity: 'low',
      success: true
    },
    {
      id: 'AUD-003',
      timestamp: '2024-08-20T13:45:17Z',
      action: 'login',
      entity: 'system',
      entityId: 'SYS-LOGIN',
      entityName: 'System Login',
      user: 'Admin Williams',
      userRole: 'admin',
      location: 'Base Charlie',
      ipAddress: '192.168.1.103',
      details: 'Administrator login successful',
      severity: 'low',
      success: true
    },
    {
      id: 'AUD-004',
      timestamp: '2024-08-20T13:30:08Z',
      action: 'delete',
      entity: 'user',
      entityId: 'USR-045',
      entityName: 'Corporal Davis',
      user: 'Admin Williams',
      userRole: 'admin',
      location: 'Base Charlie',
      ipAddress: '192.168.1.103',
      details: 'User account deactivated due to transfer',
      severity: 'medium',
      success: true
    },
    {
      id: 'AUD-005',
      timestamp: '2024-08-20T12:15:33Z',
      action: 'create',
      entity: 'asset',
      entityId: 'AST-156',
      entityName: 'HMMWV M1151',
      user: 'Logistics Officer Brown',
      userRole: 'logistics',
      location: 'Base Delta',
      ipAddress: '192.168.1.104',
      details: 'New asset registered in system',
      newValue: 'active',
      severity: 'low',
      success: true
    },
    {
      id: 'AUD-006',
      timestamp: '2024-08-20T11:45:22Z',
      action: 'login',
      entity: 'system',
      entityId: 'SYS-LOGIN',
      entityName: 'System Login',
      user: 'Unknown User',
      userRole: 'unknown',
      location: 'External',
      ipAddress: '203.45.67.89',
      details: 'Failed login attempt - invalid credentials',
      severity: 'high',
      success: false
    },
    {
      id: 'AUD-007',
      timestamp: '2024-08-20T10:30:15Z',
      action: 'view',
      entity: 'report',
      entityId: 'RPT-001',
      entityName: 'Asset Inventory Report',
      user: 'Captain Martinez',
      userRole: 'commander',
      location: 'Base Alpha',
      ipAddress: '192.168.1.105',
      details: 'Classified report accessed',
      severity: 'medium',
      success: true
    },
    {
      id: 'AUD-008',
      timestamp: '2024-08-20T09:15:44Z',
      action: 'update',
      entity: 'system',
      entityId: 'SYS-CONFIG',
      entityName: 'System Configuration',
      user: 'Admin Williams',
      userRole: 'admin',
      location: 'Base Charlie',
      ipAddress: '192.168.1.103',
      details: 'Security settings updated',
      oldValue: 'Medium',
      newValue: 'High',
      severity: 'critical',
      success: true
    }
  ];

  const quickStats = [
    {
      title: 'Total Events',
      value: '12,847',
      icon: History,
      change: '+156 today',
      color: 'text-primary'
    },
    {
      title: 'Failed Attempts',
      value: '23',
      icon: XCircle,
      change: '+3 today',
      color: 'text-destructive'
    },
    {
      title: 'Active Users',
      value: '89',
      icon: User,
      change: '+2 today',
      color: 'text-success'
    },
    {
      title: 'Critical Events',
      value: '4',
      icon: AlertTriangle,
      change: '0 today',
      color: 'text-warning'
    }
  ];

  const filteredEntries = auditEntries.filter(entry => {
    const matchesSearch = entry.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || entry.action === filterAction;
    const matchesEntity = filterEntity === 'all' || entry.entity === filterEntity;
    const matchesSeverity = filterSeverity === 'all' || entry.severity === filterSeverity;
    
    return matchesSearch && matchesAction && matchesEntity && matchesSeverity;
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create': return Plus;
      case 'update': return Edit;
      case 'delete': return Trash2;
      case 'transfer': return ArrowRightLeft;
      case 'view': return Eye;
      case 'login': case 'logout': return User;
      default: return FileText;
    }
  };

  const getEntityIcon = (entity: string) => {
    switch (entity) {
      case 'asset': return Shield;
      case 'user': return User;
      case 'transfer': return ArrowRightLeft;
      case 'report': return FileText;
      case 'system': return History;
      default: return FileText;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'critical': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'bg-success text-success-foreground';
      case 'update': return 'bg-secondary text-secondary-foreground';
      case 'delete': return 'bg-destructive text-destructive-foreground';
      case 'transfer': return 'bg-accent text-accent-foreground';
      case 'view': return 'bg-muted text-muted-foreground';
      case 'login': case 'logout': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleViewDetails = (entry: AuditEntry) => {
    setSelectedEntry(entry);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit History</h1>
          <p className="text-muted-foreground">
            Complete system activity log and security audit trail
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Download className="w-4 h-4 mr-2" />
          Export Audit Log
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="tactical-card animate-slide-in-left" style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Audit Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Search</label>
              <Input 
                placeholder="Search audit entries..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Action</label>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Entity</label>
              <Select value={filterEntity} onValueChange={setFilterEntity}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Entities</SelectItem>
                  <SelectItem value="asset">Assets</SelectItem>
                  <SelectItem value="user">Users</SelectItem>
                  <SelectItem value="transfer">Transfers</SelectItem>
                  <SelectItem value="report">Reports</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Severity</label>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Date Range</label>
              <Select>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Last 24 hours" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Entries */}
      <Card className="tactical-card animate-slide-in-right">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Audit Trail ({filteredEntries.length} entries)
          </CardTitle>
          <CardDescription>Chronological system activity log</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEntries.map((entry, index) => {
              const ActionIcon = getActionIcon(entry.action);
              const EntityIcon = getEntityIcon(entry.entity);
              
              return (
                <div key={entry.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border animate-slide-in-left" style={{animationDelay: `${index * 50}ms`}}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${entry.success ? 'bg-success/20' : 'bg-destructive/20'}`}>
                        {entry.success ? 
                          <CheckCircle className="w-4 h-4 text-success" /> : 
                          <XCircle className="w-4 h-4 text-destructive" />
                        }
                      </div>
                      <div className="p-1 rounded bg-primary/20">
                        <ActionIcon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="p-1 rounded bg-secondary/20">
                        <EntityIcon className="w-4 h-4 text-secondary" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getActionColor(entry.action)}>
                          {entry.action}
                        </Badge>
                        <Badge className={getSeverityColor(entry.severity)}>
                          {entry.severity}
                        </Badge>
                      </div>
                      
                      <p className="font-medium text-foreground">{entry.details}</p>
                      <p className="text-sm text-muted-foreground">
                        Entity: {entry.entityName} ({entry.entityId})
                      </p>
                      
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {entry.user} ({entry.userRole})
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {entry.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(entry.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(entry)}
                    className="border-border hover:bg-muted"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">Audit Entry Details</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Complete information about this audit event
            </DialogDescription>
          </DialogHeader>
          {selectedEntry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Entry ID</label>
                  <p className="text-sm text-muted-foreground">{selectedEntry.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Timestamp</label>
                  <p className="text-sm text-muted-foreground">{formatTimestamp(selectedEntry.timestamp)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Action</label>
                  <Badge className={getActionColor(selectedEntry.action)}>
                    {selectedEntry.action}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Severity</label>
                  <Badge className={getSeverityColor(selectedEntry.severity)}>
                    {selectedEntry.severity}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">User</label>
                  <p className="text-sm text-muted-foreground">{selectedEntry.user} ({selectedEntry.userRole})</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <p className="text-sm text-muted-foreground">{selectedEntry.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">IP Address</label>
                  <p className="text-sm text-muted-foreground">{selectedEntry.ipAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Success</label>
                  <div className="flex items-center gap-1">
                    {selectedEntry.success ? 
                      <CheckCircle className="w-4 h-4 text-success" /> : 
                      <XCircle className="w-4 h-4 text-destructive" />
                    }
                    <span className="text-sm text-muted-foreground">
                      {selectedEntry.success ? 'Success' : 'Failed'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Entity</label>
                <p className="text-sm text-muted-foreground">
                  {selectedEntry.entityName} ({selectedEntry.entityId}) - {selectedEntry.entity}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Details</label>
                <p className="text-sm text-muted-foreground">{selectedEntry.details}</p>
              </div>
              
              {(selectedEntry.oldValue || selectedEntry.newValue) && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedEntry.oldValue && (
                    <div>
                      <label className="text-sm font-medium text-foreground">Old Value</label>
                      <p className="text-sm text-muted-foreground">{selectedEntry.oldValue}</p>
                    </div>
                  )}
                  {selectedEntry.newValue && (
                    <div>
                      <label className="text-sm font-medium text-foreground">New Value</label>
                      <p className="text-sm text-muted-foreground">{selectedEntry.newValue}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuditHistory;
