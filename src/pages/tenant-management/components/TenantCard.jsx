import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TenantCard = ({ tenant, onViewDetails, onContact, onViewPayments }) => {
  const getLeaseStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'expiring': return 'bg-warning text-warning-foreground';
      case 'expired': return 'bg-error text-error-foreground';
      case 'terminated': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

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

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={tenant?.avatar}
              alt={tenant?.avatarAlt}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
              tenant?.isActive ? 'bg-success' : 'bg-muted'
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">{tenant?.name}</h3>
            <p className="text-sm text-muted-foreground">{tenant?.email}</p>
            <p className="text-sm text-muted-foreground">{tenant?.phone}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          getLeaseStatusColor(tenant?.leaseStatus)
        }`}>
          {tenant?.leaseStatus?.charAt(0)?.toUpperCase() + tenant?.leaseStatus?.slice(1)}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Building2" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Property</span>
          </div>
          <p className="text-sm text-muted-foreground ml-6">{tenant?.propertyName}</p>
          <p className="text-sm text-muted-foreground ml-6">{tenant?.unitNumber}</p>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Monthly Rent</span>
          </div>
          <p className="text-sm font-semibold text-foreground ml-6">{formatCurrency(tenant?.monthlyRent)}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Lease Period</span>
          </div>
          <p className="text-sm text-muted-foreground ml-6">
            {formatDate(tenant?.leaseStart)} - {formatDate(tenant?.leaseEnd)}
          </p>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Security Deposit</span>
          </div>
          <p className="text-sm text-muted-foreground ml-6">{formatCurrency(tenant?.securityDeposit)}</p>
        </div>
      </div>
      {tenant?.lastPayment && (
        <div className="mb-4 p-3 bg-muted rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Last Payment</span>
            <span className="text-sm text-muted-foreground">{formatDate(tenant?.lastPayment?.date)}</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-success font-semibold">{formatCurrency(tenant?.lastPayment?.amount)}</span>
            <span className="text-xs text-muted-foreground">{tenant?.lastPayment?.method}</span>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewDetails(tenant)}
          iconName="User"
          iconPosition="left"
          iconSize={14}
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onContact(tenant)}
          iconName="MessageSquare"
          iconPosition="left"
          iconSize={14}
        >
          Contact
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewPayments(tenant)}
          iconName="CreditCard"
          iconPosition="left"
          iconSize={14}
        >
          Payments
        </Button>
      </div>
    </div>
  );
};

export default TenantCard;