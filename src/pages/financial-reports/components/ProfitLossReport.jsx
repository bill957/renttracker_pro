import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProfitLossReport = ({ period }) => {
  const monthlyData = [
    { month: 'Jan', income: 8500, expenses: 3200, profit: 5300 },
    { month: 'Feb', income: 8500, expenses: 2800, profit: 5700 },
    { month: 'Mar', income: 8500, expenses: 4100, profit: 4400 },
    { month: 'Apr', income: 9000, expenses: 3500, profit: 5500 },
    { month: 'May', income: 9000, expenses: 2900, profit: 6100 },
    { month: 'Jun', income: 9000, expenses: 3800, profit: 5200 },
    { month: 'Jul', income: 9500, expenses: 3300, profit: 6200 },
    { month: 'Aug', income: 9500, expenses: 4200, profit: 5300 },
    { month: 'Sep', income: 9500, expenses: 3100, profit: 6400 },
    { month: 'Oct', income: 10000, expenses: 3600, profit: 6400 },
    { month: 'Nov', income: 10000, expenses: 3400, profit: 6600 },
    { month: 'Dec', income: 10000, expenses: 4500, profit: 5500 },
  ];

  const expenseBreakdown = [
    { category: 'Maintenance', amount: 12500, percentage: 35, color: '#F59E0B' },
    { category: 'Insurance', amount: 8500, percentage: 24, color: '#3B82F6' },
    { category: 'Property Taxes', amount: 7200, percentage: 20, color: '#EF4444' },
    { category: 'Management Fees', amount: 4800, percentage: 13, color: '#10B981' },
    { category: 'Utilities', amount: 2000, percentage: 6, color: '#8B5CF6' },
    { category: 'Marketing', amount: 800, percentage: 2, color: '#F97316' },
  ];

  const summaryMetrics = [
    { label: 'Total Income', value: '$114,000', change: '+8.5%', trend: 'up', icon: 'TrendingUp', color: 'text-success' },
    { label: 'Total Expenses', value: '$42,400', change: '+3.2%', trend: 'up', icon: 'TrendingUp', color: 'text-warning' },
    { label: 'Net Profit', value: '$71,600', change: '+12.8%', trend: 'up', icon: 'TrendingUp', color: 'text-success' },
    { label: 'Profit Margin', value: '62.8%', change: '+2.1%', trend: 'up', icon: 'TrendingUp', color: 'text-success' },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics?.map((metric, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">{metric?.label}</span>
              <Icon name={metric?.icon} size={16} className={metric?.color} />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-foreground">{metric?.value}</span>
              <span className={`text-sm font-medium ${metric?.color}`}>{metric?.change}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Profit & Loss Chart */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Monthly Profit & Loss</h3>
            <Icon name="BarChart3" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
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
                <Legend />
                <Bar dataKey="income" fill="var(--color-success)" name="Income" />
                <Bar dataKey="expenses" fill="var(--color-error)" name="Expenses" />
                <Bar dataKey="profit" fill="var(--color-primary)" name="Net Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Expense Breakdown</h3>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="amount"
                  label={({ category, percentage }) => `${category} ${percentage}%`}
                >
                  {expenseBreakdown?.map((entry, index) => (
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
      </div>
      {/* Detailed Breakdown Table */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Detailed Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Current Period</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Previous Period</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Change</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">% of Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                    <span className="font-medium text-foreground">Total Income</span>
                  </div>
                </td>
                <td className="p-4 text-right font-medium text-success">$114,000</td>
                <td className="p-4 text-right text-muted-foreground">$105,000</td>
                <td className="p-4 text-right text-success">+$9,000</td>
                <td className="p-4 text-right text-muted-foreground">100%</td>
              </tr>
              {expenseBreakdown?.map((expense, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: expense?.color }} />
                      <span className="text-foreground">{expense?.category}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right text-error">-${expense?.amount?.toLocaleString()}</td>
                  <td className="p-4 text-right text-muted-foreground">-${(expense?.amount * 0.92)?.toLocaleString()}</td>
                  <td className="p-4 text-right text-error">-${(expense?.amount * 0.08)?.toLocaleString()}</td>
                  <td className="p-4 text-right text-muted-foreground">{expense?.percentage}%</td>
                </tr>
              ))}
              <tr className="border-b border-border bg-muted/30">
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calculator" size={16} className="text-primary" />
                    <span className="font-semibold text-foreground">Net Profit</span>
                  </div>
                </td>
                <td className="p-4 text-right font-semibold text-success">$71,600</td>
                <td className="p-4 text-right text-muted-foreground">$63,500</td>
                <td className="p-4 text-right text-success">+$8,100</td>
                <td className="p-4 text-right text-muted-foreground">62.8%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossReport;