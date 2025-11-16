import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TenantsTab = ({ tenants, onAddTenant, onEditTenant, onViewLease }) => {
  const [activeTab, setActiveTab] = useState('current');

  const currentTenants = tenants?.filter(tenant => tenant?.status === 'active');
  const pastTenants = tenants?.filter(tenant => tenant?.status === 'inactive');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDaysUntilExpiry = (leaseEndDate) => {
    const today = new Date();
    const endDate = new Date(leaseEndDate);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const TenantCard = ({ tenant, isPast = false }) => {
    const daysUntilExpiry = getDaysUntilExpiry(tenant?.leaseEndDate);
    
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
              <Image
                src={tenant?.avatar}
                alt={tenant?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{tenant?.name}</h3>
              <p className="text-sm text-muted-foreground">{tenant?.unit}</p>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tenant?.status)}`}>
                {tenant?.status}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onViewLease(tenant)} iconName="FileText">
              Lease
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onEditTenant(tenant)}>
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Contact Information</label>
            <div className="mt-1 space-y-1">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Mail" size={14} className="text-muted-foreground" />
                <span className="text-foreground">{tenant?.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-foreground">{tenant?.phone}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Lease Information</label>
            <div className="mt-1 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Date:</span>
                <span className="text-foreground">{new Date(tenant.leaseStartDate)?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">End Date:</span>
                <span className="text-foreground">{new Date(tenant.leaseEndDate)?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Rent:</span>
                <span className="text-foreground font-medium">${tenant?.monthlyRent?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Security Deposit</label>
            <p className="text-sm font-medium text-foreground">${tenant?.securityDeposit?.toLocaleString()}</p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-muted-foreground">Pet Deposit</label>
            <p className="text-sm font-medium text-foreground">
              {tenant?.petDeposit ? `$${tenant?.petDeposit?.toLocaleString()}` : 'N/A'}
            </p>
          </div>
          
          <div>
            <label className="text-xs font-medium text-muted-foreground">Emergency Contact</label>
            <p className="text-sm text-foreground">{tenant?.emergencyContact}</p>
          </div>
        </div>
        {!isPast && (
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4">
              {daysUntilExpiry <= 60 && daysUntilExpiry > 0 && (
                <div className="flex items-center space-x-2 text-warning">
                  <Icon name="AlertTriangle" size={16} />
                  <span className="text-sm font-medium">Lease expires in {daysUntilExpiry} days</span>
                </div>
              )}
              {daysUntilExpiry <= 0 && (
                <div className="flex items-center space-x-2 text-error">
                  <Icon name="AlertCircle" size={16} />
                  <span className="text-sm font-medium">Lease expired</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="MessageSquare">
                Contact
              </Button>
              <Button variant="outline" size="sm" iconName="DollarSign">
                Payment
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Tenant Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
              activeTab === 'current' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Current Tenants ({currentTenants?.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
              activeTab === 'past' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Past Tenants ({pastTenants?.length})
          </button>
        </div>
        
        <Button onClick={onAddTenant} iconName="UserPlus" iconPosition="left">
          Add Tenant
        </Button>
      </div>
      {/* Tenants List */}
      <div className="space-y-4">
        {activeTab === 'current' ? (
          currentTenants?.length > 0 ? (
            currentTenants?.map((tenant) => (
              <TenantCard key={tenant?.id} tenant={tenant} />
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Current Tenants</h3>
              <p className="text-muted-foreground mb-4">Add tenants to start managing your rental property</p>
              <Button onClick={onAddTenant} iconName="UserPlus" iconPosition="left">
                Add First Tenant
              </Button>
            </div>
          )
        ) : (
          pastTenants?.length > 0 ? (
            pastTenants?.map((tenant) => (
              <TenantCard key={tenant?.id} tenant={tenant} isPast={true} />
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Icon name="Archive" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Past Tenants</h3>
              <p className="text-muted-foreground">Historical tenant records will appear here</p>
            </div>
          )
        )}
      </div>
      {/* Lease Renewal Alerts */}
      {activeTab === 'current' && currentTenants?.some(t => getDaysUntilExpiry(t?.leaseEndDate) <= 60) && (
        <div className="bg-warning/10 border border-warning rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <h3 className="font-medium text-foreground">Lease Renewal Reminders</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            The following leases are expiring soon and may need renewal:
          </p>
          <div className="space-y-2">
            {currentTenants?.filter(t => getDaysUntilExpiry(t?.leaseEndDate) <= 60)?.map(tenant => (
                <div key={tenant?.id} className="flex items-center justify-between bg-card rounded-md p-3">
                  <div>
                    <span className="font-medium text-foreground">{tenant?.name}</span>
                    <span className="text-muted-foreground ml-2">({tenant?.unit})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-warning">
                      {getDaysUntilExpiry(tenant?.leaseEndDate)} days remaining
                    </span>
                    <Button variant="outline" size="sm">
                      Send Renewal Notice
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantsTab;