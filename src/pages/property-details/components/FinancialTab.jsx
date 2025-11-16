import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import FinancialPeriodSelector from '../../../components/ui/FinancialPeriodSelector';

const FinancialTab = ({ propertyId, onAddExpense, onRecordPayment, onExportReport }) => {
  const [selectedPeriod, setSelectedPeriod] = useState({ id: 'current-month', label: 'Current Month', value: 'current-month' });
  const [activeView, setActiveView] = useState('overview');

  // Mock financial data
  const monthlyData = [
    { month: 'Jan', income: 2400, expenses: 800, profit: 1600 },
    { month: 'Feb', income: 2400, expenses: 1200, profit: 1200 },
    { month: 'Mar', income: 2400, expenses: 950, profit: 1450 },
    { month: 'Apr', income: 2400, expenses: 1100, profit: 1300 },
    { month: 'May', income: 2400, expenses: 750, profit: 1650 },
    { month: 'Jun', income: 2400, expenses: 900, profit: 1500 },
  ];

  const expenseCategories = [
    { name: 'Maintenance', value: 1200, color: '#EF4444' },
    { name: 'Insurance', value: 800, color: '#F59E0B' },
    { name: 'Property Tax', value: 600, color: '#3B82F6' },
    { name: 'Utilities', value: 400, color: '#10B981' },
    { name: 'Management', value: 300, color: '#8B5CF6' },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'income',
      description: 'Monthly Rent - Unit 2A',
      amount: 1200,
      date: '2025-11-15',
      category: 'Rent',
      tenant: 'John Smith'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Plumbing Repair - Kitchen Sink',
      amount: 250,
      date: '2025-11-14',
      category: 'Maintenance',
      vendor: 'ABC Plumbing'
    },
    {
      id: 3,
      type: 'income',
      description: 'Monthly Rent - Unit 1B',
      amount: 1200,
      date: '2025-11-13',
      category: 'Rent',
      tenant: 'Sarah Johnson'
    },
    {
      id: 4,
      type: 'expense',
      description: 'Property Insurance Premium',
      amount: 400,
      date: '2025-11-12',
      category: 'Insurance',
      vendor: 'State Farm Insurance'
    },
    {
      id: 5,
      type: 'expense',
      description: 'Landscaping Service',
      amount: 150,
      date: '2025-11-10',
      category: 'Maintenance',
      vendor: 'Green Thumb Landscaping'
    }
  ];

  const summaryStats = {
    totalIncome: 14400,
    totalExpenses: 5200,
    netProfit: 9200,
    profitMargin: 63.9,
    avgMonthlyIncome: 2400,
    avgMonthlyExpenses: 867
  };

  const getTransactionIcon = (type) => {
    return type === 'income' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTransactionColor = (type) => {
    return type === 'income' ? 'text-success' : 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Header with Period Selector and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <FinancialPeriodSelector
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-smooth ${
                activeView === 'overview' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveView('transactions')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-smooth ${
                activeView === 'transactions' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Transactions
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="success" onClick={onRecordPayment} iconName="DollarSign" iconPosition="left">
            Record Payment
          </Button>
          <Button variant="warning" onClick={onAddExpense} iconName="Receipt" iconPosition="left">
            Add Expense
          </Button>
          <Button variant="outline" onClick={onExportReport} iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
      {activeView === 'overview' ? (
        <>
          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold text-success">${summaryStats?.totalIncome?.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-success" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Avg: ${summaryStats?.avgMonthlyIncome?.toLocaleString()}/month
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-error">${summaryStats?.totalExpenses?.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingDown" size={24} className="text-error" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Avg: ${summaryStats?.avgMonthlyExpenses?.toLocaleString()}/month
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold text-foreground">${summaryStats?.netProfit?.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="DollarSign" size={24} className="text-primary" />
                </div>
              </div>
              <p className="text-xs text-success mt-2">
                +{summaryStats?.profitMargin}% margin
              </p>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ROI</p>
                  <p className="text-2xl font-bold text-foreground">8.2%</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={24} className="text-accent" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Annual return
              </p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income vs Expenses Chart */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Income vs Expenses</h3>
              <div className="w-full h-64" aria-label="Monthly Income vs Expenses Bar Chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
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
                    <Bar dataKey="income" fill="var(--color-success)" name="Income" />
                    <Bar dataKey="expenses" fill="var(--color-error)" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Expense Categories Pie Chart */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Expense Categories</h3>
              <div className="w-full h-64" aria-label="Expense Categories Pie Chart">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                    >
                      {expenseCategories?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip 
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
          </div>

          {/* Profit Trend Chart */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Profit Trend</h3>
            <div className="w-full h-64" aria-label="Monthly Profit Trend Line Chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
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
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="var(--color-primary)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        /* Transactions View */
        (<div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-border">
            {recentTransactions?.map((transaction) => (
              <div key={transaction?.id} className="p-6 hover:bg-muted/50 transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction?.type === 'income' ? 'bg-success/10' : 'bg-error/10'
                    }`}>
                      <Icon 
                        name={getTransactionIcon(transaction?.type)} 
                        size={20} 
                        className={getTransactionColor(transaction?.type)}
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground">{transaction?.description}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{transaction?.category}</span>
                        <span>•</span>
                        <span>{new Date(transaction.date)?.toLocaleDateString()}</span>
                        {transaction?.tenant && (
                          <>
                            <span>•</span>
                            <span>{transaction?.tenant}</span>
                          </>
                        )}
                        {transaction?.vendor && (
                          <>
                            <span>•</span>
                            <span>{transaction?.vendor}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-semibold ${getTransactionColor(transaction?.type)}`}>
                      {transaction?.type === 'income' ? '+' : '-'}${transaction?.amount?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-border">
            <Button variant="outline" className="w-full">
              View All Transactions
            </Button>
          </div>
        </div>)
      )}
    </div>
  );
};

export default FinancialTab;