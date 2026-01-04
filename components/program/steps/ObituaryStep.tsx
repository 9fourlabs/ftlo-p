import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ProgramData } from '../MultiStepProgramForm';
import { Card } from '@/components/ui/card';

interface ObituaryStepProps {
  data: ProgramData;
  updateData: (data: Partial<ProgramData>) => void;
}

export function ObituaryStep({ data, updateData }: ObituaryStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Life Story</h2>
        <p className="text-muted-foreground">
          Share the story of your loved one's life, achievements, and legacy.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="obituary">Obituary / Life Story</Label>
          <Textarea
            id="obituary"
            value={data.obituary || ''}
            onChange={(e) => updateData({ obituary: e.target.value })}
            placeholder="Share their life story, including education, career, hobbies, achievements, and what they meant to family and friends..."
            className="mt-2 min-h-[300px]"
          />
        </div>

        <Card className="p-4 bg-muted/50">
          <h3 className="font-medium mb-2">Writing Tips:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Start with their full name and age</li>
            <li>• Include birth and death dates and locations</li>
            <li>• Mention surviving family members</li>
            <li>• Share their education and career highlights</li>
            <li>• Include hobbies, interests, and passions</li>
            <li>• Describe their character and what made them special</li>
            <li>• End with service information or memorial contributions</li>
          </ul>
        </Card>

        <div>
          <Label htmlFor="memories">Favorite Memories (optional)</Label>
          <Textarea
            id="memories"
            value={data.favoriteMemories || ''}
            onChange={(e) => updateData({ favoriteMemories: e.target.value })}
            placeholder="Share special memories, funny stories, or meaningful moments..."
            className="mt-2 min-h-[150px]"
          />
        </div>
      </div>
    </div>
  );
}