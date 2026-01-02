import { Router } from 'express';
import { createProgram, getProgram, updateProgram, deleteProgram, listPrograms } from '../controllers/programs.js';
import { validateBody, createProgramSchema, updateProgramSchema } from '../middleware/validation.js';

const router = Router();

router.get('/', listPrograms);
router.post('/', validateBody(createProgramSchema), createProgram);
router.get('/:id', getProgram);
router.put('/:id', validateBody(updateProgramSchema), updateProgram);
router.delete('/:id', deleteProgram);

export default router;