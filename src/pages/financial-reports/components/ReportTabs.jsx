import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportTabs = ({ activeTab, onTabChange, onExportReport, onSaveTemplate }) => {
  const tabs = [
    { id: 'profit-loss', label: 'Profit & Loss', icon: 'TrendingUp' },
    { id: 'cash-flow', label: 'Cash Flow', icon: 'DollarSign' },
    { id: 'property-performance', label: 'Property Performance', icon: 'BarChart3' },
    { id: 'tax-preparation', label: 'Tax Preparation', icon: 'FileText' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-smooth border-b-2 ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Actions */}
      <div className="flex flex-wrap items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <Icon name="Info" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {activeTab === 'profit-loss' && 'Income vs expenses with category breakdowns'}
            {activeTab === 'cash-flow' && 'Cash inflows and outflows with forecasting'}
            {activeTab === 'property-performance' && 'ROI calculations and performance metrics'}
            {activeTab === 'tax-preparation' && 'Deductible expenses organized by IRS categories'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSaveTemplate}
            iconName="Save"
            iconPosition="left"
            iconSize={14}
          >
            Save Template
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onExportReport}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportTabs;