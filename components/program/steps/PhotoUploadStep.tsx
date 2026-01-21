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
      <div className="relative group">
        <Card
          className={`p-8 border-2 border-dashed transition-all duration-300 ${
            isDragging 
              ? 'border-primary/50 bg-gradient-to-b from-primary/10 to-primary/5' 
              : 'border-primary/30 hover:border-primary/50'
          } bg-gradient-to-b from-primary/5 to-transparent`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-light mb-2 text-foreground">
              Add Memorial Photos
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
              Share cherished memories through photos that celebrate their life and legacy
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
              variant="gradient"
              size="lg"
              disabled={uploading || data.photos.length >= 20}
              onClick={() => document.getElementById('photo-upload')?.click()}
              className="h-12 px-8"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              {data.photos.length === 0 ? 'Select Photos' : 'Add More Photos'}
            </Button>
            {data.photos.length < 20 && (
              <p className="text-xs text-muted-foreground/70 mt-3">
                Upload up to {20 - data.photos.length} more photos • JPG, PNG supported
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Photo Grid */}
      {data.photos.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Uploaded Photos ({data.photos.length}/20)</Label>
            {data.photos.length > 0 && !data.photos.some(p => p.isPrimary) && (
              <p className="text-sm text-amber-600">Please select a primary photo</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.photos.map((photo) => (
              <Card 
                key={photo.id} 
                className={`relative group overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  photo.isPrimary ? 'ring-2 ring-primary/50 shadow-color' : ''
                }`}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={photo.url}
                    alt=""
                    className="w-full h-full object-cover memorial-vignette transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="glass"
                      onClick={() => setPrimaryPhoto(photo.id)}
                      disabled={photo.isPrimary}
                      className="backdrop-blur-md"
                    >
                      <Star className={`w-4 h-4 ${photo.isPrimary ? 'fill-current text-primary' : 'text-white'}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removePhoto(photo.id)}
                      className="backdrop-blur-md"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  {photo.isPrimary && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary/80 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                      ★ Primary Photo
                    </div>
                  )}
                </div>
                <div className="p-3 bg-gradient-to-b from-background to-primary/5">
                  <Input
                    placeholder="Add a meaningful caption..."
                    value={photo.caption || ''}
                    onChange={(e) => updatePhotoCaption(photo.id, e.target.value)}
                    className="text-sm form-input border-primary/20 focus:border-primary/40"
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