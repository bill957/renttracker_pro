import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const PaymentFilters = ({ filters, onFiltersChange, onExport }) => {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'paid', label: 'Paid' },
    { value: 'partial', label: 'Partial Payment' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'due_today', label: 'Due Today' },
    { value: 'upcoming', label: 'Upcoming' }
  ];

  const propertyOptions = [
    { value: 'all', label: 'All Properties' },
    { value: 'sunset-apartments', label: 'Sunset Apartments' },
    { value: 'oak-street-duplex', label: 'Oak Street Duplex' },
    { value: 'downtown-loft', label: 'Downtown Loft' },
    { value: 'riverside-condos', label: 'Riverside Condos' },
    { value: 'garden-view-townhomes', label: 'Garden View Townhomes' }
  ];

  const sortOptions = [
    { value: 'due_date_asc', label: 'Due Date (Earliest)' },
    { value: 'due_date_desc', label: 'Due Date (Latest)' },
    { value: 'tenant_name', label: 'Tenant Name (A-Z)' },
    { value: 'amount_desc', label: 'Amount (High to Low)' },
    { value: 'amount_asc', label: 'Amount (Low to High)' },
    { value: 'status', label: 'Payment Status' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
          <div className="flex-1 min-w-0">
            <Input
              type="search"
              placeholder="Search tenants or properties..."
              value={filters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>

          <Select
            options={statusOptions}
            value={filters?.status || 'all'}
            onChange={(value) => handleFilterChange('status', value)}
            placeholder="Filter by status"
            className="sm:w-48"
          />

          <Select
            options={propertyOptions}
            value={filters?.property || 'all'}
            onChange={(value) => handleFilterChange('property', value)}
            placeholder="Filter by property"
            className="sm:w-48"
          />

          <Select
            options={sortOptions}
            value={filters?.sortBy || 'due_date_asc'}
            onChange={(value) => handleFilterChange('sortBy', value)}
            placeholder="Sort by"
            className="sm:w-48"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => onFiltersChange({
              search: '',
              status: 'all',
              property: 'all',
              sortBy: 'due_date_asc'
            })}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Reset
          </Button>

          <Button
            variant="secondary"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
        </div>
      </div>
      {/* Quick Filter Chips */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground mr-2">Quick filters:</span>
        
        <Button
          variant={filters?.status === 'overdue' ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('status', filters?.status === 'overdue' ? 'all' : 'overdue')}
        >
          Overdue Only
        </Button>

        <Button
          variant={filters?.status === 'due_today' ? 'warning' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('status', filters?.status === 'due_today' ? 'all' : 'due_today')}
        >
          Due Today
        </Button>

        <Button
          variant={filters?.status === 'paid' ? 'success' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('status', filters?.status === 'paid' ? 'all' : 'paid')}
        >
          Paid This Month
        </Button>
      </div>
    </div>
  );
};

export default PaymentFilters;