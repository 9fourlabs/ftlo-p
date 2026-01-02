import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProgramStore } from '@/store/programStore';
import { Calendar, MapPin, User } from 'lucide-react';

const lovedOneSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  nickname: z.string().optional(),
  birthDate: z.string().min(1, 'Birth date is required'),
  deathDate: z.string().min(1, 'Date of passing is required'),
  birthPlace: z.string().optional(),
  deathPlace: z.string().optional(),
});

type LovedOneFormData = z.infer<typeof lovedOneSchema>;

export function LovedOneStep() {
  const { program, updateProgram } = useProgramStore();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LovedOneFormData>({
    resolver: zodResolver(lovedOneSchema),
    defaultValues: {
      firstName: program.firstName || '',
      lastName: program.lastName || '',
      middleName: program.middleName || '',
      nickname: program.nickname || '',
      birthDate: program.birthDate || '',
      deathDate: program.deathDate || '',
      birthPlace: program.birthPlace || '',
      deathPlace: program.deathPlace || '',
    },
  });

  const watchedValues = watch();

  // Update store when form values change
  React.useEffect(() => {
    updateProgram(watchedValues);
  }, [watchedValues, updateProgram]);

  const onSubmit = (data: LovedOneFormData) => {
    updateProgram(data);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          About Your Loved One
        </h3>
        <p className="text-gray-600">
          Tell us about the person being honored so we can personalize their program
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <User className="mr-2 h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  {...register('firstName')}
                  error={!!errors.firstName}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  {...register('lastName')}
                  error={!!errors.lastName}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  placeholder="Middle name (optional)"
                  {...register('middleName')}
                  error={!!errors.middleName}
                />
              </div>

              <div>
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  placeholder='Known as (e.g., "Big Mama")'
                  {...register('nickname')}
                  error={!!errors.nickname}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Dates */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Important Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="birthDate">Date of Birth *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  {...register('birthDate')}
                  error={!!errors.birthDate}
                />
                {errors.birthDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.birthDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="deathDate">Date of Passing *</Label>
                <Input
                  id="deathDate"
                  type="date"
                  {...register('deathDate')}
                  error={!!errors.deathDate}
                />
                {errors.deathDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.deathDate.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Places */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Places
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="birthPlace">Place of Birth</Label>
                <Input
                  id="birthPlace"
                  placeholder="City, State"
                  {...register('birthPlace')}
                  error={!!errors.birthPlace}
                />
              </div>

              <div>
                <Label htmlFor="deathPlace">Place of Passing</Label>
                <Input
                  id="deathPlace"
                  placeholder="City, State"
                  {...register('deathPlace')}
                  error={!!errors.deathPlace}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}