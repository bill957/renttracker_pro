import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TenantFilters = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    search: '',
    property: 'all',
    leaseStatus: 'all',
    paymentStatus: 'all',
    dateRange: 'all'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const properties = [
    { value: 'all', label: 'All Properties' },
    { value: 'sunset-apartments', label: 'Sunset Apartments' },
    { value: 'oak-street-duplex', label: 'Oak Street Duplex' },
    { value: 'downtown-loft', label: 'Downtown Loft' },
    { value: 'riverside-condos', label: 'Riverside Condos' },
    { value: 'garden-view-townhomes', label: 'Garden View Townhomes' }
  ];

  const leaseStatuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'expiring', label: 'Expiring Soon' },
    { value: 'expired', label: 'Expired' },
    { value: 'terminated', label: 'Terminated' }
  ];

  const paymentStatuses = [
    { value: 'all', label: 'All Payment Status' },
    { value: 'current', label: 'Current' },
    { value: 'late', label: 'Late' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'current-month', label: 'Current Month' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'current-year', label: 'Current Year' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      property: 'all',
      leaseStatus: 'all',
      paymentStatus: 'all',
      dateRange: 'all'
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '' && value !== 'all');

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search and Toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tenants by name, email, or property..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Hide Filters' : 'More Filters'}
          </Button>
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Property
            </label>
            <select
              value={filters?.property}
              onChange={(e) => handleFilterChange('property', e?.target?.value)}
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {properties?.map((property) => (
                <option key={property?.value} value={property?.value}>
                  {property?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Lease Status
            </label>
            <select
              value={filters?.leaseStatus}
              onChange={(e) => handleFilterChange('leaseStatus', e?.target?.value)}
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {leaseStatuses?.map((status) => (
                <option key={status?.value} value={status?.value}>
                  {status?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Payment Status
            </label>
            <select
              value={filters?.paymentStatus}
              onChange={(e) => handleFilterChange('paymentStatus', e?.target?.value)}
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {paymentStatuses?.map((status) => (
                <option key={status?.value} value={status?.value}>
                  {status?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Move-in Date
            </label>
            <select
              value={filters?.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {dateRanges?.map((range) => (
                <option key={range?.value} value={range?.value}>
                  {range?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {filters?.search && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              Search: "{filters?.search}"
              <button
                onClick={() => handleFilterChange('search', '')}
                className="ml-2 hover:bg-primary-foreground/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {filters?.property !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
              Property: {properties?.find(p => p?.value === filters?.property)?.label}
              <button
                onClick={() => handleFilterChange('property', 'all')}
                className="ml-2 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {filters?.leaseStatus !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
              Status: {leaseStatuses?.find(s => s?.value === filters?.leaseStatus)?.label}
              <button
                onClick={() => handleFilterChange('leaseStatus', 'all')}
                className="ml-2 hover:bg-accent-foreground/20 rounded-full p-0.5"
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

export default TenantFilters;