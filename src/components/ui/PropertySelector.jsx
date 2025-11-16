import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const PropertySelector = ({ selectedProperty, onPropertyChange, properties = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const mockProperties = [
    { id: 1, name: 'Sunset Apartments', address: '123 Main St, City, State', units: 12, type: 'Apartment Complex' },
    { id: 2, name: 'Oak Street Duplex', address: '456 Oak St, City, State', units: 2, type: 'Duplex' },
    { id: 3, name: 'Downtown Loft', address: '789 Center Ave, City, State', units: 1, type: 'Single Family' },
    { id: 4, name: 'Riverside Condos', address: '321 River Rd, City, State', units: 8, type: 'Condominium' },
    { id: 5, name: 'Garden View Townhomes', address: '654 Garden Ln, City, State', units: 6, type: 'Townhouse' },
  ];

  const allProperties = properties?.length > 0 ? properties : mockProperties;

  const filteredProperties = allProperties?.filter(property =>
    property?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    property?.address?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const currentProperty = selectedProperty || allProperties?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePropertySelect = (property) => {
    onPropertyChange?.(property);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={handleToggle}
        className="w-full md:w-auto min-w-[280px] justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md">
            <Icon name="Building2" size={16} color="var(--color-primary)" />
          </div>
          <div className="text-left">
            <div className="font-medium text-sm text-foreground">{currentProperty?.name}</div>
            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
              {currentProperty?.units} {currentProperty?.units === 1 ? 'unit' : 'units'} • {currentProperty?.type}
            </div>
          </div>
        </div>
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 md:right-auto md:w-96 mt-1 bg-popover border border-border rounded-md shadow-elevation-2 z-50">
          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Properties List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredProperties?.length > 0 ? (
              <div className="py-1">
                {filteredProperties?.map((property) => (
                  <button
                    key={property?.id}
                    onClick={() => handlePropertySelect(property)}
                    className={`w-full px-4 py-3 text-left hover:bg-muted transition-smooth ${
                      currentProperty?.id === property?.id ? 'bg-accent text-accent-foreground' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-md flex-shrink-0">
                        <Icon name="Building2" size={18} color="var(--color-primary)" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-popover-foreground">{property?.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{property?.address}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                            {property?.units} {property?.units === 1 ? 'unit' : 'units'}
                          </span>
                          <span className="text-xs text-muted-foreground">{property?.type}</span>
                        </div>
                      </div>
                      {currentProperty?.id === property?.id && (
                        <Icon name="Check" size={16} color="var(--color-accent)" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <Icon name="Search" size={24} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No properties found</p>
                <p className="text-xs text-muted-foreground mt-1">Try adjusting your search terms</p>
              </div>
            )}
          </div>

          {/* Add Property Option */}
          <div className="border-t border-border p-3">
            <Button
              variant="ghost"
              className="w-full justify-start"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add New Property
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySelector;