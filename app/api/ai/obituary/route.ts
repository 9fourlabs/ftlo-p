import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';
import { llm, checkLLMConnection } from '@/lib/ai/local-llm';

interface ObituaryRequest {
  lovedOneStory: string;
  basicInfo: {
    firstName: string;
    middleName?: string;
    lastName: string;
    nickname?: string;
    birthDate: string;
    deathDate: string;
    birthPlace: string;
    deathPlace: string;
  };
  tone: 'formal' | 'warm' | 'celebratory';
  length: 'short' | 'medium' | 'long';
}

async function generateObituaryWithAI(data: ObituaryRequest): Promise<string> {
  // Check if local LLM is available
  const llmAvailable = await checkLLMConnection();
  
  if (llmAvailable) {
    // Use local LLM
    try {
      return await llm.generateObituary(
        data.lovedOneStory,
        data.basicInfo,
        data.tone,
        data.length
      );
    } catch (error) {
      console.error('Local LLM failed, falling back to mock:', error);
    }
  }
  const { lovedOneStory, basicInfo, tone, length } = data;
  
  // Construct prompt for AI
  const prompt = `
    Please write a ${tone} obituary of ${length} length (${
      length === 'short' ? '150-250' : length === 'medium' ? '300-500' : '600-800'
    } words) based on the following information:
    
    Name: ${[basicInfo.firstName, basicInfo.middleName, basicInfo.lastName].filter(Boolean).join(' ')}
    ${basicInfo.nickname ? `Nickname: ${basicInfo.nickname}` : ''}
    Born: ${basicInfo.birthDate} in ${basicInfo.birthPlace}
    Passed: ${basicInfo.deathDate} in ${basicInfo.deathPlace}
    
    Life story and memories:
    ${lovedOneStory}
    
    Guidelines:
    - Start with announcing the passing
    - Include birth and death information naturally
    - Weave in the provided memories and stories
    - ${tone === 'formal' ? 'Use traditional, respectful language' : 
        tone === 'warm' ? 'Use personal, heartfelt language' : 
        'Focus on celebrating their life and positive impact'}
    - End with service information placeholder: [Service details to be added]
    - Include survived by placeholder: [Family members to be added]
  `;

  // Simulate AI response (replace with actual AI service call)
  const fullName = [basicInfo.firstName, basicInfo.middleName, basicInfo.lastName]
    .filter(Boolean)
    .join(' ');
  const nickname = basicInfo.nickname ? ` "${basicInfo.nickname}"` : '';

  // Generate different styles based on tone
  if (tone === 'formal') {
    return `It is with deep sorrow that we announce the passing of ${fullName}${nickname}, who departed this life on ${basicInfo.deathDate} in ${basicInfo.deathPlace}. Born on ${basicInfo.birthDate} in ${basicInfo.birthPlace}, ${basicInfo.firstName} lived a life marked by dignity, grace, and unwavering dedication to family and community.

${basicInfo.firstName} will be remembered for their remarkable character and the profound impact they had on all who knew them. Their legacy of integrity, compassion, and service will continue to inspire future generations.

[Additional life details from story to be incorporated]

${basicInfo.firstName} is survived by [family members to be added]. The family will receive visitors at [Service details to be added].

In lieu of flowers, memorial contributions may be made to [charity/organization] in ${basicInfo.firstName}'s memory.`;
  }
  
  if (tone === 'celebratory') {
    return `Today we celebrate the extraordinary life of ${fullName}${nickname}, who brought joy and light to everyone they met. ${basicInfo.firstName} began their amazing journey on ${basicInfo.birthDate} in ${basicInfo.birthPlace} and completed their earthly adventure on ${basicInfo.deathDate} in ${basicInfo.deathPlace}.

What a life it was! ${basicInfo.firstName} filled their days with laughter, love, and endless enthusiasm. Whether [activities from story], ${basicInfo.firstName} approached everything with a contagious zest for life that inspired us all.

[Additional celebratory details from story]

${basicInfo.firstName}'s spirit lives on through [family members to be added] and the countless lives they touched. 

Join us for a celebration of ${basicInfo.firstName}'s remarkable life at [Service details to be added]. Come prepared to share your favorite memories and stories - ${basicInfo.firstName} would want nothing less than a joyful gathering!`;
  }
  
  // Default warm tone
  return `With heavy hearts and profound love, we announce the passing of ${fullName}${nickname}, who left us peacefully on ${basicInfo.deathDate} in ${basicInfo.deathPlace}. Born on ${basicInfo.birthDate} in ${basicInfo.birthPlace}, ${basicInfo.firstName} lived a life filled with purpose, love, and endless compassion.

${basicInfo.firstName} was a beacon of light to all who knew them. Their warmth, generosity, and infectious smile could brighten even the darkest days. [Specific memories and qualities from story to be woven in]

Throughout their life, ${basicInfo.firstName} [achievements and interests from story]. But beyond all accomplishments, it was ${basicInfo.firstName}'s capacity for love and their gift for making everyone feel special that we will miss most.

${basicInfo.firstName} is survived by [family members to be added]. They were preceded in death by [to be added].

A celebration of ${basicInfo.firstName}'s life will be held at [Service details to be added]. In lieu of flowers, the family requests donations be made to [charity] in ${basicInfo.firstName}'s memory.

Though our hearts are heavy with loss, we find comfort in knowing that ${basicInfo.firstName}'s spirit lives on in the memories we cherish and the love they shared so freely.`;
}

// Extract key highlights from the story
async function extractLifeHighlights(story: string): Promise<string[]> {
  const llmAvailable = await checkLLMConnection();
  
  if (llmAvailable) {
    try {
      return await llm.extractLifeHighlights(story);
    } catch (error) {
      console.error('Failed to extract highlights with LLM:', error);
    }
  }
  
  // Fallback highlights
  return [
    'Devoted family member who always put others first',
    'Passionate about [hobbies/interests from story]',
    'Made lasting impact through [career/volunteer work]',
    'Known for their [personality traits]',
    'Cherished memories of [specific events]'
  ];
}

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data: ObituaryRequest = await request.json();
    
    // Validate required fields
    if (!data.lovedOneStory || !data.basicInfo.firstName || !data.basicInfo.lastName) {
      return NextResponse.json(
        { error: 'Missing required information' },
        { status: 400 }
      );
    }

    // Generate obituary
    const obituary = await generateObituaryWithAI(data);
    
    // Extract life highlights
    const highlights = await extractLifeHighlights(data.lovedOneStory);

    return NextResponse.json({
      obituary,
      highlights,
      metadata: {
        wordCount: obituary.split(' ').length,
        tone: data.tone,
        length: data.length,
      }
    });
  } catch (error) {
    console.error('Error generating obituary:', error);
    return NextResponse.json(
      { error: 'Failed to generate obituary' },
      { status: 500 }
    );
  }
}

// Endpoint to regenerate specific sections
export async function PATCH(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { section, context, currentText } = await request.json();
    
    // This would use AI to regenerate just the specified section
    // For now, return a placeholder
    const regeneratedSection = `[Regenerated ${section} section based on context]`;

    return NextResponse.json({
      section: regeneratedSection
    });
  } catch (error) {
    console.error('Error regenerating section:', error);
    return NextResponse.json(
      { error: 'Failed to regenerate section' },
      { status: 500 }
    );
  }
}