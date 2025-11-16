import React from 'react';
import Icon from '../../../components/AppIcon';

const TenantStats = ({ tenants = [] }) => {
  const mockTenants = [
    {
      id: 1,
      name: "John Smith",
      leaseStatus: "active",
      paymentStatus: "current",
      monthlyRent: 1500,
      leaseEnd: "2025-06-30"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      leaseStatus: "expiring",
      paymentStatus: "current",
      monthlyRent: 1800,
      leaseEnd: "2025-03-31"
    },
    {
      id: 3,
      name: "Mike Davis",
      leaseStatus: "active",
      paymentStatus: "late",
      monthlyRent: 1200,
      leaseEnd: "2025-08-15"
    },
    {
      id: 4,
      name: "Emily Chen",
      leaseStatus: "active",
      paymentStatus: "current",
      monthlyRent: 1600,
      leaseEnd: "2025-12-01"
    },
    {
      id: 5,
      name: "David Wilson",
      leaseStatus: "expired",
      paymentStatus: "overdue",
      monthlyRent: 1400,
      leaseEnd: "2024-10-31"
    }
  ];

  const allTenants = tenants?.length > 0 ? tenants : mockTenants;

  const stats = {
    total: allTenants?.length,
    active: allTenants?.filter(t => t?.leaseStatus === 'active')?.length,
    expiring: allTenants?.filter(t => t?.leaseStatus === 'expiring')?.length,
    expired: allTenants?.filter(t => t?.leaseStatus === 'expired')?.length,
    current: allTenants?.filter(t => t?.paymentStatus === 'current')?.length,
    late: allTenants?.filter(t => t?.paymentStatus === 'late')?.length,
    overdue: allTenants?.filter(t => t?.paymentStatus === 'overdue')?.length,
    totalRent: allTenants?.reduce((sum, t) => sum + t?.monthlyRent, 0)
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const getPercentage = (value, total) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Tenants */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Tenants</p>
            <p className="text-3xl font-bold text-foreground">{stats?.total}</p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
            <Icon name="Users" size={24} color="var(--color-primary)" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: '100%' }}
              />
            </div>
            <span className="text-sm text-muted-foreground">100%</span>
          </div>
        </div>
      </div>
      {/* Active Leases */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Leases</p>
            <p className="text-3xl font-bold text-success">{stats?.active}</p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg">
            <Icon name="FileCheck" size={24} color="var(--color-success)" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-300"
                style={{ width: `${getPercentage(stats?.active, stats?.total)}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {getPercentage(stats?.active, stats?.total)}%
            </span>
          </div>
        </div>
      </div>
      {/* Payment Issues */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Payment Issues</p>
            <p className="text-3xl font-bold text-error">{stats?.late + stats?.overdue}</p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-error/10 rounded-lg">
            <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-error h-2 rounded-full transition-all duration-300"
                style={{ width: `${getPercentage(stats?.late + stats?.overdue, stats?.total)}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {getPercentage(stats?.late + stats?.overdue, stats?.total)}%
            </span>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className="text-warning">Late: {stats?.late}</span>
            <span className="text-error">Overdue: {stats?.overdue}</span>
          </div>
        </div>
      </div>
      {/* Monthly Revenue */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(stats?.totalRent)}</p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
            <Icon name="DollarSign" size={24} color="var(--color-accent)" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">+5.2%</span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </div>
      </div>
      {/* Lease Status Breakdown */}
      <div className="bg-card border border-border rounded-lg p-6 md:col-span-2">
        <h4 className="font-medium text-foreground mb-4">Lease Status Breakdown</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-foreground">Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{stats?.active}</span>
              <span className="text-sm text-muted-foreground">
                ({getPercentage(stats?.active, stats?.total)}%)
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-sm text-foreground">Expiring Soon</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{stats?.expiring}</span>
              <span className="text-sm text-muted-foreground">
                ({getPercentage(stats?.expiring, stats?.total)}%)
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-sm text-foreground">Expired</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{stats?.expired}</span>
              <span className="text-sm text-muted-foreground">
                ({getPercentage(stats?.expired, stats?.total)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Payment Status Breakdown */}
      <div className="bg-card border border-border rounded-lg p-6 md:col-span-2">
        <h4 className="font-medium text-foreground mb-4">Payment Status Breakdown</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-foreground">Current</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{stats?.current}</span>
              <span className="text-sm text-muted-foreground">
                ({getPercentage(stats?.current, stats?.total)}%)
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-sm text-foreground">Late (1-30 days)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{stats?.late}</span>
              <span className="text-sm text-muted-foreground">
                ({getPercentage(stats?.late, stats?.total)}%)
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-sm text-foreground">Overdue (30+ days)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{stats?.overdue}</span>
              <span className="text-sm text-muted-foreground">
                ({getPercentage(stats?.overdue, stats?.total)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantStats;