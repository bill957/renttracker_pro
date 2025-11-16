import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import PropertySelector from '../../components/ui/PropertySelector';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import TenantStats from './components/TenantStats';
import TenantFilters from './components/TenantFilters';
import TenantCard from './components/TenantCard';
import TenantDetailPanel from './components/TenantDetailPanel';
import LeaseRenewalSection from './components/LeaseRenewalSection';
import VacancyTracker from './components/VacancyTracker';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TenantManagement = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [activeView, setActiveView] = useState('tenants');
  const [filters, setFilters] = useState({});

  const mockTenants = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12cacdd88-1762248875137.png",
    avatarAlt: "Professional headshot of man with short brown hair in navy suit and tie",
    propertyName: "Sunset Apartments",
    unitNumber: "Unit 2A",
    monthlyRent: 1500,
    leaseStart: "2024-03-01",
    leaseEnd: "2025-06-30",
    leaseStatus: "active",
    securityDeposit: 1500,
    isActive: true,
    lastPayment: {
      date: "2024-11-01",
      amount: 1500,
      method: "Bank Transfer"
    },
    emergencyContact: {
      name: "Jane Smith",
      relationship: "Spouse",
      phone: "(555) 123-4568"
    }
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 234-5678",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae7d9bdc-1762274136565.png",
    avatarAlt: "Professional headshot of woman with shoulder-length brown hair in white blouse",
    propertyName: "Downtown Loft",
    unitNumber: "Unit A",
    monthlyRent: 1800,
    leaseStart: "2024-04-01",
    leaseEnd: "2025-03-31",
    leaseStatus: "expiring",
    securityDeposit: 1800,
    isActive: true,
    lastPayment: {
      date: "2024-11-01",
      amount: 1800,
      method: "Check"
    },
    emergencyContact: {
      name: "Robert Johnson",
      relationship: "Father",
      phone: "(555) 234-5679"
    }
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@email.com",
    phone: "(555) 345-6789",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_139ca3e6e-1762274271909.png",
    avatarAlt: "Professional headshot of man with short dark hair in navy suit and tie",
    propertyName: "Riverside Condos",
    unitNumber: "Unit 3C",
    monthlyRent: 1200,
    leaseStart: "2024-02-15",
    leaseEnd: "2025-08-15",
    leaseStatus: "active",
    securityDeposit: 1200,
    isActive: false,
    lastPayment: {
      date: "2024-10-25",
      amount: 1200,
      method: "Cash"
    },
    emergencyContact: {
      name: "Lisa Davis",
      relationship: "Sister",
      phone: "(555) 345-6790"
    }
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "(555) 456-7890",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b33e57c8-1762274356059.png",
    avatarAlt: "Professional headshot of Asian woman with long black hair in business attire",
    propertyName: "Garden View Townhomes",
    unitNumber: "Unit 2B",
    monthlyRent: 1600,
    leaseStart: "2024-01-01",
    leaseEnd: "2025-12-01",
    leaseStatus: "active",
    securityDeposit: 1600,
    isActive: true,
    lastPayment: {
      date: "2024-11-01",
      amount: 1600,
      method: "Bank Transfer"
    },
    emergencyContact: {
      name: "David Chen",
      relationship: "Brother",
      phone: "(555) 456-7891"
    }
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "(555) 567-8901",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e94f65e2-1762248962069.png",
    avatarAlt: "Professional headshot of man with beard and glasses in dark suit",
    propertyName: "Oak Street Duplex",
    unitNumber: "Unit B",
    monthlyRent: 1400,
    leaseStart: "2023-11-01",
    leaseEnd: "2024-10-31",
    leaseStatus: "expired",
    securityDeposit: 1400,
    isActive: false,
    lastPayment: {
      date: "2024-09-01",
      amount: 1400,
      method: "Check"
    },
    emergencyContact: {
      name: "Mary Wilson",
      relationship: "Mother",
      phone: "(555) 567-8902"
    }
  }];


  const [tenants, setTenants] = useState(mockTenants);
  const [filteredTenants, setFilteredTenants] = useState(mockTenants);

  const handlePropertyChange = (property) => {
    setSelectedProperty(property);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setFilteredTenants(tenants);
  };

  const applyFilters = (filterCriteria) => {
    let filtered = [...tenants];

    if (filterCriteria?.search) {
      filtered = filtered?.filter((tenant) =>
      tenant?.name?.toLowerCase()?.includes(filterCriteria?.search?.toLowerCase()) ||
      tenant?.email?.toLowerCase()?.includes(filterCriteria?.search?.toLowerCase()) ||
      tenant?.propertyName?.toLowerCase()?.includes(filterCriteria?.search?.toLowerCase())
      );
    }

    if (filterCriteria?.property && filterCriteria?.property !== 'all') {
      filtered = filtered?.filter((tenant) =>
      tenant?.propertyName?.toLowerCase()?.replace(/\s+/g, '-') === filterCriteria?.property
      );
    }

    if (filterCriteria?.leaseStatus && filterCriteria?.leaseStatus !== 'all') {
      filtered = filtered?.filter((tenant) => tenant?.leaseStatus === filterCriteria?.leaseStatus);
    }

    setFilteredTenants(filtered);
  };

  const handleViewDetails = (tenant) => {
    setSelectedTenant(tenant);
    setIsDetailPanelOpen(true);
  };

  const handleContact = (tenant) => {
    console.log('Contact tenant:', tenant?.name);
  };

  const handleViewPayments = (tenant) => {
    console.log('View payments for:', tenant?.name);
  };

  const handleSaveTenant = (updatedTenant) => {
    setTenants((prev) => prev?.map((t) => t?.id === updatedTenant?.id ? updatedTenant : t));
    setFilteredTenants((prev) => prev?.map((t) => t?.id === updatedTenant?.id ? updatedTenant : t));
    setSelectedTenant(updatedTenant);
  };

  const handleActionClick = (actionId, propertyId) => {
    switch (actionId) {
      case 'add-tenant':console.log('Add new tenant');
        break;
      case 'send-notice':console.log('Send notice to tenants');
        break;
      case 'record-payment':console.log('Record payment');
        break;
      case 'schedule-inspection':console.log('Schedule inspection');
        break;
      default:
        console.log('Action:', actionId);
    }
  };

  const handleSendRenewal = (tenantIds) => {
    console.log('Send renewal to tenants:', tenantIds);
  };

  const handleViewRenewalDetails = (lease) => {
    console.log('View renewal details:', lease);
  };

  const handleScheduleShowing = (unit) => {
    console.log('Schedule showing for:', unit);
  };

  const handleUpdateListing = (unit) => {
    console.log('Update listing for:', unit);
  };

  const viewTabs = [
  { id: 'tenants', label: 'All Tenants', icon: 'Users', count: filteredTenants?.length },
  { id: 'renewals', label: 'Lease Renewals', icon: 'FileText', count: 3 },
  { id: 'vacancies', label: 'Vacancies', icon: 'Home', count: 3 }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Tenant Management</h1>
              <p className="text-muted-foreground">
                Manage tenant relationships, leases, and communications
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6 lg:mt-0">
              <PropertySelector
                selectedProperty={selectedProperty}
                onPropertyChange={handlePropertyChange} />

              <QuickActionToolbar
                context="operations"
                propertyId={selectedProperty?.id}
                onActionClick={handleActionClick} />

            </div>
          </div>

          {/* Stats Overview */}
          <TenantStats tenants={tenants} />

          {/* View Tabs */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8">
              {viewTabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveView(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth ${
                activeView === tab?.id ?
                'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`
                }>

                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                  <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ${
                activeView === tab?.id ?
                'bg-primary text-primary-foreground' :
                'bg-muted text-muted-foreground'}`
                }>
                    {tab?.count}
                  </span>
                </button>
              )}
            </nav>
          </div>

          {/* Content based on active view */}
          {activeView === 'tenants' &&
          <>
              {/* Filters */}
              <TenantFilters
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters} />


              {/* Tenant Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTenants?.map((tenant) =>
              <TenantCard
                key={tenant?.id}
                tenant={tenant}
                onViewDetails={handleViewDetails}
                onContact={handleContact}
                onViewPayments={handleViewPayments} />

              )}
              </div>

              {filteredTenants?.length === 0 &&
            <div className="text-center py-12">
                  <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No tenants found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or add a new tenant to get started.
                  </p>
                  <Button
                variant="default"
                iconName="Plus"
                iconPosition="left">

                    Add New Tenant
                  </Button>
                </div>
            }
            </>
          }

          {activeView === 'renewals' &&
          <LeaseRenewalSection
            onSendRenewal={handleSendRenewal}
            onViewDetails={handleViewRenewalDetails} />

          }

          {activeView === 'vacancies' &&
          <VacancyTracker
            onScheduleShowing={handleScheduleShowing}
            onUpdateListing={handleUpdateListing} />

          }
        </div>
      </main>
      {/* Tenant Detail Panel */}
      <TenantDetailPanel
        tenant={selectedTenant}
        isOpen={isDetailPanelOpen}
        onClose={() => setIsDetailPanelOpen(false)}
        onSave={handleSaveTenant} />

    </div>);

};

export default TenantManagement;