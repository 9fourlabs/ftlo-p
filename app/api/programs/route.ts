import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/auth/session';
import { getDb } from '@/lib/db/drizzle';
import { programs, programPhotos, programTimeline, programFamily, NewProgram, NewProgramPhoto, NewProgramTimeline, NewProgramFamily } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const createProgramSchema = z.object({
  // Basic Information
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  nickname: z.string().optional(),
  birthDate: z.string().optional(),
  deathDate: z.string().optional(),
  birthPlace: z.string().optional(),
  deathPlace: z.string().optional(),
  
  // Service Details
  serviceName: z.string().optional(),
  serviceDate: z.string().optional(),
  serviceTime: z.string().optional(),
  venue: z.string().optional(),
  venueAddress: z.string().optional(),
  officiant: z.string().optional(),
  additionalInfo: z.string().optional(),
  
  // Life Story
  obituary: z.string().optional(),
  favoriteMemories: z.string().optional(),
  
  // Template & Customization
  selectedTemplate: z.string().default('classic-elegance'),
  accentColor: z.string().optional(),
  font: z.string().optional(),
  
  // Family Members (array of objects)
  familyMembers: z.array(z.object({
    id: z.string(),
    name: z.string(),
    relationship: z.string(),
    isDeceased: z.boolean(),
  })).default([]),
  
  // Photos (array of objects)
  photos: z.array(z.object({
    id: z.string(),
    url: z.string(),
    caption: z.string().optional(),
    isPrimary: z.boolean(),
  })).default([]),
  
  // Timeline/Order of Service (array of objects)
  timeline: z.array(z.object({
    id: z.string(),
    time: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    participants: z.string().optional(),
  })).default([]),
  
  // Draft status
  isDraft: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userPrograms = await getDb()
      .select()
      .from(programs)
      .where(eq(programs.userId, user.id))
      .orderBy(programs.createdAt);

    return NextResponse.json(userPrograms);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createProgramSchema.parse(body);

    // Extract relational data
    const { familyMembers, photos, timeline, ...programData } = validatedData;

    const newProgram: NewProgram = {
      ...programData,
      userId: user.id,
      isDraft: validatedData.isDraft ? 1 : 0,
    };

    // Create program and related data in a transaction
    const result = await getDb().transaction(async (tx) => {
      // Create the main program
      const [createdProgram] = await tx
        .insert(programs)
        .values(newProgram)
        .returning();

      // Insert family members
      if (familyMembers.length > 0) {
        const familyData: NewProgramFamily[] = familyMembers.map(member => ({
          programId: createdProgram.id,
          name: member.name,
          relationship: member.relationship,
          isDeceased: member.isDeceased ? 1 : 0,
        }));
        
        await tx.insert(programFamily).values(familyData);
      }

      // Insert photos
      if (photos.length > 0) {
        const photoData: NewProgramPhoto[] = photos.map(photo => ({
          programId: createdProgram.id,
          url: photo.url,
          caption: photo.caption,
          isPrimary: photo.isPrimary ? 1 : 0,
        }));
        
        await tx.insert(programPhotos).values(photoData);
      }

      // Insert timeline events
      if (timeline.length > 0) {
        const timelineData: NewProgramTimeline[] = timeline.map((event, index) => ({
          programId: createdProgram.id,
          time: event.time,
          title: event.title,
          description: event.description,
          participants: event.participants,
          sortOrder: index,
        }));
        
        await tx.insert(programTimeline).values(timelineData);
      }

      return createdProgram;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating program:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}