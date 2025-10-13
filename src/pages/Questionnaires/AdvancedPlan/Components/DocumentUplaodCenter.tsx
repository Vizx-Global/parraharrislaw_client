import React, { useState, useRef, useCallback } from 'react';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
  uploadTime?: Date;
  category?: string;
  description?: string;
}

interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  acceptedFormats: string[];
  maxFileSize: number; // in MB
  maxFiles: number;
  icon: string;
}

interface DocumentUploadCenterProps {
  uploadedDocuments: { [key: string]: UploadedFile[] };
  onFileUpload: (field: string, files: File[]) => void;
  onFileRemove?: (field: string, fileId: string) => void;
  onFileDescriptionUpdate?: (field: string, fileId: string, description: string) => void;
  requiredDocuments?: DocumentCategory[]; // Made optional
  maxTotalSize?: number; // in MB
  autoUpload?: boolean;
}

const DocumentUploadCenter: React.FC<DocumentUploadCenterProps> = ({
  uploadedDocuments = {},
  onFileUpload,
  onFileRemove,
  onFileDescriptionUpdate,
  requiredDocuments = [], // Default empty array
  maxTotalSize = 100, // 100MB default
  autoUpload = true
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [bulkUploadMode, setBulkUploadMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate completion statistics
  const getCompletionStats = useCallback(() => {
    const totalCategories = requiredDocuments?.length || 0;
    const completedCategories = (requiredDocuments || []).filter(category => {
      const uploaded = uploadedDocuments[category.id] || [];
      return uploaded.length > 0 && uploaded.every(file => file.status === 'completed');
    }).length;

    const totalRequiredFiles = (requiredDocuments || []).reduce((acc, category) => 
      acc + (category.required ? category.maxFiles : 0), 0
    );
    
    const uploadedRequiredFiles = (requiredDocuments || []).reduce((acc, category) => {
      if (!category.required) return acc;
      const uploaded = uploadedDocuments[category.id] || [];
      return acc + uploaded.filter(file => file.status === 'completed').length;
    }, 0);

    return {
      totalCategories,
      completedCategories,
      completionPercentage: totalCategories > 0 ? Math.round((completedCategories / totalCategories) * 100) : 0,
      uploadedRequiredFiles,
      totalRequiredFiles
    };
  }, [requiredDocuments, uploadedDocuments]);

  const stats = getCompletionStats();

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      if (selectedCategory) {
        handleFilesUpload(selectedCategory, files);
      } else if (bulkUploadMode) {
        // Auto-categorize files based on name patterns
        autoCategorizeAndUpload(files);
      }
    }
  }, [selectedCategory, bulkUploadMode]);

  // Auto-categorize files based on filename patterns
  const autoCategorizeAndUpload = (files: File[]) => {
    const categorizedFiles: { [category: string]: File[] } = {};

    files.forEach(file => {
      const fileName = file.name.toLowerCase();
      let matchedCategory = 'other';

      // Pattern matching for auto-categorization
      if (fileName.includes('paystub') || fileName.includes('pay_stub') || fileName.includes('w2')) {
        matchedCategory = 'income';
      } else if (fileName.includes('bank') || fileName.includes('statement')) {
        matchedCategory = 'bank_statements';
      } else if (fileName.includes('tax') || fileName.includes('return')) {
        matchedCategory = 'tax_returns';
      } else if (fileName.includes('birth') || fileName.includes('certificate')) {
        matchedCategory = 'birth_certificates';
      } else if (fileName.includes('insurance')) {
        matchedCategory = 'insurance';
      } else if (fileName.includes('mortgage') || fileName.includes('deed')) {
        matchedCategory = 'property';
      }

      if (!categorizedFiles[matchedCategory]) {
        categorizedFiles[matchedCategory] = [];
      }
      categorizedFiles[matchedCategory].push(file);
    });

    // Upload to respective categories
    Object.entries(categorizedFiles).forEach(([category, categoryFiles]) => {
      const targetCategory = requiredDocuments?.find(doc => doc.id === category);
      if (targetCategory) {
        handleFilesUpload(category, categoryFiles);
      }
    });
  };

  // Handle file selection
  const handleFilesUpload = (categoryId: string, files: File[]) => {
    const category = requiredDocuments?.find(doc => doc.id === categoryId);
    if (!category) return;

    // Validate files
    const validFiles = files.filter(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const isValidFormat = category.acceptedFormats.some(format => 
        file.type.includes(format.replace('.', '')) || 
        fileExtension === format.replace('.', '')
      );
      
      const isValidSize = file.size <= category.maxFileSize * 1024 * 1024;
      
      if (!isValidFormat) {
        alert(`Invalid file format for ${file.name}. Accepted formats: ${category.acceptedFormats.join(', ')}`);
        return false;
      }
      
      if (!isValidSize) {
        alert(`File ${file.name} is too large. Maximum size: ${category.maxFileSize}MB`);
        return false;
      }

      return true;
    });

    if (validFiles.length > 0) {
      onFileUpload(categoryId, validFiles);
      
      // Simulate upload progress
      if (autoUpload) {
        validFiles.forEach((file, index) => {
          const fileId = `${categoryId}-${file.name}-${Date.now()}-${index}`;
          simulateUploadProgress(fileId);
        });
      }
    }
  };

  // Simulate upload progress (replace with actual upload logic)
  const simulateUploadProgress = (fileId: string) => {
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = (prev[fileId] || 0) + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [fileId]: 100 };
        }
        return { ...prev, [fileId]: newProgress };
      });
    }, 200);
  };

  // Get category icon
  const getCategoryIcon = (icon: string) => {
    const iconMap: { [key: string]: string } = {
      'income': '💰',
      'tax_returns': '📊',
      'bank_statements': '🏦',
      'property': '🏠',
      'insurance': '🛡️',
      'birth_certificates': '📄',
      'court_orders': '⚖️',
      'other': '📎'
    };
    return iconMap[icon] || '📎';
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file type icon
  const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const iconMap: { [key: string]: string } = {
      'pdf': '📕',
      'jpg': '🖼️',
      'jpeg': '🖼️',
      'png': '🖼️',
      'doc': '📄',
      'docx': '📄',
      'xls': '📊',
      'xlsx': '📊'
    };
    return iconMap[extension || ''] || '📄';
  };

  // Show loading state if no required documents
  if (!requiredDocuments || requiredDocuments.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
        <div className="text-6xl mb-4">📂</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Upload Center</h2>
        <p className="text-gray-600 mb-4">Loading document categories...</p>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Upload Center</h2>
            <p className="text-gray-600">
              Upload all required documents to complete your co-parenting plan application
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.completionPercentage}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.uploadedRequiredFiles}/{stats.totalRequiredFiles}
              </div>
              <div className="text-sm text-gray-600">Required Files</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{stats.completedCategories} of {stats.totalCategories} categories</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-1000 ease-out"
              style={{ width: `${stats.completionPercentage}%` }}
            >
              <div className="w-full h-full bg-gradient-to-r from-white/30 to-transparent animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modes */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setBulkUploadMode(false)}
          className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${
            !bulkUploadMode 
              ? 'border-blue-500 bg-blue-50 shadow-md' 
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">📁</div>
            <h3 className="font-semibold text-gray-900">Category Upload</h3>
            <p className="text-sm text-gray-600 mt-1">Upload to specific categories</p>
          </div>
        </button>

        <button
          onClick={() => setBulkUploadMode(true)}
          className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${
            bulkUploadMode 
              ? 'border-purple-500 bg-purple-50 shadow-md' 
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-semibold text-gray-900">Bulk Upload</h3>
            <p className="text-sm text-gray-600 mt-1">Drag & drop all files at once</p>
          </div>
        </button>
      </div>

      {/* Bulk Upload Area */}
      {bulkUploadMode && (
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50 shadow-inner' 
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Drop your files here
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop all your documents, or click to browse. We'll automatically categorize them.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Browse Files
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Supports PDF, JPG, PNG • Max {maxTotalSize}MB total
            </p>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                autoCategorizeAndUpload(Array.from(e.target.files));
              }
            }}
          />
        </div>
      )}

      {/* Category Selection and Upload */}
      {!bulkUploadMode && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Document Categories</h3>
              <div className="space-y-2">
                {requiredDocuments.map((category) => {
                  const uploaded = uploadedDocuments[category.id] || [];
                  const completedCount = uploaded.filter(f => f.status === 'completed').length;
                  const isSelected = selectedCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        isSelected 
                          ? 'bg-blue-50 border border-blue-200 shadow-sm' 
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{getCategoryIcon(category.icon)}</span>
                          <div>
                            <div className="font-medium text-gray-900">{category.name}</div>
                            <div className="text-sm text-gray-500">
                              {completedCount}/{category.maxFiles} files
                            </div>
                          </div>
                        </div>
                        {completedCount >= category.maxFiles && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Category Upload Area */}
          <div className="lg:col-span-3">
            {selectedCategory ? (
              (() => {
                const category = requiredDocuments.find(doc => doc.id === selectedCategory);
                if (!category) return null;
                const uploaded = uploadedDocuments[category.id] || [];

                return (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-3">
                          <span className="text-2xl">{getCategoryIcon(category.icon)}</span>
                          <span>{category.name}</span>
                          {category.required && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                              Required
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600 mt-1">{category.description}</p>
                      </div>
                      
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                      >
                        <span>+</span>
                        <span>Add Files</span>
                      </button>
                    </div>

                    {/* Upload Area */}
                    <div
                      className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-all duration-300 ${
                        dragActive 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={(e) => {
                        handleDrop(e);
                        if (e.dataTransfer.files) {
                          handleFilesUpload(selectedCategory, Array.from(e.dataTransfer.files));
                        }
                      }}
                    >
                      <div className="text-4xl mb-3">📎</div>
                      <p className="text-gray-600 mb-2">
                        Drag and drop files here or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Accepted: {category.acceptedFormats.join(', ')} • Max {category.maxFileSize}MB per file
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept={category.acceptedFormats.join(',')}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          handleFilesUpload(selectedCategory, Array.from(e.target.files));
                        }
                      }}
                    />

                    {/* Uploaded Files List */}
                    {uploaded.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Uploaded Files</h4>
                        {uploaded.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                          >
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <span className="text-2xl">{getFileTypeIcon(file.file.name)}</span>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 truncate">
                                  {file.file.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatFileSize(file.file.size)} • {file.uploadTime?.toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              {file.status === 'uploading' && (
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress[file.id] || 0}%` }}
                                  />
                                </div>
                              )}
                              
                              {file.status === 'completed' && (
                                <div className="flex items-center space-x-2 text-green-600">
                                  <span>✅</span>
                                  <span className="text-sm">Uploaded</span>
                                </div>
                              )}

                              <button
                                onClick={() => onFileRemove?.(selectedCategory, file.id)}
                                className="text-red-500 hover:text-red-700 p-1 transition-colors"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a Category
                </h3>
                <p className="text-gray-600">
                  Choose a document category from the left to start uploading files
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions Footer */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-semibold text-gray-900">Need Help Uploading?</h4>
            <p className="text-gray-600 text-sm">
              Use your phone camera to scan documents directly
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <span>📱</span>
              <span>Mobile Scan</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              <span>❓</span>
              <span>Get Help</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadCenter;