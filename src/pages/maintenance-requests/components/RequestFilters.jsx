import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RequestFilters = ({ onFiltersChange, totalRequests }) => {
  const [filters, setFilters] = useState({
    search: '',
    property: '',
    priority: '',
    status: '',
    dateRange: '',
    category: ''
  });

  const propertyOptions = [
    { value: '', label: 'All Properties' },
    { value: 'sunset-apartments', label: 'Sunset Apartments' },
    { value: 'oak-street-duplex', label: 'Oak Street Duplex' },
    { value: 'downtown-loft', label: 'Downtown Loft' },
    { value: 'riverside-condos', label: 'Riverside Condos' },
    { value: 'garden-view-townhomes', label: 'Garden View Townhomes' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'appliance', label: 'Appliance' },
    { value: 'structural', label: 'Structural' },
    { value: 'cosmetic', label: 'Cosmetic' },
    { value: 'security', label: 'Security' },
    { value: 'other', label: 'Other' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      property: '',
      priority: '',
      status: '',
      dateRange: '',
      category: ''
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Filter Requests</h3>
          <span className="text-sm text-muted-foreground">({totalRequests} total)</span>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} iconName="X" iconPosition="left" iconSize={16}>
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search requests, tenants, vendors..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="col-span-1 md:col-span-2"
        />

        <Select
          placeholder="Select property"
          options={propertyOptions}
          value={filters?.property}
          onChange={(value) => handleFilterChange('property', value)}
        />

        <Select
          placeholder="Select priority"
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => handleFilterChange('priority', value)}
        />

        <Select
          placeholder="Select status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Select
          placeholder="Select category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
        />

        <Select
          placeholder="Select date range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />
      </div>
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters?.search && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Search: "{filters?.search}"
              <button
                onClick={() => handleFilterChange('search', '')}
                className="ml-2 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {filters?.property && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
              Property: {propertyOptions?.find(p => p?.value === filters?.property)?.label}
              <button
                onClick={() => handleFilterChange('property', '')}
                className="ml-2 hover:text-secondary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {filters?.priority && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
              Priority: {priorityOptions?.find(p => p?.value === filters?.priority)?.label}
              <button
                onClick={() => handleFilterChange('priority', '')}
                className="ml-2 hover:text-warning/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {filters?.status && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
              Status: {statusOptions?.find(s => s?.value === filters?.status)?.label}
              <button
                onClick={() => handleFilterChange('status', '')}
                className="ml-2 hover:text-accent/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestFilters;