import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RequestCard = ({ request, onStatusUpdate, onViewDetails, onAssignVendor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'emergency': return 'text-error bg-error/10 border-error/20';
      case 'urgent': return 'text-warning bg-warning/10 border-warning/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'text-primary bg-primary/10 border-primary/20';
      case 'assigned': return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'in-progress': return 'text-warning bg-warning/10 border-warning/20';
      case 'completed': return 'text-success bg-success/10 border-success/20';
      case 'cancelled': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'plumbing': return 'Droplets';
      case 'electrical': return 'Zap';
      case 'hvac': return 'Wind';
      case 'appliance': return 'Microwave';
      case 'structural': return 'Hammer';
      case 'cosmetic': return 'Paintbrush';
      case 'security': return 'Shield';
      default: return 'Wrench';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
            <Icon name={getCategoryIcon(request?.category)} size={24} color="var(--color-primary)" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground truncate">{request?.title}</h3>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(request?.priority)}`}>
                {request?.priority}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
              <span className="flex items-center space-x-1">
                <Icon name="Building2" size={14} />
                <span>{request?.propertyName}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="User" size={14} />
                <span>{request?.tenantName}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{formatDate(request?.submittedDate)}</span>
              </span>
            </div>
            
            <p className="text-sm text-foreground line-clamp-2">{request?.description}</p>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request?.status)}`}>
            {request?.status?.replace('-', ' ')}
          </span>
          <span className="text-xs text-muted-foreground">{getTimeAgo(request?.submittedDate)}</span>
        </div>
      </div>
      {/* Vendor and Cost Info */}
      {(request?.assignedVendor || request?.estimatedCost) && (
        <div className="flex items-center justify-between py-3 border-t border-border mb-4">
          {request?.assignedVendor && (
            <div className="flex items-center space-x-2">
              <Icon name="UserCheck" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-foreground">{request?.assignedVendor}</span>
              <span className="text-xs text-muted-foreground">• {request?.vendorPhone}</span>
            </div>
          )}
          
          {request?.estimatedCost && (
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={16} color="var(--color-warning)" />
              <span className="text-sm font-medium text-foreground">${request?.estimatedCost}</span>
              <span className="text-xs text-muted-foreground">estimated</span>
            </div>
          )}
        </div>
      )}
      {/* Photos */}
      {request?.photos && request?.photos?.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Camera" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-muted-foreground">
              {request?.photos?.length} photo{request?.photos?.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {request?.photos?.slice(0, 3)?.map((photo, index) => (
              <div key={index} className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={photo?.url}
                  alt={photo?.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {request?.photos?.length > 3 && (
              <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  +{request?.photos?.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(request)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
          >
            View Details
          </Button>
          
          {request?.status !== 'completed' && request?.status !== 'cancelled' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAssignVendor?.(request)}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={14}
            >
              {request?.assignedVendor ? 'Change Vendor' : 'Assign Vendor'}
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {request?.status === 'submitted' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStatusUpdate?.(request?.id, 'assigned')}
            >
              Assign
            </Button>
          )}
          
          {request?.status === 'assigned' && (
            <Button
              variant="warning"
              size="sm"
              onClick={() => onStatusUpdate?.(request?.id, 'in-progress')}
            >
              Start Work
            </Button>
          )}
          
          {request?.status === 'in-progress' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onStatusUpdate?.(request?.id, 'completed')}
            >
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;