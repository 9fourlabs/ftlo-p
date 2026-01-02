import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useProgramStore } from '../../store/programStore';

const schema = z.object({
  serviceName: z.string().min(1, 'Service name is required'),
  serviceDate: z.string().optional(),
  serviceTime: z.string().optional(),
  venue: z.string().optional(),
  venueAddress: z.string().optional(),
});

const SERVICE_OPTIONS = [
  'Homegoing Celebration',
  'Memorial Service',
  'Funeral Service',
  'Celebration of Life',
  'Viewing & Service',
];

export function ServiceStep() {
  const { service, updateService, nextStep, prevStep } = useProgramStore();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: service,
  });
  
  const serviceName = watch('serviceName');
  
  const onSubmit = (data: z.infer<typeof schema>) => {
    updateService(data);
    nextStep();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl text-navy-800 mb-3">
          Service Details
        </h2>
        <p className="text-navy-600 font-body">
          Tell us about the service to include in the program
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-3">
            Type of Service *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {SERVICE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setValue('serviceName', option)}
                className={`p-4 rounded-lg border-2 text-left font-body transition-all ${
                  serviceName === option
                    ? 'border-gold-500 bg-gold-50 text-gold-800'
                    : 'border-cream-400 bg-white text-navy-700 hover:border-gold-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.serviceName && (
            <p className="mt-1 text-sm text-rose-500">{errors.serviceName.message}</p>
          )}
        </div>
        
        {/* Custom Service Name */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Custom Service Name
          </label>
          <input
            {...register('serviceName')}
            className="w-full px-4 py-3 rounded-lg border border-cream-400 
                       focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                       transition-all bg-white font-body"
            placeholder="Or enter your own service name"
          />
        </div>
        
        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Service Date
            </label>
            <input
              type="date"
              {...register('serviceDate')}
              className="w-full px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Service Time
            </label>
            <input
              type="time"
              {...register('serviceTime')}
              className="w-full px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
            />
          </div>
        </div>
        
        {/* Venue */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Venue Name
          </label>
          <input
            {...register('venue')}
            className="w-full px-4 py-3 rounded-lg border border-cream-400 
                       focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                       transition-all bg-white font-body"
            placeholder="e.g., First Baptist Church"
          />
        </div>
        
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-2">
            Venue Address
          </label>
          <textarea
            {...register('venueAddress')}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-cream-400 
                       focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                       transition-all bg-white font-body resize-none"
            placeholder="Full address including city and state"
          />
        </div>
        
        {/* Navigation */}
        <div className="pt-6 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-3 text-navy-700 font-body font-medium 
                       hover:text-navy-900 transition-colors"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-navy-800 text-cream-100 rounded-lg 
                       font-body font-medium hover:bg-navy-700 
                       transition-colors shadow-lg hover:shadow-xl"
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
}