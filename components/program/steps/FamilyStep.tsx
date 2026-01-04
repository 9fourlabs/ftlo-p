import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X } from 'lucide-react';
import { ProgramData } from '../MultiStepProgramForm';

interface FamilyStepProps {
  data: ProgramData;
  updateData: (data: Partial<ProgramData>) => void;
}

export function FamilyStep({ data, updateData }: FamilyStepProps) {
  const [newMember, setNewMember] = useState({ name: '', relationship: '', isDeceased: false });

  const addFamilyMember = () => {
    if (newMember.name && newMember.relationship) {
      const updatedMembers = [...data.familyMembers, {
        id: Date.now().toString(),
        ...newMember
      }];
      updateData({ familyMembers: updatedMembers });
      setNewMember({ name: '', relationship: '', isDeceased: false });
    }
  };

  const removeFamilyMember = (id: string) => {
    const updatedMembers = data.familyMembers.filter(member => member.id !== id);
    updateData({ familyMembers: updatedMembers });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Family Information</h2>
        <p className="text-muted-foreground">
          Add family members to be acknowledged in the program.
        </p>
      </div>

      {/* Existing Family Members */}
      {data.familyMembers.length > 0 && (
        <div className="space-y-3">
          <Label>Family Members</Label>
          {data.familyMembers.map((member) => (
            <Card key={member.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.relationship}
                    {member.isDeceased && ' (deceased)'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFamilyMember(member.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Family Member */}
      <Card className="p-4">
        <div className="space-y-4">
          <h3 className="font-medium">Add Family Member</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="memberName">Name</Label>
              <Input
                id="memberName"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                placeholder="Mary Smith"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                value={newMember.relationship}
                onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value })}
                placeholder="Daughter, Son, Sister, etc."
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isDeceased"
              checked={newMember.isDeceased}
              onCheckedChange={(checked) => 
                setNewMember({ ...newMember, isDeceased: checked as boolean })
              }
            />
            <Label htmlFor="isDeceased" className="font-normal cursor-pointer">
              Preceded in death
            </Label>
          </div>

          <Button
            type="button"
            onClick={addFamilyMember}
            disabled={!newMember.name || !newMember.relationship}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Family Member
          </Button>
        </div>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>Tip: List immediate family first (spouse, children), followed by extended family.</p>
      </div>
    </div>
  );
}