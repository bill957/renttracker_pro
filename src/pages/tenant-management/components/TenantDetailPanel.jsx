import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TenantDetailPanel = ({ tenant, isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTenant, setEditedTenant] = useState(tenant);

  if (!isOpen || !tenant) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'lease', label: 'Lease Details', icon: 'FileText' },
    { id: 'payments', label: 'Payment History', icon: 'CreditCard' },
    { id: 'communications', label: 'Communications', icon: 'MessageSquare' },
    { id: 'documents', label: 'Documents', icon: 'Folder' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'long',
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

  const handleSave = () => {
    onSave(editedTenant);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTenant(tenant);
    setIsEditing(false);
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Image
          src={tenant?.avatar}
          alt={tenant?.avatarAlt}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-foreground">{tenant?.name}</h3>
          <p className="text-muted-foreground">{tenant?.email}</p>
          <p className="text-muted-foreground">{tenant?.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-foreground mb-3">Contact Information</h4>
          <div className="space-y-3">
            <Input
              label="Full Name"
              value={isEditing ? editedTenant?.name : tenant?.name}
              onChange={(e) => setEditedTenant({...editedTenant, name: e?.target?.value})}
              disabled={!isEditing}
            />
            <Input
              label="Email"
              type="email"
              value={isEditing ? editedTenant?.email : tenant?.email}
              onChange={(e) => setEditedTenant({...editedTenant, email: e?.target?.value})}
              disabled={!isEditing}
            />
            <Input
              label="Phone"
              type="tel"
              value={isEditing ? editedTenant?.phone : tenant?.phone}
              onChange={(e) => setEditedTenant({...editedTenant, phone: e?.target?.value})}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3">Emergency Contact</h4>
          <div className="space-y-3">
            <Input
              label="Emergency Contact Name"
              value={tenant?.emergencyContact?.name || "Sarah Johnson"}
              disabled={!isEditing}
            />
            <Input
              label="Relationship"
              value={tenant?.emergencyContact?.relationship || "Sister"}
              disabled={!isEditing}
            />
            <Input
              label="Emergency Phone"
              type="tel"
              value={tenant?.emergencyContact?.phone || "(555) 987-6543"}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeaseTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-foreground mb-3">Property Details</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Property</label>
              <p className="text-foreground">{tenant?.propertyName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Unit</label>
              <p className="text-foreground">{tenant?.unitNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Property Type</label>
              <p className="text-foreground">{tenant?.propertyType || "Apartment"}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3">Lease Terms</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Lease Start</label>
              <p className="text-foreground">{formatDate(tenant?.leaseStart)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Lease End</label>
              <p className="text-foreground">{formatDate(tenant?.leaseEnd)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Monthly Rent</label>
              <p className="text-foreground font-semibold">{formatCurrency(tenant?.monthlyRent)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Security Deposit</label>
          <p className="text-foreground font-semibold">{formatCurrency(tenant?.securityDeposit)}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Pet Deposit</label>
          <p className="text-foreground">{formatCurrency(tenant?.petDeposit || 0)}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Late Fee</label>
          <p className="text-foreground">{formatCurrency(tenant?.lateFee || 50)}</p>
        </div>
      </div>
    </div>
  );

  const renderPaymentsTab = () => {
    const mockPayments = [
      { id: 1, date: "2024-11-01", amount: tenant?.monthlyRent, method: "Bank Transfer", status: "completed" },
      { id: 2, date: "2024-10-01", amount: tenant?.monthlyRent, method: "Check", status: "completed" },
      { id: 3, date: "2024-09-01", amount: tenant?.monthlyRent, method: "Bank Transfer", status: "completed" },
      { id: 4, date: "2024-08-01", amount: tenant?.monthlyRent, method: "Cash", status: "completed" },
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Payment History</h4>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Record Payment
          </Button>
        </div>
        <div className="space-y-3">
          {mockPayments?.map((payment) => (
            <div key={payment?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium text-foreground">{formatDate(payment?.date)}</p>
                <p className="text-sm text-muted-foreground">{payment?.method}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-success">{formatCurrency(payment?.amount)}</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success text-success-foreground">
                  {payment?.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCommunicationsTab = () => {
    const mockCommunications = [
      {
        id: 1,
        type: "email",
        subject: "Lease Renewal Notice",
        date: "2024-11-10",
        status: "sent",
        preview: "Your lease is expiring on March 31, 2025. Please let us know if you'd like to renew..."
      },
      {
        id: 2,
        type: "sms",
        subject: "Maintenance Reminder",
        date: "2024-11-05",
        status: "delivered",
        preview: "Reminder: HVAC maintenance scheduled for tomorrow at 2 PM"
      },
      {
        id: 3,
        type: "email",
        subject: "Rent Receipt - October 2024",
        date: "2024-10-01",
        status: "opened",
        preview: "Thank you for your rent payment. Attached is your receipt for October 2024."
      }
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Communication History</h4>
          <Button variant="outline" size="sm" iconName="Mail" iconPosition="left">
            Send Message
          </Button>
        </div>
        <div className="space-y-3">
          {mockCommunications?.map((comm) => (
            <div key={comm?.id} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name={comm?.type === 'email' ? 'Mail' : 'MessageSquare'} size={16} />
                  <span className="font-medium text-foreground">{comm?.subject}</span>
                </div>
                <span className="text-sm text-muted-foreground">{formatDate(comm?.date)}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{comm?.preview}</p>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                comm?.status === 'opened' ? 'bg-success text-success-foreground' :
                comm?.status === 'delivered' ? 'bg-warning text-warning-foreground' :
                'bg-secondary text-secondary-foreground'
              }`}>
                {comm?.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDocumentsTab = () => {
    const mockDocuments = [
      { id: 1, name: "Lease Agreement", type: "PDF", size: "2.4 MB", uploadDate: "2024-03-15", category: "lease" },
      { id: 2, name: "Security Deposit Receipt", type: "PDF", size: "156 KB", uploadDate: "2024-03-15", category: "financial" },
      { id: 3, name: "Background Check", type: "PDF", size: "890 KB", uploadDate: "2024-03-10", category: "screening" },
      { id: 4, name: "Photo ID Copy", type: "JPG", size: "1.2 MB", uploadDate: "2024-03-10", category: "identification" }
    ];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Documents</h4>
          <Button variant="outline" size="sm" iconName="Upload" iconPosition="left">
            Upload Document
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {mockDocuments?.map((doc) => (
            <div key={doc?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">{doc?.name}</p>
                  <p className="text-sm text-muted-foreground">{doc?.type} • {doc?.size} • {formatDate(doc?.uploadDate)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Download">
                  Download
                </Button>
                <Button variant="ghost" size="sm" iconName="Eye">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Tenant Details</h2>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'lease' && renderLeaseTab()}
          {activeTab === 'payments' && renderPaymentsTab()}
          {activeTab === 'communications' && renderCommunicationsTab()}
          {activeTab === 'documents' && renderDocumentsTab()}
        </div>
      </div>
    </div>
  );
};

export default TenantDetailPanel;