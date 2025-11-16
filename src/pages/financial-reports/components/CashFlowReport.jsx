import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const CashFlowReport = ({ period }) => {
  const cashFlowData = [
    { month: 'Jan', inflow: 8500, outflow: 3200, netFlow: 5300, cumulativeFlow: 5300 },
    { month: 'Feb', inflow: 8500, outflow: 2800, netFlow: 5700, cumulativeFlow: 11000 },
    { month: 'Mar', inflow: 8500, outflow: 4100, netFlow: 4400, cumulativeFlow: 15400 },
    { month: 'Apr', inflow: 9000, outflow: 3500, netFlow: 5500, cumulativeFlow: 20900 },
    { month: 'May', inflow: 9000, outflow: 2900, netFlow: 6100, cumulativeFlow: 27000 },
    { month: 'Jun', inflow: 9000, outflow: 3800, netFlow: 5200, cumulativeFlow: 32200 },
    { month: 'Jul', inflow: 9500, outflow: 3300, netFlow: 6200, cumulativeFlow: 38400 },
    { month: 'Aug', inflow: 9500, outflow: 4200, netFlow: 5300, cumulativeFlow: 43700 },
    { month: 'Sep', inflow: 9500, outflow: 3100, netFlow: 6400, cumulativeFlow: 50100 },
    { month: 'Oct', inflow: 10000, outflow: 3600, netFlow: 6400, cumulativeFlow: 56500 },
    { month: 'Nov', inflow: 10000, outflow: 3400, netFlow: 6600, cumulativeFlow: 63100 },
    { month: 'Dec', inflow: 10000, outflow: 4500, netFlow: 5500, cumulativeFlow: 68600 },
  ];

  const forecastData = [
    { month: 'Jan 2025', projected: 10200, conservative: 9800, optimistic: 10800 },
    { month: 'Feb 2025', projected: 10200, conservative: 9800, optimistic: 10800 },
    { month: 'Mar 2025', projected: 10500, conservative: 10000, optimistic: 11200 },
    { month: 'Apr 2025', projected: 10500, conservative: 10000, optimistic: 11200 },
    { month: 'May 2025', projected: 10800, conservative: 10200, optimistic: 11500 },
    { month: 'Jun 2025', projected: 10800, conservative: 10200, optimistic: 11500 },
  ];

  const seasonalTrends = [
    { quarter: 'Q1', avgInflow: 8500, avgOutflow: 3367, seasonalFactor: 0.95 },
    { quarter: 'Q2', avgInflow: 9000, avgOutflow: 3400, seasonalFactor: 1.02 },
    { quarter: 'Q3', avgInflow: 9500, avgOutflow: 3533, seasonalFactor: 1.08 },
    { quarter: 'Q4', avgInflow: 10000, avgOutflow: 3833, seasonalFactor: 1.12 },
  ];

  const cashFlowMetrics = [
    { label: 'Operating Cash Flow', value: '$71,600', change: '+12.8%', trend: 'up', icon: 'DollarSign', color: 'text-success' },
    { label: 'Free Cash Flow', value: '$68,400', change: '+15.2%', trend: 'up', icon: 'TrendingUp', color: 'text-success' },
    { label: 'Cash Flow Margin', value: '62.8%', change: '+2.1%', trend: 'up', icon: 'Percent', color: 'text-success' },
    { label: 'Cash Conversion', value: '94.5%', change: '+1.8%', trend: 'up', icon: 'RotateCw', color: 'text-success' },
  ];

  return (
    <div className="space-y-6">
      {/* Cash Flow Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cashFlowMetrics?.map((metric, index) => (
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
        {/* Monthly Cash Flow */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Monthly Cash Flow</h3>
            <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
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
                <Area type="monotone" dataKey="inflow" stackId="1" stroke="var(--color-success)" fill="var(--color-success)" fillOpacity={0.6} name="Cash Inflow" />
                <Area type="monotone" dataKey="outflow" stackId="2" stroke="var(--color-error)" fill="var(--color-error)" fillOpacity={0.6} name="Cash Outflow" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cumulative Cash Flow */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Cumulative Cash Flow</h3>
            <Icon name="LineChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashFlowData}>
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
                <Line type="monotone" dataKey="cumulativeFlow" stroke="var(--color-primary)" strokeWidth={3} name="Cumulative Flow" />
                <Line type="monotone" dataKey="netFlow" stroke="var(--color-secondary)" strokeWidth={2} name="Monthly Net Flow" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Forecast */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">6-Month Forecast</h3>
            <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
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
                <Line type="monotone" dataKey="conservative" stroke="var(--color-error)" strokeDasharray="5 5" name="Conservative" />
                <Line type="monotone" dataKey="projected" stroke="var(--color-primary)" strokeWidth={3} name="Projected" />
                <Line type="monotone" dataKey="optimistic" stroke="var(--color-success)" strokeDasharray="5 5" name="Optimistic" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seasonal Trends */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Seasonal Trends</h3>
            <Icon name="Calendar" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasonalTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="quarter" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }} 
                />
                <Legend />
                <Bar dataKey="avgInflow" fill="var(--color-success)" name="Avg Inflow" />
                <Bar dataKey="avgOutflow" fill="var(--color-error)" name="Avg Outflow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Cash Flow Analysis Table */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Cash Flow Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Month</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Cash Inflow</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Cash Outflow</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Net Flow</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Cumulative</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Flow Ratio</th>
              </tr>
            </thead>
            <tbody>
              {cashFlowData?.slice(-6)?.map((data, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="p-4 font-medium text-foreground">{data?.month}</td>
                  <td className="p-4 text-right text-success">${data?.inflow?.toLocaleString()}</td>
                  <td className="p-4 text-right text-error">${data?.outflow?.toLocaleString()}</td>
                  <td className="p-4 text-right font-medium text-primary">${data?.netFlow?.toLocaleString()}</td>
                  <td className="p-4 text-right text-foreground">${data?.cumulativeFlow?.toLocaleString()}</td>
                  <td className="p-4 text-right text-muted-foreground">{(data?.inflow / data?.outflow)?.toFixed(2)}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CashFlowReport;