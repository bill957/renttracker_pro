import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RequestFilters from './components/RequestFilters';
import RequestCard from './components/RequestCard';
import RequestDetailsModal from './components/RequestDetailsModal';
import VendorAssignmentModal from './components/VendorAssignmentModal';
import RequestStats from './components/RequestStats';
import NewRequestModal from './components/NewRequestModal';

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Mock data
  const mockRequests = [
  {
    id: 1,
    title: "Kitchen Faucet Leaking",
    description: "The kitchen faucet has been dripping constantly for the past 3 days. Water is pooling under the sink and may cause damage to the cabinet if not fixed soon.",
    category: "plumbing",
    priority: "high",
    status: "submitted",
    propertyName: "Sunset Apartments",
    propertyAddress: "123 Main St, Unit 2A",
    tenantName: "John Smith",
    tenantPhone: "(555) 123-4567",
    submittedDate: "2025-11-13T10:30:00Z",
    assignedVendor: null,
    vendorPhone: null,
    estimatedCost: null,
    actualCost: null,
    photos: [
    {
      url: "https://images.unsplash.com/photo-1540292035538-f8ac592e4a2a",
      alt: "Close-up of dripping kitchen faucet with water droplets visible on chrome surface"
    },
    {
      url: "https://images.unsplash.com/photo-1662454379588-65fdd25622d0",
      alt: "Water damage under kitchen sink showing wet cabinet floor and pooled water"
    }],

    communications: [
    {
      sender: "John Smith",
      message: "The leak is getting worse. Please send someone as soon as possible.",
      timestamp: "2025-11-13T14:20:00Z"
    }]

  },
  {
    id: 2,
    title: "Electrical Outlet Not Working",
    description: "The outlet in the living room stopped working yesterday. I\'ve tried resetting the breaker but it\'s still not functioning. Need this fixed for my home office setup.",
    category: "electrical",
    priority: "medium",
    status: "assigned",
    propertyName: "Oak Street Duplex",
    propertyAddress: "456 Oak St, Unit B",
    tenantName: "Sarah Johnson",
    tenantPhone: "(555) 234-5678",
    submittedDate: "2025-11-12T16:45:00Z",
    assignedVendor: "Elite Electrical Solutions",
    vendorPhone: "(555) 234-5678",
    estimatedCost: 150,
    actualCost: null,
    photos: [
    {
      url: "https://images.unsplash.com/photo-1600734278989-3ff19ce3db56",
      alt: "Non-functioning electrical outlet on white wall with testing device plugged in"
    }],

    communications: [
    {
      sender: "Property Manager",
      message: "Electrician has been assigned and will contact you within 24 hours.",
      timestamp: "2025-11-12T18:00:00Z"
    }]

  },
  {
    id: 3,
    title: "HVAC System Making Loud Noise",
    description: "The heating system has been making a loud grinding noise when it turns on. It's very disruptive, especially at night. The system is still heating but the noise is concerning.",
    category: "hvac",
    priority: "urgent",
    status: "in-progress",
    propertyName: "Downtown Loft",
    propertyAddress: "789 Center Ave",
    tenantName: "Mike Davis",
    tenantPhone: "(555) 345-6789",
    submittedDate: "2025-11-11T09:15:00Z",
    assignedVendor: "HVAC Pro Services",
    vendorPhone: "(555) 345-6789",
    estimatedCost: 300,
    actualCost: {
      labor: 200,
      materials: 85,
      other: 15,
      total: 300
    },
    photos: [
    {
      url: "https://images.unsplash.com/photo-1629281066736-ff3a1e6b36d8",
      alt: "HVAC unit with visible wear and maintenance tools nearby during repair work"
    }],

    communications: [
    {
      sender: "HVAC Pro Services",
      message: "Found the issue - fan bearing needs replacement. Will complete today.",
      timestamp: "2025-11-14T11:30:00Z"
    }]

  },
  {
    id: 4,
    title: "Dishwasher Not Draining",
    description: "The dishwasher is not draining properly. Water remains at the bottom after each cycle. I\'ve cleaned the filter but the problem persists.",
    category: "appliance",
    priority: "medium",
    status: "completed",
    propertyName: "Riverside Condos",
    propertyAddress: "321 River Rd, Unit 3C",
    tenantName: "Lisa Wilson",
    tenantPhone: "(555) 456-7890",
    submittedDate: "2025-11-09T13:20:00Z",
    completedDate: "2025-11-10T15:45:00Z",
    assignedVendor: "Handyman Heroes",
    vendorPhone: "(555) 456-7890",
    estimatedCost: 120,
    actualCost: {
      labor: 80,
      materials: 25,
      other: 0,
      total: 105
    },
    photos: [
    {
      url: "https://images.unsplash.com/photo-1699373116475-08a0740c2252",
      alt: "Open dishwasher showing standing water at bottom with dishes still inside"
    }],

    communications: [
    {
      sender: "Handyman Heroes",
      message: "Drain hose was clogged. Cleared blockage and tested - working perfectly now.",
      timestamp: "2025-11-10T15:45:00Z"
    }]

  },
  {
    id: 5,
    title: "Emergency: No Hot Water",
    description: "Water heater completely stopped working this morning. No hot water throughout the unit. This is urgent as we have small children and need hot water for basic needs.",
    category: "plumbing",
    priority: "emergency",
    status: "assigned",
    propertyName: "Garden View Townhomes",
    propertyAddress: "654 Garden Ln, Unit 2",
    tenantName: "Maria Rodriguez",
    tenantPhone: "(555) 567-8901",
    submittedDate: "2025-11-15T07:30:00Z",
    assignedVendor: "Mike\'s Plumbing Services",
    vendorPhone: "(555) 123-4567",
    estimatedCost: 400,
    actualCost: null,
    photos: [
    {
      url: "https://images.unsplash.com/photo-1696433118164-9f2bcfe10c27",
      alt: "Water heater unit with error display showing malfunction indicator lights"
    }],

    communications: [
    {
      sender: "Property Manager",
      message: "Emergency plumber dispatched. ETA 2 hours. Temporary accommodation available if needed.",
      timestamp: "2025-11-15T08:00:00Z"
    }]

  },
  {
    id: 6,
    title: "Bathroom Tile Repair",
    description: "Several tiles in the bathroom shower are loose and one has fallen off. Water may be getting behind the tiles causing potential damage.",
    category: "cosmetic",
    priority: "low",
    status: "submitted",
    propertyName: "Sunset Apartments",
    propertyAddress: "123 Main St, Unit 1A",
    tenantName: "David Chen",
    tenantPhone: "(555) 678-9012",
    submittedDate: "2025-11-14T19:45:00Z",
    assignedVendor: null,
    vendorPhone: null,
    estimatedCost: null,
    actualCost: null,
    photos: [
    {
      url: "https://images.unsplash.com/photo-1604833203048-22e2fc589d0e",
      alt: "Bathroom shower wall with missing and loose ceramic tiles exposing wall underneath"
    }],

    communications: []
  }];


  useEffect(() => {
    setRequests(mockRequests);
    setFilteredRequests(mockRequests);
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...requests];

    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter((request) =>
      request?.title?.toLowerCase()?.includes(searchTerm) ||
      request?.description?.toLowerCase()?.includes(searchTerm) ||
      request?.tenantName?.toLowerCase()?.includes(searchTerm) ||
      request?.propertyName?.toLowerCase()?.includes(searchTerm) ||
      request?.assignedVendor && request?.assignedVendor?.toLowerCase()?.includes(searchTerm)
      );
    }

    if (filters?.property) {
      filtered = filtered?.filter((request) =>
      request?.propertyName?.toLowerCase()?.includes(filters?.property?.toLowerCase())
      );
    }

    if (filters?.priority) {
      filtered = filtered?.filter((request) => request?.priority === filters?.priority);
    }

    if (filters?.status) {
      filtered = filtered?.filter((request) => request?.status === filters?.status);
    }

    if (filters?.category) {
      filtered = filtered?.filter((request) => request?.category === filters?.category);
    }

    setFilteredRequests(filtered);
  };

  const handleStatusUpdate = (requestId, newStatus, newPriority = null) => {
    setRequests((prev) => prev?.map((request) => {
      if (request?.id === requestId) {
        const updates = { status: newStatus };
        if (newPriority) updates.priority = newPriority;
        if (newStatus === 'completed') updates.completedDate = new Date()?.toISOString();
        return { ...request, ...updates };
      }
      return request;
    }));

    setFilteredRequests((prev) => prev?.map((request) => {
      if (request?.id === requestId) {
        const updates = { status: newStatus };
        if (newPriority) updates.priority = newPriority;
        if (newStatus === 'completed') updates.completedDate = new Date()?.toISOString();
        return { ...request, ...updates };
      }
      return request;
    }));
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleAssignVendor = (request) => {
    setSelectedRequest(request);
    setShowVendorModal(true);
  };

  const handleVendorAssignment = (requestId, vendor) => {
    setRequests((prev) => prev?.map((request) => {
      if (request?.id === requestId) {
        return {
          ...request,
          assignedVendor: vendor?.name,
          vendorPhone: vendor?.phone,
          status: 'assigned'
        };
      }
      return request;
    }));

    setFilteredRequests((prev) => prev?.map((request) => {
      if (request?.id === requestId) {
        return {
          ...request,
          assignedVendor: vendor?.name,
          vendorPhone: vendor?.phone,
          status: 'assigned'
        };
      }
      return request;
    }));
  };

  const handleAddNote = (requestId, note) => {
    const newCommunication = {
      sender: "Property Manager",
      message: note,
      timestamp: new Date()?.toISOString()
    };

    setRequests((prev) => prev?.map((request) => {
      if (request?.id === requestId) {
        return {
          ...request,
          communications: [...(request?.communications || []), newCommunication]
        };
      }
      return request;
    }));
  };

  const handleUpdateCost = (requestId, costData) => {
    setRequests((prev) => prev?.map((request) => {
      if (request?.id === requestId) {
        return {
          ...request,
          actualCost: costData
        };
      }
      return request;
    }));
  };

  const handleSubmitRequest = (newRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
    setFilteredRequests((prev) => [newRequest, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Maintenance Requests</h1>
              <p className="text-muted-foreground">
                Manage and track property maintenance requests from submission to completion
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  iconName="Grid3X3"
                  iconSize={16} />

                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  iconName="List"
                  iconSize={16} />

              </div>
              
              <Button
                onClick={() => setShowNewRequestModal(true)}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}>

                New Request
              </Button>
            </div>
          </div>

          {/* Stats */}
          <RequestStats requests={requests} />

          {/* Filters */}
          <RequestFilters
            onFiltersChange={handleFiltersChange}
            totalRequests={filteredRequests?.length} />


          {/* Requests Grid/List */}
          {filteredRequests?.length > 0 ?
          <div className={viewMode === 'grid' ?
          "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"
          }>
              {filteredRequests?.map((request) =>
            <RequestCard
              key={request?.id}
              request={request}
              onStatusUpdate={handleStatusUpdate}
              onViewDetails={handleViewDetails}
              onAssignVendor={handleAssignVendor} />

            )}
            </div> :

          <div className="text-center py-12">
              <Icon name="Wrench" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Maintenance Requests</h3>
              <p className="text-muted-foreground mb-6">
                No requests match your current filters. Try adjusting your search criteria.
              </p>
              <Button
              onClick={() => setShowNewRequestModal(true)}
              iconName="Plus"
              iconPosition="left">

                Create New Request
              </Button>
            </div>
          }
        </div>
      </main>
      {/* Modals */}
      <RequestDetailsModal
        request={selectedRequest}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onStatusUpdate={handleStatusUpdate}
        onAddNote={handleAddNote}
        onUpdateCost={handleUpdateCost} />

      <VendorAssignmentModal
        request={selectedRequest}
        isOpen={showVendorModal}
        onClose={() => setShowVendorModal(false)}
        onAssignVendor={handleVendorAssignment} />

      <NewRequestModal
        isOpen={showNewRequestModal}
        onClose={() => setShowNewRequestModal(false)}
        onSubmitRequest={handleSubmitRequest} />

    </div>);

};

export default MaintenanceRequests;