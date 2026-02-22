'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X, Users, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  isDeceased?: boolean;
}

interface FamilyInformationFormProps {
  onSubmit: (data: FamilyData) => void;
  initialData?: FamilyData;
}

export interface FamilyData {
  spouse?: string;
  children: string[];
  grandchildrenCount: number;
  greatGrandchildrenCount: number;
  siblings: FamilyMember[];
  parents: FamilyMember[];
  otherFamily: FamilyMember[];
  pallbearers: string[];
  honoraryPallbearers: string[];
}

export function FamilyInformationForm({ onSubmit, initialData }: FamilyInformationFormProps) {
  const [formData, setFormData] = useState<FamilyData>(initialData || {
    spouse: '',
    children: [],
    grandchildrenCount: 0,
    greatGrandchildrenCount: 0,
    siblings: [],
    parents: [],
    otherFamily: [],
    pallbearers: [],
    honoraryPallbearers: [],
  });

  const [childInput, setChildInput] = useState('');
  const [pallbearerInput, setPallbearerInput] = useState('');
  const [honoraryPallbearerInput, setHonoraryPallbearerInput] = useState('');

  const addChild = () => {
    if (childInput.trim()) {
      setFormData({
        ...formData,
        children: [...formData.children, childInput.trim()],
      });
      setChildInput('');
    }
  };

  const removeChild = (index: number) => {
    setFormData({
      ...formData,
      children: formData.children.filter((_, i) => i !== index),
    });
  };

  const addPallbearer = () => {
    if (pallbearerInput.trim()) {
      setFormData({
        ...formData,
        pallbearers: [...formData.pallbearers, pallbearerInput.trim()],
      });
      setPallbearerInput('');
    }
  };

  const removePallbearer = (index: number) => {
    setFormData({
      ...formData,
      pallbearers: formData.pallbearers.filter((_, i) => i !== index),
    });
  };

  const addHonoraryPallbearer = () => {
    if (honoraryPallbearerInput.trim()) {
      setFormData({
        ...formData,
        honoraryPallbearers: [...formData.honoraryPallbearers, honoraryPallbearerInput.trim()],
      });
      setHonoraryPallbearerInput('');
    }
  };

  const removeHonoraryPallbearer = (index: number) => {
    setFormData({
      ...formData,
      honoraryPallbearers: formData.honoraryPallbearers.filter((_, i) => i !== index),
    });
  };

  const addFamilyMember = (type: 'siblings' | 'parents' | 'otherFamily') => {
    const newMember: FamilyMember = {
      id: `${type}-${Date.now()}`,
      name: '',
      relationship: type === 'siblings' ? 'Sister' : type === 'parents' ? 'Mother' : 'Relative',
      isDeceased: false,
    };
    
    setFormData({
      ...formData,
      [type]: [...formData[type], newMember],
    });
  };

  const updateFamilyMember = (type: 'siblings' | 'parents' | 'otherFamily', id: string, field: keyof FamilyMember, value: any) => {
    setFormData({
      ...formData,
      [type]: formData[type].map(member => 
        member.id === id ? { ...member, [field]: value } : member
      ),
    });
  };

  const removeFamilyMember = (type: 'siblings' | 'parents' | 'otherFamily', id: string) => {
    setFormData({
      ...formData,
      [type]: formData[type].filter(member => member.id !== id),
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Immediate Family
          </CardTitle>
          <CardDescription>
            Information about the closest family members
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Spouse */}
          <div>
            <Label htmlFor="spouse">Spouse/Partner</Label>
            <Input
              id="spouse"
              value={formData.spouse || ''}
              onChange={(e) => setFormData({ ...formData, spouse: e.target.value })}
              placeholder="Enter spouse or partner's name"
            />
          </div>

          {/* Children */}
          <div>
            <Label>Children</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={childInput}
                  onChange={(e) => setChildInput(e.target.value)}
                  placeholder="Enter child's name"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addChild())}
                />
                <Button type="button" onClick={addChild} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                {formData.children.map((child, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="flex-1">{child}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeChild(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grandchildren */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="grandchildren">Number of Grandchildren</Label>
              <Input
                id="grandchildren"
                type="number"
                min="0"
                value={formData.grandchildrenCount}
                onChange={(e) => setFormData({ ...formData, grandchildrenCount: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="greatGrandchildren">Number of Great-Grandchildren</Label>
              <Input
                id="greatGrandchildren"
                type="number"
                min="0"
                value={formData.greatGrandchildrenCount}
                onChange={(e) => setFormData({ ...formData, greatGrandchildrenCount: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extended Family */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Extended Family
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Parents */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Parents</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addFamilyMember('parents')}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Parent
              </Button>
            </div>
            <div className="space-y-2">
              {formData.parents.map((parent) => (
                <div key={parent.id} className="flex gap-2 items-start">
                  <Input
                    placeholder="Name"
                    value={parent.name}
                    onChange={(e) => updateFamilyMember('parents', parent.id, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <select
                    className="px-3 py-2 border rounded-md"
                    value={parent.relationship}
                    onChange={(e) => updateFamilyMember('parents', parent.id, 'relationship', e.target.value)}
                  >
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Stepmother">Stepmother</option>
                    <option value="Stepfather">Stepfather</option>
                  </select>
                  <div className="flex items-center gap-1">
                    <Checkbox
                      checked={parent.isDeceased}
                      onCheckedChange={(checked) => updateFamilyMember('parents', parent.id, 'isDeceased', checked)}
                    />
                    <Label className="text-xs">Deceased</Label>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFamilyMember('parents', parent.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Siblings */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Siblings</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addFamilyMember('siblings')}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Sibling
              </Button>
            </div>
            <div className="space-y-2">
              {formData.siblings.map((sibling) => (
                <div key={sibling.id} className="flex gap-2 items-start">
                  <Input
                    placeholder="Name"
                    value={sibling.name}
                    onChange={(e) => updateFamilyMember('siblings', sibling.id, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <select
                    className="px-3 py-2 border rounded-md"
                    value={sibling.relationship}
                    onChange={(e) => updateFamilyMember('siblings', sibling.id, 'relationship', e.target.value)}
                  >
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                    <option value="Stepsister">Stepsister</option>
                    <option value="Stepbrother">Stepbrother</option>
                  </select>
                  <div className="flex items-center gap-1">
                    <Checkbox
                      checked={sibling.isDeceased}
                      onCheckedChange={(checked) => updateFamilyMember('siblings', sibling.id, 'isDeceased', checked)}
                    />
                    <Label className="text-xs">Deceased</Label>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFamilyMember('siblings', sibling.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pallbearers */}
      <Card>
        <CardHeader>
          <CardTitle>Pallbearers</CardTitle>
          <CardDescription>
            Those who will carry or escort the casket
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Pallbearers</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={pallbearerInput}
                  onChange={(e) => setPallbearerInput(e.target.value)}
                  placeholder="Enter pallbearer's name"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPallbearer())}
                />
                <Button type="button" onClick={addPallbearer} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                {formData.pallbearers.map((pallbearer, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="flex-1">{pallbearer}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePallbearer(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label>Honorary Pallbearers</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={honoraryPallbearerInput}
                  onChange={(e) => setHonoraryPallbearerInput(e.target.value)}
                  placeholder="Enter honorary pallbearer's name"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHonoraryPallbearer())}
                />
                <Button type="button" onClick={addHonoraryPallbearer} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                {formData.honoraryPallbearers.map((pallbearer, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="flex-1">{pallbearer}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHonoraryPallbearer(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg">
          Continue to Next Step
        </Button>
      </div>
    </div>
  );
}