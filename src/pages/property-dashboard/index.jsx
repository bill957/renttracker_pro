import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PropertySelector from '../../components/ui/PropertySelector';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import MetricsCard from './components/MetricsCard';
import PropertyCard from './components/PropertyCard';
import NotificationPanel from './components/NotificationPanel';
import PropertyFilters from './components/PropertyFilters';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const PropertyDashboard = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    location: 'all',
    search: '',
    minRent: '',
    maxRent: ''
  });

  // Mock data for dashboard metrics
  const dashboardMetrics = [
  {
    title: "Total Monthly Income",
    value: "$12,450",
    subtitle: "From 8 occupied units",
    trend: "up",
    trendValue: "+8.2%",
    icon: "DollarSign",
    color: "success"
  },
  {
    title: "Outstanding Rent",
    value: "$2,100",
    subtitle: "3 overdue payments",
    trend: "down",
    trendValue: "-15.3%",
    icon: "AlertCircle",
    color: "warning"
  },
  {
    title: "Maintenance Requests",
    value: "7",
    subtitle: "2 urgent, 5 pending",
    trend: "up",
    trendValue: "+2",
    icon: "Wrench",
    color: "error"
  },
  {
    title: "Portfolio ROI",
    value: "14.2%",
    subtitle: "Annual return rate",
    trend: "up",
    trendValue: "+1.8%",
    icon: "TrendingUp",
    color: "primary"
  }];


  // Mock data for properties
  const mockProperties = [
  {
    id: 1,
    name: "Sunset Apartments",
    address: "123 Main Street, Downtown",
    image: "https://images.unsplash.com/photo-1699292102479-2cd4b8986228",
    imageAlt: "Modern apartment building with glass facade and landscaped entrance",
    status: "occupied",
    units: 12,
    yearBuilt: 2018,
    monthlyRent: 2400,
    currentTenant: "John Smith",
    nextRentDue: "2025-12-01",
    type: "apartment",
    location: "downtown",
    isUrgent: false
  },
  {
    id: 2,
    name: "Oak Street Duplex",
    address: "456 Oak Street, Suburbs",
    image: "https://images.unsplash.com/photo-1616028818795-bd415328672e",
    imageAlt: "Traditional two-story duplex with white siding and front porch",
    status: "occupied",
    units: 2,
    yearBuilt: 2015,
    monthlyRent: 1800,
    currentTenant: "Sarah Johnson",
    nextRentDue: "2025-11-20",
    type: "duplex",
    location: "suburbs",
    isUrgent: true
  },
  {
    id: 3,
    name: "Downtown Loft",
    address: "789 Center Avenue, Downtown",
    image: "https://images.unsplash.com/photo-1701911845753-7e467fc8d4bb",
    imageAlt: "Industrial loft building with brick exterior and large windows",
    status: "vacant",
    units: 1,
    yearBuilt: 2020,
    monthlyRent: 2200,
    currentTenant: null,
    nextRentDue: null,
    type: "house",
    location: "downtown",
    isUrgent: false
  },
  {
    id: 4,
    name: "Riverside Condos",
    address: "321 River Road, Riverside",
    image: "https://images.unsplash.com/photo-1645622087097-3444cbf0ca52",
    imageAlt: "Luxury condominium complex with waterfront views and modern architecture",
    status: "occupied",
    units: 8,
    yearBuilt: 2019,
    monthlyRent: 2800,
    currentTenant: "Mike Davis",
    nextRentDue: "2025-11-25",
    type: "condo",
    location: "riverside",
    isUrgent: false
  },
  {
    id: 5,
    name: "Garden View Townhomes",
    address: "654 Garden Lane, Suburbs",
    image: "https://images.unsplash.com/photo-1585916628097-ade0ba6c9a44",
    imageAlt: "Row of modern townhouses with landscaped front yards and attached garages",
    status: "maintenance",
    units: 6,
    yearBuilt: 2017,
    monthlyRent: 2100,
    currentTenant: "Lisa Wilson",
    nextRentDue: "2025-12-05",
    type: "townhouse",
    location: "suburbs",
    isUrgent: true
  },
  {
    id: 6,
    name: "Maple Street House",
    address: "987 Maple Street, Oak Street Area",
    image: "https://images.unsplash.com/photo-1712056686748-f4d948739c4b",
    imageAlt: "Single-family home with traditional architecture and well-maintained lawn",
    status: "occupied",
    units: 1,
    yearBuilt: 2012,
    monthlyRent: 1950,
    currentTenant: "Robert Brown",
    nextRentDue: "2025-11-28",
    type: "house",
    location: "oakstreet",
    isUrgent: false
  }];


  // Mock notifications data
  const mockNotifications = [
  {
    id: 1,
    type: "payment_overdue",
    title: "Overdue Payment Alert",
    message: "Rent payment from John Smith (Sunset Apartments) is 5 days overdue. Last payment received on October 1st.",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    priority: "urgent",
    propertyName: "Sunset Apartments - Unit 2A",
    actionRequired: true,
    primaryAction: "Send Reminder",
    secondaryAction: "Call Tenant"
  },
  {
    id: 2,
    type: "maintenance_urgent",
    title: "Urgent Maintenance Request",
    message: "Water leak reported in Unit 1B kitchen. Tenant reports water damage to ceiling and requests immediate attention.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    priority: "urgent",
    propertyName: "Oak Street Duplex",
    actionRequired: true,
    primaryAction: "Schedule Repair",
    secondaryAction: "Contact Tenant"
  },
  {
    id: 3,
    type: "lease_expiring",
    title: "Lease Renewal Due",
    message: "Lease agreement for Sarah Johnson expires in 30 days. Consider reaching out to discuss renewal terms.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    priority: "high",
    propertyName: "Downtown Loft",
    actionRequired: true,
    primaryAction: "Send Renewal",
    secondaryAction: "Schedule Meeting"
  },
  {
    id: 4,
    type: "inspection_due",
    title: "Annual Inspection Scheduled",
    message: "Annual property inspection for Garden View Townhomes is scheduled for next week. Ensure all units are accessible.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    priority: "medium",
    propertyName: "Garden View Townhomes",
    actionRequired: false
  }];


  // Filter properties based on current filters
  const filteredProperties = mockProperties?.filter((property) => {
    if (filters?.status !== 'all' && property?.status !== filters?.status) return false;
    if (filters?.type !== 'all' && property?.type !== filters?.type) return false;
    if (filters?.location !== 'all' && property?.location !== filters?.location) return false;
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      if (!property?.name?.toLowerCase()?.includes(searchTerm) &&
      !property?.address?.toLowerCase()?.includes(searchTerm) &&
      !(property?.currentTenant && property?.currentTenant?.toLowerCase()?.includes(searchTerm))) {
        return false;
      }
    }
    if (filters?.minRent && property?.monthlyRent < parseInt(filters?.minRent)) return false;
    if (filters?.maxRent && property?.monthlyRent > parseInt(filters?.maxRent)) return false;
    return true;
  });

  const handleQuickAction = (actionId, propertyId) => {
    console.log(`Quick action: ${actionId} for property: ${propertyId}`);

    switch (actionId) {
      case 'record-payment':navigate('/rent-collection');
        break;
      case 'add-expense':navigate('/expense-tracking');
        break;
      case 'maintenance-request':navigate('/maintenance-requests');
        break;
      case 'add-property':navigate('/property-details');
        break;
      default:
        console.log(`Action ${actionId} not implemented yet`);
    }
  };

  const handleNotificationAction = (notificationId, actionType) => {
    console.log(`Notification action: ${actionType} for notification: ${notificationId}`);
    // Handle notification actions here
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      type: 'all',
      location: 'all',
      search: '',
      minRent: '',
      maxRent: ''
    });
  };

  const handleMetricClick = (metricTitle) => {
    switch (metricTitle) {
      case 'Total Monthly Income':case 'Outstanding Rent':navigate('/rent-collection');
        break;
      case 'Maintenance Requests':navigate('/maintenance-requests');
        break;
      case 'Portfolio ROI':navigate('/financial-reports');
        break;
      default:
        break;
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Property Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your rental portfolio and track performance metrics
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <PropertySelector
                selectedProperty={selectedProperty}
                onPropertyChange={setSelectedProperty}
                properties={mockProperties} />

              <QuickActionToolbar
                context="dashboard"
                onActionClick={handleQuickAction} />

            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardMetrics?.map((metric, index) =>
            <div key={index} onClick={() => handleMetricClick(metric?.title)} className="cursor-pointer">
                <MetricsCard {...metric} />
              </div>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Properties Section */}
            <div className="xl:col-span-3">
              {/* Filters */}
              <div className="mb-6">
                <PropertyFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters} />

              </div>

              {/* Properties Grid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    Properties ({filteredProperties?.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Grid3X3"
                      iconPosition="left"
                      iconSize={16}>

                      Grid View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="List"
                      iconPosition="left"
                      iconSize={16}>

                      List View
                    </Button>
                  </div>
                </div>

                {filteredProperties?.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties?.map((property) =>
                  <PropertyCard
                    key={property?.id}
                    property={property}
                    onQuickAction={handleQuickAction} />

                  )}
                  </div> :

                <div className="text-center py-12 bg-card border border-border rounded-lg">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No Properties Found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or filters
                    </p>
                    <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="X"
                    iconPosition="left"
                    iconSize={16}>

                      Clear Filters
                    </Button>
                  </div>
                }
              </div>
            </div>

            {/* Notifications Sidebar */}
            <div className="xl:col-span-1">
              <NotificationPanel
                notifications={mockNotifications}
                onNotificationAction={handleNotificationAction} />

            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default PropertyDashboard;