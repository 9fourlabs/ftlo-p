import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProgramStore } from '@/store/programStore';
import { MapPin, Users } from 'lucide-react';

const serviceSchema = z.object({
  serviceName: z.string().optional(),
  serviceDate: z.string().optional(),
  serviceTime: z.string().optional(),
  venue: z.string().optional(),
  venueAddress: z.string().optional(),
  officiant: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export function ServiceStep() {
  const { program, updateProgram } = useProgramStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceName: program.serviceName || '',
      serviceDate: program.serviceDate || '',
      serviceTime: program.serviceTime || '',
      venue: program.venue || '',
      venueAddress: program.venueAddress || '',
      officiant: program.officiant || '',
      additionalInfo: program.additionalInfo || '',
    },
  });

  const watchedValues = watch();

  // Update store when form values change
  React.useEffect(() => {
    updateProgram(watchedValues);
  }, [watchedValues, updateProgram]);

  const onSubmit = (data: ServiceFormData) => {
    updateProgram(data);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Service Information
        </h3>
        <p className="text-gray-600">
          Let us know when and where the memorial service will take place
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Service Name */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Service Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="serviceName">Service Name</Label>
              <Input
                id="serviceName"
                placeholder="e.g., Memorial Service, Celebration of Life"
                {...register('serviceName')}
                error={!!errors.serviceName}
              />
              {errors.serviceName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.serviceName.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="serviceDate">Date</Label>
                <Input
                  id="serviceDate"
                  type="date"
                  {...register('serviceDate')}
                  error={!!errors.serviceDate}
                />
                {errors.serviceDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.serviceDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="serviceTime">Time</Label>
                <Input
                  id="serviceTime"
                  type="time"
                  {...register('serviceTime')}
                  error={!!errors.serviceTime}
                />
                {errors.serviceTime && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.serviceTime.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="venue">Venue Name</Label>
              <Input
                id="venue"
                placeholder="e.g., St. Mary's Church, Johnson Funeral Home"
                {...register('venue')}
                error={!!errors.venue}
              />
              {errors.venue && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.venue.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="venueAddress">Address</Label>
              <Textarea
                id="venueAddress"
                placeholder="Full address including city, state, and zip code"
                rows={3}
                {...register('venueAddress')}
                error={!!errors.venueAddress}
              />
              {errors.venueAddress && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.venueAddress.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Officiant */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Service Leader
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="officiant">Officiant/Pastor/Leader</Label>
              <Input
                id="officiant"
                placeholder="e.g., Pastor John Smith, Rabbi Sarah Cohen"
                {...register('officiant')}
                error={!!errors.officiant}
              />
              {errors.officiant && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.officiant.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="additionalInfo">Special Instructions or Notes</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any special instructions, dress code, reception details, or other important information..."
                rows={4}
                {...register('additionalInfo')}
                error={!!errors.additionalInfo}
              />
              {errors.additionalInfo && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.additionalInfo.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}