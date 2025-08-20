// Mock data for the Military Asset Management System

export interface Asset {
  id: string;
  name: string;
  category: 'vehicle' | 'weapon' | 'ammunition' | 'equipment' | 'communication';
  status: 'active' | 'maintenance' | 'reserved' | 'decommissioned';
  location: string;
  assignedTo?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  lastMaintenance: string;
  nextMaintenance: string;
  serialNumber: string;
  acquisitionDate: string;
  value: number;
}

export interface Transfer {
  id: string;
  assetId: string;
  assetName: string;
  fromLocation: string;
  toLocation: string;
  requestedBy: string;
  approvedBy?: string;
  status: 'pending' | 'approved' | 'in-transit' | 'completed' | 'rejected';
  requestDate: string;
  expectedDate: string;
  completedDate?: string;
  reason: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface Base {
  id: string;
  name: string;
  location: string;
  commander: string;
  assetCount: number;
  coordinates: { lat: number; lng: number };
}

export const mockAssets: Asset[] = [
  {
    id: 'AST-001',
    name: 'M1A2 Abrams Tank',
    category: 'vehicle',
    status: 'active',
    location: 'Base Alpha',
    assignedTo: 'Tank Company A',
    condition: 'excellent',
    lastMaintenance: '2024-07-15',
    nextMaintenance: '2024-09-15',
    serialNumber: 'ABR-2024-001',
    acquisitionDate: '2023-03-10',
    value: 8500000
  },
  {
    id: 'AST-002',
    name: 'UH-60 Blackhawk',
    category: 'vehicle',
    status: 'maintenance',
    location: 'Base Bravo',
    assignedTo: 'Aviation Squadron 1',
    condition: 'good',
    lastMaintenance: '2024-08-01',
    nextMaintenance: '2024-08-20',
    serialNumber: 'BLK-2024-002',
    acquisitionDate: '2022-11-20',
    value: 15200000
  },
  {
    id: 'AST-003',
    name: 'M4A1 Carbine',
    category: 'weapon',
    status: 'active',
    location: 'Base Charlie',
    assignedTo: 'Infantry Regiment 2',
    condition: 'excellent',
    lastMaintenance: '2024-06-10',
    nextMaintenance: '2024-12-10',
    serialNumber: 'M4-2024-003',
    acquisitionDate: '2023-01-05',
    value: 1500
  },
  {
    id: 'AST-004',
    name: '5.56mm NATO Ammunition (1000 rounds)',
    category: 'ammunition',
    status: 'active',
    location: 'Base Delta',
    condition: 'excellent',
    lastMaintenance: '2024-05-01',
    nextMaintenance: '2025-05-01',
    serialNumber: 'AMM-2024-004',
    acquisitionDate: '2024-02-15',
    value: 800
  },
  {
    id: 'AST-005',
    name: 'HMMWV M1151',
    category: 'vehicle',
    status: 'reserved',
    location: 'Base Echo',
    assignedTo: 'Military Police',
    condition: 'good',
    lastMaintenance: '2024-07-20',
    nextMaintenance: '2024-10-20',
    serialNumber: 'HMV-2024-005',
    acquisitionDate: '2021-08-30',
    value: 220000
  },
  {
    id: 'AST-006',
    name: 'AN/PRC-152 Radio',
    category: 'communication',
    status: 'active',
    location: 'Base Alpha',
    assignedTo: 'Communications Unit',
    condition: 'fair',
    lastMaintenance: '2024-04-15',
    nextMaintenance: '2024-08-15',
    serialNumber: 'RAD-2024-006',
    acquisitionDate: '2020-12-05',
    value: 4500
  }
];

export const mockTransfers: Transfer[] = [
  {
    id: 'TRF-001',
    assetId: 'AST-001',
    assetName: 'M1A2 Abrams Tank',
    fromLocation: 'Base Alpha',
    toLocation: 'Base Bravo',
    requestedBy: 'Col. Smith',
    status: 'pending',
    requestDate: '2024-08-15',
    expectedDate: '2024-08-25',
    reason: 'Tactical exercise deployment',
    priority: 'high'
  },
  {
    id: 'TRF-002',
    assetId: 'AST-003',
    assetName: 'M4A1 Carbine',
    fromLocation: 'Base Charlie',
    toLocation: 'Base Delta',
    requestedBy: 'Maj. Johnson',
    approvedBy: 'Gen. Davis',
    status: 'in-transit',
    requestDate: '2024-08-10',
    expectedDate: '2024-08-18',
    reason: 'Unit redeployment',
    priority: 'medium'
  },
  {
    id: 'TRF-003',
    assetId: 'AST-005',
    assetName: 'HMMWV M1151',
    fromLocation: 'Base Echo',
    toLocation: 'Base Alpha',
    requestedBy: 'Capt. Williams',
    approvedBy: 'Col. Brown',
    status: 'completed',
    requestDate: '2024-08-05',
    expectedDate: '2024-08-12',
    completedDate: '2024-08-11',
    reason: 'Patrol mission requirement',
    priority: 'low'
  },
  {
    id: 'TRF-004',
    assetId: 'AST-006',
    assetName: 'AN/PRC-152 Radio',
    fromLocation: 'Base Alpha',
    toLocation: 'Base Charlie',
    requestedBy: 'Lt. Martinez',
    status: 'rejected',
    requestDate: '2024-08-12',
    expectedDate: '2024-08-20',
    reason: 'Communication upgrade project',
    priority: 'urgent'
  }
];

export const mockBases: Base[] = [
  {
    id: 'BASE-001',
    name: 'Base Alpha',
    location: 'Fort Liberty, NC',
    commander: 'Col. Anderson',
    assetCount: 247,
    coordinates: { lat: 35.1495, lng: -79.0092 }
  },
  {
    id: 'BASE-002',
    name: 'Base Bravo',
    location: 'Fort Campbell, KY',
    commander: 'Col. Thompson',
    assetCount: 189,
    coordinates: { lat: 36.6584, lng: -87.4564 }
  },
  {
    id: 'BASE-003',
    name: 'Base Charlie',
    location: 'Fort Hood, TX',
    commander: 'Col. Wilson',
    assetCount: 312,
    coordinates: { lat: 31.1348, lng: -97.7841 }
  },
  {
    id: 'BASE-004',
    name: 'Base Delta',
    location: 'Fort Carson, CO',
    commander: 'Col. Rodriguez',
    assetCount: 156,
    coordinates: { lat: 38.7455, lng: -104.7881 }
  },
  {
    id: 'BASE-005',
    name: 'Base Echo',
    location: 'Joint Base Lewis-McChord, WA',
    commander: 'Col. Davis',
    assetCount: 203,
    coordinates: { lat: 47.0778, lng: -122.5836 }
  }
];

export const getAssetsByStatus = () => {
  const statusCounts = mockAssets.reduce((acc, asset) => {
    acc[asset.status] = (acc[asset.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return statusCounts;
};

export const getAssetsByCategory = () => {
  const categoryCounts = mockAssets.reduce((acc, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return categoryCounts;
};

export const getTransfersByStatus = () => {
  const statusCounts = mockTransfers.reduce((acc, transfer) => {
    acc[transfer.status] = (acc[transfer.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return statusCounts;
};