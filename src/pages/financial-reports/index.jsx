import React, { useState } from 'react';
import Header from '../../components/ui/Header';


import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import ReportTabs from './components/ReportTabs';
import ReportFilters from './components/ReportFilters';
import ProfitLossReport from './components/ProfitLossReport';
import CashFlowReport from './components/CashFlowReport';
import PropertyPerformanceReport from './components/PropertyPerformanceReport';
import TaxPreparationReport from './components/TaxPreparationReport';
import ExportModal from './components/ExportModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FinancialReports = () => {
  const [activeTab, setActiveTab] = useState('profit-loss');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [savedTemplates, setSavedTemplates] = useState([]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handlePropertyChange = (property) => {
    setSelectedProperty(property);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleExportReport = () => {
    setShowExportModal(true);
  };

  const handleSaveTemplate = () => {
    const template = {
      id: Date.now(),
      name: `${activeTab} Template - ${new Date()?.toLocaleDateString()}`,
      tab: activeTab,
      property: selectedProperty,
      period: selectedPeriod,
      createdAt: new Date(),
    };
    setSavedTemplates(prev => [...prev, template]);
    console.log('Template saved:', template);
  };

  const handleApplyFilters = (filters) => {
    console.log('Applying filters:', filters);
  };

  const handleResetFilters = () => {
    setSelectedProperty(null);
    setSelectedPeriod(null);
    console.log('Filters reset');
  };

  const handleActionClick = (actionId) => {
    console.log('Action clicked:', actionId);
  };

  const renderActiveReport = () => {
    switch (activeTab) {
      case 'profit-loss':
        return <ProfitLossReport period={selectedPeriod} />;
      case 'cash-flow':
        return <CashFlowReport period={selectedPeriod} />;
      case 'property-performance':
        return <PropertyPerformanceReport period={selectedPeriod} />;
      case 'tax-preparation':
        return <TaxPreparationReport period={selectedPeriod} />;
      default:
        return <ProfitLossReport period={selectedPeriod} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive analytics and reporting for property performance evaluation and tax preparation
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <QuickActionToolbar 
                context="financials" 
                onActionClick={handleActionClick}
              />
            </div>
          </div>

          {/* Report Filters */}
          <div className="mb-6">
            <ReportFilters
              selectedProperty={selectedProperty}
              onPropertyChange={handlePropertyChange}
              selectedPeriod={selectedPeriod}
              onPeriodChange={handlePeriodChange}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Report Tabs */}
          <div className="mb-6">
            <ReportTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onExportReport={handleExportReport}
              onSaveTemplate={handleSaveTemplate}
            />
          </div>

          {/* Saved Templates */}
          {savedTemplates?.length > 0 && (
            <div className="mb-6">
              <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-foreground">Saved Templates</h3>
                  <Icon name="Bookmark" size={16} className="text-muted-foreground" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {savedTemplates?.slice(-3)?.map((template) => (
                    <Button
                      key={template?.id}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setActiveTab(template?.tab);
                        setSelectedProperty(template?.property);
                        setSelectedPeriod(template?.period);
                      }}
                      className="text-xs"
                    >
                      {template?.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Report Content */}
          <div className="space-y-6">
            {renderActiveReport()}
          </div>

          {/* Quick Stats Footer */}
          <div className="mt-12 bg-card border border-border rounded-lg p-6 shadow-elevation-1">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2">
                  <Icon name="Building2" size={24} className="text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">5</div>
                <div className="text-sm text-muted-foreground">Properties</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mx-auto mb-2">
                  <Icon name="DollarSign" size={24} className="text-success" />
                </div>
                <div className="text-2xl font-bold text-foreground">$114K</div>
                <div className="text-sm text-muted-foreground">Annual Income</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-lg mx-auto mb-2">
                  <Icon name="TrendingUp" size={24} className="text-warning" />
                </div>
                <div className="text-2xl font-bold text-foreground">12.9%</div>
                <div className="text-sm text-muted-foreground">Portfolio ROI</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mx-auto mb-2">
                  <Icon name="FileText" size={24} className="text-secondary" />
                </div>
                <div className="text-2xl font-bold text-foreground">24</div>
                <div className="text-sm text-muted-foreground">Reports Generated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        reportType={activeTab}
        selectedPeriod={selectedPeriod}
        selectedProperty={selectedProperty}
      />
    </div>
  );
};

export default FinancialReports;