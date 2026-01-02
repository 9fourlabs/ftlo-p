import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useProgramStore } from '../../store/programStore';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  nickname: z.string().optional(),
  birthDate: z.string().min(1, 'Birth date is required'),
  deathDate: z.string().min(1, 'Date of passing is required'),
  birthPlace: z.string().optional(),
  deathPlace: z.string().optional(),
});

export function LovedOneStep() {
  const { lovedOne, updateLovedOne, nextStep } = useProgramStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: lovedOne,
  });
  
  const onSubmit = (data: z.infer<typeof schema>) => {
    updateLovedOne(data);
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
          Tell us about your loved one
        </h2>
        <p className="text-navy-600 font-body">
          We'll use this information to personalize their program
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              First Name *
            </label>
            <input
              {...register('firstName')}
              className="w-full px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
              placeholder="First name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-rose-500">{errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Last Name *
            </label>
            <input
              {...register('lastName')}
              className="w-full px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
              placeholder="Last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-rose-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Middle Name
            </label>
            <input
              {...register('middleName')}
              className="w-full px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
              placeholder="Middle name (optional)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Nickname
            </label>
            <input
              {...register('nickname')}
              className="w-full px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
              placeholder='Known as (e.g., "Big Mama")'
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              {...register('birthDate')}
              className="w-full px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-rose-500">{errors.birthDate.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Date of Passing *
            </label>
            <input
              type="date"
              {...register('deathDate')}
              className="w-full px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
            />
            {errors.deathDate && (
              <p className="mt-1 text-sm text-rose-500">{errors.deathDate.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Place of Birth
            </label>
            <input
              {...register('birthPlace')}
              className="w-full px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
              placeholder="City, State"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Place of Passing
            </label>
            <input
              {...register('deathPlace')}
              className="w-full px-4 py-3 rounded-lg border border-cream-400 
                         focus:border-gold-500 focus:ring-2 focus:ring-gold-200 
                         transition-all bg-white font-body"
              placeholder="City, State"
            />
          </div>
        </div>
        
        <div className="pt-6 flex justify-end">
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