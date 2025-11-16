import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BulkActions = ({ onImportExpenses, onExportExpenses, onSetupRecurring }) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isRecurringModalOpen, setIsRecurringModalOpen] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importFormat, setImportFormat] = useState('csv');

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    setImportFile(file);
  };

  const handleImport = () => {
    if (importFile) {
      onImportExpenses(importFile, importFormat);
      setImportFile(null);
      setIsImportModalOpen(false);
    }
  };

  const exportFormats = [
    { id: 'csv', name: 'CSV', description: 'Comma-separated values for Excel' },
    { id: 'pdf', name: 'PDF', description: 'Formatted report for printing' },
    { id: 'quickbooks', name: 'QuickBooks', description: 'QBO format for QuickBooks' },
    { id: 'excel', name: 'Excel', description: 'Microsoft Excel workbook' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} />
          <h3 className="font-semibold text-foreground">Bulk Actions</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Import Expenses */}
        <div className="p-4 border border-border rounded-md">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Upload" size={18} className="text-primary" />
            <h4 className="font-medium text-foreground">Import Expenses</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Upload bank statements or expense files to automatically create entries
          </p>
          <Button
            variant="outline"
            onClick={() => setIsImportModalOpen(true)}
            iconName="Upload"
            iconPosition="left"
            iconSize={14}
            className="w-full"
          >
            Import File
          </Button>
        </div>

        {/* Export Expenses */}
        <div className="p-4 border border-border rounded-md">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Download" size={18} className="text-secondary" />
            <h4 className="font-medium text-foreground">Export Expenses</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Download expense data for accounting software or tax preparation
          </p>
          <div className="space-y-2">
            {exportFormats?.map((format) => (
              <Button
                key={format?.id}
                variant="ghost"
                size="sm"
                onClick={() => onExportExpenses(format?.id)}
                className="w-full justify-start"
              >
                <span className="font-medium">{format?.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{format?.description}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Recurring Expenses */}
        <div className="p-4 border border-border rounded-md">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Repeat" size={18} className="text-accent" />
            <h4 className="font-medium text-foreground">Recurring Expenses</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Set up automatic entries for regular expenses like insurance or utilities
          </p>
          <Button
            variant="outline"
            onClick={() => setIsRecurringModalOpen(true)}
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
            className="w-full"
          >
            Setup Recurring
          </Button>
        </div>
      </div>
      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Import Expenses</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsImportModalOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select File Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['csv', 'excel', 'pdf', 'bank']?.map((format) => (
                    <button
                      key={format}
                      onClick={() => setImportFormat(format)}
                      className={`p-2 text-sm border rounded-md transition-smooth ${
                        importFormat === format
                          ? 'border-primary bg-primary/10 text-primary' :'border-border hover:bg-muted'
                      }`}
                    >
                      {format?.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Upload File
                </label>
                <input
                  type="file"
                  accept=".csv,.xlsx,.pdf"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {importFile && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Selected: {importFile?.name}
                  </p>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsImportModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={!importFile}
                  className="flex-1"
                >
                  Import
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Recurring Expenses Modal */}
      {isRecurringModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Setup Recurring Expense</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsRecurringModalOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expense Name"
                  placeholder="e.g., Monthly Insurance"
                />
                <Input
                  label="Amount"
                  type="number"
                  placeholder="0.00"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Frequency
                  </label>
                  <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                    <option>Weekly</option>
                  </select>
                </div>
                <Input
                  label="Start Date"
                  type="date"
                />
              </div>

              <Input
                label="Description"
                placeholder="Brief description of the recurring expense"
              />

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsRecurringModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onSetupRecurring();
                    setIsRecurringModalOpen(false);
                  }}
                  className="flex-1"
                >
                  Setup Recurring
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;