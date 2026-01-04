import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Star, Camera, Image, AlertCircle } from 'lucide-react';
import { useProgramStore } from '@/store/programStore';

interface Photo {
  id: string;
  file?: File;
  url: string;
  isPrimary: boolean;
}

export function PhotoUploadStep() {
  const { program, updateProgram } = useProgramStore();
  const [photos, setPhotos] = useState<Photo[]>(program.photos || []);
  const [uploadError, setUploadError] = useState<string>('');
  
  // Update store when photos change
  React.useEffect(() => {
    updateProgram({ photos });
  }, [photos, updateProgram]);

  const addPhoto = (file: File) => {
    const id = `photo_${Date.now()}_${Math.random()}`;
    const url = URL.createObjectURL(file);
    const newPhoto: Photo = {
      id,
      file,
      url,
      isPrimary: photos.length === 0, // First photo is primary by default
    };
    
    setPhotos(prev => [...prev, newPhoto]);
    setUploadError('');
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => {
      const filtered = prev.filter(p => p.id !== id);
      // If we removed the primary photo, make the first remaining photo primary
      if (filtered.length > 0 && !filtered.some(p => p.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const setPrimaryPhoto = (id: string) => {
    setPhotos(prev => prev.map(p => ({
      ...p,
      isPrimary: p.id === id
    })));
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setUploadError('');
    
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(({ errors }) => errors.map((e: any) => e.message)).flat();
      setUploadError(errors.join(', '));
      return;
    }

    acceptedFiles.forEach(addPhoto);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 20,
  });
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Photos & Memories
        </h3>
        <p className="text-gray-600">
          Upload meaningful photos to include in the memorial program
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center">
            <Camera className="mr-2 h-5 w-5" />
            Upload Photos
            {photos.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {photos.length} uploaded
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-all duration-300
              ${isDragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-700 mb-2 font-medium">
              {isDragActive 
                ? 'Drop photos here...' 
                : 'Drag & drop photos here, or click to select'
              }
            </p>
            <p className="text-sm text-gray-500">
              JPG, PNG, WebP, or GIF • Max 10MB each • Up to 20 photos
            </p>
          </div>

          {uploadError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
              <p className="text-sm text-red-600">{uploadError}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Image className="mr-2 h-5 w-5" />
              Uploaded Photos ({photos.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-square rounded-lg overflow-hidden group border-2 border-transparent hover:border-gray-200"
                  >
                    <img
                      src={photo.url}
                      alt="Memorial photo"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                    
                    {/* Primary Badge */}
                    {photo.isPrimary && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white 
                                      px-2 py-1 rounded text-xs font-medium flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Main Photo
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!photo.isPrimary && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setPrimaryPhoto(photo.id)}
                          className="h-8 w-8 p-0 bg-white hover:bg-yellow-50 border-yellow-200"
                          title="Set as main photo"
                        >
                          <Star className="w-4 h-4 text-yellow-600" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => removePhoto(photo.id)}
                        className="h-8 w-8 p-0 bg-white hover:bg-red-50 border-red-200"
                        title="Remove photo"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      )}

      {photos.length === 0 && (
        <div className="text-center py-8">
          <Camera className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-2">No photos uploaded yet</p>
          <p className="text-sm text-gray-400">
            Photos help create a beautiful, personal memorial program
          </p>
        </div>
      )}

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">
          💡 Photo Tips
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use high-quality photos for the best print results</li>
          <li>• The main photo (starred) will be featured prominently</li>
          <li>• Include photos from different life stages and special moments</li>
          <li>• Family photos, hobby photos, and candid shots work well</li>
        </ul>
      </div>
    </div>
  );
}