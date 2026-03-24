import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

/**
 * ProfilePictureUpload Component
 * Handles profile picture upload with preview and validation
 */
const ProfilePictureUpload = ({
  currentImageUrl,
  onUpload,
  onError,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxSizeMB = 5,
  label = 'Profile Picture',
}) => {
  const [preview, setPreview] = React.useState(currentImageUrl);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset error state
    setError('');

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      const errorMsg = `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Validate file size
    if (file.size > maxSizeBytes) {
      const errorMsg = `File is too large. Maximum size: ${maxSizeMB}MB`;
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Call upload handler
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      await onUpload(formData);
    } catch (err) {
      const errorMsg = err.message || 'Failed to upload image';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getInitials = () => {
    // This would need to be passed as prop or derived from user data
    return '?';
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Preview Area */}
      <div className="flex items-center space-x-6">
        {/* Image Preview or Initials */}
        <div className="relative">
          {preview ? (
            <img
              src={preview}
              alt="Profile preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-blue-200">
              {getInitials()}
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
              <LoadingSpinner size="sm" text="" />
            </div>
          )}
        </div>

        {/* Upload Button & Info */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept={allowedTypes.map((type) => {
              if (type === 'image/jpeg') return '.jpg,.jpeg';
              if (type === 'image/png') return '.png';
              if (type === 'image/gif') return '.gif';
              if (type === 'image/webp') return '.webp';
              return '';
            }).join(',')}
            onChange={handleFileSelect}
            disabled={loading}
            className="hidden"
          />

          <button
            onClick={handleClick}
            disabled={loading}
            className={`
              px-4 py-2 rounded-md font-medium text-sm
              transition-colors duration-200
              ${loading
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              }
            `}
          >
            {loading ? 'Uploading...' : 'Change Picture'}
          </button>

          {/* File Info */}
          <p className="text-xs text-gray-500 mt-2 space-y-1">
            <div>Supported formats: JPEG, PNG, GIF, WebP</div>
            <div>Maximum size: {maxSizeMB}MB</div>
            <div>Recommended: 400x400px or larger</div>
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => setError('')}
          dismissible={true}
        />
      )}
    </div>
  );
};

export default ProfilePictureUpload;
