import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReminderModal = ({ isOpen, onClose, tenant, onSendReminder }) => {
  const [reminderData, setReminderData] = useState({
    type: 'email',
    template: 'friendly_reminder',
    includeLateFee: true,
    scheduledDate: new Date()?.toISOString()?.split('T')?.[0],
    customMessage: ''
  });

  const reminderTypes = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS Text' },
    { value: 'phone_call', label: 'Phone Call' },
    { value: 'letter', label: 'Physical Letter' }
  ];

  const templateOptions = [
    { value: 'friendly_reminder', label: 'Friendly Reminder' },
    { value: 'formal_notice', label: 'Formal Notice' },
    { value: 'final_notice', label: 'Final Notice' },
    { value: 'custom', label: 'Custom Message' }
  ];

  const getTemplatePreview = () => {
    const templates = {
      friendly_reminder: `Hi ${tenant?.name},\n\nThis is a friendly reminder that your rent payment of $${tenant?.rentAmount} was due on ${new Date(tenant?.dueDate)?.toLocaleDateString()}. Please submit your payment at your earliest convenience.\n\nIf you have any questions or concerns, please don't hesitate to reach out.\n\nThank you!`,
      formal_notice: `Dear ${tenant?.name},\n\nThis is a formal notice that your rent payment of $${tenant?.rentAmount} for ${tenant?.propertyAddress} is now overdue. Payment was due on ${new Date(tenant?.dueDate)?.toLocaleDateString()}.\n\nPlease remit payment immediately to avoid additional late fees and potential legal action.\n\nSincerely,\nProperty Management`,
      final_notice: `FINAL NOTICE\n\nDear ${tenant?.name},\n\nThis is your final notice regarding the overdue rent payment of $${tenant?.rentAmount} for ${tenant?.propertyAddress}. Payment was due on ${new Date(tenant?.dueDate)?.toLocaleDateString()}.\n\nFailure to pay within 3 business days may result in eviction proceedings.\n\nContact us immediately to resolve this matter.`,
      custom: reminderData?.customMessage
    };
    
    return templates?.[reminderData?.template] || '';
  };

  const handleInputChange = (field, value) => {
    setReminderData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSend = () => {
    const reminder = {
      ...reminderData,
      tenantId: tenant?.id,
      message: getTemplatePreview(),
      sentDate: new Date()?.toISOString()
    };
    
    onSendReminder(reminder);
    onClose();
    
    // Reset form
    setReminderData({
      type: 'email',
      template: 'friendly_reminder',
      includeLateFee: true,
      scheduledDate: new Date()?.toISOString()?.split('T')?.[0],
      customMessage: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">Send Payment Reminder</h2>
            <p className="text-sm text-muted-foreground">{tenant?.name} - {tenant?.propertyAddress}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Reminder Type and Template */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Reminder Type"
              options={reminderTypes}
              value={reminderData?.type}
              onChange={(value) => handleInputChange('type', value)}
              required
            />

            <Select
              label="Message Template"
              options={templateOptions}
              value={reminderData?.template}
              onChange={(value) => handleInputChange('template', value)}
              required
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <Checkbox
              label="Include late fee information"
              checked={reminderData?.includeLateFee}
              onChange={(e) => handleInputChange('includeLateFee', e?.target?.checked)}
            />

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Send Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                value={reminderData?.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e?.target?.value)}
              />
            </div>
          </div>

          {/* Custom Message */}
          {reminderData?.template === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Custom Message
              </label>
              <textarea
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={6}
                placeholder="Enter your custom reminder message..."
                value={reminderData?.customMessage}
                onChange={(e) => handleInputChange('customMessage', e?.target?.value)}
              />
            </div>
          )}

          {/* Message Preview */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Message Preview
            </label>
            <div className="bg-muted border border-border rounded-lg p-4">
              <pre className="text-sm text-card-foreground whitespace-pre-wrap font-sans">
                {getTemplatePreview()}
              </pre>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-background border border-border rounded-lg p-4">
            <h4 className="font-medium text-sm text-card-foreground mb-2">Contact Information</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} />
                <span>{tenant?.email || 'john.smith@email.com'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} />
                <span>{tenant?.phone || '(555) 123-4567'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSend}
            className="flex-1"
            iconName="Send"
            iconPosition="left"
            iconSize={16}
          >
            {reminderData?.scheduledDate === new Date()?.toISOString()?.split('T')?.[0] ? 'Send Now' : 'Schedule'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;