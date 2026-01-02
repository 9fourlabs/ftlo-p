import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProgramStore } from '@/store/programStore';
import { Calendar, MapPin, User, Heart, CheckCircle, AlertCircle } from 'lucide-react';

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
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<LovedOneFormData>({
    resolver: zodResolver(lovedOneSchema),
    mode: 'onChange',
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
    // Only update if there are actual changes to avoid infinite loops
    const hasChanges = Object.entries(watchedValues).some(([key, value]) => {
      return program[key as keyof typeof program] !== value;
    });
    
    if (hasChanges) {
      updateProgram(watchedValues);
    }
  }, [watchedValues, updateProgram, program]);

  // Track completed fields
  React.useEffect(() => {
    const newCompletedFields = new Set<string>();
    Object.entries(watchedValues).forEach(([key, value]) => {
      if (value && typeof value === 'string' && value.trim()) {
        newCompletedFields.add(key);
      }
    });
    setCompletedFields(newCompletedFields);
  }, [watchedValues]);

  const onSubmit = (data: LovedOneFormData) => {
    updateProgram(data);
  };

  const handleFieldFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleFieldBlur = async (fieldName: string) => {
    setFocusedField(null);
    await trigger(fieldName as keyof LovedOneFormData);
  };

  const renderFormField = (
    name: keyof LovedOneFormData,
    label: string,
    placeholder: string,
    type: string = 'text',
    required: boolean = false
  ) => {
    const hasError = !!errors[name];
    const isCompleted = completedFields.has(name);
    const isFocused = focusedField === name;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <Label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
        >
          {label} {required && <span className="text-red-500 ml-1">*</span>}
          {isCompleted && !hasError && (
            <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
          )}
        </Label>
        <div className="relative">
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            onFocus={() => handleFieldFocus(name)}
            onBlur={() => handleFieldBlur(name)}
            className={`input-modern transition-all duration-300 ${
              hasError 
                ? 'border-red-300 ring-red-100' 
                : isCompleted && !hasError
                ? 'border-green-300 ring-green-100'
                : isFocused
                ? 'border-orange-300 ring-orange-100'
                : ''
            } ${isFocused ? 'ring-4' : ''}`}
          />
          {hasError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <AlertCircle className="w-4 h-4 text-red-500" />
            </motion.div>
          )}
          {isCompleted && !hasError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
            </motion.div>
          )}
        </div>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-600 flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors[name]?.message}
          </motion.p>
        )}
      </motion.div>
    );
  };
  
  const completionPercentage = Math.round((completedFields.size / 8) * 100);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg"
          >
            <Heart className="w-6 h-6 text-white fill-white" />
          </motion.div>
        </div>
        <h3 className="text-title text-gray-900 mb-2">
          About Your Loved One
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share the essential details about the person being honored. This information will personalize their memorial program.
        </p>
        
        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 glass-card px-6 py-3 rounded-full inline-block"
        >
          <div className="flex items-center space-x-3">
            <div className="progress-modern w-24 h-2">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-sm text-gray-600">
              {completedFields.size} of 8 fields completed
            </span>
          </div>
        </motion.div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card-modern glass-card overflow-hidden">
            <CardHeader className="border-b border-white/20 bg-white/30">
              <CardTitle className="text-lg flex items-center text-gray-900">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mr-3"
                >
                  <User className="h-4 w-4 text-white" />
                </motion.div>
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFormField('firstName', 'First Name', 'Enter first name', 'text', true)}
                {renderFormField('lastName', 'Last Name', 'Enter last name', 'text', true)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFormField('middleName', 'Middle Name', 'Middle name (optional)')}
                {renderFormField('nickname', 'Nickname', 'Known as (e.g., "Big Mama")')}
              </div>
            </CardContent>
          </div>
        </motion.div>

        {/* Important Dates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-modern glass-card overflow-hidden">
            <CardHeader className="border-b border-white/20 bg-white/30">
              <CardTitle className="text-lg flex items-center text-gray-900">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-3"
                >
                  <Calendar className="h-4 w-4 text-white" />
                </motion.div>
                Important Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFormField('birthDate', 'Date of Birth', '', 'date', true)}
                {renderFormField('deathDate', 'Date of Passing', '', 'date', true)}
              </div>
            </CardContent>
          </div>
        </motion.div>

        {/* Places */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="card-modern glass-card overflow-hidden">
            <CardHeader className="border-b border-white/20 bg-white/30">
              <CardTitle className="text-lg flex items-center text-gray-900">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-3"
                >
                  <MapPin className="h-4 w-4 text-white" />
                </motion.div>
                Places
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderFormField('birthPlace', 'Place of Birth', 'City, State')}
                {renderFormField('deathPlace', 'Place of Passing', 'City, State')}
              </div>
            </CardContent>
          </div>
        </motion.div>

        {/* Form Validation Summary */}
        {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card border border-red-200 bg-red-50/50 p-6 rounded-xl"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Please fix the following errors:</h4>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside space-y-1">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>{error?.message}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}