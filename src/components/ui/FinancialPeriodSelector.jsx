import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const FinancialPeriodSelector = ({ selectedPeriod, onPeriodChange, showCustomRange = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustomInputs, setShowCustomInputs] = useState(false);
  const dropdownRef = useRef(null);

  const predefinedPeriods = [
    { id: 'current-month', label: 'Current Month', value: 'current-month' },
    { id: 'last-month', label: 'Last Month', value: 'last-month' },
    { id: 'current-quarter', label: 'Current Quarter', value: 'current-quarter' },
    { id: 'last-quarter', label: 'Last Quarter', value: 'last-quarter' },
    { id: 'current-year', label: 'Current Year', value: 'current-year' },
    { id: 'last-year', label: 'Last Year', value: 'last-year' },
    { id: 'ytd', label: 'Year to Date', value: 'ytd' },
    { id: 'last-12-months', label: 'Last 12 Months', value: 'last-12-months' },
  ];

  const currentPeriod = selectedPeriod || predefinedPeriods?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
        setShowCustomInputs(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePeriodSelect = (period) => {
    onPeriodChange?.(period);
    setIsOpen(false);
    setShowCustomInputs(false);
  };

  const handleCustomRangeSelect = () => {
    setShowCustomInputs(true);
  };

  const handleCustomRangeApply = () => {
    if (customStartDate && customEndDate) {
      const customPeriod = {
        id: 'custom',
        label: `${formatDate(customStartDate)} - ${formatDate(customEndDate)}`,
        value: 'custom',
        startDate: customStartDate,
        endDate: customEndDate,
      };
      onPeriodChange?.(customPeriod);
      setIsOpen(false);
      setShowCustomInputs(false);
      setCustomStartDate('');
      setCustomEndDate('');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getCurrentPeriodDates = () => {
    const now = new Date();
    const currentMonth = now?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    switch (currentPeriod?.value) {
      case 'current-month':
        return currentMonth;
      case 'last-month':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return lastMonth?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      case 'current-quarter':
        const quarter = Math.floor(now?.getMonth() / 3) + 1;
        return `Q${quarter} ${now?.getFullYear()}`;
      case 'current-year':
        return now?.getFullYear()?.toString();
      case 'ytd':
        return `Jan 1 - ${now?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      case 'last-12-months':
        const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 12, now.getDate());
        return `${formatDate(twelveMonthsAgo?.toISOString()?.split('T')?.[0])} - ${formatDate(now?.toISOString()?.split('T')?.[0])}`;
      default:
        return currentPeriod?.startDate && currentPeriod?.endDate 
          ? `${formatDate(currentPeriod?.startDate)} - ${formatDate(currentPeriod?.endDate)}`
          : currentMonth;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[200px] justify-between"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} />
          <div className="text-left">
            <div className="font-medium text-sm">{currentPeriod?.label}</div>
            <div className="text-xs text-muted-foreground">{getCurrentPeriodDates()}</div>
          </div>
        </div>
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 md:right-auto md:w-80 mt-1 bg-popover border border-border rounded-md shadow-elevation-2 z-50">
          {!showCustomInputs ? (
            <>
              {/* Predefined Periods */}
              <div className="py-1">
                {predefinedPeriods?.map((period) => (
                  <button
                    key={period?.id}
                    onClick={() => handlePeriodSelect(period)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-smooth ${
                      currentPeriod?.value === period?.value ? 'bg-accent text-accent-foreground' : 'text-popover-foreground'
                    }`}
                  >
                    {period?.label}
                  </button>
                ))}
              </div>

              {/* Custom Range Option */}
              {showCustomRange && (
                <>
                  <hr className="border-border" />
                  <div className="py-1">
                    <button
                      onClick={handleCustomRangeSelect}
                      className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="CalendarDays" size={16} />
                      <span>Custom Date Range</span>
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            /* Custom Date Range Inputs */
            (<div className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCustomInputs(false)}
                >
                  <Icon name="ArrowLeft" size={16} />
                </Button>
                <h3 className="font-medium text-sm">Custom Date Range</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e?.target?.value)}
                    className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e?.target?.value)}
                    min={customStartDate}
                    className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCustomInputs(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleCustomRangeApply}
                    disabled={!customStartDate || !customEndDate}
                    className="flex-1"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>)
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialPeriodSelector;