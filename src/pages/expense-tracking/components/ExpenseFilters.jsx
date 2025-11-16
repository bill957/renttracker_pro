import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import FinancialPeriodSelector from '../../../components/ui/FinancialPeriodSelector';
import PropertySelector from '../../../components/ui/PropertySelector';

const ExpenseFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expenseCategories = [
    { value: 'all', label: 'All Categories' },
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
    { value: 'all', label: 'All Payment Methods' },
    { value: 'cash', label: 'Cash' },
    { value: 'check', label: 'Check' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'online', label: 'Online Payment' }
  ];

  const receiptStatuses = [
    { value: 'all', label: 'All Receipt Status' },
    { value: 'attached', label: 'Receipt Attached' },
    { value: 'missing', label: 'Receipt Missing' },
    { value: 'pending', label: 'Receipt Pending' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters)?.some(value => 
      value && value !== 'all' && value !== ''
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <h3 className="font-semibold text-foreground">Filter Expenses</h3>
          {hasActiveFilters() && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
          >
            {isExpanded ? 'Less Filters' : 'More Filters'}
          </Button>
        </div>
      </div>
      {/* Primary Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <FinancialPeriodSelector
          selectedPeriod={filters?.period}
          onPeriodChange={(period) => handleFilterChange('period', period)}
        />

        <PropertySelector
          selectedProperty={filters?.property}
          onPropertyChange={(property) => handleFilterChange('property', property)}
        />

        <Select
          label="Category"
          options={expenseCategories}
          value={filters?.category || 'all'}
          onChange={(value) => handleFilterChange('category', value)}
        />

        <div className="flex items-end space-x-2">
          <Input
            label="Search"
            type="search"
            placeholder="Vendor, description..."
            value={filters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="flex-1"
          />
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Select
              label="Payment Method"
              options={paymentMethods}
              value={filters?.paymentMethod || 'all'}
              onChange={(value) => handleFilterChange('paymentMethod', value)}
            />

            <Select
              label="Receipt Status"
              options={receiptStatuses}
              value={filters?.receiptStatus || 'all'}
              onChange={(value) => handleFilterChange('receiptStatus', value)}
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Min Amount"
                type="number"
                placeholder="$0"
                value={filters?.minAmount || ''}
                onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
              />
              <Input
                label="Max Amount"
                type="number"
                placeholder="$10,000"
                value={filters?.maxAmount || ''}
                onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
              />
            </div>

            <div className="flex items-end">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters?.taxDeductible || false}
                    onChange={(e) => handleFilterChange('taxDeductible', e?.target?.checked)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">Tax Deductible Only</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseFilters;