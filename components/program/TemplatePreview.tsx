'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Edit,
  Palette,
  Type
} from 'lucide-react';
import { format } from 'date-fns';

interface TemplatePreviewProps {
  programData: {
    firstName: string;
    middleName?: string;
    lastName: string;
    nickname?: string;
    birthDate: Date | null;
    deathDate: Date | null;
    birthPlace: string;
    deathPlace: string;
    obituary: string;
    selectedTemplate: string;
    serviceEvents: Array<{
      id: string;
      type: string;
      title: string;
      performer?: string;
      duration?: number;
    }>;
    photos?: Array<{
      url: string;
      caption?: string;
      isPrimary?: boolean;
    }>;
  };
  onEdit?: (section: string) => void;
  className?: string;
}

// Template designs
const templateStyles: Record<string, any> = {
  'eternal-grace': {
    colors: { primary: '#D4AF37', secondary: '#1A1A1A', background: '#FDFBF7' },
    fonts: { heading: 'Playfair Display', body: 'Crimson Text' },
    style: 'traditional',
  },
  'peaceful-journey': {
    colors: { primary: '#4A7C7E', secondary: '#F0F4F8', background: '#E8D5C4' },
    fonts: { heading: 'Cormorant Garamond', body: 'Lora' },
    style: 'traditional',
  },
  'celebration-life': {
    colors: { primary: '#FF6B6B', secondary: '#4ECDC4', background: '#FFE66D' },
    fonts: { heading: 'Montserrat', body: 'Open Sans' },
    style: 'modern',
  },
  'minimal-memory': {
    colors: { primary: '#000000', secondary: '#FFFFFF', background: '#F5F5F5' },
    fonts: { heading: 'Helvetica Neue', body: 'Inter' },
    style: 'modern',
  },
  'garden-remembrance': {
    colors: { primary: '#F8B195', secondary: '#F67280', background: '#FFF5E7' },
    fonts: { heading: 'Playfair Display', body: 'Crimson Pro' },
    style: 'nature',
  },
};

export function TemplatePreview({ programData, onEdit, className }: TemplatePreviewProps) {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const previewRef = useRef<HTMLDivElement>(null);
  const template = templateStyles[programData.selectedTemplate] || templateStyles['eternal-grace'];

  const fullName = [
    programData.firstName,
    programData.middleName,
    programData.lastName
  ].filter(Boolean).join(' ');

  const lifeSpan = programData.birthDate && programData.deathDate
    ? `${format(programData.birthDate, 'MMMM d, yyyy')} - ${format(programData.deathDate, 'MMMM d, yyyy')}`
    : '';

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));

  const primaryPhoto = programData.photos?.find(p => p.isPrimary) || programData.photos?.[0];

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 200}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Palette className="h-4 w-4 mr-2" />
            Colors
          </Button>
          <Button variant="outline" size="sm">
            <Type className="h-4 w-4 mr-2" />
            Fonts
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print Preview
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <ScrollArea className="flex-1 bg-muted/50">
        <div className="p-8 flex justify-center">
          <div
            ref={previewRef}
            className="bg-white shadow-2xl transition-transform origin-top"
            style={{
              width: '8.5in',
              minHeight: '11in',
              transform: `scale(${zoom / 100})`,
              backgroundColor: template.colors.background,
              fontFamily: template.fonts.body,
            }}
          >
            {/* Page 1 - Cover */}
            {currentPage === 1 && (
              <div className="h-full flex flex-col p-16 text-center">
                {/* Decorative Border */}
                {template.style === 'traditional' && (
                  <div 
                    className="absolute inset-4 border-2 opacity-20"
                    style={{ borderColor: template.colors.primary }}
                  />
                )}

                <div className="flex-1 flex flex-col justify-center items-center space-y-8">
                  {/* Photo */}
                  {primaryPhoto ? (
                    <div 
                      className="w-48 h-48 rounded-full bg-gray-200 mx-auto overflow-hidden border-4"
                      style={{ borderColor: template.colors.primary }}
                    >
                      <img 
                        src={primaryPhoto.url} 
                        alt={fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-48 h-48 rounded-full bg-gray-100 mx-auto border-4"
                      style={{ borderColor: template.colors.primary }}
                    />
                  )}

                  {/* Name */}
                  <h1 
                    className="text-5xl font-bold"
                    style={{ 
                      fontFamily: template.fonts.heading,
                      color: template.colors.primary,
                    }}
                  >
                    {fullName}
                  </h1>

                  {/* Nickname */}
                  {programData.nickname && (
                    <p 
                      className="text-2xl italic"
                      style={{ color: template.colors.secondary }}
                    >
                      "{programData.nickname}"
                    </p>
                  )}

                  {/* Life Span */}
                  <p 
                    className="text-xl"
                    style={{ 
                      fontFamily: template.fonts.body,
                      color: template.colors.secondary,
                    }}
                  >
                    {lifeSpan}
                  </p>

                  {/* Decorative Element */}
                  {template.style === 'traditional' && (
                    <div 
                      className="w-24 h-0.5 mx-auto"
                      style={{ backgroundColor: template.colors.primary }}
                    />
                  )}
                </div>

                {/* Bottom Text */}
                <p 
                  className="text-lg italic mt-8"
                  style={{ color: template.colors.secondary }}
                >
                  A Celebration of Life
                </p>
              </div>
            )}

            {/* Page 2 - Obituary */}
            {currentPage === 2 && (
              <div className="p-16">
                <h2 
                  className="text-3xl font-bold text-center mb-8"
                  style={{ 
                    fontFamily: template.fonts.heading,
                    color: template.colors.primary,
                  }}
                >
                  Remembering {programData.firstName}
                </h2>

                <div 
                  className="text-base leading-relaxed whitespace-pre-wrap"
                  style={{ 
                    fontFamily: template.fonts.body,
                    color: template.colors.secondary,
                  }}
                >
                  {programData.obituary || 'Life story to be added...'}
                </div>

                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4"
                    onClick={() => onEdit('obituary')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Obituary
                  </Button>
                )}
              </div>
            )}

            {/* Page 3 - Order of Service */}
            {currentPage === 3 && (
              <div className="p-16">
                <h2 
                  className="text-3xl font-bold text-center mb-8"
                  style={{ 
                    fontFamily: template.fonts.heading,
                    color: template.colors.primary,
                  }}
                >
                  Order of Service
                </h2>

                <div className="space-y-6">
                  {programData.serviceEvents.map((event, index) => (
                    <div key={event.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 
                          className="font-semibold text-lg"
                          style={{ color: template.colors.primary }}
                        >
                          {event.title}
                        </h3>
                        {event.performer && (
                          <p 
                            className="text-sm italic"
                            style={{ color: template.colors.secondary }}
                          >
                            {event.performer}
                          </p>
                        )}
                      </div>
                      {event.duration && (
                        <span 
                          className="text-sm"
                          style={{ color: template.colors.secondary }}
                        >
                          {event.duration} min
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-8"
                    onClick={() => onEdit('timeline')}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Service Order
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Page Navigation */}
      <div className="flex items-center justify-center gap-4 p-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of 4
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, 4))}
          disabled={currentPage === 4}
        >
          Next
        </Button>
      </div>
    </div>
  );
}