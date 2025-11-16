import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RequestDetailsModal = ({ request, isOpen, onClose, onStatusUpdate, onAddNote, onUpdateCost }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [newNote, setNewNote] = useState('');
  const [costUpdate, setCostUpdate] = useState({
    labor: request?.actualCost?.labor || '',
    materials: request?.actualCost?.materials || '',
    other: request?.actualCost?.other || ''
  });

  if (!isOpen || !request) return null;

  const statusOptions = [
    { value: 'submitted', label: 'Submitted' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const priorityOptions = [
    { value: 'emergency', label: 'Emergency' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'emergency': return 'text-error bg-error/10';
      case 'urgent': return 'text-warning bg-warning/10';
      case 'high': return 'text-warning bg-warning/10';
      case 'medium': return 'text-secondary bg-secondary/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'text-primary bg-primary/10';
      case 'assigned': return 'text-secondary bg-secondary/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'completed': return 'text-success bg-success/10';
      case 'cancelled': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddNote = () => {
    if (newNote?.trim()) {
      onAddNote?.(request?.id, newNote?.trim());
      setNewNote('');
    }
  };

  const handleUpdateCost = () => {
    const totalCost = (parseFloat(costUpdate?.labor) || 0) + 
                     (parseFloat(costUpdate?.materials) || 0) + 
                     (parseFloat(costUpdate?.other) || 0);
    
    onUpdateCost?.(request?.id, {
      ...costUpdate,
      total: totalCost
    });
  };

  const totalEstimatedCost = (parseFloat(costUpdate?.labor) || 0) + 
                            (parseFloat(costUpdate?.materials) || 0) + 
                            (parseFloat(costUpdate?.other) || 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <Icon name="Wrench" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{request?.title}</h2>
              <p className="text-sm text-muted-foreground">Request #{request?.id}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(request?.priority)}`}>
              {request?.priority}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request?.status)}`}>
              {request?.status?.replace('-', ' ')}
            </span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {[
            { id: 'details', label: 'Details', icon: 'FileText' },
            { id: 'photos', label: 'Photos', icon: 'Camera' },
            { id: 'communication', label: 'Communication', icon: 'MessageSquare' },
            { id: 'costs', label: 'Costs', icon: 'DollarSign' }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-smooth ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Property</label>
                    <p className="text-foreground font-medium">{request?.propertyName}</p>
                    <p className="text-sm text-muted-foreground">{request?.propertyAddress}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tenant</label>
                    <p className="text-foreground font-medium">{request?.tenantName}</p>
                    <p className="text-sm text-muted-foreground">{request?.tenantPhone}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                    <p className="text-foreground font-medium capitalize">{request?.category}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                    <p className="text-foreground">{formatDate(request?.submittedDate)}</p>
                  </div>
                  
                  {request?.assignedVendor && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Assigned Vendor</label>
                      <p className="text-foreground font-medium">{request?.assignedVendor}</p>
                      <p className="text-sm text-muted-foreground">{request?.vendorPhone}</p>
                    </div>
                  )}
                  
                  {request?.completedDate && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Completed</label>
                      <p className="text-foreground">{formatDate(request?.completedDate)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  <p className="text-foreground whitespace-pre-wrap">{request?.description}</p>
                </div>
              </div>

              {/* Status Update */}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <Select
                  label="Update Status"
                  options={statusOptions}
                  value={request?.status}
                  onChange={(value) => onStatusUpdate?.(request?.id, value)}
                  className="flex-1"
                />
                <Select
                  label="Update Priority"
                  options={priorityOptions}
                  value={request?.priority}
                  onChange={(value) => onStatusUpdate?.(request?.id, request?.status, value)}
                  className="flex-1"
                />
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-4">
              {request?.photos && request?.photos?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {request?.photos?.map((photo, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={photo?.url}
                        alt={photo?.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-smooth cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Camera" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No photos uploaded</p>
                </div>
              )}
              
              <div className="pt-4 border-t border-border">
                <Button variant="outline" iconName="Upload" iconPosition="left">
                  Upload Additional Photos
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-4">
              {/* Communication History */}
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {request?.communications?.map((comm, index) => (
                  <div key={index} className="flex space-x-3 p-4 bg-muted rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} color="var(--color-primary)" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-foreground">{comm?.sender}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(comm?.timestamp)}</span>
                      </div>
                      <p className="text-sm text-foreground">{comm?.message}</p>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8">
                    <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No communication history</p>
                  </div>
                )}
              </div>

              {/* Add Note */}
              <div className="pt-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a note or update..."
                    value={newNote}
                    onChange={(e) => setNewNote(e?.target?.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddNote} disabled={!newNote?.trim()}>
                    Add Note
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'costs' && (
            <div className="space-y-6">
              {/* Cost Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Estimated Costs</h3>
                  
                  <Input
                    label="Labor Cost"
                    type="number"
                    placeholder="0.00"
                    value={costUpdate?.labor}
                    onChange={(e) => setCostUpdate(prev => ({ ...prev, labor: e?.target?.value }))}
                  />
                  
                  <Input
                    label="Materials Cost"
                    type="number"
                    placeholder="0.00"
                    value={costUpdate?.materials}
                    onChange={(e) => setCostUpdate(prev => ({ ...prev, materials: e?.target?.value }))}
                  />
                  
                  <Input
                    label="Other Expenses"
                    type="number"
                    placeholder="0.00"
                    value={costUpdate?.other}
                    onChange={(e) => setCostUpdate(prev => ({ ...prev, other: e?.target?.value }))}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Cost Summary</h3>
                  
                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Labor:</span>
                      <span className="text-foreground">${costUpdate?.labor || '0.00'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Materials:</span>
                      <span className="text-foreground">${costUpdate?.materials || '0.00'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Other:</span>
                      <span className="text-foreground">${costUpdate?.other || '0.00'}</span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-foreground">Total:</span>
                      <span className="text-foreground">${totalEstimatedCost?.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button onClick={handleUpdateCost} className="w-full">
                    Update Costs
                  </Button>
                </div>
              </div>

              {/* Receipt Upload */}
              <div className="pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Receipts & Documentation</h3>
                <Button variant="outline" iconName="Upload" iconPosition="left">
                  Upload Receipt
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;