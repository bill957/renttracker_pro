import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaxPreparationReport = ({ period }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const taxCategories = [
    { 
      category: 'Repairs & Maintenance', 
      amount: 12500, 
      percentage: 28.5, 
      color: '#F59E0B',
      deductible: true,
      description: 'Routine maintenance, repairs, and upkeep costs',
      transactions: 24
    },
    { 
      category: 'Property Management', 
      amount: 8400, 
      percentage: 19.2, 
      color: '#3B82F6',
      deductible: true,
      description: 'Management fees and administrative costs',
      transactions: 12
    },
    { 
      category: 'Insurance Premiums', 
      amount: 7200, 
      percentage: 16.4, 
      color: '#10B981',
      deductible: true,
      description: 'Property insurance and liability coverage',
      transactions: 4
    },
    { 
      category: 'Property Taxes', 
      amount: 6800, 
      percentage: 15.5, 
      color: '#EF4444',
      deductible: true,
      description: 'Local property taxes and assessments',
      transactions: 2
    },
    { 
      category: 'Utilities', 
      amount: 4200, 
      percentage: 9.6, 
      color: '#8B5CF6',
      deductible: true,
      description: 'Utilities paid by landlord',
      transactions: 36
    },
    { 
      category: 'Legal & Professional', 
      amount: 2800, 
      percentage: 6.4, 
      color: '#F97316',
      deductible: true,
      description: 'Attorney fees, accounting, and professional services',
      transactions: 8
    },
    { 
      category: 'Advertising & Marketing', 
      amount: 1900, 
      percentage: 4.3, 
      color: '#06B6D4',
      deductible: true,
      description: 'Rental advertising and marketing expenses',
      transactions: 15
    },
  ];

  const monthlyDeductions = [
    { month: 'Jan', deductions: 3200, depreciation: 1800, total: 5000 },
    { month: 'Feb', deductions: 2800, depreciation: 1800, total: 4600 },
    { month: 'Mar', deductions: 4100, depreciation: 1800, total: 5900 },
    { month: 'Apr', deductions: 3500, depreciation: 1800, total: 5300 },
    { month: 'May', deductions: 2900, depreciation: 1800, total: 4700 },
    { month: 'Jun', deductions: 3800, depreciation: 1800, total: 5600 },
    { month: 'Jul', deductions: 3300, depreciation: 1800, total: 5100 },
    { month: 'Aug', deductions: 4200, depreciation: 1800, total: 6000 },
    { month: 'Sep', deductions: 3100, depreciation: 1800, total: 4900 },
    { month: 'Oct', deductions: 3600, depreciation: 1800, total: 5400 },
    { month: 'Nov', deductions: 3400, depreciation: 1800, total: 5200 },
    { month: 'Dec', deductions: 4500, depreciation: 1800, total: 6300 },
  ];

  const taxSummary = [
    { label: 'Total Rental Income', value: '$114,000', taxable: true, icon: 'DollarSign', color: 'text-success' },
    { label: 'Total Deductions', value: '$43,800', taxable: false, icon: 'Minus', color: 'text-error' },
    { label: 'Depreciation', value: '$21,600', taxable: false, icon: 'TrendingDown', color: 'text-warning' },
    { label: 'Net Rental Income', value: '$48,600', taxable: true, icon: 'Calculator', color: 'text-primary' },
  ];

  const supportingDocuments = [
    { category: 'Receipts', count: 156, status: 'complete', icon: 'Receipt' },
    { category: 'Invoices', count: 89, status: 'complete', icon: 'FileText' },
    { category: 'Bank Statements', count: 12, status: 'complete', icon: 'CreditCard' },
    { category: 'Contracts', count: 23, status: 'review', icon: 'FileCheck' },
    { category: 'Insurance Docs', count: 8, status: 'complete', icon: 'Shield' },
    { category: 'Tax Forms', count: 15, status: 'pending', icon: 'File' },
  ];

  const totalDeductions = taxCategories?.reduce((sum, cat) => sum + cat?.amount, 0);

  return (
    <div className="space-y-6">
      {/* Tax Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {taxSummary?.map((item, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">{item?.label}</span>
              <Icon name={item?.icon} size={16} className={item?.color} />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-foreground">{item?.value}</span>
              <span className={`text-xs px-2 py-1 rounded-md ${
                item?.taxable ? 'bg-error/10 text-error' : 'bg-success/10 text-success'
              }`}>
                {item?.taxable ? 'Taxable' : 'Deductible'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deductible Expenses Breakdown */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Deductible Expenses by Category</h3>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taxCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="amount"
                  label={({ category, percentage }) => `${percentage}%`}
                >
                  {taxCategories?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value?.toLocaleString()}`, 'Amount']}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Deductions Trend */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Monthly Deductions</h3>
            <Icon name="BarChart3" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDeductions}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }} 
                />
                <Legend />
                <Bar dataKey="deductions" stackId="a" fill="var(--color-primary)" name="Operating Deductions" />
                <Bar dataKey="depreciation" stackId="a" fill="var(--color-secondary)" name="Depreciation" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Tax Categories Detail */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">IRS Deduction Categories</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Total Deductions:</span>
              <span className="text-lg font-bold text-success">${totalDeductions?.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">% of Total</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Transactions</th>
                <th className="text-center p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-center p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {taxCategories?.map((category, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category?.color }} />
                      <div>
                        <div className="font-medium text-foreground">{category?.category}</div>
                        <div className="text-xs text-muted-foreground">{category?.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right font-medium text-foreground">${category?.amount?.toLocaleString()}</td>
                  <td className="p-4 text-right text-muted-foreground">{category?.percentage}%</td>
                  <td className="p-4 text-right text-muted-foreground">{category?.transactions}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                      category?.deductible ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                    }`}>
                      {category?.deductible ? 'Deductible' : 'Non-deductible'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Icon name="Eye" size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Icon name="Download" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Supporting Documents */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Supporting Documentation</h3>
            <Button variant="outline" size="sm" iconName="Upload" iconPosition="left" iconSize={14}>
              Upload Documents
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {supportingDocuments?.map((doc, index) => (
            <div key={index} className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={doc?.icon} size={20} className="text-primary" />
                  <span className="font-medium text-foreground">{doc?.category}</span>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                  doc?.status === 'complete' ? 'bg-success/10 text-success' :
                  doc?.status === 'review'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                }`}>
                  {doc?.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground">{doc?.count}</span>
                <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right" iconSize={14}>
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Export Options */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Export Tax Reports</h3>
          <Icon name="Download" size={20} className="text-muted-foreground" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start" iconName="FileText" iconPosition="left" iconSize={16}>
            Schedule E (Form 1040)
          </Button>
          <Button variant="outline" className="justify-start" iconName="Calculator" iconPosition="left" iconSize={16}>
            Depreciation Summary
          </Button>
          <Button variant="outline" className="justify-start" iconName="Receipt" iconPosition="left" iconSize={16}>
            Expense Detail Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaxPreparationReport;