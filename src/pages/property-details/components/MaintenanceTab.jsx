import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MaintenanceTab = ({ propertyId, onScheduleMaintenance, onUpdateRequest }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const maintenanceRequests = [
  {
    id: 1,
    title: 'Kitchen Sink Leak',
    description: 'Water is leaking from under the kitchen sink. Appears to be coming from the pipe connection.',
    priority: 'high',
    status: 'in-progress',
    category: 'Plumbing',
    unit: 'Unit 2A',
    tenant: 'John Smith',
    tenantPhone: '(555) 123-4567',
    dateReported: '2025-11-12',
    dateScheduled: '2025-11-15',
    estimatedCost: 250,
    actualCost: null,
    vendor: 'ABC Plumbing Services',
    vendorPhone: '(555) 987-6543',
    photos: [
    {
      url: "https://images.unsplash.com/photo-1499589565422-0967cc5fe542",
      alt: 'Water leak under kitchen sink showing damaged pipe connection'
    }],

    notes: 'Tenant reported leak started 3 days ago. Getting worse.'
  },
  {
    id: 2,
    title: 'HVAC System Maintenance',
    description: 'Annual HVAC system inspection and filter replacement scheduled.',
    priority: 'medium',
    status: 'scheduled',
    category: 'HVAC',
    unit: 'Unit 1B',
    tenant: 'Sarah Johnson',
    tenantPhone: '(555) 234-5678',
    dateReported: '2025-11-10',
    dateScheduled: '2025-11-20',
    estimatedCost: 150,
    actualCost: null,
    vendor: 'Climate Control Pro',
    vendorPhone: '(555) 876-5432',
    photos: [],
    notes: 'Routine maintenance - no issues reported.'
  },
  {
    id: 3,
    title: 'Broken Window Lock',
    description: 'Window lock in bedroom is broken and window won\'t stay closed properly.',
    priority: 'medium',
    status: 'pending',
    category: 'Hardware',
    unit: 'Unit 3C',
    tenant: 'Mike Davis',
    tenantPhone: '(555) 345-6789',
    dateReported: '2025-11-14',
    dateScheduled: null,
    estimatedCost: 75,
    actualCost: null,
    vendor: null,
    vendorPhone: null,
    photos: [
    {
      url: "https://images.unsplash.com/photo-1534520912183-8497dc0e46bf",
      alt: 'Bedroom window with broken lock mechanism visible'
    }],

    notes: 'Security concern - needs prompt attention.'
  },
  {
    id: 4,
    title: 'Exterior Paint Touch-up',
    description: 'Front entrance door and trim need paint touch-up due to weather damage.',
    priority: 'low',
    status: 'completed',
    category: 'Painting',
    unit: 'Building Exterior',
    tenant: null,
    tenantPhone: null,
    dateReported: '2025-11-01',
    dateScheduled: '2025-11-08',
    estimatedCost: 200,
    actualCost: 185,
    vendor: 'Perfect Paint Co',
    vendorPhone: '(555) 456-7890',
    photos: [
    {
      url: "https://images.unsplash.com/photo-1559342830-de2e3a059f8a",
      alt: 'Freshly painted front entrance door in dark blue color'
    }],

    notes: 'Work completed on schedule. Looks great!'
  }];


  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':return 'bg-warning text-warning-foreground';
      case 'scheduled':return 'bg-secondary text-secondary-foreground';
      case 'in-progress':return 'bg-primary text-primary-foreground';
      case 'completed':return 'bg-success text-success-foreground';
      case 'cancelled':return 'bg-muted text-muted-foreground';
      default:return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':return 'text-error';
      case 'medium':return 'text-warning';
      case 'low':return 'text-success';
      default:return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':return 'AlertCircle';
      case 'medium':return 'AlertTriangle';
      case 'low':return 'Info';
      default:return 'Info';
    }
  };

  const filteredRequests = maintenanceRequests?.filter((request) => {
    if (activeFilter === 'all') return true;
    return request?.status === activeFilter;
  });

  const statusCounts = {
    all: maintenanceRequests?.length,
    pending: maintenanceRequests?.filter((r) => r?.status === 'pending')?.length,
    scheduled: maintenanceRequests?.filter((r) => r?.status === 'scheduled')?.length,
    'in-progress': maintenanceRequests?.filter((r) => r?.status === 'in-progress')?.length,
    completed: maintenanceRequests?.filter((r) => r?.status === 'completed')?.length
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {Object.entries(statusCounts)?.map(([status, count]) =>
          <button
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap transition-smooth ${
            activeFilter === status ?
            'bg-primary text-primary-foreground' :
            'text-muted-foreground hover:text-foreground hover:bg-muted'}`
            }>

              {status?.charAt(0)?.toUpperCase() + status?.slice(1)?.replace('-', ' ')} ({count})
            </button>
          )}
        </div>

        <Button onClick={onScheduleMaintenance} iconName="Plus" iconPosition="left">
          Schedule Maintenance
        </Button>
      </div>
      {/* Maintenance Requests List */}
      <div className="space-y-4">
        {filteredRequests?.length > 0 ?
        filteredRequests?.map((request) =>
        <div key={request?.id} className="bg-card border border-border rounded-lg p-6">
              {/* Request Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              request?.priority === 'high' ? 'bg-error/10' :
              request?.priority === 'medium' ? 'bg-warning/10' : 'bg-success/10'}`
              }>
                    <Icon
                  name={getPriorityIcon(request?.priority)}
                  size={20}
                  className={getPriorityColor(request?.priority)} />

                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground">{request?.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request?.status)}`}>
                        {request?.status?.replace('-', ' ')}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{request?.category}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{request?.unit}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onUpdateRequest(request)} iconName="Edit">
                    Update
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
              </div>

              {/* Request Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <p className="text-sm text-foreground mt-1">{request?.description}</p>
                  </div>

                  {request?.notes &&
              <div>
                      <label className="text-sm font-medium text-muted-foreground">Notes</label>
                      <p className="text-sm text-foreground mt-1">{request?.notes}</p>
                    </div>
              }

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Date Reported</label>
                      <p className="text-sm text-foreground">{new Date(request.dateReported)?.toLocaleDateString()}</p>
                    </div>
                    {request?.dateScheduled &&
                <div>
                        <label className="text-sm font-medium text-muted-foreground">Date Scheduled</label>
                        <p className="text-sm text-foreground">{new Date(request.dateScheduled)?.toLocaleDateString()}</p>
                      </div>
                }
                  </div>

                  {request?.tenant &&
              <div>
                      <label className="text-sm font-medium text-muted-foreground">Tenant Contact</label>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-foreground">{request?.tenant}</p>
                        <div className="flex items-center space-x-2">
                          <Icon name="Phone" size={14} className="text-muted-foreground" />
                          <span className="text-sm text-foreground">{request?.tenantPhone}</span>
                        </div>
                      </div>
                    </div>
              }
                </div>

                <div className="space-y-4">
                  {request?.vendor &&
              <div>
                      <label className="text-sm font-medium text-muted-foreground">Vendor</label>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-foreground">{request?.vendor}</p>
                        <div className="flex items-center space-x-2">
                          <Icon name="Phone" size={14} className="text-muted-foreground" />
                          <span className="text-sm text-foreground">{request?.vendorPhone}</span>
                        </div>
                      </div>
                    </div>
              }

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Estimated Cost</label>
                      <p className="text-sm font-medium text-foreground">${request?.estimatedCost}</p>
                    </div>
                    {request?.actualCost &&
                <div>
                        <label className="text-sm font-medium text-muted-foreground">Actual Cost</label>
                        <p className="text-sm font-medium text-foreground">${request?.actualCost}</p>
                      </div>
                }
                  </div>

                  {/* Photos */}
                  {request?.photos?.length > 0 &&
              <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">Photos</label>
                      <div className="flex space-x-2">
                        {request?.photos?.map((photo, index) =>
                  <div key={index} className="w-16 h-16 rounded-md overflow-hidden border border-border">
                            <Image
                      src={photo?.url}
                      alt={photo?.alt}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-smooth" />

                          </div>
                  )}
                      </div>
                    </div>
              }
                </div>
              </div>

              {/* Action Buttons */}
              {request?.status !== 'completed' &&
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    {request?.tenant &&
              <Button variant="outline" size="sm" iconName="MessageSquare">
                        Contact Tenant
                      </Button>
              }
                    {request?.vendor &&
              <Button variant="outline" size="sm" iconName="Phone">
                        Call Vendor
                      </Button>
              }
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {request?.status === 'pending' &&
              <Button variant="secondary" size="sm">
                        Schedule
                      </Button>
              }
                    {request?.status === 'scheduled' &&
              <Button variant="primary" size="sm">
                        Start Work
                      </Button>
              }
                    {request?.status === 'in-progress' &&
              <Button variant="success" size="sm">
                        Mark Complete
                      </Button>
              }
                  </div>
                </div>
          }
            </div>
        ) :

        <div className="text-center py-12 bg-card rounded-lg border border-border">
            <Icon name="Wrench" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No {activeFilter !== 'all' ? activeFilter?.replace('-', ' ') : ''} maintenance requests
            </h3>
            <p className="text-muted-foreground mb-4">
              {activeFilter === 'all' ? 'Schedule maintenance tasks to keep your property in great condition' :
            `No maintenance requests with ${activeFilter?.replace('-', ' ')} status`
            }
            </p>
            {activeFilter === 'all' &&
          <Button onClick={onScheduleMaintenance} iconName="Plus" iconPosition="left">
                Schedule First Maintenance
              </Button>
          }
          </div>
        }
      </div>
      {/* Maintenance Summary */}
      {filteredRequests?.length > 0 &&
      <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Maintenance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{statusCounts?.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">{statusCounts?.scheduled}</p>
              <p className="text-sm text-muted-foreground">Scheduled</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{statusCounts?.['in-progress']}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{statusCounts?.completed}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default MaintenanceTab;