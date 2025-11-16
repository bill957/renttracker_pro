import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import Header from '../../components/ui/Header';
import PropertySelector from '../../components/ui/PropertySelector';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import PropertyInfoTab from './components/PropertyInfoTab';
import TenantsTab from './components/TenantsTab';
import FinancialTab from './components/FinancialTab';
import MaintenanceTab from './components/MaintenanceTab';
import DocumentsTab from './components/DocumentsTab';

const PropertyDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('property');
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Mock property data
  const mockProperty = {
    id: 1,
    name: 'Sunset Apartments',
    address: '123 Main Street, Springfield, IL 62701',
    type: 'Apartment Complex',
    units: 12,
    yearBuilt: 1995,
    squareFootage: 8500,
    purchasePrice: 450000,
    currentValue: 520000,
    monthlyRent: 2400,
    purchaseDate: '2020-03-15',
    coordinates: { lat: 39.7817, lng: -89.6501 },
    description: `Modern apartment complex featuring 12 well-maintained units in a prime location. 
    The property offers excellent rental income potential with recent renovations including updated kitchens, 
    new flooring, and energy-efficient appliances. Located in a desirable neighborhood with easy access to 
    shopping, dining, and public transportation.`,
    features: {
      interior: [
      'Updated kitchens with granite countertops',
      'Hardwood floors throughout',
      'In-unit washer/dryer hookups',
      'Central air conditioning',
      'Walk-in closets',
      'Modern bathroom fixtures'],

      exterior: [
      'Off-street parking',
      'Landscaped grounds',
      'Security lighting',
      'Storage units available',
      'Bike storage area',
      'Covered entrance'],

      amenities: [
      'On-site management office',
      'Package receiving service',
      'Pet-friendly policy',
      'Playground area',
      'Community garden space',
      '24/7 maintenance hotline']

    }
  };

  // Mock tenants data
  const mockTenants = [
  {
    id: 1,
    name: 'John Smith',
    unit: 'Unit 2A',
    status: 'active',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    leaseStartDate: '2024-06-01',
    leaseEndDate: '2025-05-31',
    monthlyRent: 1200,
    securityDeposit: 1200,
    petDeposit: 300,
    emergencyContact: 'Jane Smith - (555) 987-6543',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce6312b5-1762274557265.png",
    avatarAlt: 'Professional headshot of middle-aged man with brown hair in business attire'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    unit: 'Unit 1B',
    status: 'active',
    email: 'sarah.johnson@email.com',
    phone: '(555) 234-5678',
    leaseStartDate: '2024-09-01',
    leaseEndDate: '2025-08-31',
    monthlyRent: 1200,
    securityDeposit: 1200,
    petDeposit: null,
    emergencyContact: 'Mike Johnson - (555) 876-5432',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d5234dbc-1762273965593.png",
    avatarAlt: 'Professional headshot of young woman with blonde hair smiling'
  },
  {
    id: 3,
    name: 'Mike Davis',
    unit: 'Unit 3C',
    status: 'active',
    email: 'mike.davis@email.com',
    phone: '(555) 345-6789',
    leaseStartDate: '2024-11-01',
    leaseEndDate: '2025-10-31',
    monthlyRent: 1200,
    securityDeposit: 1200,
    petDeposit: 300,
    emergencyContact: 'Lisa Davis - (555) 765-4321',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_193dcbc98-1762274130175.png",
    avatarAlt: 'Professional headshot of African American man with glasses in casual shirt'
  },
  {
    id: 4,
    name: 'Emily Wilson',
    unit: 'Unit 2B',
    status: 'inactive',
    email: 'emily.wilson@email.com',
    phone: '(555) 456-7890',
    leaseStartDate: '2023-03-01',
    leaseEndDate: '2024-02-29',
    monthlyRent: 1150,
    securityDeposit: 1150,
    petDeposit: null,
    emergencyContact: 'Robert Wilson - (555) 654-3210',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10c75be77-1762273997956.png",
    avatarAlt: 'Professional headshot of woman with red hair in business suit'
  }];


  const tabs = [
  { id: 'property', label: 'Property Info', icon: 'Building2' },
  { id: 'tenants', label: 'Tenants', icon: 'Users' },
  { id: 'financial', label: 'Financial', icon: 'DollarSign' },
  { id: 'maintenance', label: 'Maintenance', icon: 'Wrench' },
  { id: 'documents', label: 'Documents', icon: 'FileText' }];


  const handlePropertyChange = (property) => {
    setSelectedProperty(property);
  };

  const handleActionClick = (actionId) => {
    switch (actionId) {
      case 'add-tenant':console.log('Add tenant action');
        break;
      case 'record-payment':navigate('/rent-collection');
        break;
      case 'add-expense':navigate('/expense-tracking');
        break;
      case 'schedule-maintenance':console.log('Schedule maintenance action');
        break;
      case 'send-notice':console.log('Send notice action');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handleEditProperty = () => {
    console.log('Edit property');
  };

  const handleAddTenant = () => {
    console.log('Add tenant');
  };

  const handleEditTenant = (tenant) => {
    console.log('Edit tenant:', tenant);
  };

  const handleViewLease = (tenant) => {
    console.log('View lease for:', tenant);
  };

  const handleAddExpense = () => {
    navigate('/expense-tracking');
  };

  const handleRecordPayment = () => {
    navigate('/rent-collection');
  };

  const handleExportReport = () => {
    console.log('Export financial report');
  };

  const handleScheduleMaintenance = () => {
    console.log('Schedule maintenance');
  };

  const handleUpdateRequest = (request) => {
    console.log('Update maintenance request:', request);
  };

  const handleUploadDocument = (files) => {
    console.log('Upload documents:', files);
  };

  const handleDownloadDocument = (document) => {
    console.log('Download document:', document);
  };

  const handleDeleteDocument = (document) => {
    console.log('Delete document:', document);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'property':
        return (
          <PropertyInfoTab
            property={mockProperty}
            onEdit={handleEditProperty} />);


      case 'tenants':
        return (
          <TenantsTab
            tenants={mockTenants}
            onAddTenant={handleAddTenant}
            onEditTenant={handleEditTenant}
            onViewLease={handleViewLease} />);


      case 'financial':
        return (
          <FinancialTab
            propertyId={mockProperty?.id}
            onAddExpense={handleAddExpense}
            onRecordPayment={handleRecordPayment}
            onExportReport={handleExportReport} />);


      case 'maintenance':
        return (
          <MaintenanceTab
            propertyId={mockProperty?.id}
            onScheduleMaintenance={handleScheduleMaintenance}
            onUpdateRequest={handleUpdateRequest} />);


      case 'documents':
        return (
          <DocumentsTab
            propertyId={mockProperty?.id}
            onUploadDocument={handleUploadDocument}
            onDownloadDocument={handleDownloadDocument}
            onDeleteDocument={handleDeleteDocument} />);


      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button
              onClick={() => navigate('/property-dashboard')}
              className="hover:text-foreground transition-smooth">

              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground">Property Details</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <PropertySelector
                selectedProperty={selectedProperty || mockProperty}
                onPropertyChange={handlePropertyChange} />

              
              <div className="hidden lg:block">
                <h1 className="text-2xl font-bold text-foreground">{mockProperty?.name}</h1>
                <p className="text-muted-foreground">{mockProperty?.address}</p>
              </div>
            </div>

            <QuickActionToolbar
              context="property-details"
              propertyId={mockProperty?.id}
              onActionClick={handleActionClick} />

          </div>

          {/* Mobile Property Info */}
          <div className="lg:hidden mb-6">
            <h1 className="text-xl font-bold text-foreground mb-1">{mockProperty?.name}</h1>
            <p className="text-sm text-muted-foreground">{mockProperty?.address}</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                activeTab === tab?.id ?
                'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'}`
                }>

                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              )}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="pb-8">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>);

};

export default PropertyDetails;