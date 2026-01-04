import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Star, Image as ImageIcon } from 'lucide-react';
import { ProgramData } from '../MultiStepProgramForm';

interface PhotoUploadStepProps {
  data: ProgramData;
  updateData: (data: Partial<ProgramData>) => void;
}

export function PhotoUploadStep({ data, updateData }: PhotoUploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    await handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) return;
    
    setUploading(true);
    
    try {
      // In a real implementation, upload to cloud storage
      // For now, create object URLs as placeholders
      const newPhotos = imageFiles.slice(0, 20 - data.photos.length).map((file, index) => ({
        id: Date.now().toString() + index,
        url: URL.createObjectURL(file),
        caption: '',
        isPrimary: data.photos.length === 0 && index === 0,
      }));
      
      updateData({ photos: [...data.photos, ...newPhotos] });
    } catch (error) {
      console.error('Error uploading photos:', error);
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (id: string) => {
    const updatedPhotos = data.photos.filter(photo => photo.id !== id);
    
    // If we removed the primary photo, make the first one primary
    if (updatedPhotos.length > 0 && !updatedPhotos.some(p => p.isPrimary)) {
      updatedPhotos[0].isPrimary = true;
    }
    
    updateData({ photos: updatedPhotos });
  };

  const setPrimaryPhoto = (id: string) => {
    const updatedPhotos = data.photos.map(photo => ({
      ...photo,
      isPrimary: photo.id === id,
    }));
    updateData({ photos: updatedPhotos });
  };

  const updatePhotoCaption = (id: string, caption: string) => {
    const updatedPhotos = data.photos.map(photo =>
      photo.id === id ? { ...photo, caption } : photo
    );
    updateData({ photos: updatedPhotos });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Photos & Memories</h2>
        <p className="text-muted-foreground">
          Upload photos to include in the memorial program (up to 20 photos).
        </p>
      </div>

      {/* Upload Area */}
      <Card
        className={`p-8 border-2 border-dashed transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">
            Drag and drop photos here, or click to select
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Supports JPG, PNG, and other image formats
          </p>
          <input
            id="photo-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
            disabled={uploading || data.photos.length >= 20}
          />
          <Button
            type="button"
            variant="secondary"
            disabled={uploading || data.photos.length >= 20}
            onClick={() => document.getElementById('photo-upload')?.click()}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Select Photos
          </Button>
        </div>
      </Card>

      {/* Photo Grid */}
      {data.photos.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Uploaded Photos ({data.photos.length}/20)</Label>
            {data.photos.length > 0 && !data.photos.some(p => p.isPrimary) && (
              <p className="text-sm text-amber-600">Please select a primary photo</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.photos.map((photo) => (
              <Card key={photo.id} className="relative group">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img
                    src={photo.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setPrimaryPhoto(photo.id)}
                      disabled={photo.isPrimary}
                    >
                      <Star className={`w-4 h-4 ${photo.isPrimary ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removePhoto(photo.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  {photo.isPrimary && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      Primary Photo
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <Input
                    placeholder="Add caption..."
                    value={photo.caption || ''}
                    onChange={(e) => updatePhotoCaption(photo.id, e.target.value)}
                    className="text-sm"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}