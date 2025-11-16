import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Icon from '../../../components/AppIcon';

const PropertyPerformanceReport = ({ period }) => {
  const propertyPerformance = [
    { 
      property: 'Sunset Apartments', 
      roi: 12.5, 
      yield: 8.2, 
      occupancy: 95, 
      income: 48000, 
      expenses: 18500,
      netIncome: 29500,
      vacancyDays: 18,
      maintenanceCost: 4200
    },
    { 
      property: 'Oak Street Duplex', 
      roi: 15.8, 
      yield: 9.1, 
      occupancy: 100, 
      income: 28800, 
      expenses: 8900,
      netIncome: 19900,
      vacancyDays: 0,
      maintenanceCost: 2100
    },
    { 
      property: 'Downtown Loft', 
      roi: 10.2, 
      yield: 6.8, 
      occupancy: 92, 
      income: 18000, 
      expenses: 7200,
      netIncome: 10800,
      vacancyDays: 29,
      maintenanceCost: 1800
    },
    { 
      property: 'Riverside Condos', 
      roi: 14.1, 
      yield: 8.9, 
      occupancy: 88, 
      income: 38400, 
      expenses: 14200,
      netIncome: 24200,
      vacancyDays: 44,
      maintenanceCost: 3500
    },
    { 
      property: 'Garden View Townhomes', 
      roi: 11.7, 
      yield: 7.5, 
      occupancy: 97, 
      income: 43200, 
      expenses: 16800,
      netIncome: 26400,
      vacancyDays: 11,
      maintenanceCost: 3800
    },
  ];

  const benchmarkData = [
    { metric: 'ROI', portfolio: 12.9, market: 10.5, target: 15.0 },
    { metric: 'Yield', portfolio: 8.1, market: 7.2, target: 9.0 },
    { metric: 'Occupancy', portfolio: 94.4, market: 91.0, target: 95.0 },
    { metric: 'Efficiency', portfolio: 78.5, market: 75.0, target: 85.0 },
    { metric: 'Growth', portfolio: 8.5, market: 6.8, target: 10.0 },
  ];

  const performanceMetrics = [
    { label: 'Portfolio ROI', value: '12.9%', change: '+1.8%', trend: 'up', icon: 'TrendingUp', color: 'text-success' },
    { label: 'Avg Rental Yield', value: '8.1%', change: '+0.5%', trend: 'up', icon: 'Percent', color: 'text-success' },
    { label: 'Occupancy Rate', value: '94.4%', change: '+2.1%', trend: 'up', icon: 'Home', color: 'text-success' },
    { label: 'Maintenance Ratio', value: '8.2%', change: '-0.8%', trend: 'down', icon: 'Wrench', color: 'text-success' },
  ];

  const monthlyTrends = [
    { month: 'Jan', roi: 11.8, yield: 7.9, occupancy: 92 },
    { month: 'Feb', roi: 12.1, yield: 8.0, occupancy: 93 },
    { month: 'Mar', roi: 12.3, yield: 8.1, occupancy: 94 },
    { month: 'Apr', roi: 12.5, yield: 8.0, occupancy: 95 },
    { month: 'May', roi: 12.7, yield: 8.2, occupancy: 94 },
    { month: 'Jun', roi: 12.9, yield: 8.1, occupancy: 94 },
    { month: 'Jul', roi: 13.1, yield: 8.3, occupancy: 95 },
    { month: 'Aug', roi: 12.8, yield: 8.2, occupancy: 94 },
    { month: 'Sep', roi: 13.0, yield: 8.1, occupancy: 95 },
    { month: 'Oct', roi: 12.9, yield: 8.0, occupancy: 94 },
    { month: 'Nov', roi: 13.2, yield: 8.2, occupancy: 95 },
    { month: 'Dec', roi: 12.9, yield: 8.1, occupancy: 94 },
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics?.map((metric, index) => (
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
        {/* Property ROI Comparison */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">ROI by Property</h3>
            <Icon name="BarChart3" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" stroke="var(--color-muted-foreground)" />
                <YAxis dataKey="property" type="category" width={120} stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }} 
                />
                <Bar dataKey="roi" fill="var(--color-primary)" name="ROI %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Benchmark */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Performance vs Benchmark</h3>
            <Icon name="Target" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={benchmarkData}>
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--color-muted-foreground)' }} />
                <PolarRadiusAxis tick={{ fill: 'var(--color-muted-foreground)' }} />
                <Radar name="Portfolio" dataKey="portfolio" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.3} />
                <Radar name="Market Avg" dataKey="market" stroke="var(--color-secondary)" fill="var(--color-secondary)" fillOpacity={0.1} />
                <Radar name="Target" dataKey="target" stroke="var(--color-success)" fill="var(--color-success)" fillOpacity={0.1} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Trends */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Monthly Trends</h3>
            <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends}>
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
                <Line type="monotone" dataKey="roi" stroke="var(--color-primary)" strokeWidth={2} name="ROI %" />
                <Line type="monotone" dataKey="yield" stroke="var(--color-secondary)" strokeWidth={2} name="Yield %" />
                <Line type="monotone" dataKey="occupancy" stroke="var(--color-success)" strokeWidth={2} name="Occupancy %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy vs Income */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Occupancy vs Income</h3>
            <Icon name="Home" size={20} className="text-muted-foreground" />
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="property" stroke="var(--color-muted-foreground)" />
                <YAxis yAxisId="left" stroke="var(--color-muted-foreground)" />
                <YAxis yAxisId="right" orientation="right" stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }} 
                />
                <Legend />
                <Bar yAxisId="left" dataKey="occupancy" fill="var(--color-success)" name="Occupancy %" />
                <Line yAxisId="right" type="monotone" dataKey="income" stroke="var(--color-primary)" strokeWidth={2} name="Annual Income" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Detailed Property Performance Table */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Property Performance Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Property</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">ROI</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Yield</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Occupancy</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Annual Income</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Net Income</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Vacancy Days</th>
              </tr>
            </thead>
            <tbody>
              {propertyPerformance?.map((property, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Building2" size={16} className="text-primary" />
                      <span className="font-medium text-foreground">{property?.property}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className={`font-medium ${property?.roi >= 12 ? 'text-success' : property?.roi >= 10 ? 'text-warning' : 'text-error'}`}>
                      {property?.roi}%
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className={`font-medium ${property?.yield >= 8 ? 'text-success' : property?.yield >= 7 ? 'text-warning' : 'text-error'}`}>
                      {property?.yield}%
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className={`font-medium ${property?.occupancy >= 95 ? 'text-success' : property?.occupancy >= 90 ? 'text-warning' : 'text-error'}`}>
                      {property?.occupancy}%
                    </span>
                  </td>
                  <td className="p-4 text-right text-foreground">${property?.income?.toLocaleString()}</td>
                  <td className="p-4 text-right text-success">${property?.netIncome?.toLocaleString()}</td>
                  <td className="p-4 text-right text-muted-foreground">{property?.vacancyDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyPerformanceReport;