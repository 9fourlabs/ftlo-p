import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Star } from 'lucide-react';
import { useProgramStore } from '../../store/programStore';

export function PhotoUploadStep() {
  const { photos, addPhoto, removePhoto, setPrimaryPhoto, nextStep, prevStep } = useProgramStore();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const url = URL.createObjectURL(file);
      addPhoto({
        file,
        url,
        isPrimary: photos.length === 0, // First photo is primary by default
      });
    });
  }, [addPhoto, photos.length]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl text-navy-800 mb-3">
          Upload Photos
        </h2>
        <p className="text-navy-600 font-body">
          Add photos to include in the program. Click the star to set the main photo.
        </p>
      </div>
      
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-300
          ${isDragActive 
            ? 'border-gold-500 bg-gold-50' 
            : 'border-cream-400 hover:border-gold-400 hover:bg-cream-50'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-navy-400" />
        <p className="font-body text-navy-700 mb-2">
          {isDragActive 
            ? 'Drop photos here...' 
            : 'Drag & drop photos here, or click to select'
          }
        </p>
        <p className="text-sm text-navy-500">
          JPG, PNG, or WebP • Max 10MB each
        </p>
      </div>
      
      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="mt-8">
          <h3 className="font-display text-xl text-navy-800 mb-4">
            Uploaded Photos ({photos.length})
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                >
                  <img
                    src={photo.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/40 transition-colors" />
                  
                  {/* Primary Badge */}
                  {photo.isPrimary && (
                    <div className="absolute top-2 left-2 bg-gold-500 text-white 
                                    px-2 py-1 rounded text-xs font-medium">
                      Main Photo
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!photo.isPrimary && (
                      <button
                        onClick={() => setPrimaryPhoto(photo.id)}
                        className="p-1.5 bg-white rounded-full shadow-lg 
                                   hover:bg-gold-100 transition-colors"
                        title="Set as main photo"
                      >
                        <Star className="w-4 h-4 text-gold-600" />
                      </button>
                    )}
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="p-1.5 bg-white rounded-full shadow-lg 
                                 hover:bg-rose-100 transition-colors"
                      title="Remove photo"
                    >
                      <X className="w-4 h-4 text-rose-600" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <div className="pt-8 flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-3 text-navy-700 font-body font-medium 
                     hover:text-navy-900 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={nextStep}
          className="px-8 py-3 bg-navy-800 text-cream-100 rounded-lg 
                     font-body font-medium hover:bg-navy-700 
                     transition-colors shadow-lg hover:shadow-xl"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
}