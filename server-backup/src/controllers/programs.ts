import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const createProgram = async (req: Request, res: Response) => {
  try {
    const { children = [], siblings = [], events = [], ...programData } = req.body;
    
    const program = await prisma.program.create({
      data: {
        ...programData,
        birthDate: new Date(programData.birthDate),
        deathDate: new Date(programData.deathDate),
        serviceDate: programData.serviceDate ? new Date(programData.serviceDate) : null,
        children: {
          create: children.map((child: any, index: number) => ({
            name: child.name,
            order: index,
          })),
        },
        siblings: {
          create: siblings.map((sibling: any, index: number) => ({
            name: sibling.name,
            order: index,
          })),
        },
        events: {
          create: events.map((event: any, index: number) => ({
            title: event.title,
            description: event.description || '',
            order: index,
          })),
        },
      },
      include: {
        children: { orderBy: { order: 'asc' } },
        siblings: { orderBy: { order: 'asc' } },
        events: { orderBy: { order: 'asc' } },
        photos: { orderBy: { order: 'asc' } },
      },
    });
    
    res.status(201).json(program);
  } catch (error) {
    console.error('Error creating program:', error);
    res.status(500).json({ error: 'Failed to create program' });
  }
};

export const getProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const program = await prisma.program.findUnique({
      where: { id },
      include: {
        children: { orderBy: { order: 'asc' } },
        siblings: { orderBy: { order: 'asc' } },
        events: { orderBy: { order: 'asc' } },
        photos: { orderBy: { order: 'asc' } },
      },
    });
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    
    res.json(program);
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({ error: 'Failed to fetch program' });
  }
};

export const updateProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { children, siblings, events, ...updateData } = req.body;
    
    // Update basic program data
    const updatePayload: any = {
      ...updateData,
    };
    
    if (updateData.birthDate) {
      updatePayload.birthDate = new Date(updateData.birthDate);
    }
    if (updateData.deathDate) {
      updatePayload.deathDate = new Date(updateData.deathDate);
    }
    if (updateData.serviceDate) {
      updatePayload.serviceDate = new Date(updateData.serviceDate);
    }
    
    // Handle children updates
    if (children !== undefined) {
      await prisma.child.deleteMany({ where: { programId: id } });
      updatePayload.children = {
        create: children.map((child: any, index: number) => ({
          name: child.name,
          order: index,
        })),
      };
    }
    
    // Handle siblings updates
    if (siblings !== undefined) {
      await prisma.sibling.deleteMany({ where: { programId: id } });
      updatePayload.siblings = {
        create: siblings.map((sibling: any, index: number) => ({
          name: sibling.name,
          order: index,
        })),
      };
    }
    
    // Handle events updates
    if (events !== undefined) {
      await prisma.event.deleteMany({ where: { programId: id } });
      updatePayload.events = {
        create: events.map((event: any, index: number) => ({
          title: event.title,
          description: event.description || '',
          order: index,
        })),
      };
    }
    
    const program = await prisma.program.update({
      where: { id },
      data: updatePayload,
      include: {
        children: { orderBy: { order: 'asc' } },
        siblings: { orderBy: { order: 'asc' } },
        events: { orderBy: { order: 'asc' } },
        photos: { orderBy: { order: 'asc' } },
      },
    });
    
    res.json(program);
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(500).json({ error: 'Failed to update program' });
  }
};

export const deleteProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.program.delete({ where: { id } });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ error: 'Failed to delete program' });
  }
};

export const listPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await prisma.program.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        photos: {
          where: { isPrimary: true },
          take: 1,
        },
      },
    });
    
    res.json(programs);
  } catch (error) {
    console.error('Error listing programs:', error);
    res.status(500).json({ error: 'Failed to list programs' });
  }
};