import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PaymentStatusBadge from './PaymentStatusBadge';

const PaymentHistoryModal = ({ isOpen, onClose, tenant }) => {
  const [selectedYear, setSelectedYear] = useState(new Date()?.getFullYear());

  const mockPaymentHistory = [
    {
      id: 1,
      date: '2024-11-01',
      amount: 1200,
      lateFee: 0,
      method: 'Bank Transfer',
      status: 'paid',
      reference: 'TXN-20241101-001',
      notes: 'On-time payment'
    },
    {
      id: 2,
      date: '2024-10-05',
      amount: 1200,
      lateFee: 25,
      method: 'Check',
      status: 'paid',
      reference: 'CHK-1234',
      notes: 'Late payment - 5 days overdue'
    },
    {
      id: 3,
      date: '2024-09-01',
      amount: 1200,
      lateFee: 0,
      method: 'Online Payment',
      status: 'paid',
      reference: 'ONL-20240901-789',
      notes: 'Automatic payment'
    },
    {
      id: 4,
      date: '2024-08-15',
      amount: 600,
      lateFee: 0,
      method: 'Cash',
      status: 'partial',
      reference: 'CASH-001',
      notes: 'Partial payment - remaining $600 paid on 8/20'
    },
    {
      id: 5,
      date: '2024-08-20',
      amount: 600,
      lateFee: 15,
      method: 'Cash',
      status: 'paid',
      reference: 'CASH-002',
      notes: 'Remaining balance with late fee'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'bank transfer': return 'CreditCard';
      case 'check': return 'FileText';
      case 'cash': return 'DollarSign';
      case 'online payment': return 'Smartphone';
      default: return 'DollarSign';
    }
  };

  const calculateTotals = () => {
    const yearPayments = mockPaymentHistory?.filter(payment => 
      new Date(payment.date)?.getFullYear() === selectedYear
    );
    
    const totalPaid = yearPayments?.reduce((sum, payment) => sum + payment?.amount, 0);
    const totalLateFees = yearPayments?.reduce((sum, payment) => sum + payment?.lateFee, 0);
    const paymentCount = yearPayments?.length;
    
    return { totalPaid, totalLateFees, paymentCount };
  };

  const { totalPaid, totalLateFees, paymentCount } = calculateTotals();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Payment History</h2>
            <p className="text-sm text-muted-foreground">{tenant?.name} - {tenant?.propertyAddress}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Summary and Controls */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Year Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{formatCurrency(totalPaid)}</div>
                <div className="text-xs text-muted-foreground">Total Paid ({selectedYear})</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{formatCurrency(totalLateFees)}</div>
                <div className="text-xs text-muted-foreground">Late Fees</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{paymentCount}</div>
                <div className="text-xs text-muted-foreground">Payments</div>
              </div>
            </div>

            {/* Year Selector */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedYear(selectedYear - 1)}
                iconName="ChevronLeft"
                iconSize={16}
              />
              <span className="text-lg font-semibold text-card-foreground px-4">
                {selectedYear}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedYear(selectedYear + 1)}
                disabled={selectedYear >= new Date()?.getFullYear()}
                iconName="ChevronRight"
                iconSize={16}
              />
            </div>
          </div>
        </div>

        {/* Payment History List */}
        <div className="overflow-y-auto max-h-96">
          {mockPaymentHistory?.length > 0 ? (
            <div className="divide-y divide-border">
              {mockPaymentHistory?.filter(payment => new Date(payment.date)?.getFullYear() === selectedYear)?.map((payment) => (
                <div key={payment?.id} className="p-4 hover:bg-muted/50 transition-smooth">
                  <div className="flex items-center justify-between">
                    {/* Payment Info */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        <Icon name={getPaymentMethodIcon(payment?.method)} size={18} className="text-primary" />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-card-foreground">{formatDate(payment?.date)}</span>
                          <PaymentStatusBadge status={payment?.status} />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {payment?.method} • {payment?.reference}
                        </div>
                        {payment?.notes && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {payment?.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <div className="font-semibold text-card-foreground">
                        {formatCurrency(payment?.amount)}
                      </div>
                      {payment?.lateFee > 0 && (
                        <div className="text-sm text-warning">
                          +{formatCurrency(payment?.lateFee)} late fee
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Icon name="Receipt" size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No payment history found for {selectedYear}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-border">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export History
          </Button>
          
          <Button
            variant="default"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryModal;