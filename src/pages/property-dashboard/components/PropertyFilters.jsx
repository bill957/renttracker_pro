import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PropertyFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Properties', count: 12 },
    { value: 'occupied', label: 'Occupied', count: 8 },
    { value: 'vacant', label: 'Vacant', count: 3 },
    { value: 'maintenance', label: 'Under Maintenance', count: 1 },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'Single Family' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'condo', label: 'Condominium' },
    { value: 'townhouse', label: 'Townhouse' },
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'downtown', label: 'Downtown' },
    { value: 'suburbs', label: 'Suburbs' },
    { value: 'riverside', label: 'Riverside' },
    { value: 'oakstreet', label: 'Oak Street Area' },
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.status !== 'all') count++;
    if (filters?.type !== 'all') count++;
    if (filters?.location !== 'all') count++;
    if (filters?.search) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      {/* Search and Quick Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search properties by name, address, or tenant..."
            value={filters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-md">
          {statusOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => handleFilterChange('status', option?.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-smooth ${
                filters?.status === option?.value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background'
              }`}
            >
              {option?.label}
              {option?.count && (
                <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                  filters?.status === option?.value
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {option?.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Advanced Filters Toggle */}
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
        >
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Property Type
              </label>
              <select
                value={filters?.type || 'all'}
                onChange={(e) => handleFilterChange('type', e?.target?.value)}
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {typeOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <select
                value={filters?.location || 'all'}
                onChange={(e) => handleFilterChange('location', e?.target?.value)}
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {locationOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rent Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Monthly Rent Range
              </label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters?.minRent || ''}
                  onChange={(e) => handleFilterChange('minRent', e?.target?.value)}
                  className="w-full"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters?.maxRent || ''}
                  onChange={(e) => handleFilterChange('maxRent', e?.target?.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-end space-x-2">
              <Button
                variant="outline"
                onClick={onClearFilters}
                iconName="X"
                iconPosition="left"
                iconSize={14}
                className="flex-1"
              >
                Clear
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsExpanded(false)}
                iconName="Check"
                iconPosition="left"
                iconSize={14}
                className="flex-1"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;