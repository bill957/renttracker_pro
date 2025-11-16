import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import PropertySelector from '../../../components/ui/PropertySelector';
import FinancialPeriodSelector from '../../../components/ui/FinancialPeriodSelector';

const ReportFilters = ({ selectedProperty, onPropertyChange, selectedPeriod, onPeriodChange, onApplyFilters, onResetFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [comparisonPeriod, setComparisonPeriod] = useState(null);

  const expenseCategories = [
    { id: 'maintenance', label: 'Maintenance & Repairs', color: 'bg-warning' },
    { id: 'utilities', label: 'Utilities', color: 'bg-secondary' },
    { id: 'insurance', label: 'Insurance', color: 'bg-accent' },
    { id: 'taxes', label: 'Property Taxes', color: 'bg-error' },
    { id: 'management', label: 'Management Fees', color: 'bg-success' },
    { id: 'marketing', label: 'Marketing & Advertising', color: 'bg-primary' },
  ];

  const comparisonPeriods = [
    { id: 'previous-period', label: 'Previous Period', value: 'previous-period' },
    { id: 'same-period-last-year', label: 'Same Period Last Year', value: 'same-period-last-year' },
    { id: 'budget', label: 'Budget Comparison', value: 'budget' },
  ];

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev?.includes(categoryId)
        ? prev?.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters?.({
      property: selectedProperty,
      period: selectedPeriod,
      categories: selectedCategories,
      comparison: comparisonPeriod,
    });
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setComparisonPeriod(null);
    onResetFilters?.();
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-4">
      {/* Basic Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <PropertySelector
          selectedProperty={selectedProperty}
          onPropertyChange={onPropertyChange}
        />
        
        <FinancialPeriodSelector
          selectedPeriod={selectedPeriod}
          onPeriodChange={onPeriodChange}
          showCustomRange={true}
        />

        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
        >
          Advanced Filters
        </Button>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-4">
          {/* Expense Categories */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Expense Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {expenseCategories?.map((category) => (
                <button
                  key={category?.id}
                  onClick={() => handleCategoryToggle(category?.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth border ${
                    selectedCategories?.includes(category?.id)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground hover:bg-muted'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${category?.color}`} />
                  <span>{category?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Period */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Compare With
            </label>
            <div className="flex flex-wrap gap-2">
              {comparisonPeriods?.map((period) => (
                <button
                  key={period?.id}
                  onClick={() => setComparisonPeriod(period?.value === comparisonPeriod ? null : period?.value)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-smooth border ${
                    comparisonPeriod === period?.value
                      ? 'border-secondary bg-secondary text-secondary-foreground'
                      : 'border-border bg-background text-foreground hover:bg-muted'
                  }`}
                >
                  {period?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center space-x-2 pt-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleApplyFilters}
              iconName="Filter"
              iconPosition="left"
              iconSize={14}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={14}
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilters;