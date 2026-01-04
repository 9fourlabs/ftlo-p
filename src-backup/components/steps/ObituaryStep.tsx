import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useProgramStore } from '@/store/programStore';
import { FileText, Lightbulb, Heart } from 'lucide-react';

const obituarySchema = z.object({
  obituary: z.string().optional(),
});

type ObituaryFormData = z.infer<typeof obituarySchema>;

const obituaryPrompts = [
  "Tell us about their early life and childhood...",
  "What were their greatest accomplishments?",
  "How did they meet their spouse/partner?",
  "What hobbies or interests did they pursue?",
  "What values did they instill in their children?",
  "How will they be remembered by friends and family?",
  "What legacy do they leave behind?",
];

const sampleObituary = `John was born on March 15, 1945, in Springfield, where he spent his childhood surrounded by a loving family. He served his country proudly in the Vietnam War before returning home to begin a successful career in education.

As a devoted husband to Mary for 52 years and loving father to three children, John's greatest joy came from family gatherings and watching his grandchildren grow. He was known for his kind heart, generous spirit, and the way he could light up any room with his infectious laugh.

John touched countless lives through his 30-year career as a high school principal, where he was beloved by students and colleagues alike. He believed deeply in the potential of every student and worked tirelessly to help them succeed.

In his retirement, John enjoyed gardening, fishing, and volunteering at the local food bank. His legacy lives on through the many lives he touched and the values he instilled in those who knew him.`;

export function ObituaryStep() {
  const { program, updateProgram } = useProgramStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ObituaryFormData>({
    resolver: zodResolver(obituarySchema),
    defaultValues: {
      obituary: program.obituary || '',
    },
  });

  const watchedValues = watch();

  // Update store when form values change
  React.useEffect(() => {
    updateProgram(watchedValues);
  }, [watchedValues, updateProgram]);

  const handleUseSample = () => {
    setValue('obituary', sampleObituary);
  };

  const onSubmit = (data: ObituaryFormData) => {
    updateProgram(data);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Life Story & Obituary
        </h3>
        <p className="text-gray-600">
          Share their story, accomplishments, and the legacy they leave behind
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Writing Prompts */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Lightbulb className="mr-2 h-5 w-5" />
                Writing Prompts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Use these prompts to help you craft their story:
              </p>
              <ul className="space-y-3">
                {obituaryPrompts.map((prompt, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></div>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleUseSample}
                  className="w-full"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Use Sample Obituary
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  This will populate the text area with an example that you can customize
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Obituary Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Heart className="mr-2 h-5 w-5" />
                  Their Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="obituary">Life Story & Obituary</Label>
                  <Textarea
                    id="obituary"
                    placeholder="Tell their story... Share about their life, accomplishments, family, interests, and the impact they had on others. This will be featured prominently in the memorial program."
                    rows={16}
                    className="mt-2"
                    {...register('obituary')}
                    error={!!errors.obituary}
                  />
                  {errors.obituary && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.obituary.message}
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {watch('obituary')?.length || 0} characters
                    </span>
                    <span>
                      Recommended: 300-600 words
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    💡 Writing Tips
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Start with basic biographical information (birth, death, family)</li>
                    <li>• Include their career, education, and achievements</li>
                    <li>• Mention hobbies, interests, and personality traits</li>
                    <li>• Share how they'll be remembered and their lasting impact</li>
                    <li>• Keep the tone warm and celebrating their life</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}