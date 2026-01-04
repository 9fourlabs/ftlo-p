import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProgramData } from '../MultiStepProgramForm';

interface LovedOneStepProps {
  data: ProgramData;
  updateData: (data: Partial<ProgramData>) => void;
}

export function LovedOneStep({ data, updateData }: LovedOneStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">About Your Loved One</h2>
        <p className="text-muted-foreground">
          Let's start with some basic information about your loved one.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            placeholder="John"
            className="mt-2"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            placeholder="Doe"
            className="mt-2"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="middleName">Middle Name</Label>
          <Input
            id="middleName"
            value={data.middleName || ''}
            onChange={(e) => updateData({ middleName: e.target.value })}
            placeholder="William"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            value={data.nickname || ''}
            onChange={(e) => updateData({ nickname: e.target.value })}
            placeholder='e.g., "Bill" or "Grandpa Joe"'
            className="mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="birthDate">Date of Birth</Label>
          <Input
            id="birthDate"
            type="date"
            value={data.birthDate || ''}
            onChange={(e) => updateData({ birthDate: e.target.value })}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="deathDate">Date of Passing</Label>
          <Input
            id="deathDate"
            type="date"
            value={data.deathDate || ''}
            onChange={(e) => updateData({ deathDate: e.target.value })}
            className="mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="birthPlace">Place of Birth</Label>
          <Input
            id="birthPlace"
            value={data.birthPlace || ''}
            onChange={(e) => updateData({ birthPlace: e.target.value })}
            placeholder="City, State"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="deathPlace">Place of Passing</Label>
          <Input
            id="deathPlace"
            value={data.deathPlace || ''}
            onChange={(e) => updateData({ deathPlace: e.target.value })}
            placeholder="City, State"
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
}