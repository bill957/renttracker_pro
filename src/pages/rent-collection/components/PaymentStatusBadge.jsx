import React from 'react';

const PaymentStatusBadge = ({ status, daysOverdue = 0 }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'paid':
        return {
          label: 'Paid',
          className: 'bg-success text-success-foreground',
          icon: '✓'
        };
      case 'partial':
        return {
          label: 'Partial',
          className: 'bg-warning text-warning-foreground',
          icon: '◐'
        };
      case 'overdue':
        return {
          label: `${daysOverdue}d Overdue`,
          className: 'bg-error text-error-foreground',
          icon: '!'
        };
      case 'due_today':
        return {
          label: 'Due Today',
          className: 'bg-accent text-accent-foreground',
          icon: '●'
        };
      case 'upcoming':
        return {
          label: 'Upcoming',
          className: 'bg-muted text-muted-foreground',
          icon: '○'
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-muted text-muted-foreground',
          icon: '?'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.className}`}>
      <span className="mr-1">{config?.icon}</span>
      {config?.label}
    </span>
  );
};

export default PaymentStatusBadge;