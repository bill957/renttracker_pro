import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PaymentStatusBadge from './PaymentStatusBadge';
import Image from '../../../components/AppImage';

const TenantPaymentRow = ({ tenant, onRecordPayment, onSendReminder, onViewHistory }) => {
  const {
    id,
    name,
    avatar,
    avatarAlt,
    propertyAddress,
    rentAmount,
    dueDate,
    paymentStatus,
    daysOverdue,
    lastPaymentDate,
    paymentMethod
  } = tenant;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getRowClassName = () => {
    switch (paymentStatus) {
      case 'overdue':
        return 'bg-error/5 border-l-4 border-l-error';
      case 'due_today':
        return 'bg-warning/5 border-l-4 border-l-warning';
      case 'paid':
        return 'bg-success/5 border-l-4 border-l-success';
      default:
        return 'bg-card border-l-4 border-l-transparent';
    }
  };

  return (
    <div className={`${getRowClassName()} border border-border rounded-lg p-4 transition-smooth hover:shadow-elevation-1`}>
      <div className="flex items-center justify-between">
        {/* Tenant Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <Image
              src={avatar}
              alt={avatarAlt}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm text-card-foreground truncate">{name}</h3>
            <p className="text-xs text-muted-foreground truncate">{propertyAddress}</p>
          </div>
        </div>

        {/* Payment Details - Desktop */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="text-center">
            <div className="text-sm font-semibold text-card-foreground">{formatCurrency(rentAmount)}</div>
            <div className="text-xs text-muted-foreground">Rent Amount</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm font-medium text-card-foreground">{formatDate(dueDate)}</div>
            <div className="text-xs text-muted-foreground">Due Date</div>
          </div>

          <div className="text-center">
            <PaymentStatusBadge status={paymentStatus} daysOverdue={daysOverdue} />
          </div>

          {lastPaymentDate && (
            <div className="text-center">
              <div className="text-sm text-muted-foreground">{formatDate(lastPaymentDate)}</div>
              <div className="text-xs text-muted-foreground">{paymentMethod}</div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          {paymentStatus !== 'paid' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onRecordPayment(tenant)}
              iconName="DollarSign"
              iconPosition="left"
              iconSize={14}
              className="hidden md:flex"
            >
              Record Payment
            </Button>
          )}
          
          {(paymentStatus === 'overdue' || paymentStatus === 'due_today') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSendReminder(tenant)}
              iconName="Mail"
              iconPosition="left"
              iconSize={14}
              className="hidden md:flex"
            >
              Send Reminder
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewHistory(tenant)}
            iconName="History"
            iconPosition="left"
            iconSize={14}
            className="hidden md:flex"
          >
            History
          </Button>

          {/* Mobile Actions Menu */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewHistory(tenant)}
            >
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Payment Details */}
      <div className="lg:hidden mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Rent: {formatCurrency(rentAmount)}</span>
          <span className="text-xs text-muted-foreground">Due: {formatDate(dueDate)}</span>
        </div>
        <div className="flex items-center justify-between">
          <PaymentStatusBadge status={paymentStatus} daysOverdue={daysOverdue} />
          {lastPaymentDate && (
            <span className="text-xs text-muted-foreground">
              Last: {formatDate(lastPaymentDate)} ({paymentMethod})
            </span>
          )}
        </div>
        
        {/* Mobile Action Buttons */}
        <div className="flex space-x-2 mt-3">
          {paymentStatus !== 'paid' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onRecordPayment(tenant)}
              iconName="DollarSign"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              Record
            </Button>
          )}
          
          {(paymentStatus === 'overdue' || paymentStatus === 'due_today') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSendReminder(tenant)}
              iconName="Mail"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              Remind
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantPaymentRow;