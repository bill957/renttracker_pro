import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onNotificationAction }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'payment_overdue': return 'AlertCircle';
      case 'lease_expiring': return 'Calendar';
      case 'maintenance_urgent': return 'Wrench';
      case 'inspection_due': return 'Eye';
      case 'document_expiring': return 'FileText';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-error bg-error/5';
      case 'high': return 'border-l-warning bg-warning/5';
      case 'medium': return 'border-l-secondary bg-secondary/5';
      default: return 'border-l-primary bg-primary/5';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Urgent Notifications</h3>
          <Link to="/notifications" className="text-sm text-primary hover:text-primary/80 transition-smooth">
            View All
          </Link>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications?.length > 0 ? (
          <div className="divide-y divide-border">
            {notifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 border-l-4 ${getNotificationColor(notification?.priority)} hover:bg-muted/50 transition-smooth`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon 
                      name={getNotificationIcon(notification?.type)} 
                      size={16} 
                      className={
                        notification?.priority === 'urgent' ? 'text-error' :
                        notification?.priority === 'high'? 'text-warning' : 'text-muted-foreground'
                      }
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {notification?.title}
                      </h4>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${getPriorityBadge(notification?.priority)}`}>
                        {notification?.priority}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {notification?.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {notification?.propertyName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(notification?.timestamp)}
                      </span>
                    </div>

                    {notification?.actionRequired && (
                      <div className="mt-3 flex space-x-2">
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => onNotificationAction(notification?.id, 'primary')}
                        >
                          {notification?.primaryAction || 'Take Action'}
                        </Button>
                        {notification?.secondaryAction && (
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => onNotificationAction(notification?.id, 'secondary')}
                          >
                            {notification?.secondaryAction}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={32} className="mx-auto text-success mb-3" />
            <h4 className="text-sm font-medium text-foreground mb-1">All Caught Up!</h4>
            <p className="text-xs text-muted-foreground">No urgent notifications at this time.</p>
          </div>
        )}
      </div>
      {notifications?.length > 3 && (
        <div className="p-3 border-t border-border">
          <Button variant="ghost" className="w-full justify-center text-sm">
            <Icon name="ChevronDown" size={16} className="mr-2" />
            Show More Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;