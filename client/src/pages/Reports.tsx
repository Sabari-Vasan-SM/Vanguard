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
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Shield,
  Truck,
  DollarSign,
  AlertTriangle,
  Clock,
  FileBarChart,
  FileSpreadsheet,
  Printer
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'asset' | 'transfer' | 'maintenance' | 'financial' | 'security';
  description: string;
  lastGenerated: string;
  generatedBy: string;
  status: 'ready' | 'generating' | 'error';
  size: string;
}

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedType, setSelectedType] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const availableReports: Report[] = [
    {
      id: 'RPT-001',
      name: 'Asset Inventory Report',
      type: 'asset',
      description: 'Complete inventory of all military assets with status and locations',
      lastGenerated: '2024-08-19',
      generatedBy: 'System Admin',
      status: 'ready',
      size: '2.4 MB'
    },
    {
      id: 'RPT-002',
      name: 'Transfer Activity Report',
      type: 'transfer',
      description: 'Detailed analysis of asset transfers between bases',
      lastGenerated: '2024-08-18',
      generatedBy: 'Logistics Commander',
      status: 'ready',
      size: '1.8 MB'
    },
    {
      id: 'RPT-003',
      name: 'Maintenance Schedule Report',
      type: 'maintenance',
      description: 'Upcoming and overdue maintenance activities',
      lastGenerated: '2024-08-17',
      generatedBy: 'Maintenance Chief',
      status: 'ready',
      size: '3.2 MB'
    },
    {
      id: 'RPT-004',
      name: 'Financial Summary Report',
      type: 'financial',
      description: 'Asset valuation and cost analysis summary',
      lastGenerated: '2024-08-16',
      generatedBy: 'Finance Officer',
      status: 'ready',
      size: '1.1 MB'
    },
    {
      id: 'RPT-005',
      name: 'Security Audit Report',
      type: 'security',
      description: 'Security compliance and access control analysis',
      lastGenerated: '2024-08-15',
      generatedBy: 'Security Officer',
      status: 'generating',
      size: 'Pending'
    }
  ];

  const quickStats = [
    {
      title: 'Total Reports',
      value: '847',
      icon: FileText,
      change: '+12%',
      color: 'text-primary'
    },
    {
      title: 'This Month',
      value: '23',
      icon: Calendar,
      change: '+5%',
      color: 'text-secondary'
    },
    {
      title: 'Data Size',
      value: '156 GB',
      icon: BarChart3,
      change: '+18%',
      color: 'text-accent'
    },
    {
      title: 'Auto Reports',
      value: '12',
      icon: Clock,
      change: '+2%',
      color: 'text-success'
    }
  ];

  const filteredReports = availableReports.filter(report => 
    selectedType === 'all' || report.type === selectedType
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'asset': return Shield;
      case 'transfer': return Truck;
      case 'maintenance': return AlertTriangle;
      case 'financial': return DollarSign;
      case 'security': return Users;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-success text-success-foreground';
      case 'generating': return 'bg-warning text-warning-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate and manage system reports and analytics
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <FileBarChart className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Generate New Report</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Create a custom report with specific parameters
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Report Type</label>
                <Select>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="asset">Asset Inventory</SelectItem>
                    <SelectItem value="transfer">Transfer Activity</SelectItem>
                    <SelectItem value="maintenance">Maintenance Schedule</SelectItem>
                    <SelectItem value="financial">Financial Summary</SelectItem>
                    <SelectItem value="security">Security Audit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Time Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="weekly">Last 7 Days</SelectItem>
                    <SelectItem value="monthly">Last 30 Days</SelectItem>
                    <SelectItem value="quarterly">Last 3 Months</SelectItem>
                    <SelectItem value="yearly">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleGenerateReport} 
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isGenerating ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileBarChart className="w-4 h-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
              <div className="flex items-center space-x-2 mt-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-xs text-success">
                  {stat.change} from last period
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-foreground">Report Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="asset">Asset Reports</SelectItem>
                  <SelectItem value="transfer">Transfer Reports</SelectItem>
                  <SelectItem value="maintenance">Maintenance Reports</SelectItem>
                  <SelectItem value="financial">Financial Reports</SelectItem>
                  <SelectItem value="security">Security Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-foreground">Search Reports</label>
              <Input 
                placeholder="Search by name or description..." 
                className="bg-input border-border text-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card className="tactical-card animate-slide-in-right">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Available Reports
          </CardTitle>
          <CardDescription>Generated reports ready for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report, index) => {
              const IconComponent = getTypeIcon(report.type);
              return (
                <div key={report.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border animate-slide-in-left" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{report.name}</h3>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Last generated: {report.lastGenerated}</span>
                        <span>By: {report.generatedBy}</span>
                        <span>Size: {report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={report.status !== 'ready'}
                      className="border-border hover:bg-muted"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={report.status !== 'ready'}
                      className="border-border hover:bg-muted"
                    >
                      <Printer className="w-4 h-4 mr-1" />
                      Print
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chart Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="tactical-card animate-slide-in-left">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Asset Distribution
            </CardTitle>
            <CardDescription>Assets by category across all bases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Chart Preview</p>
                <p className="text-xs text-muted-foreground">Generate report to view detailed charts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="tactical-card animate-slide-in-right">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Status Overview
            </CardTitle>
            <CardDescription>Asset status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Chart Preview</p>
                <p className="text-xs text-muted-foreground">Generate report to view detailed charts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
