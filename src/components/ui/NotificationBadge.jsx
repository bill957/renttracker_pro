import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationBadge = ({ notifications = [], onNotificationClick, onMarkAsRead, onMarkAllAsRead }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const mockNotifications = [
    {
      id: 1,
      type: 'payment_overdue',
      title: 'Overdue Payment',
      message: 'Rent payment from John Smith is 5 days overdue',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isRead: false,
      priority: 'high',
      propertyName: 'Sunset Apartments - Unit 2A'
    },
    {
      id: 2,
      type: 'maintenance_urgent',
      title: 'Urgent Maintenance Request',
      message: 'Water leak reported in Unit 1B - requires immediate attention',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      priority: 'urgent',
      propertyName: 'Oak Street Duplex'
    },
    {
      id: 3,
      type: 'lease_expiring',
      title: 'Lease Expiring Soon',
      message: 'Lease for Sarah Johnson expires in 30 days',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      priority: 'medium',
      propertyName: 'Downtown Loft'
    },
    {
      id: 4,
      type: 'payment_received',
      title: 'Payment Received',
      message: 'Rent payment of $1,200 received from Mike Davis',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRead: false,
      priority: 'low',
      propertyName: 'Riverside Condos - Unit 3C'
    },
    {
      id: 5,
      type: 'inspection_due',
      title: 'Inspection Due',
      message: 'Annual inspection scheduled for Garden View Townhomes',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: true,
      priority: 'medium',
      propertyName: 'Garden View Townhomes'
    }
  ];

  const allNotifications = notifications?.length > 0 ? notifications : mockNotifications;
  const unreadCount = allNotifications?.filter(n => !n?.isRead)?.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'payment_overdue': return 'AlertCircle';
      case 'payment_received': return 'DollarSign';
      case 'maintenance_urgent': return 'Wrench';
      case 'lease_expiring': return 'Calendar';
      case 'inspection_due': return 'Eye';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (priority, isRead) => {
    if (isRead) return 'text-muted-foreground';
    
    switch (priority) {
      case 'urgent': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-secondary';
      case 'low': return 'text-success';
      default: return 'text-foreground';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleNotificationClick = (notification) => {
    onNotificationClick?.(notification);
    if (!notification?.isRead) {
      onMarkAsRead?.(notification?.id);
    }
  };

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead?.();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-80 bg-popover border border-border rounded-md shadow-elevation-2 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-sm text-popover-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {allNotifications?.length > 0 ? (
              <div className="py-1">
                {allNotifications?.map((notification) => (
                  <button
                    key={notification?.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full px-4 py-3 text-left hover:bg-muted transition-smooth border-l-4 ${
                      notification?.isRead 
                        ? 'border-l-transparent bg-muted/30' :'border-l-primary bg-primary/5'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 ${getNotificationColor(notification?.priority, notification?.isRead)}`}>
                        <Icon name={getNotificationIcon(notification?.type)} size={16} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-medium text-sm ${
                            notification?.isRead ? 'text-muted-foreground' : 'text-popover-foreground'
                          }`}>
                            {notification?.title}
                          </h4>
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                            getPriorityBadgeColor(notification?.priority)
                          }`}>
                            {notification?.priority}
                          </span>
                        </div>
                        
                        <p className={`text-xs mb-2 ${
                          notification?.isRead ? 'text-muted-foreground' : 'text-popover-foreground'
                        }`}>
                          {notification?.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {notification?.propertyName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification?.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <Icon name="Bell" size={24} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
                <p className="text-xs text-muted-foreground mt-1">You're all caught up!</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {allNotifications?.length > 0 && (
            <div className="border-t border-border p-3">
              <Button
                variant="ghost"
                className="w-full justify-center text-sm"
              >
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBadge;