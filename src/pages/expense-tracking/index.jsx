import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PropertySelector from '../../components/ui/PropertySelector';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import ExpenseFilters from './components/ExpenseFilters';
import QuickAddExpense from './components/QuickAddExpense';
import ExpenseTable from './components/ExpenseTable';
import ExpenseSummary from './components/ExpenseSummary';
import BulkActions from './components/BulkActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ExpenseTracking = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filters, setFilters] = useState({
    period: { id: 'current-month', label: 'Current Month', value: 'current-month' },
    property: null,
    category: 'all',
    search: '',
    paymentMethod: 'all',
    receiptStatus: 'all',
    minAmount: '',
    maxAmount: '',
    taxDeductible: false
  });
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'summary'

  // Mock expense data
  const mockExpenses = [
  {
    id: 1,
    date: '2025-11-10',
    property: 'Sunset Apartments',
    category: 'maintenance',
    categoryLabel: 'Maintenance & Repairs',
    vendor: 'Ace Plumbing Services',
    description: 'Fixed leaking faucet in Unit 2A kitchen',
    amount: 125.00,
    paymentMethod: 'credit_card',
    taxDeductible: true,
    hasReceipt: true,
    receiptUrl: "https://images.unsplash.com/photo-1679068286769-52907f81e22d",
    receiptAlt: 'Plumbing service receipt showing repair details and cost breakdown'
  },
  {
    id: 2,
    date: '2025-11-08',
    property: 'Oak Street Duplex',
    category: 'utilities',
    categoryLabel: 'Utilities',
    vendor: 'City Utilities Department',
    description: 'Monthly water and sewer bill',
    amount: 89.50,
    paymentMethod: 'bank_transfer',
    taxDeductible: true,
    hasReceipt: true,
    receiptUrl: "https://images.unsplash.com/photo-1604047563585-da96d555fc2f",
    receiptAlt: 'Utility bill statement showing water and sewer charges'
  },
  {
    id: 3,
    date: '2025-11-05',
    property: 'Downtown Loft',
    category: 'supplies',
    categoryLabel: 'Supplies & Materials',
    vendor: 'Home Depot',
    description: 'Paint and brushes for unit touch-up',
    amount: 67.89,
    paymentMethod: 'credit_card',
    taxDeductible: true,
    hasReceipt: false,
    receiptUrl: null,
    receiptAlt: null
  },
  {
    id: 4,
    date: '2025-11-01',
    property: 'Riverside Condos',
    category: 'insurance',
    categoryLabel: 'Insurance',
    vendor: 'State Farm Insurance',
    description: 'Monthly property insurance premium',
    amount: 245.00,
    paymentMethod: 'bank_transfer',
    taxDeductible: true,
    hasReceipt: true,
    receiptUrl: "https://images.unsplash.com/photo-1637763723578-79a4ca9225f7",
    receiptAlt: 'Insurance policy document showing coverage details and premium amount'
  },
  {
    id: 5,
    date: '2025-10-28',
    property: 'Garden View Townhomes',
    category: 'maintenance',
    categoryLabel: 'Maintenance & Repairs',
    vendor: 'Handyman Joe',
    description: 'Replaced broken window in Unit 3B',
    amount: 180.00,
    paymentMethod: 'check',
    taxDeductible: true,
    hasReceipt: true,
    receiptUrl: "https://images.unsplash.com/photo-1620408072986-c2be15298c23",
    receiptAlt: 'Handyman service receipt for window replacement work'
  },
  {
    id: 6,
    date: '2025-10-25',
    property: 'Sunset Apartments',
    category: 'legal',
    categoryLabel: 'Legal & Professional',
    vendor: 'Johnson Law Firm',
    description: 'Legal consultation for tenant dispute',
    amount: 350.00,
    paymentMethod: 'credit_card',
    taxDeductible: true,
    hasReceipt: true,
    receiptUrl: "https://images.unsplash.com/photo-1507362569319-ce3cce2b6e32",
    receiptAlt: 'Legal services invoice showing consultation fees and case details'
  },
  {
    id: 7,
    date: '2025-10-20',
    property: 'Oak Street Duplex',
    category: 'taxes',
    categoryLabel: 'Property Taxes',
    vendor: 'County Tax Office',
    description: 'Quarterly property tax payment',
    amount: 1250.00,
    paymentMethod: 'bank_transfer',
    taxDeductible: true,
    hasReceipt: true,
    receiptUrl: "https://images.unsplash.com/photo-1563198804-b144dfc1661c",
    receiptAlt: 'Property tax assessment notice showing quarterly payment details'
  },
  {
    id: 8,
    date: '2025-10-15',
    property: 'Downtown Loft',
    category: 'marketing',
    categoryLabel: 'Marketing & Advertising',
    vendor: 'Zillow Rental Network',
    description: 'Premium listing for vacant unit',
    amount: 45.00,
    paymentMethod: 'online',
    taxDeductible: true,
    hasReceipt: false,
    receiptUrl: null,
    receiptAlt: null
  }];


  useEffect(() => {
    setExpenses(mockExpenses);
    setFilteredExpenses(mockExpenses);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, expenses]);

  const applyFilters = () => {
    let filtered = [...expenses];

    // Apply property filter
    if (filters?.property && filters?.property?.name !== 'All Properties') {
      filtered = filtered?.filter((expense) => expense?.property === filters?.property?.name);
    }

    // Apply category filter
    if (filters?.category && filters?.category !== 'all') {
      filtered = filtered?.filter((expense) => expense?.category === filters?.category);
    }

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter((expense) =>
      expense?.vendor?.toLowerCase()?.includes(searchTerm) ||
      expense?.description?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply payment method filter
    if (filters?.paymentMethod && filters?.paymentMethod !== 'all') {
      filtered = filtered?.filter((expense) => expense?.paymentMethod === filters?.paymentMethod);
    }

    // Apply receipt status filter
    if (filters?.receiptStatus && filters?.receiptStatus !== 'all') {
      if (filters?.receiptStatus === 'attached') {
        filtered = filtered?.filter((expense) => expense?.hasReceipt);
      } else if (filters?.receiptStatus === 'missing') {
        filtered = filtered?.filter((expense) => !expense?.hasReceipt);
      }
    }

    // Apply amount range filter
    if (filters?.minAmount) {
      filtered = filtered?.filter((expense) => expense?.amount >= parseFloat(filters?.minAmount));
    }
    if (filters?.maxAmount) {
      filtered = filtered?.filter((expense) => expense?.amount <= parseFloat(filters?.maxAmount));
    }

    // Apply tax deductible filter
    if (filters?.taxDeductible) {
      filtered = filtered?.filter((expense) => expense?.taxDeductible);
    }

    setFilteredExpenses(filtered);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      period: { id: 'current-month', label: 'Current Month', value: 'current-month' },
      property: null,
      category: 'all',
      search: '',
      paymentMethod: 'all',
      receiptStatus: 'all',
      minAmount: '',
      maxAmount: '',
      taxDeductible: false
    });
  };

  const handleAddExpense = (expenseData) => {
    const newExpense = {
      id: expenses?.length + 1,
      ...expenseData,
      categoryLabel: getCategoryLabel(expenseData?.category),
      hasReceipt: !!expenseData?.receipt,
      receiptUrl: expenseData?.receipt ? URL.createObjectURL(expenseData?.receipt) : null,
      receiptAlt: expenseData?.receipt ? `Receipt for ${expenseData?.description}` : null
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const getCategoryLabel = (category) => {
    const categoryMap = {
      maintenance: 'Maintenance & Repairs',
      utilities: 'Utilities',
      insurance: 'Insurance',
      taxes: 'Property Taxes',
      management: 'Property Management',
      legal: 'Legal & Professional',
      marketing: 'Marketing & Advertising',
      supplies: 'Supplies & Materials',
      other: 'Other Expenses'
    };
    return categoryMap?.[category] || category;
  };

  const handleEditExpense = (expense) => {
    console.log('Edit expense:', expense);
    // Implementation for editing expense
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses((prev) => prev?.filter((expense) => expense?.id !== expenseId));
  };

  const handleViewReceipt = (expense) => {
    if (expense?.receiptUrl) {
      window.open(expense?.receiptUrl, '_blank');
    }
  };

  const handleImportExpenses = (file, format) => {
    console.log('Import expenses:', file, format);
    // Implementation for importing expenses
  };

  const handleExportExpenses = (format) => {
    console.log('Export expenses:', format);
    // Implementation for exporting expenses
  };

  const handleSetupRecurring = () => {
    console.log('Setup recurring expense');
    // Implementation for recurring expenses
  };

  const handleActionClick = (actionId) => {
    switch (actionId) {
      case 'add-expense':
        // Scroll to quick add form or open modal
        break;
      case 'record-payment':
        // Navigate to payment recording
        break;
      case 'generate-invoice':
        // Generate invoice functionality
        break;
      case 'export-report':
        handleExportExpenses('pdf');
        break;
      default:
        console.log('Action clicked:', actionId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2">Expense Tracking</h1>
              <p className="text-muted-foreground">
                Monitor and categorize property expenses for accurate financial reporting
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <PropertySelector
                selectedProperty={selectedProperty}
                onPropertyChange={setSelectedProperty} />

              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  iconName="Table"
                  iconPosition="left"
                  iconSize={16}>

                  Table
                </Button>
                <Button
                  variant={viewMode === 'summary' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('summary')}
                  iconName="BarChart3"
                  iconPosition="left"
                  iconSize={16}>

                  Summary
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <QuickActionToolbar
              context="financials"
              propertyId={selectedProperty?.id}
              onActionClick={handleActionClick} />

          </div>

          {/* Quick Add Expense */}
          <QuickAddExpense onAddExpense={handleAddExpense} />

          {/* Filters */}
          <ExpenseFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters} />


          {/* Bulk Actions */}
          <BulkActions
            onImportExpenses={handleImportExpenses}
            onExportExpenses={handleExportExpenses}
            onSetupRecurring={handleSetupRecurring} />


          {/* Content Area */}
          {viewMode === 'summary' ?
          <ExpenseSummary
            expenses={filteredExpenses}
            selectedPeriod={filters?.period} /> :


          <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Expenses</p>
                      <p className="text-2xl font-bold text-foreground">
                        ${filteredExpenses?.reduce((sum, expense) => sum + expense?.amount, 0)?.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                      <Icon name="TrendingDown" size={20} color="var(--color-error)" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Tax Deductible</p>
                      <p className="text-2xl font-bold text-success">
                        ${filteredExpenses?.filter((e) => e?.taxDeductible)?.reduce((sum, expense) => sum + expense?.amount, 0)?.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <Icon name="Receipt" size={20} color="var(--color-success)" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Entries</p>
                      <p className="text-2xl font-bold text-foreground">{filteredExpenses?.length}</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Hash" size={20} color="var(--color-primary)" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Expense</p>
                      <p className="text-2xl font-bold text-foreground">
                        ${filteredExpenses?.length > 0 ? Math.round(filteredExpenses?.reduce((sum, expense) => sum + expense?.amount, 0) / filteredExpenses?.length) : 0}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Icon name="BarChart3" size={20} color="var(--color-secondary)" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Expense Table */}
              <ExpenseTable
              expenses={filteredExpenses}
              onEditExpense={handleEditExpense}
              onDeleteExpense={handleDeleteExpense}
              onViewReceipt={handleViewReceipt} />

            </>
          }
        </div>
      </main>
    </div>);

};

export default ExpenseTracking;