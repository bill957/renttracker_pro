import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RecordPaymentModal = ({ isOpen, onClose, tenant, onSavePayment }) => {
  const [paymentData, setPaymentData] = useState({
    amount: tenant?.rentAmount || 0,
    paymentMethod: 'bank_transfer',
    paymentDate: new Date()?.toISOString()?.split('T')?.[0],
    lateFee: 0,
    notes: '',
    reference: ''
  });

  const paymentMethodOptions = [
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'check', label: 'Check' },
    { value: 'cash', label: 'Cash' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'money_order', label: 'Money Order' },
    { value: 'online_payment', label: 'Online Payment' }
  ];

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateLateFee = () => {
    if (!tenant?.dueDate) return 0;
    
    const dueDate = new Date(tenant.dueDate);
    const today = new Date();
    const daysLate = Math.max(0, Math.floor((today - dueDate) / (1000 * 60 * 60 * 24)));
    
    if (daysLate > 5) {
      return Math.min(50, daysLate * 5); // $5 per day, max $50
    }
    return 0;
  };

  const suggestedLateFee = calculateLateFee();
  const totalAmount = parseFloat(paymentData?.amount || 0) + parseFloat(paymentData?.lateFee || 0);

  const handleSave = () => {
    const payment = {
      ...paymentData,
      tenantId: tenant?.id,
      totalAmount,
      recordedDate: new Date()?.toISOString()
    };
    
    onSavePayment(payment);
    onClose();
    
    // Reset form
    setPaymentData({
      amount: tenant?.rentAmount || 0,
      paymentMethod: 'bank_transfer',
      paymentDate: new Date()?.toISOString()?.split('T')?.[0],
      lateFee: 0,
      notes: '',
      reference: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Record Payment</h2>
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

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Payment Amount */}
          <Input
            label="Payment Amount"
            type="number"
            step="0.01"
            value={paymentData?.amount}
            onChange={(e) => handleInputChange('amount', e?.target?.value)}
            description={`Monthly rent: $${tenant?.rentAmount?.toFixed(2)}`}
            required
          />

          {/* Payment Method */}
          <Select
            label="Payment Method"
            options={paymentMethodOptions}
            value={paymentData?.paymentMethod}
            onChange={(value) => handleInputChange('paymentMethod', value)}
            required
          />

          {/* Payment Date */}
          <Input
            label="Payment Date"
            type="date"
            value={paymentData?.paymentDate}
            onChange={(e) => handleInputChange('paymentDate', e?.target?.value)}
            required
          />

          {/* Late Fee */}
          <div className="space-y-2">
            <Input
              label="Late Fee"
              type="number"
              step="0.01"
              value={paymentData?.lateFee}
              onChange={(e) => handleInputChange('lateFee', e?.target?.value)}
              description={suggestedLateFee > 0 ? `Suggested late fee: $${suggestedLateFee?.toFixed(2)}` : ''}
            />
            {suggestedLateFee > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleInputChange('lateFee', suggestedLateFee)}
              >
                Apply Suggested Fee (${suggestedLateFee?.toFixed(2)})
              </Button>
            )}
          </div>

          {/* Reference Number */}
          <Input
            label="Reference Number"
            type="text"
            placeholder="Check number, transaction ID, etc."
            value={paymentData?.reference}
            onChange={(e) => handleInputChange('reference', e?.target?.value)}
            description="Optional reference for tracking"
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Notes (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
              placeholder="Additional notes about this payment..."
              value={paymentData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
            />
          </div>

          {/* Total Summary */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Payment Amount:</span>
              <span className="text-sm font-medium">${parseFloat(paymentData?.amount || 0)?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Late Fee:</span>
              <span className="text-sm font-medium">${parseFloat(paymentData?.lateFee || 0)?.toFixed(2)}</span>
            </div>
            <hr className="border-border my-2" />
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-card-foreground">Total Amount:</span>
              <span className="text-base font-bold text-success">${totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSave}
            className="flex-1"
            iconName="Check"
            iconPosition="left"
            iconSize={16}
          >
            Record Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordPaymentModal;