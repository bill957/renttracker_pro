import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const NewRequestModal = ({ isOpen, onClose, onSubmitRequest }) => {
  const [formData, setFormData] = useState({
    propertyId: '',
    tenantId: '',
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    photos: []
  });

  const propertyOptions = [
    { value: 'sunset-apartments', label: 'Sunset Apartments' },
    { value: 'oak-street-duplex', label: 'Oak Street Duplex' },
    { value: 'downtown-loft', label: 'Downtown Loft' },
    { value: 'riverside-condos', label: 'Riverside Condos' },
    { value: 'garden-view-townhomes', label: 'Garden View Townhomes' }
  ];

  const tenantOptions = [
    { value: 'john-smith', label: 'John Smith - Unit 2A' },
    { value: 'sarah-johnson', label: 'Sarah Johnson - Unit 1B' },
    { value: 'mike-davis', label: 'Mike Davis - Unit 3C' },
    { value: 'lisa-wilson', label: 'Lisa Wilson - Main Unit' }
  ];

  const categoryOptions = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'appliance', label: 'Appliance' },
    { value: 'structural', label: 'Structural' },
    { value: 'cosmetic', label: 'Cosmetic' },
    { value: 'security', label: 'Security' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'emergency', label: 'Emergency' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const newRequest = {
      id: Date.now(),
      ...formData,
      submittedDate: new Date()?.toISOString(),
      status: 'submitted',
      propertyName: propertyOptions?.find(p => p?.value === formData?.propertyId)?.label || '',
      tenantName: tenantOptions?.find(t => t?.value === formData?.tenantId)?.label?.split(' - ')?.[0] || ''
    };

    onSubmitRequest?.(newRequest);
    onClose();
    
    // Reset form
    setFormData({
      propertyId: '',
      tenantId: '',
      title: '',
      category: '',
      priority: 'medium',
      description: '',
      photos: []
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData?.propertyId && formData?.tenantId && formData?.title && 
                     formData?.category && formData?.description;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Plus" size={20} color="var(--color-primary)" />
            </div>
            <h2 className="text-xl font-bold text-foreground">New Maintenance Request</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-6">
            {/* Property and Tenant Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Property"
                placeholder="Select property"
                options={propertyOptions}
                value={formData?.propertyId}
                onChange={(value) => handleInputChange('propertyId', value)}
                required
              />
              
              <Select
                label="Tenant"
                placeholder="Select tenant"
                options={tenantOptions}
                value={formData?.tenantId}
                onChange={(value) => handleInputChange('tenantId', value)}
                required
              />
            </div>

            {/* Request Details */}
            <Input
              label="Request Title"
              placeholder="Brief description of the issue"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Category"
                placeholder="Select category"
                options={categoryOptions}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
                required
              />
              
              <Select
                label="Priority"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Detailed Description *
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={4}
                placeholder="Provide detailed information about the maintenance issue, including location, symptoms, and any relevant details..."
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                required
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Icon name="Camera" size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload photos to help describe the issue
                </p>
                <Button variant="outline" type="button">
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Priority Guidelines */}
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="Info" size={16} />
                <span>Priority Guidelines</span>
              </h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong className="text-error">Emergency:</strong> Safety hazards, water leaks, no heat/AC</p>
                <p><strong className="text-warning">Urgent:</strong> Major appliance failure, security issues</p>
                <p><strong className="text-secondary">High:</strong> Minor leaks, electrical issues</p>
                <p><strong className="text-foreground">Medium:</strong> Cosmetic repairs, non-essential items</p>
                <p><strong className="text-success">Low:</strong> Routine maintenance, minor cosmetic issues</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-6 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRequestModal;