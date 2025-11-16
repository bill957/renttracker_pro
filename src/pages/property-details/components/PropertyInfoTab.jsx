import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyInfoTab = ({ property, onEdit }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const propertyImages = [
  {
    url: "https://images.unsplash.com/photo-1701005444190-9638e881b6ce",
    alt: "Modern two-story apartment building with brick facade and large windows"
  },
  {
    url: "https://images.unsplash.com/photo-1721044170058-1dc0e90bcec4",
    alt: "Spacious living room with hardwood floors and natural lighting"
  },
  {
    url: "https://images.unsplash.com/photo-1609766856923-7e0a0c06584d",
    alt: "Contemporary kitchen with granite countertops and stainless steel appliances"
  },
  {
    url: "https://images.unsplash.com/photo-1664538922512-127ff7e30aef",
    alt: "Master bedroom with queen bed and large windows overlooking garden"
  }];


  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages?.length) % propertyImages?.length);
  };

  return (
    <div className="space-y-6">
      {/* Property Images Gallery */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="relative h-80 bg-muted">
          <Image
            src={propertyImages?.[currentImageIndex]?.url}
            alt={propertyImages?.[currentImageIndex]?.alt}
            className="w-full h-full object-cover" />

          
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10">

            <Icon name="ChevronLeft" size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10">

            <Icon name="ChevronRight" size={20} />
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
            {currentImageIndex + 1} / {propertyImages?.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="p-4 flex space-x-2 overflow-x-auto">
          {propertyImages?.map((image, index) =>
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-smooth ${
            index === currentImageIndex ? 'border-primary' : 'border-border'}`
            }>

              <Image
              src={image?.url}
              alt={image?.alt}
              className="w-full h-full object-cover" />

            </button>
          )}
        </div>
      </div>
      {/* Property Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Property Information</h3>
            <Button variant="outline" size="sm" onClick={onEdit} iconName="Edit" iconPosition="left">
              Edit
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Property Name</label>
              <p className="text-foreground font-medium">{property?.name}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Address</label>
              <p className="text-foreground">{property?.address}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Property Type</label>
                <p className="text-foreground">{property?.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Total Units</label>
                <p className="text-foreground">{property?.units}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Year Built</label>
                <p className="text-foreground">{property?.yearBuilt}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Square Footage</label>
                <p className="text-foreground">{property?.squareFootage?.toLocaleString()} sq ft</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-foreground text-sm leading-relaxed">{property?.description}</p>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Financial Details</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Purchase Price</label>
                <p className="text-foreground font-medium">${property?.purchasePrice?.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Current Market Value</label>
                <p className="text-foreground font-medium">${property?.currentValue?.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Monthly Rent</label>
                <p className="text-success font-medium">${property?.monthlyRent?.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Annual Income</label>
                <p className="text-success font-medium">${(property?.monthlyRent * 12)?.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Purchase Date</label>
              <p className="text-foreground">{new Date(property.purchaseDate)?.toLocaleDateString()}</p>
            </div>

            {/* ROI Calculation */}
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Annual ROI</span>
                <span className="text-lg font-bold text-success">
                  {(property?.monthlyRent * 12 / property?.purchasePrice * 100)?.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Property Features */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Property Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-2">Interior Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {property?.features?.interior?.map((feature, index) =>
              <li key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span>{feature}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Exterior Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {property?.features?.exterior?.map((feature, index) =>
              <li key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span>{feature}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Amenities</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {property?.features?.amenities?.map((feature, index) =>
              <li key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span>{feature}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* Location Map */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Location</h3>
        <div className="h-64 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={property?.name}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${property?.coordinates?.lat},${property?.coordinates?.lng}&z=14&output=embed`}
            className="border-0" />

        </div>
      </div>
    </div>);

};

export default PropertyInfoTab;