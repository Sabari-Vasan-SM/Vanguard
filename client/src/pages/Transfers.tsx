import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/dialog';
import { 
  ArrowRightLeft, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Truck,
  Eye,
  Plus
} from 'lucide-react';
import { mockTransfers, Transfer } from '@/data/mockData';

const Transfers = () => {
  const [transfers, setTransfers] = useState<Transfer[]>(mockTransfers);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredTransfers = transfers.filter(transfer => 
    filterStatus === 'all' || transfer.status === filterStatus
  );

  const handleApprove = (transferId: string) => {
    setTransfers(transfers.map(transfer => 
      transfer.id === transferId 
        ? { ...transfer, status: 'approved', approvedBy: 'Current User' }
        : transfer
    ));
  };

  const handleReject = (transferId: string) => {
    setTransfers(transfers.map(transfer => 
      transfer.id === transferId 
        ? { ...transfer, status: 'rejected' }
        : transfer
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-warning" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'in-transit': return <Truck className="w-4 h-4 text-secondary" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'in-transit': return 'bg-secondary text-secondary-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const statusCounts = {
    pending: transfers.filter(t => t.status === 'pending').length,
    approved: transfers.filter(t => t.status === 'approved').length,
    'in-transit': transfers.filter(t => t.status === 'in-transit').length,
    completed: transfers.filter(t => t.status === 'completed').length,
    rejected: transfers.filter(t => t.status === 'rejected').length,
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Asset Transfers</h1>
          <p className="text-muted-foreground">Manage asset movement requests and approvals</p>
        </div>
        <Button className="tactical-button">
          <Plus className="w-4 h-4 mr-2" />
          New Transfer Request
        </Button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="tactical-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div className="text-2xl font-bold text-warning">{statusCounts.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>

        <Card className="tactical-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div className="text-2xl font-bold text-success">{statusCounts.approved}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </CardContent>
        </Card>

        <Card className="tactical-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Truck className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-secondary">{statusCounts['in-transit']}</div>
            <div className="text-sm text-muted-foreground">In Transit</div>
          </CardContent>
        </Card>

        <Card className="tactical-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div className="text-2xl font-bold text-success">{statusCounts.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>

        <Card className="tactical-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <XCircle className="w-6 h-6 text-destructive" />
            </div>
            <div className="text-2xl font-bold text-destructive">{statusCounts.rejected}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="tactical-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 bg-input border-border">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transfers List */}
      <div className="space-y-4">
        {filteredTransfers.map((transfer, index) => (
          <Card 
            key={transfer.id} 
            className="tactical-card hover:shadow-tactical transition-all duration-300 animate-slide-in-left"
            style={{animationDelay: `${index * 50}ms`}}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <ArrowRightLeft className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {transfer.assetName}
                    </h3>
                    <Badge className={getStatusColor(transfer.status)}>
                      {getStatusIcon(transfer.status)}
                      <span className="ml-1 capitalize">{transfer.status}</span>
                    </Badge>
                    <Badge className={getPriorityColor(transfer.priority)}>
                      {transfer.priority.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Route */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">{transfer.fromLocation}</span>
                    </div>
                    <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground font-medium">{transfer.toLocation}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Requested by:</span>
                      <span className="text-foreground font-medium">{transfer.requestedBy}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Expected:</span>
                      <span className="text-foreground">{transfer.expectedDate}</span>
                    </div>

                    {transfer.approvedBy && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-muted-foreground">Approved by:</span>
                        <span className="text-foreground font-medium">{transfer.approvedBy}</span>
                      </div>
                    )}
                  </div>

                  {/* Reason */}
                  <div className="text-sm">
                    <span className="text-muted-foreground">Reason: </span>
                    <span className="text-foreground">{transfer.reason}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedTransfer(transfer);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>

                  {transfer.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-success text-success-foreground hover:bg-success/90"
                        onClick={() => handleApprove(transfer.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(transfer.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transfer Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl tactical-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <ArrowRightLeft className="w-6 h-6 text-primary" />
              Transfer Request Details
            </DialogTitle>
            <DialogDescription>
              Complete information about this transfer request
            </DialogDescription>
          </DialogHeader>

          {selectedTransfer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Transfer ID</label>
                  <p className="text-foreground font-mono">{selectedTransfer.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Asset ID</label>
                  <p className="text-foreground font-mono">{selectedTransfer.assetId}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Asset Name</label>
                <p className="text-foreground text-lg font-semibold">{selectedTransfer.assetName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">From Location</label>
                  <p className="text-foreground">{selectedTransfer.fromLocation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">To Location</label>
                  <p className="text-foreground">{selectedTransfer.toLocation}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedTransfer.status)}
                    <Badge className={getStatusColor(selectedTransfer.status)}>
                      {selectedTransfer.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Priority</label>
                  <Badge className={getPriorityColor(selectedTransfer.priority)} style={{marginTop: '4px'}}>
                    {selectedTransfer.priority.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Reason</label>
                <p className="text-foreground">{selectedTransfer.reason}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Requested By</label>
                  <p className="text-foreground">{selectedTransfer.requestedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Request Date</label>
                  <p className="text-foreground">{selectedTransfer.requestDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Expected Date</label>
                  <p className="text-foreground">{selectedTransfer.expectedDate}</p>
                </div>
                {selectedTransfer.completedDate && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Completed Date</label>
                    <p className="text-success">{selectedTransfer.completedDate}</p>
                  </div>
                )}
              </div>

              {selectedTransfer.approvedBy && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Approved By</label>
                  <p className="text-success">{selectedTransfer.approvedBy}</p>
                </div>
              )}

              {selectedTransfer.status === 'pending' && (
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      handleReject(selectedTransfer.id);
                      setIsDialogOpen(false);
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Request
                  </Button>
                  <Button 
                    className="bg-success text-success-foreground hover:bg-success/90"
                    onClick={() => {
                      handleApprove(selectedTransfer.id);
                      setIsDialogOpen(false);
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Request
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transfers;