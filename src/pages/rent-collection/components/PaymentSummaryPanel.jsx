import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentSummaryPanel = ({ summaryData }) => {
  const {
    totalExpected = 12500,
    totalCollected = 9800,
    totalOutstanding = 2700,
    collectionRate = 78.4,
    monthOverMonthChange = 5.2
  } = summaryData || {};

  const summaryCards = [
    {
      title: 'Total Expected',
      amount: totalExpected,
      icon: 'Target',
      color: 'text-foreground',
      bgColor: 'bg-muted'
    },
    {
      title: 'Total Collected',
      amount: totalCollected,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Outstanding',
      amount: totalOutstanding,
      icon: 'AlertCircle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-card-foreground">Payment Summary</h2>
        <div className="text-sm text-muted-foreground">
          November 2024
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {summaryCards?.map((card, index) => (
          <div key={index} className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-md ${card?.bgColor}`}>
                <Icon name={card?.icon} size={16} className={card?.color} />
              </div>
              <span className="text-xs text-muted-foreground">{card?.title}</span>
            </div>
            <div className={`text-2xl font-bold ${card?.color}`}>
              {formatCurrency(card?.amount)}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Collection Rate:</span>
          <span className="text-lg font-semibold text-foreground">{collectionRate}%</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon 
            name={monthOverMonthChange >= 0 ? "TrendingUp" : "TrendingDown"} 
            size={16} 
            className={monthOverMonthChange >= 0 ? "text-success" : "text-error"} 
          />
          <span className={`text-sm font-medium ${monthOverMonthChange >= 0 ? "text-success" : "text-error"}`}>
            {Math.abs(monthOverMonthChange)}% vs last month
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummaryPanel;