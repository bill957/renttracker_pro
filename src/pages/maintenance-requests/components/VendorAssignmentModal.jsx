import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const VendorAssignmentModal = ({ request, isOpen, onClose, onAssignVendor }) => {
  const [selectedVendor, setSelectedVendor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: '',
    phone: '',
    email: '',
    specialty: '',
    hourlyRate: ''
  });

  const mockVendors = [
  {
    id: 1,
    name: "Mike\'s Plumbing Services",
    phone: "(555) 123-4567",
    email: "mike@mikesplumbing.com",
    specialty: "plumbing",
    hourlyRate: 85,
    rating: 4.8,
    completedJobs: 127,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1771bf846-1762249172042.png",
    avatarAlt: "Professional headshot of middle-aged man with gray beard wearing blue work shirt",
    availability: "available",
    lastJob: "2 days ago"
  },
  {
    id: 2,
    name: "Elite Electrical Solutions",
    phone: "(555) 234-5678",
    email: "contact@eliteelectrical.com",
    specialty: "electrical",
    hourlyRate: 95,
    rating: 4.9,
    completedJobs: 89,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1317d15a2-1762273600976.png",
    avatarAlt: "Professional headshot of young man with short brown hair in navy polo shirt",
    availability: "busy",
    lastJob: "1 week ago"
  },
  {
    id: 3,
    name: "HVAC Pro Services",
    phone: "(555) 345-6789",
    email: "service@hvacpro.com",
    specialty: "hvac",
    hourlyRate: 90,
    rating: 4.7,
    completedJobs: 156,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16c00edb6-1762273819174.png",
    avatarAlt: "Professional headshot of Hispanic man with mustache wearing white work uniform",
    availability: "available",
    lastJob: "5 days ago"
  },
  {
    id: 4,
    name: "Handyman Heroes",
    phone: "(555) 456-7890",
    email: "help@handymanheroes.com",
    specialty: "general",
    hourlyRate: 65,
    rating: 4.6,
    completedJobs: 203,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1887ed5bb-1762274637489.png",
    avatarAlt: "Professional headshot of African American man with short hair wearing gray work shirt",
    availability: "available",
    lastJob: "1 day ago"
  }];


  const specialtyOptions = [
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'appliance', label: 'Appliance Repair' },
  { value: 'structural', label: 'Structural' },
  { value: 'cosmetic', label: 'Cosmetic' },
  { value: 'general', label: 'General Maintenance' }];


  if (!isOpen || !request) return null;

  const filteredVendors = mockVendors?.filter((vendor) => {
    const matchesSearch = vendor?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    vendor?.specialty?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = !request?.category ||
    vendor?.specialty === request?.category ||
    vendor?.specialty === 'general';
    return matchesSearch && matchesCategory;
  });

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available':return 'text-success bg-success/10';
      case 'busy':return 'text-warning bg-warning/10';
      case 'unavailable':return 'text-error bg-error/10';
      default:return 'text-muted-foreground bg-muted';
    }
  };

  const handleAssignVendor = () => {
    const vendor = mockVendors?.find((v) => v?.id === parseInt(selectedVendor));
    if (vendor) {
      onAssignVendor?.(request?.id, vendor);
      onClose();
    }
  };

  const handleAddNewVendor = () => {
    // In a real app, this would make an API call
    const vendor = {
      id: Date.now(),
      ...newVendor,
      hourlyRate: parseFloat(newVendor?.hourlyRate),
      rating: 0,
      completedJobs: 0,
      availability: 'available',
      lastJob: 'Never'
    };

    onAssignVendor?.(request?.id, vendor);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Assign Vendor</h2>
            <p className="text-sm text-muted-foreground">
              {request?.title} - {request?.propertyName}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showAddVendor ?
          <>
              {/* Search */}
              <div className="mb-6">
                <Input
                type="search"
                placeholder="Search vendors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)} />

              </div>

              {/* Vendor List */}
              <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                {filteredVendors?.map((vendor) =>
              <div
                key={vendor?.id}
                className={`p-4 border rounded-lg cursor-pointer transition-smooth ${
                selectedVendor === vendor?.id?.toString() ?
                'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`
                }
                onClick={() => setSelectedVendor(vendor?.id?.toString())}>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                      src={vendor?.avatar}
                      alt={vendor?.avatarAlt}
                      className="w-full h-full object-cover" />

                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{vendor?.name}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(vendor?.availability)}`}>
                            {vendor?.availability}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Specialty:</span>
                            <span className="ml-1 text-foreground capitalize">{vendor?.specialty}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Rate:</span>
                            <span className="ml-1 text-foreground">${vendor?.hourlyRate}/hr</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Rating:</span>
                            <span className="ml-1 text-foreground">{vendor?.rating}/5 ⭐</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Jobs:</span>
                            <span className="ml-1 text-foreground">{vendor?.completedJobs}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>{vendor?.phone}</span>
                          <span>Last job: {vendor?.lastJob}</span>
                        </div>
                      </div>
                      
                      {selectedVendor === vendor?.id?.toString() &&
                  <Icon name="Check" size={20} color="var(--color-primary)" />
                  }
                    </div>
                  </div>
              )}
                
                {filteredVendors?.length === 0 &&
              <div className="text-center py-8">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No vendors found</p>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your search terms</p>
                  </div>
              }
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Button
                variant="outline"
                onClick={() => setShowAddVendor(true)}
                iconName="Plus"
                iconPosition="left">

                  Add New Vendor
                </Button>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                  onClick={handleAssignVendor}
                  disabled={!selectedVendor}>

                    Assign Vendor
                  </Button>
                </div>
              </div>
            </> : (

          /* Add New Vendor Form */
          <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddVendor(false)}>

                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <h3 className="text-lg font-semibold text-foreground">Add New Vendor</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                label="Vendor Name"
                placeholder="Enter vendor name"
                value={newVendor?.name}
                onChange={(e) => setNewVendor((prev) => ({ ...prev, name: e?.target?.value }))}
                required />

                
                <Input
                label="Phone Number"
                type="tel"
                placeholder="(555) 123-4567"
                value={newVendor?.phone}
                onChange={(e) => setNewVendor((prev) => ({ ...prev, phone: e?.target?.value }))}
                required />

                
                <Input
                label="Email Address"
                type="email"
                placeholder="vendor@example.com"
                value={newVendor?.email}
                onChange={(e) => setNewVendor((prev) => ({ ...prev, email: e?.target?.value }))} />

                
                <Select
                label="Specialty"
                placeholder="Select specialty"
                options={specialtyOptions}
                value={newVendor?.specialty}
                onChange={(value) => setNewVendor((prev) => ({ ...prev, specialty: value }))}
                required />

                
                <Input
                label="Hourly Rate"
                type="number"
                placeholder="0.00"
                value={newVendor?.hourlyRate}
                onChange={(e) => setNewVendor((prev) => ({ ...prev, hourlyRate: e?.target?.value }))} />

              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t border-border">
                <Button variant="ghost" onClick={() => setShowAddVendor(false)}>
                  Cancel
                </Button>
                <Button
                onClick={handleAddNewVendor}
                disabled={!newVendor?.name || !newVendor?.phone || !newVendor?.specialty}>

                  Add & Assign Vendor
                </Button>
              </div>
            </div>)
          }
        </div>
      </div>
    </div>);

};

export default VendorAssignmentModal;