import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuickAddExpense = ({ onAddExpense, onToggleExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date()?.toISOString()?.split('T')?.[0],
    property: '',
    category: '',
    vendor: '',
    description: '',
    amount: '',
    paymentMethod: '',
    taxDeductible: false,
    receipt: null
  });

  const properties = [
    { value: 'sunset-apartments', label: 'Sunset Apartments' },
    { value: 'oak-street-duplex', label: 'Oak Street Duplex' },
    { value: 'downtown-loft', label: 'Downtown Loft' },
    { value: 'riverside-condos', label: 'Riverside Condos' },
    { value: 'garden-view-townhomes', label: 'Garden View Townhomes' }
  ];

  const categories = [
    { value: 'maintenance', label: 'Maintenance & Repairs' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'taxes', label: 'Property Taxes' },
    { value: 'management', label: 'Property Management' },
    { value: 'legal', label: 'Legal & Professional' },
    { value: 'marketing', label: 'Marketing & Advertising' },
    { value: 'supplies', label: 'Supplies & Materials' },
    { value: 'other', label: 'Other Expenses' }
  ];

  const paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'check', label: 'Check' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'online', label: 'Online Payment' }
  ];

  const vendors = [
    { value: 'ace-plumbing', label: 'Ace Plumbing Services' },
    { value: 'city-utilities', label: 'City Utilities Department' },
    { value: 'home-depot', label: 'Home Depot' },
    { value: 'state-insurance', label: 'State Farm Insurance' },
    { value: 'county-tax', label: 'County Tax Office' },
    { value: 'handyman-joe', label: 'Handyman Joe' },
    { value: 'electric-company', label: 'Electric Company' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    setFormData(prev => ({
      ...prev,
      receipt: file
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (formData?.amount && formData?.property && formData?.category) {
      onAddExpense(formData);
      setFormData({
        date: new Date()?.toISOString()?.split('T')?.[0],
        property: '',
        category: '',
        vendor: '',
        description: '',
        amount: '',
        paymentMethod: '',
        taxDeductible: false,
        receipt: null
      });
      setIsExpanded(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    onToggleExpanded?.(!isExpanded);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Plus" size={20} />
          <h3 className="font-semibold text-foreground">Quick Add Expense</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpanded}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
        >
          {isExpanded ? 'Simple View' : 'Detailed View'}
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Basic Fields - Always Visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Input
            label="Date"
            type="date"
            value={formData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            required
          />

          <Select
            label="Property"
            options={properties}
            value={formData?.property}
            onChange={(value) => handleInputChange('property', value)}
            placeholder="Select property"
            required
          />

          <Select
            label="Category"
            options={categories}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            placeholder="Select category"
            required
          />

          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            value={formData?.amount}
            onChange={(e) => handleInputChange('amount', e?.target?.value)}
            required
          />
        </div>

        {/* Expanded Fields */}
        {isExpanded && (
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Vendor"
                options={vendors}
                value={formData?.vendor}
                onChange={(value) => handleInputChange('vendor', value)}
                placeholder="Select or type vendor"
                searchable
              />

              <Select
                label="Payment Method"
                options={paymentMethods}
                value={formData?.paymentMethod}
                onChange={(value) => handleInputChange('paymentMethod', value)}
                placeholder="Select payment method"
              />
            </div>

            <Input
              label="Description"
              type="text"
              placeholder="Brief description of the expense"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Receipt Upload
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="receipt-upload"
                  />
                  <label
                    htmlFor="receipt-upload"
                    className="flex items-center space-x-2 px-3 py-2 border border-border rounded-md cursor-pointer hover:bg-muted transition-smooth"
                  >
                    <Icon name="Upload" size={16} />
                    <span className="text-sm">
                      {formData?.receipt ? formData?.receipt?.name : 'Choose file'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-end">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData?.taxDeductible}
                    onChange={(e) => handleInputChange('taxDeductible', e?.target?.checked)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Tax Deductible</span>
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                date: new Date()?.toISOString()?.split('T')?.[0],
                property: '',
                category: '',
                vendor: '',
                description: '',
                amount: '',
                paymentMethod: '',
                taxDeductible: false,
                receipt: null
              });
            }}
          >
            Clear
          </Button>
          <Button
            type="submit"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Add Expense
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuickAddExpense;