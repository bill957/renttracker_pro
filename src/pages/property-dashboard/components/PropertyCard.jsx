import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PropertyCard = ({ property, onQuickAction }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied': return 'bg-success text-success-foreground';
      case 'vacant': return 'bg-warning text-warning-foreground';
      case 'maintenance': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'occupied': return 'Users';
      case 'vacant': return 'Home';
      case 'maintenance': return 'Wrench';
      default: return 'Building2';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = property?.nextRentDue ? getDaysUntilDue(property?.nextRentDue) : null;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property?.image}
          alt={property?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property?.status)}`}>
            <Icon name={getStatusIcon(property?.status)} size={12} className="mr-1" />
            {property?.status?.charAt(0)?.toUpperCase() + property?.status?.slice(1)}
          </span>
        </div>
        {property?.isUrgent && (
          <div className="absolute top-3 right-3">
            <div className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Icon name="AlertCircle" size={12} className="mr-1" />
              Urgent
            </div>
          </div>
        )}
      </div>
      {/* Property Details */}
      <div className="p-4">
        <div className="mb-3">
          <Link 
            to={`/property-details?id=${property?.id}`}
            className="text-lg font-semibold text-foreground hover:text-primary transition-smooth"
          >
            {property?.name}
          </Link>
          <p className="text-sm text-muted-foreground mt-1">{property?.address}</p>
          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center">
              <Icon name="Home" size={12} className="mr-1" />
              {property?.units} {property?.units === 1 ? 'unit' : 'units'}
            </span>
            <span className="flex items-center">
              <Icon name="Calendar" size={12} className="mr-1" />
              Built {property?.yearBuilt}
            </span>
          </div>
        </div>

        {/* Financial Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Monthly Rent</span>
            <span className="text-lg font-bold text-foreground">{formatCurrency(property?.monthlyRent)}</span>
          </div>
          
          {property?.status === 'occupied' && property?.nextRentDue && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Next Due</span>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{formatDate(property?.nextRentDue)}</div>
                <div className={`text-xs ${
                  daysUntilDue < 0 ? 'text-error' : 
                  daysUntilDue <= 3 ? 'text-warning': 'text-muted-foreground'
                }`}>
                  {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                   daysUntilDue === 0 ? 'Due today' :
                   `${daysUntilDue} days remaining`}
                </div>
              </div>
            </div>
          )}

          {property?.currentTenant && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tenant</span>
              <span className="text-sm font-medium text-foreground">{property?.currentTenant}</span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          {property?.status === 'occupied' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickAction('record-payment', property?.id)}
              iconName="DollarSign"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              Payment
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuickAction('maintenance-request', property?.id)}
            iconName="Wrench"
            iconPosition="left"
            iconSize={14}
            className="flex-1"
          >
            Maintenance
          </Button>

          {property?.status === 'occupied' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickAction('send-notice', property?.id)}
              iconName="Mail"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              Contact
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;