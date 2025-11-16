import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const LeaseRenewalSection = ({ onSendRenewal, onViewDetails }) => {
  const [selectedTenants, setSelectedTenants] = useState([]);

  const expiringLeases = [
  {
    id: 1,
    tenantName: "Sarah Johnson",
    propertyName: "Downtown Loft",
    unitNumber: "Unit A",
    currentRent: 1800,
    leaseEndDate: "2025-03-31",
    daysUntilExpiry: 136,
    renewalStatus: "pending",
    suggestedRent: 1850,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae7d9bdc-1762274136565.png",
    avatarAlt: "Professional headshot of woman with shoulder-length brown hair in white blouse"
  },
  {
    id: 2,
    tenantName: "Mike Davis",
    propertyName: "Riverside Condos",
    unitNumber: "Unit 3C",
    currentRent: 1200,
    leaseEndDate: "2025-04-15",
    daysUntilExpiry: 151,
    renewalStatus: "not_sent",
    suggestedRent: 1250,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_139ca3e6e-1762274271909.png",
    avatarAlt: "Professional headshot of man with short dark hair in navy suit and tie"
  },
  {
    id: 3,
    tenantName: "Emily Chen",
    propertyName: "Garden View Townhomes",
    unitNumber: "Unit 2B",
    currentRent: 1600,
    leaseEndDate: "2025-05-01",
    daysUntilExpiry: 167,
    renewalStatus: "renewed",
    suggestedRent: 1650,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b33e57c8-1762274356059.png",
    avatarAlt: "Professional headshot of Asian woman with long black hair in business attire"
  }];


  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'renewed':return 'bg-success text-success-foreground';
      case 'pending':return 'bg-warning text-warning-foreground';
      case 'not_sent':return 'bg-error text-error-foreground';
      default:return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'renewed':return 'Renewed';
      case 'pending':return 'Pending Response';
      case 'not_sent':return 'Not Sent';
      default:return 'Unknown';
    }
  };

  const getUrgencyColor = (days) => {
    if (days <= 30) return 'text-error';
    if (days <= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  const handleSelectTenant = (tenantId) => {
    setSelectedTenants((prev) =>
    prev?.includes(tenantId) ?
    prev?.filter((id) => id !== tenantId) :
    [...prev, tenantId]
    );
  };

  const handleSelectAll = () => {
    const eligibleTenants = expiringLeases?.filter((lease) => lease?.renewalStatus !== 'renewed');
    if (selectedTenants?.length === eligibleTenants?.length) {
      setSelectedTenants([]);
    } else {
      setSelectedTenants(eligibleTenants?.map((lease) => lease?.id));
    }
  };

  const handleBulkRenewal = () => {
    onSendRenewal(selectedTenants);
    setSelectedTenants([]);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Lease Renewals</h3>
          <p className="text-sm text-muted-foreground">
            {expiringLeases?.length} leases expiring in the next 6 months
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {selectedTenants?.length > 0 &&
          <Button
            variant="default"
            size="sm"
            onClick={handleBulkRenewal}
            iconName="Send"
            iconPosition="left">

              Send Renewals ({selectedTenants?.length})
            </Button>
          }
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left">

            Create Renewal
          </Button>
        </div>
      </div>
      {/* Bulk Actions */}
      {expiringLeases?.filter((lease) => lease?.renewalStatus !== 'renewed')?.length > 0 &&
      <div className="flex items-center justify-between p-3 bg-muted rounded-lg mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
            type="checkbox"
            checked={selectedTenants?.length === expiringLeases?.filter((lease) => lease?.renewalStatus !== 'renewed')?.length}
            onChange={handleSelectAll}
            className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring" />

            <span className="text-sm font-medium text-foreground">
              Select All Eligible ({expiringLeases?.filter((lease) => lease?.renewalStatus !== 'renewed')?.length})
            </span>
          </label>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Mail">
              Email Templates
            </Button>
            <Button variant="ghost" size="sm" iconName="Settings">
              Renewal Settings
            </Button>
          </div>
        </div>
      }
      {/* Lease List */}
      <div className="space-y-4">
        {expiringLeases?.map((lease) =>
        <div key={lease?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-4">
              {lease?.renewalStatus !== 'renewed' &&
            <input
              type="checkbox"
              checked={selectedTenants?.includes(lease?.id)}
              onChange={() => handleSelectTenant(lease?.id)}
              className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring" />

            }
              <img
              src={lease?.avatar}
              alt={lease?.avatarAlt}
              className="w-12 h-12 rounded-full object-cover" />

              <div>
                <h4 className="font-medium text-foreground">{lease?.tenantName}</h4>
                <p className="text-sm text-muted-foreground">
                  {lease?.propertyName} • {lease?.unitNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Current Rent</p>
                <p className="text-sm text-muted-foreground">{formatCurrency(lease?.currentRent)}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Suggested Rent</p>
                <p className="text-sm font-semibold text-success">{formatCurrency(lease?.suggestedRent)}</p>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Expires</p>
                <p className="text-sm text-muted-foreground">{formatDate(lease?.leaseEndDate)}</p>
                <p className={`text-xs font-medium ${getUrgencyColor(lease?.daysUntilExpiry)}`}>
                  {lease?.daysUntilExpiry} days
                </p>
              </div>

              <div className="text-center">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              getStatusColor(lease?.renewalStatus)}`
              }>
                  {getStatusLabel(lease?.renewalStatus)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(lease)}
                iconName="Eye">

                  View
                </Button>
                {lease?.renewalStatus === 'not_sent' &&
              <Button
                variant="default"
                size="sm"
                onClick={() => onSendRenewal([lease?.id])}
                iconName="Send">

                    Send
                  </Button>
              }
                {lease?.renewalStatus === 'pending' &&
              <Button
                variant="outline"
                size="sm"
                iconName="MessageSquare">

                    Follow Up
                  </Button>
              }
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-error">
            {expiringLeases?.filter((l) => l?.renewalStatus === 'not_sent')?.length}
          </p>
          <p className="text-sm text-muted-foreground">Not Sent</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-warning">
            {expiringLeases?.filter((l) => l?.renewalStatus === 'pending')?.length}
          </p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">
            {expiringLeases?.filter((l) => l?.renewalStatus === 'renewed')?.length}
          </p>
          <p className="text-sm text-muted-foreground">Renewed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(expiringLeases?.reduce((sum, lease) => sum + (lease?.suggestedRent - lease?.currentRent), 0))}
          </p>
          <p className="text-sm text-muted-foreground">Potential Increase</p>
        </div>
      </div>
    </div>);

};

export default LeaseRenewalSection;