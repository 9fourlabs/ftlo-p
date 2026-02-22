// Configuration for local LLM integration (Llama, Mistral, etc.)
// This can be used with Ollama, llama.cpp, or other local inference servers

interface LLMConfig {
  modelName: string;
  endpoint: string;
  apiKey?: string;
  temperature: number;
  maxTokens: number;
}

// Default configuration for local Ollama instance
const defaultConfig: LLMConfig = {
  modelName: process.env.LLM_MODEL || 'llama2:7b', // or mistral:7b, mixtral:8x7b
  endpoint: process.env.LLM_ENDPOINT || 'http://localhost:11434/api/generate',
  temperature: 0.7,
  maxTokens: 1000,
};

interface GenerateOptions {
  prompt: string;
  system?: string;
  temperature?: number;
  maxTokens?: number;
}

export class LocalLLM {
  private config: LLMConfig;

  constructor(config?: Partial<LLMConfig>) {
    this.config = { ...defaultConfig, ...config };
  }

  async generate({ prompt, system, temperature, maxTokens }: GenerateOptions): Promise<string> {
    try {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        },
        body: JSON.stringify({
          model: this.config.modelName,
          prompt: system ? `${system}\n\n${prompt}` : prompt,
          stream: false,
          options: {
            temperature: temperature ?? this.config.temperature,
            num_predict: maxTokens ?? this.config.maxTokens,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`LLM request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Local LLM error:', error);
      throw error;
    }
  }

  // Specific method for obituary generation
  async generateObituary(
    lovedOneStory: string,
    basicInfo: any,
    tone: 'formal' | 'warm' | 'celebratory',
    length: 'short' | 'medium' | 'long'
  ): Promise<string> {
    const wordCounts = {
      short: '150-250',
      medium: '300-500',
      long: '600-800',
    };

    const toneInstructions = {
      formal: 'Use traditional, respectful, and formal language appropriate for a solemn occasion.',
      warm: 'Use personal, heartfelt language that captures the warmth and love of the person.',
      celebratory: 'Focus on celebrating their life with an uplifting and joyful tone.',
    };

    const system = `You are a compassionate obituary writer. Write obituaries that are respectful, touching, and capture the essence of the person's life.`;

    const prompt = `Write a ${tone} obituary of ${wordCounts[length]} words based on the following information:

Name: ${basicInfo.firstName} ${basicInfo.middleName || ''} ${basicInfo.lastName}
${basicInfo.nickname ? `Nickname: "${basicInfo.nickname}"` : ''}
Born: ${basicInfo.birthDate} in ${basicInfo.birthPlace}
Passed: ${basicInfo.deathDate} in ${basicInfo.deathPlace}

Life story and memories shared by family:
${lovedOneStory}

Guidelines:
- ${toneInstructions[tone]}
- Start by announcing their passing with appropriate sentiment
- Include their birth and death information naturally
- Weave in the provided memories and stories throughout
- End with a placeholder for service details: [Service information to be announced]
- Include a placeholder for surviving family: [Survived by loving family members]
- Make it exactly ${wordCounts[length]} words

Write the obituary now:`;

    return this.generate({ prompt, system });
  }

  // Extract key life highlights from a story
  async extractLifeHighlights(story: string): Promise<string[]> {
    const system = `You are an expert at identifying key life events and characteristics from personal stories.`;
    
    const prompt = `From the following personal story, extract 5-7 key highlights about this person's life. These should be concise bullet points that capture important events, achievements, personality traits, or memorable aspects.

Story:
${story}

Format your response as a JSON array of strings. Example:
["Devoted parent and grandparent to 5 grandchildren", "Served 30 years as a teacher", "Known for their infectious laugh"]

Extract the highlights:`;

    const response = await this.generate({ prompt, system });
    
    try {
      // Parse the JSON response
      return JSON.parse(response);
    } catch {
      // Fallback: split by newlines and clean up
      return response
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.replace(/^[-•*]\s*/, '').trim());
    }
  }

  // Generate a section of the obituary
  async regenerateSection(
    section: string,
    currentText: string,
    context: any
  ): Promise<string> {
    const system = `You are helping to edit and improve an obituary by regenerating specific sections.`;
    
    const prompt = `Please rewrite the ${section} section of this obituary with a different approach while maintaining the same factual information.

Current text:
${currentText}

Context:
${JSON.stringify(context, null, 2)}

Provide a fresh version of just this section:`;

    return this.generate({ prompt, system });
  }
}

// Singleton instance for the app
export const llm = new LocalLLM();

// Helper function to check if local LLM is available
export async function checkLLMConnection(): Promise<boolean> {
  try {
    const response = await fetch(
      process.env.LLM_ENDPOINT || 'http://localhost:11434/api/tags'
    );
    return response.ok;
  } catch {
    return false;
  }
}