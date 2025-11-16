import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ExpenseTable = ({ expenses, onEditExpense, onDeleteExpense, onViewReceipt }) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectExpense = (expenseId) => {
    setSelectedExpenses(prev => 
      prev?.includes(expenseId)
        ? prev?.filter(id => id !== expenseId)
        : [...prev, expenseId]
    );
  };

  const handleSelectAll = () => {
    if (selectedExpenses?.length === expenses?.length) {
      setSelectedExpenses([]);
    } else {
      setSelectedExpenses(expenses?.map(expense => expense?.id));
    }
  };

  const sortedExpenses = [...expenses]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortField === 'amount') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getCategoryColor = (category) => {
    const colors = {
      maintenance: 'bg-warning/10 text-warning',
      utilities: 'bg-secondary/10 text-secondary',
      insurance: 'bg-success/10 text-success',
      taxes: 'bg-error/10 text-error',
      management: 'bg-primary/10 text-primary',
      legal: 'bg-accent/10 text-accent',
      marketing: 'bg-muted text-muted-foreground',
      supplies: 'bg-secondary/10 text-secondary',
      other: 'bg-muted text-muted-foreground'
    };
    return colors?.[category] || 'bg-muted text-muted-foreground';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const SortHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/50 transition-smooth"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          <Icon 
            name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
            size={14} 
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header Actions */}
      {selectedExpenses?.length > 0 && (
        <div className="bg-primary/5 border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedExpenses?.length} expense{selectedExpenses?.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={14}
              >
                Export Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                iconSize={14}
              >
                Delete Selected
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedExpenses?.length === expenses?.length && expenses?.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <SortHeader field="date">Date</SortHeader>
              <SortHeader field="property">Property</SortHeader>
              <SortHeader field="category">Category</SortHeader>
              <SortHeader field="vendor">Vendor</SortHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Description
              </th>
              <SortHeader field="amount">Amount</SortHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Receipt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedExpenses?.map((expense) => (
              <tr key={expense?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedExpenses?.includes(expense?.id)}
                    onChange={() => handleSelectExpense(expense?.id)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {formatDate(expense?.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                      <Icon name="Building2" size={14} color="var(--color-primary)" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{expense?.property}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(expense?.category)}`}>
                    {expense?.categoryLabel}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {expense?.vendor}
                </td>
                <td className="px-6 py-4 text-sm text-foreground max-w-xs truncate">
                  {expense?.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-semibold ${expense?.amount < 0 ? 'text-error' : 'text-foreground'}`}>
                      {formatCurrency(Math.abs(expense?.amount))}
                    </span>
                    {expense?.taxDeductible && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-success/10 text-success">
                        Tax
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {expense?.hasReceipt ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewReceipt(expense)}
                      iconName="FileText"
                      iconPosition="left"
                      iconSize={14}
                      className="text-success"
                    >
                      View
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">No receipt</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditExpense(expense)}
                    >
                      <Icon name="Edit2" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteExpense(expense?.id)}
                      className="text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {expenses?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Receipt" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No expenses found</h3>
          <p className="text-muted-foreground mb-4">Start by adding your first expense or adjust your filters</p>
          <Button iconName="Plus" iconPosition="left" iconSize={16}>
            Add First Expense
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;