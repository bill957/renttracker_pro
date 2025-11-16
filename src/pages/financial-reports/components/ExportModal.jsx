import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportModal = ({ isOpen, onClose, reportType, selectedPeriod, selectedProperty }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeDetails, setIncludeDetails] = useState(true);
  const [emailReport, setEmailReport] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    { id: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Formatted report with charts and tables' },
    { id: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet', description: 'Raw data for further analysis' },
    { id: 'csv', label: 'CSV Data', icon: 'Database', description: 'Comma-separated values for import' },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsExporting(false);
    onClose();
    
    // Show success notification (in real app, this would trigger a toast)
    console.log('Export completed successfully');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Export Report</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Report Info */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="FileText" size={16} className="text-primary" />
              <span className="font-medium text-foreground">Report Details</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Type: {reportType}</div>
              <div>Period: {selectedPeriod?.label || 'Current Month'}</div>
              <div>Property: {selectedProperty?.name || 'All Properties'}</div>
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Export Format</label>
            <div className="space-y-2">
              {exportFormats?.map((format) => (
                <button
                  key={format?.id}
                  onClick={() => setExportFormat(format?.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-smooth ${
                    exportFormat === format?.id
                      ? 'border-primary bg-primary/5 text-primary' :'border-border bg-background text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={format?.icon} size={20} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{format?.label}</div>
                    <div className="text-xs text-muted-foreground">{format?.description}</div>
                  </div>
                  {exportFormat === format?.id && (
                    <Icon name="Check" size={16} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Include Options</label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-ring"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">Include Charts</div>
                  <div className="text-xs text-muted-foreground">Visual graphs and charts in the report</div>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={includeDetails}
                  onChange={(e) => setIncludeDetails(e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-ring"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">Include Detailed Tables</div>
                  <div className="text-xs text-muted-foreground">Transaction-level data and breakdowns</div>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={emailReport}
                  onChange={(e) => setEmailReport(e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-ring"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">Email Report</div>
                  <div className="text-xs text-muted-foreground">Send report to email address</div>
                </div>
              </label>
            </div>
          </div>

          {/* Email Address */}
          {emailReport && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e?.target?.value)}
                placeholder="Enter email address"
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button 
            onClick={handleExport} 
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            {isExporting ? 'Exporting...' : 'Export Report'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;