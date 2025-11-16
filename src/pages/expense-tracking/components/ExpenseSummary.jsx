import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ExpenseSummary = ({ expenses, selectedPeriod }) => {
  const calculateSummaryData = () => {
    const currentMonth = new Date()?.getMonth();
    const currentYear = new Date()?.getFullYear();
    
    const monthlyTotal = expenses?.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate?.getMonth() === currentMonth && expenseDate?.getFullYear() === currentYear;
      })?.reduce((sum, expense) => sum + expense?.amount, 0);

    const yearlyTotal = expenses?.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate?.getFullYear() === currentYear;
      })?.reduce((sum, expense) => sum + expense?.amount, 0);

    const categoryTotals = expenses?.reduce((acc, expense) => {
      acc[expense.category] = (acc?.[expense?.category] || 0) + expense?.amount;
      return acc;
    }, {});

    const taxDeductibleTotal = expenses?.filter(expense => expense?.taxDeductible)?.reduce((sum, expense) => sum + expense?.amount, 0);

    return {
      monthlyTotal,
      yearlyTotal,
      categoryTotals,
      taxDeductibleTotal,
      totalExpenses: expenses?.length
    };
  };

  const getCategoryChartData = () => {
    const categoryTotals = expenses?.reduce((acc, expense) => {
      const category = expense?.categoryLabel || expense?.category;
      acc[category] = (acc?.[category] || 0) + expense?.amount;
      return acc;
    }, {});

    return Object.entries(categoryTotals)?.map(([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / Object.values(categoryTotals)?.reduce((a, b) => a + b, 0)) * 100)?.toFixed(1)
    }));
  };

  const getMonthlyTrendData = () => {
    const monthlyData = {};
    const currentYear = new Date()?.getFullYear();
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date?.setMonth(date?.getMonth() - i);
      const monthKey = date?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[monthKey] = 0;
    }

    expenses?.forEach(expense => {
      const expenseDate = new Date(expense.date);
      if (expenseDate?.getFullYear() === currentYear) {
        const monthKey = expenseDate?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        if (monthlyData?.hasOwnProperty(monthKey)) {
          monthlyData[monthKey] += expense?.amount;
        }
      }
    });

    return Object.entries(monthlyData)?.map(([month, amount]) => ({
      month,
      amount
    }));
  };

  const summaryData = calculateSummaryData();
  const categoryData = getCategoryChartData();
  const monthlyTrendData = getMonthlyTrendData();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const pieColors = ['#1E3A8A', '#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#F97316', '#06B6D4'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Summary Cards */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Expense Summary</h3>
            <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-lg font-semibold text-foreground">{formatCurrency(summaryData?.monthlyTotal)}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Calendar" size={20} color="var(--color-primary)" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">This Year</p>
                <p className="text-lg font-semibold text-foreground">{formatCurrency(summaryData?.yearlyTotal)}</p>
              </div>
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Icon name="BarChart3" size={20} color="var(--color-secondary)" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">Tax Deductible</p>
                <p className="text-lg font-semibold text-success">{formatCurrency(summaryData?.taxDeductibleTotal)}</p>
              </div>
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="Receipt" size={20} color="var(--color-success)" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-lg font-semibold text-foreground">{summaryData?.totalExpenses}</p>
              </div>
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="Hash" size={20} color="var(--color-accent)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Monthly Trend Chart */}
      <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Monthly Expense Trend</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="TrendingUp" size={16} />
            <span>Last 6 Months</span>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Amount']}
                labelStyle={{ color: 'var(--color-foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-popover)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="amount" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Category Breakdown */}
      <div className="lg:col-span-3 bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Expense Categories</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="PieChart" size={16} />
            <span>Current Period</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="amount"
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                  labelLine={false}
                >
                  {categoryData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors?.[index % pieColors?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Amount']}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category List */}
          <div className="space-y-3">
            {categoryData?.map((category, index) => (
              <div key={category?.category} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: pieColors?.[index % pieColors?.length] }}
                  />
                  <span className="font-medium text-foreground">{category?.category}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{formatCurrency(category?.amount)}</p>
                  <p className="text-xs text-muted-foreground">{category?.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;