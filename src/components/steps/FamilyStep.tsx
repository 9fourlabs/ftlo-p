import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useProgramStore } from '@/store/programStore';
import { Users, Heart, Plus, X, Baby } from 'lucide-react';

const familySchema = z.object({
  parents: z.string().optional(),
  spouse: z.string().optional(),
});

type FamilyFormData = z.infer<typeof familySchema>;

export function FamilyStep() {
  const { program, updateProgram } = useProgramStore();
  
  const [childName, setChildName] = useState('');
  const [siblingName, setSiblingName] = useState('');
  const [children, setChildren] = useState<string[]>(program.children || []);
  const [siblings, setSiblings] = useState<string[]>(program.siblings || []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FamilyFormData>({
    resolver: zodResolver(familySchema),
    defaultValues: {
      parents: program.parents || '',
      spouse: program.spouse || '',
    },
  });

  const watchedValues = watch();

  // Update store when form values change
  React.useEffect(() => {
    updateProgram({
      ...watchedValues,
      children,
      siblings,
    });
  }, [watchedValues, children, siblings, updateProgram]);
  
  const handleAddChild = () => {
    if (childName.trim()) {
      const newChildren = [...children, childName.trim()];
      setChildren(newChildren);
      setChildName('');
    }
  };
  
  const handleRemoveChild = (index: number) => {
    const newChildren = children.filter((_, i) => i !== index);
    setChildren(newChildren);
  };
  
  const handleAddSibling = () => {
    if (siblingName.trim()) {
      const newSiblings = [...siblings, siblingName.trim()];
      setSiblings(newSiblings);
      setSiblingName('');
    }
  };
  
  const handleRemoveSibling = (index: number) => {
    const newSiblings = siblings.filter((_, i) => i !== index);
    setSiblings(newSiblings);
  };

  const onSubmit = (data: FamilyFormData) => {
    updateProgram({
      ...data,
      children,
      siblings,
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Family Information
        </h3>
        <p className="text-gray-600">
          Add family members to honor their memory and relationships
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parents & Spouse */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Heart className="mr-2 h-5 w-5" />
              Parents & Spouse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="parents">Parents</Label>
              <Input
                id="parents"
                placeholder="e.g., John and Mary Smith"
                {...register('parents')}
                error={!!errors.parents}
              />
              {errors.parents && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.parents.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="spouse">Spouse</Label>
              <Input
                id="spouse"
                placeholder="Spouse's name"
                {...register('spouse')}
                error={!!errors.spouse}
              />
              {errors.spouse && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.spouse.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Children */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Baby className="mr-2 h-5 w-5" />
              Children
              {children.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {children.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddChild())}
                placeholder="Add child's name"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddChild}
                disabled={!childName.trim()}
                size="sm"
                className="px-4"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>

            {children.length > 0 && (
              <div className="space-y-2">
                {children.map((child, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-900">{child}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveChild(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {children.length === 0 && (
              <p className="text-sm text-gray-500 italic text-center py-4">
                No children added yet. Use the form above to add children.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Siblings */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Siblings
              {siblings.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {siblings.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={siblingName}
                onChange={(e) => setSiblingName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSibling())}
                placeholder="Add sibling's name"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddSibling}
                disabled={!siblingName.trim()}
                size="sm"
                className="px-4"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>

            {siblings.length > 0 && (
              <div className="space-y-2">
                {siblings.map((sibling, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-900">{sibling}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSibling(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {siblings.length === 0 && (
              <p className="text-sm text-gray-500 italic text-center py-4">
                No siblings added yet. Use the form above to add siblings.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="pt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            💡 Family Information Tips
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Include both biological and chosen family members</li>
            <li>• You can add step-children, adopted children, or close family friends</li>
            <li>• Don't worry about getting everything perfect - you can always edit later</li>
            <li>• Consider adding "predeceased by" information for family members who have passed</li>
          </ul>
        </div>
      </form>
    </div>
  );
}