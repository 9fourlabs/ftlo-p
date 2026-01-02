import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createProgramSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  middleName: z.string().optional(),
  nickname: z.string().optional(),
  birthDate: z.string().datetime(),
  deathDate: z.string().datetime(),
  birthPlace: z.string().optional(),
  deathPlace: z.string().optional(),
  obituary: z.string().optional(),
  parents: z.string().optional(),
  spouse: z.string().optional(),
  serviceName: z.string().optional(),
  serviceDate: z.string().datetime().optional(),
  serviceTime: z.string().optional(),
  venue: z.string().optional(),
  venueAddress: z.string().optional(),
  templateId: z.string().default('classic-elegance'),
  children: z.array(z.object({
    name: z.string(),
  })).optional(),
  siblings: z.array(z.object({
    name: z.string(),
  })).optional(),
  events: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
  })).optional(),
});

export const updateProgramSchema = createProgramSchema.partial();

export function validateBody(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.issues,
        });
      }
      next(error);
    }
  };
}