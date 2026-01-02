import { Router } from 'express';
import multer from 'multer';
import { uploadPhoto, deletePhoto, setPrimaryPhoto } from '../controllers/photos.js';

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});

router.post('/programs/:programId/photos', upload.single('photo'), uploadPhoto);
router.delete('/:photoId', deletePhoto);
router.patch('/:photoId/primary', setPrimaryPhoto);

export default router;