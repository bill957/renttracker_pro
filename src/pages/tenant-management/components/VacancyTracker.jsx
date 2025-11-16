import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VacancyTracker = ({ onScheduleShowing, onUpdateListing }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('current');

  const vacantUnits = [
  {
    id: 1,
    propertyName: "Sunset Apartments",
    unitNumber: "Unit 1B",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    lastRent: 1400,
    suggestedRent: 1450,
    vacantSince: "2024-10-15",
    daysVacant: 31,
    marketingStatus: "listed",
    inquiries: 12,
    showings: 5,
    applications: 2,
    image: "https://images.unsplash.com/photo-1721742126814-f267ecb2d1de",
    imageAlt: "Modern apartment living room with gray sofa, wooden coffee table, and large windows"
  },
  {
    id: 2,
    propertyName: "Oak Street Duplex",
    unitNumber: "Unit A",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    lastRent: 1800,
    suggestedRent: 1900,
    vacantSince: "2024-11-01",
    daysVacant: 14,
    marketingStatus: "preparing",
    inquiries: 0,
    showings: 0,
    applications: 0,
    image: "https://images.unsplash.com/photo-1671762232796-54be17cdce58",
    imageAlt: "Spacious duplex kitchen with white cabinets, granite countertops, and stainless steel appliances"
  },
  {
    id: 3,
    propertyName: "Garden View Townhomes",
    unitNumber: "Unit 3A",
    bedrooms: 2,
    bathrooms: 2.5,
    sqft: 1100,
    lastRent: 1650,
    suggestedRent: 1700,
    vacantSince: "2024-09-20",
    daysVacant: 56,
    marketingStatus: "listed",
    inquiries: 8,
    showings: 3,
    applications: 1,
    image: "https://images.unsplash.com/photo-1684214706158-4464b2f84fd9",
    imageAlt: "Townhome exterior with brick facade, front porch, and landscaped garden"
  }];


  const marketAnalysis = {
    averageDaysOnMarket: 35,
    averageRentIncrease: 3.2,
    occupancyRate: 92.5,
    marketTrend: "increasing"
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'listed':return 'bg-success text-success-foreground';
      case 'preparing':return 'bg-warning text-warning-foreground';
      case 'maintenance':return 'bg-error text-error-foreground';
      default:return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'listed':return 'Listed';
      case 'preparing':return 'Preparing';
      case 'maintenance':return 'In Maintenance';
      default:return 'Unknown';
    }
  };

  const getDaysVacantColor = (days) => {
    if (days <= 30) return 'text-success';
    if (days <= 60) return 'text-warning';
    return 'text-error';
  };

  const totalLostRevenue = vacantUnits?.reduce((sum, unit) => {
    return sum + unit?.suggestedRent * (unit?.daysVacant / 30);
  }, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Vacancy Tracker</h3>
          <p className="text-sm text-muted-foreground">
            {vacantUnits?.length} vacant units • {formatCurrency(totalLostRevenue)} lost revenue
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="TrendingUp"
            iconPosition="left">

            Market Analysis
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left">

            Add Listing
          </Button>
        </div>
      </div>
      {/* Market Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{marketAnalysis?.averageDaysOnMarket}</p>
          <p className="text-sm text-muted-foreground">Avg Days on Market</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">+{marketAnalysis?.averageRentIncrease}%</p>
          <p className="text-sm text-muted-foreground">Avg Rent Increase</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{marketAnalysis?.occupancyRate}%</p>
          <p className="text-sm text-muted-foreground">Occupancy Rate</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <p className="text-sm font-medium text-success">Market Rising</p>
          </div>
          <p className="text-sm text-muted-foreground">Trend</p>
        </div>
      </div>
      {/* Vacant Units */}
      <div className="space-y-4">
        {vacantUnits?.map((unit) =>
        <div key={unit?.id} className="border border-border rounded-lg p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-start space-x-4">
                <img
                src={unit?.image}
                alt={unit?.imageAlt}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />

                <div>
                  <h4 className="font-medium text-foreground">{unit?.propertyName}</h4>
                  <p className="text-sm text-muted-foreground">{unit?.unitNumber}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-muted-foreground">
                      {unit?.bedrooms} bed • {unit?.bathrooms} bath • {unit?.sqft} sqft
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                getStatusColor(unit?.marketingStatus)}`
                }>
                    {getStatusLabel(unit?.marketingStatus)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Last Rent</p>
                  <p className="text-sm text-muted-foreground">{formatCurrency(unit?.lastRent)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Suggested</p>
                  <p className="text-sm font-semibold text-success">{formatCurrency(unit?.suggestedRent)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Days Vacant</p>
                  <p className={`text-sm font-semibold ${getDaysVacantColor(unit?.daysVacant)}`}>
                    {unit?.daysVacant}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Inquiries</p>
                  <p className="text-sm text-muted-foreground">{unit?.inquiries}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Applications</p>
                  <p className="text-sm font-semibold text-primary">{unit?.applications}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              <Button
              variant="default"
              size="sm"
              onClick={() => onScheduleShowing(unit)}
              iconName="Calendar"
              iconPosition="left">

                Schedule Showing
              </Button>
              <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateListing(unit)}
              iconName="Edit"
              iconPosition="left">

                Update Listing
              </Button>
              <Button
              variant="outline"
              size="sm"
              iconName="Camera"
              iconPosition="left">

                Photos
              </Button>
              <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left">

                Share Listing
              </Button>
            </div>

            {/* Activity Summary */}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
              <div className="text-center p-2 bg-muted rounded">
                <p className="text-lg font-semibold text-foreground">{unit?.inquiries}</p>
                <p className="text-xs text-muted-foreground">Inquiries</p>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <p className="text-lg font-semibold text-foreground">{unit?.showings}</p>
                <p className="text-xs text-muted-foreground">Showings</p>
              </div>
              <div className="text-center p-2 bg-muted rounded">
                <p className="text-lg font-semibold text-primary">{unit?.applications}</p>
                <p className="text-xs text-muted-foreground">Applications</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
        <Button variant="outline" size="sm" iconName="FileText">
          Generate Vacancy Report
        </Button>
        <Button variant="outline" size="sm" iconName="Mail">
          Email Marketing Campaign
        </Button>
        <Button variant="outline" size="sm" iconName="BarChart3">
          Pricing Analysis
        </Button>
        <Button variant="outline" size="sm" iconName="Calendar">
          Bulk Schedule Showings
        </Button>
      </div>
    </div>);

};

export default VacancyTracker;