import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentsTab = ({ propertyId, onUploadDocument, onDownloadDocument, onDeleteDocument }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dragOver, setDragOver] = useState(false);

  const documents = [
    {
      id: 1,
      name: 'Lease Agreement - Unit 2A - John Smith.pdf',
      category: 'leases',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-11-01',
      tenant: 'John Smith',
      unit: 'Unit 2A',
      description: 'Current lease agreement for Unit 2A'
    },
    {
      id: 2,
      name: 'Property Insurance Policy 2025.pdf',
      category: 'insurance',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2025-10-15',
      tenant: null,
      unit: null,
      description: 'Annual property insurance policy document'
    },
    {
      id: 3,
      name: 'HVAC Maintenance Receipt - Nov 2025.jpg',
      category: 'receipts',
      type: 'image',
      size: '856 KB',
      uploadDate: '2025-11-10',
      tenant: null,
      unit: 'Unit 1B',
      description: 'Receipt for HVAC system maintenance'
    },
    {
      id: 4,
      name: 'Property Tax Assessment 2025.pdf',
      category: 'tax',
      type: 'pdf',
      size: '1.2 MB',
      uploadDate: '2025-09-20',
      tenant: null,
      unit: null,
      description: 'Annual property tax assessment document'
    },
    {
      id: 5,
      name: 'Move-in Inspection - Unit 3C.pdf',
      category: 'inspections',
      type: 'pdf',
      size: '3.1 MB',
      uploadDate: '2025-11-05',
      tenant: 'Mike Davis',
      unit: 'Unit 3C',
      description: 'Move-in inspection checklist and photos'
    },
    {
      id: 6,
      name: 'Plumbing Repair Invoice - Kitchen Sink.pdf',
      category: 'receipts',
      type: 'pdf',
      size: '445 KB',
      uploadDate: '2025-11-14',
      tenant: null,
      unit: 'Unit 2A',
      description: 'Invoice for kitchen sink plumbing repair'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Documents', count: documents?.length },
    { id: 'leases', label: 'Leases', count: documents?.filter(d => d?.category === 'leases')?.length },
    { id: 'receipts', label: 'Receipts', count: documents?.filter(d => d?.category === 'receipts')?.length },
    { id: 'inspections', label: 'Inspections', count: documents?.filter(d => d?.category === 'inspections')?.length },
    { id: 'insurance', label: 'Insurance', count: documents?.filter(d => d?.category === 'insurance')?.length },
    { id: 'tax', label: 'Tax Documents', count: documents?.filter(d => d?.category === 'tax')?.length },
  ];

  const filteredDocuments = documents?.filter(doc => {
    if (activeCategory === 'all') return true;
    return doc?.category === activeCategory;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return 'FileText';
      case 'image': return 'Image';
      case 'doc': return 'FileText';
      case 'excel': return 'FileSpreadsheet';
      default: return 'File';
    }
  };

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'pdf': return 'text-error';
      case 'image': return 'text-success';
      case 'doc': return 'text-primary';
      case 'excel': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    onUploadDocument?.(files);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      {/* Header with Categories and Upload */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap transition-smooth ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {category?.label} ({category?.count})
            </button>
          ))}
        </div>

        <Button onClick={onUploadDocument} iconName="Upload" iconPosition="left">
          Upload Document
        </Button>
      </div>
      {/* Upload Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
          dragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Drop files here to upload</h3>
        <p className="text-muted-foreground mb-4">
          Or click to browse and select files from your computer
        </p>
        <Button variant="outline" onClick={onUploadDocument}>
          Browse Files
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB per file)
        </p>
      </div>
      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments?.length > 0 ? (
          filteredDocuments?.map((document) => (
            <div key={document?.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getFileIcon(document?.type)} 
                      size={24} 
                      className={getFileTypeColor(document?.type)}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{document?.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{document?.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{document?.size}</span>
                      <span>•</span>
                      <span>Uploaded {new Date(document.uploadDate)?.toLocaleDateString()}</span>
                      {document?.tenant && (
                        <>
                          <span>•</span>
                          <span>{document?.tenant}</span>
                        </>
                      )}
                      {document?.unit && (
                        <>
                          <span>•</span>
                          <span>{document?.unit}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onDownloadDocument(document)}
                    iconName="Download"
                  >
                    Download
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDeleteDocument(document)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No {activeCategory !== 'all' ? activeCategory : ''} documents
            </h3>
            <p className="text-muted-foreground mb-4">
              {activeCategory === 'all' ?'Upload documents to keep your property records organized'
                : `No documents in the ${activeCategory} category`
              }
            </p>
            {activeCategory === 'all' && (
              <Button onClick={onUploadDocument} iconName="Upload" iconPosition="left">
                Upload First Document
              </Button>
            )}
          </div>
        )}
      </div>
      {/* Storage Usage */}
      {filteredDocuments?.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Storage Usage</h3>
            <Button variant="outline" size="sm">
              Manage Storage
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Used Storage</span>
              <span className="text-foreground font-medium">12.8 MB of 1 GB</span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '1.28%' }}></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <p className="font-medium text-foreground">{documents?.filter(d => d?.category === 'leases')?.length}</p>
                <p className="text-muted-foreground">Leases</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">{documents?.filter(d => d?.category === 'receipts')?.length}</p>
                <p className="text-muted-foreground">Receipts</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">{documents?.filter(d => d?.category === 'inspections')?.length}</p>
                <p className="text-muted-foreground">Inspections</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">{documents?.filter(d => d?.category === 'insurance')?.length}</p>
                <p className="text-muted-foreground">Insurance</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsTab;