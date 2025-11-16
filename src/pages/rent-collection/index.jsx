import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import PropertySelector from '../../components/ui/PropertySelector';
import FinancialPeriodSelector from '../../components/ui/FinancialPeriodSelector';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import PaymentSummaryPanel from './components/PaymentSummaryPanel';
import PaymentFilters from './components/PaymentFilters';
import TenantPaymentRow from './components/TenantPaymentRow';
import RecordPaymentModal from './components/RecordPaymentModal';
import ReminderModal from './components/ReminderModal';
import PaymentHistoryModal from './components/PaymentHistoryModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RentCollection = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    property: 'all',
    sortBy: 'due_date_asc'
  });

  // Modal states
  const [recordPaymentModal, setRecordPaymentModal] = useState({ isOpen: false, tenant: null });
  const [reminderModal, setReminderModal] = useState({ isOpen: false, tenant: null });
  const [historyModal, setHistoryModal] = useState({ isOpen: false, tenant: null });

  // Mock tenant data
  const mockTenants = [
  {
    id: 1,
    name: 'John Smith',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12cacdd88-1762248875137.png",
    avatarAlt: 'Professional headshot of middle-aged man with brown hair in navy suit',
    propertyAddress: 'Sunset Apartments - Unit 2A',
    rentAmount: 1200,
    dueDate: '2024-11-01',
    paymentStatus: 'overdue',
    daysOverdue: 14,
    lastPaymentDate: '2024-10-05',
    paymentMethod: 'Bank Transfer',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12ce6c48b-1762273394123.png",
    avatarAlt: 'Professional headshot of young woman with blonde hair in business attire',
    propertyAddress: 'Oak Street Duplex - Unit B',
    rentAmount: 950,
    dueDate: '2024-11-15',
    paymentStatus: 'due_today',
    daysOverdue: 0,
    lastPaymentDate: '2024-10-15',
    paymentMethod: 'Check',
    email: 'sarah.johnson@email.com',
    phone: '(555) 234-5678'
  },
  {
    id: 3,
    name: 'Mike Davis',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1da61cdea-1762273355589.png",
    avatarAlt: 'Professional headshot of young man with dark hair in casual shirt',
    propertyAddress: 'Riverside Condos - Unit 3C',
    rentAmount: 1350,
    dueDate: '2024-11-01',
    paymentStatus: 'paid',
    daysOverdue: 0,
    lastPaymentDate: '2024-11-01',
    paymentMethod: 'Online Payment',
    email: 'mike.davis@email.com',
    phone: '(555) 345-6789'
  },
  {
    id: 4,
    name: 'Emily Chen',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_129b1ff05-1762273604073.png",
    avatarAlt: 'Professional headshot of Asian woman with long black hair in white blouse',
    propertyAddress: 'Downtown Loft',
    rentAmount: 1800,
    dueDate: '2024-11-10',
    paymentStatus: 'partial',
    daysOverdue: 5,
    lastPaymentDate: '2024-11-10',
    paymentMethod: 'Cash',
    email: 'emily.chen@email.com',
    phone: '(555) 456-7890'
  },
  {
    id: 5,
    name: 'Robert Wilson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17c733bf8-1762274254688.png",
    avatarAlt: 'Professional headshot of older man with gray hair in dark suit',
    propertyAddress: 'Garden View Townhomes - Unit 5',
    rentAmount: 1100,
    dueDate: '2024-11-20',
    paymentStatus: 'upcoming',
    daysOverdue: 0,
    lastPaymentDate: '2024-10-20',
    paymentMethod: 'Bank Transfer',
    email: 'robert.wilson@email.com',
    phone: '(555) 567-8901'
  }];


  // Filter and sort tenants
  const filteredTenants = useMemo(() => {
    let filtered = [...mockTenants];

    // Apply search filter
    if (filters?.search) {
      filtered = filtered?.filter((tenant) =>
      tenant?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      tenant?.propertyAddress?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter((tenant) => tenant?.paymentStatus === filters?.status);
    }

    // Apply property filter
    if (filters?.property !== 'all') {
      filtered = filtered?.filter((tenant) =>
      tenant?.propertyAddress?.toLowerCase()?.includes(filters?.property?.replace('-', ' '))
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'due_date_asc':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'due_date_desc':
          return new Date(b.dueDate) - new Date(a.dueDate);
        case 'tenant_name':
          return a?.name?.localeCompare(b?.name);
        case 'amount_desc':
          return b?.rentAmount - a?.rentAmount;
        case 'amount_asc':
          return a?.rentAmount - b?.rentAmount;
        case 'status':
          const statusOrder = { overdue: 0, due_today: 1, partial: 2, upcoming: 3, paid: 4 };
          return statusOrder?.[a?.paymentStatus] - statusOrder?.[b?.paymentStatus];
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters]);

  // Calculate summary data
  const summaryData = useMemo(() => {
    const totalExpected = mockTenants?.reduce((sum, tenant) => sum + tenant?.rentAmount, 0);
    const totalCollected = mockTenants?.filter((tenant) => tenant?.paymentStatus === 'paid')?.reduce((sum, tenant) => sum + tenant?.rentAmount, 0);
    const totalOutstanding = totalExpected - totalCollected;
    const collectionRate = totalExpected > 0 ? totalCollected / totalExpected * 100 : 0;

    return {
      totalExpected,
      totalCollected,
      totalOutstanding,
      collectionRate,
      monthOverMonthChange: 5.2
    };
  }, []);

  // Modal handlers
  const handleRecordPayment = (tenant) => {
    setRecordPaymentModal({ isOpen: true, tenant });
  };

  const handleSendReminder = (tenant) => {
    setReminderModal({ isOpen: true, tenant });
  };

  const handleViewHistory = (tenant) => {
    setHistoryModal({ isOpen: true, tenant });
  };

  const handleSavePayment = (paymentData) => {
    console.log('Payment recorded:', paymentData);
    // Here you would typically update the tenant's payment status
    // and refresh the data
  };

  const handleSendReminderAction = (reminderData) => {
    console.log('Reminder sent:', reminderData);
    // Here you would typically send the reminder and log the action
  };

  const handleExport = () => {
    console.log('Exporting payment data...');
    // Here you would typically generate and download a report
  };

  const handleQuickAction = (actionId, propertyId) => {
    switch (actionId) {
      case 'record-payment':
        // Open payment modal for first overdue tenant
        const overdueTenant = filteredTenants?.find((t) => t?.paymentStatus === 'overdue');
        if (overdueTenant) {
          handleRecordPayment(overdueTenant);
        }
        break;
      case 'add-expense':console.log('Navigate to expense tracking');
        break;
      case 'generate-invoice':console.log('Generate invoice');
        break;
      case 'export-report':
        handleExport();
        break;
      default:
        console.log('Quick action:', actionId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-foreground">Rent Collection</h1>
              <p className="text-muted-foreground">Track payments and manage tenant communications</p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <PropertySelector
                selectedProperty={selectedProperty}
                onPropertyChange={setSelectedProperty} />

              <FinancialPeriodSelector
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod} />

            </div>
          </div>

          {/* Payment Summary */}
          <div className="mb-8">
            <PaymentSummaryPanel summaryData={summaryData} />
          </div>

          {/* Filters and Actions */}
          <div className="mb-6">
            <PaymentFilters
              filters={filters}
              onFiltersChange={setFilters}
              onExport={handleExport} />

          </div>

          {/* Tenant Payment List */}
          <div className="bg-card border border-border rounded-lg shadow-elevation-1">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-card-foreground">
                  Tenant Payments ({filteredTenants?.length})
                </h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={16} />
                  <span>November 2024</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {filteredTenants?.length > 0 ?
              <div className="space-y-4">
                  {filteredTenants?.map((tenant) =>
                <TenantPaymentRow
                  key={tenant?.id}
                  tenant={tenant}
                  onRecordPayment={handleRecordPayment}
                  onSendReminder={handleSendReminder}
                  onViewHistory={handleViewHistory} />

                )}
                </div> :

              <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-card-foreground mb-2">No tenants found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                  variant="outline"
                  onClick={() => setFilters({
                    search: '',
                    status: 'all',
                    property: 'all',
                    sortBy: 'due_date_asc'
                  })}>

                    Clear Filters
                  </Button>
                </div>
              }
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActionToolbar
            context="financials"
            onActionClick={handleQuickAction} />

        </div>
      </main>
      {/* Modals */}
      <RecordPaymentModal
        isOpen={recordPaymentModal?.isOpen}
        onClose={() => setRecordPaymentModal({ isOpen: false, tenant: null })}
        tenant={recordPaymentModal?.tenant}
        onSavePayment={handleSavePayment} />

      <ReminderModal
        isOpen={reminderModal?.isOpen}
        onClose={() => setReminderModal({ isOpen: false, tenant: null })}
        tenant={reminderModal?.tenant}
        onSendReminder={handleSendReminderAction} />

      <PaymentHistoryModal
        isOpen={historyModal?.isOpen}
        onClose={() => setHistoryModal({ isOpen: false, tenant: null })}
        tenant={historyModal?.tenant} />

    </div>);

};

export default RentCollection;