import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionToolbar = ({ context = 'dashboard', propertyId = null, onActionClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getActionsForContext = () => {
    switch (context) {
      case 'dashboard':
        return [
          { id: 'add-property', label: 'Add Property', icon: 'Building2', color: 'primary' },
          { id: 'record-payment', label: 'Record Payment', icon: 'DollarSign', color: 'success' },
          { id: 'add-expense', label: 'Add Expense', icon: 'Receipt', color: 'warning' },
          { id: 'maintenance-request', label: 'Maintenance Request', icon: 'Wrench', color: 'secondary' },
        ];
      case 'property-details':
        return [
          { id: 'add-tenant', label: 'Add Tenant', icon: 'UserPlus', color: 'primary' },
          { id: 'record-payment', label: 'Record Payment', icon: 'DollarSign', color: 'success' },
          { id: 'add-expense', label: 'Add Expense', icon: 'Receipt', color: 'warning' },
          { id: 'schedule-maintenance', label: 'Schedule Maintenance', icon: 'Calendar', color: 'secondary' },
          { id: 'send-notice', label: 'Send Notice', icon: 'Mail', color: 'accent' },
        ];
      case 'financials':
        return [
          { id: 'record-payment', label: 'Record Payment', icon: 'DollarSign', color: 'success' },
          { id: 'add-expense', label: 'Add Expense', icon: 'Receipt', color: 'warning' },
          { id: 'generate-invoice', label: 'Generate Invoice', icon: 'FileText', color: 'primary' },
          { id: 'export-report', label: 'Export Report', icon: 'Download', color: 'secondary' },
        ];
      case 'operations':
        return [
          { id: 'add-tenant', label: 'Add Tenant', icon: 'UserPlus', color: 'primary' },
          { id: 'maintenance-request', label: 'New Request', icon: 'Wrench', color: 'warning' },
          { id: 'send-notice', label: 'Send Notice', icon: 'Mail', color: 'accent' },
          { id: 'schedule-inspection', label: 'Schedule Inspection', icon: 'Eye', color: 'secondary' },
        ];
      default:
        return [];
    }
  };

  const actions = getActionsForContext();
  const primaryActions = actions?.slice(0, 3);
  const secondaryActions = actions?.slice(3);

  const handleActionClick = (actionId) => {
    onActionClick?.(actionId, propertyId);
    setIsExpanded(false);
  };

  const getButtonVariant = (color) => {
    switch (color) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'secondary': return 'secondary';
      case 'accent': return 'outline';
      default: return 'default';
    }
  };

  return (
    <>
      {/* Desktop Toolbar */}
      <div className="hidden md:flex items-center space-x-2">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant={getButtonVariant(action?.color)}
            onClick={() => handleActionClick(action?.id)}
            iconName={action?.icon}
            iconPosition="left"
            iconSize={16}
            className="whitespace-nowrap"
          >
            {action?.label}
          </Button>
        ))}
      </div>
      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Secondary Actions */}
          {isExpanded && secondaryActions?.length > 0 && (
            <div className="absolute bottom-16 right-0 space-y-2 mb-2">
              {secondaryActions?.map((action, index) => (
                <div
                  key={action?.id}
                  className="flex items-center space-x-3 animate-in slide-in-from-bottom-2 duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="bg-card text-card-foreground px-3 py-1 rounded-md text-sm font-medium shadow-elevation-1 whitespace-nowrap">
                    {action?.label}
                  </span>
                  <Button
                    variant={getButtonVariant(action?.color)}
                    size="icon"
                    onClick={() => handleActionClick(action?.id)}
                    className="w-12 h-12 shadow-elevation-2"
                  >
                    <Icon name={action?.icon} size={20} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Primary Actions */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 space-y-2 mb-2">
              {primaryActions?.map((action, index) => (
                <div
                  key={action?.id}
                  className="flex items-center space-x-3 animate-in slide-in-from-bottom-2 duration-200"
                  style={{ animationDelay: `${(secondaryActions?.length + index) * 50}ms` }}
                >
                  <span className="bg-card text-card-foreground px-3 py-1 rounded-md text-sm font-medium shadow-elevation-1 whitespace-nowrap">
                    {action?.label}
                  </span>
                  <Button
                    variant={getButtonVariant(action?.color)}
                    size="icon"
                    onClick={() => handleActionClick(action?.id)}
                    className="w-12 h-12 shadow-elevation-2"
                  >
                    <Icon name={action?.icon} size={20} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Main FAB */}
          <Button
            variant="default"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 rounded-full shadow-elevation-3 transition-spring"
          >
            <Icon 
              name={isExpanded ? "X" : "Plus"} 
              size={24} 
              className={`transition-smooth ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
            />
          </Button>
        </div>

        {/* Backdrop */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </div>
    </>
  );
};

export default QuickActionToolbar;