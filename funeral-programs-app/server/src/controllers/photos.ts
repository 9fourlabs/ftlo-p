import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { TigrisService } from '../lib/tigris.js';
import sharp from 'sharp';

export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    const { programId } = req.params;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Verify program exists
    const program = await prisma.program.findUnique({
      where: { id: programId },
    });
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    
    // Process image with Sharp
    const processed = await sharp(file.buffer)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();
    
    // Upload to Tigris
    const { key, url } = await TigrisService.uploadFile(
      processed,
      file.originalname,
      'image/jpeg'
    );
    
    // Check if this should be the primary photo
    const photoCount = await prisma.photo.count({
      where: { programId },
    });
    const isPrimary = photoCount === 0;
    
    // Save to database
    const photo = await prisma.photo.create({
      data: {
        url,
        key,
        filename: file.originalname,
        isPrimary,
        order: photoCount,
        programId,
      },
    });
    
    res.status(201).json(photo);
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
};

export const deletePhoto = async (req: Request, res: Response) => {
  try {
    const { photoId } = req.params;
    
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    });
    
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    
    // Delete from Tigris
    await TigrisService.deleteFile(photo.key);
    
    // If this was the primary photo, make the next photo primary
    if (photo.isPrimary) {
      const nextPhoto = await prisma.photo.findFirst({
        where: {
          programId: photo.programId,
          id: { not: photoId },
        },
        orderBy: { order: 'asc' },
      });
      
      if (nextPhoto) {
        await prisma.photo.update({
          where: { id: nextPhoto.id },
          data: { isPrimary: true },
        });
      }
    }
    
    // Delete from database
    await prisma.photo.delete({
      where: { id: photoId },
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
};

export const setPrimaryPhoto = async (req: Request, res: Response) => {
  try {
    const { photoId } = req.params;
    
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    });
    
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    
    // Remove primary from all photos in this program
    await prisma.photo.updateMany({
      where: { programId: photo.programId },
      data: { isPrimary: false },
    });
    
    // Set this photo as primary
    const updatedPhoto = await prisma.photo.update({
      where: { id: photoId },
      data: { isPrimary: true },
    });
    
    res.json(updatedPhoto);
  } catch (error) {
    console.error('Error setting primary photo:', error);
    res.status(500).json({ error: 'Failed to set primary photo' });
  }
};