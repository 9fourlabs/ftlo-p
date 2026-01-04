import { format } from 'date-fns';
import { useProgramStore } from '../../store/programStore';

interface TemplateProps {
  editable?: boolean;
}

export function ClassicEleganceTemplate({ editable = false }: TemplateProps) {
  const { program } = useProgramStore();
  
  const primaryPhoto = program.photos?.find((p: any) => p.isPrimary) || program.photos?.[0];
  const fullName = [program.firstName, program.middleName, program.lastName]
    .filter(Boolean)
    .join(' ');
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'MMMM d, yyyy');
    } catch {
      return dateStr;
    }
  };
  
  const lifeSpan = () => {
    if (!program.birthDate || !program.deathDate) return '';
    try {
      const birth = format(new Date(program.birthDate), 'MMMM d, yyyy');
      const death = format(new Date(program.deathDate), 'MMMM d, yyyy');
      return `${birth} ~ ${death}`;
    } catch {
      return `${program.birthDate} ~ ${program.deathDate}`;
    }
  };
  
  return (
    <div className="w-[8.5in] min-h-[11in] bg-white mx-auto shadow-2xl font-body print:shadow-none">
      {/* Front Cover - Page 1 */}
      <div 
        className="w-full h-[11in] relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1a2744 0%, #273c5c 100%)',
        }}
      >
        {/* Decorative border */}
        <div className="absolute inset-4 border-2 border-gold-500/30 rounded-lg" />
        <div className="absolute inset-6 border border-gold-500/20 rounded-lg" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-12 text-center">
          {/* "In Loving Memory" */}
          <p className="font-display text-gold-400 text-xl tracking-[0.3em] uppercase mb-8">
            In Loving Memory
          </p>
          
          {/* Photo */}
          {primaryPhoto && (
            <div className="w-64 h-80 rounded-lg overflow-hidden border-4 border-gold-500/50 shadow-2xl mb-8">
              <img
                src={primaryPhoto.url}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Name */}
          <h1 className="font-display text-4xl text-cream-100 mb-2">
            {fullName || 'Name will appear here'}
          </h1>
          
          {program.nickname && (
            <p className="font-display text-xl text-gold-400 italic mb-4">
              "{program.nickname}"
            </p>
          )}
          
          {/* Life Span */}
          <p className="font-body text-cream-200 text-lg">
            {lifeSpan() || 'Dates will appear here'}
          </p>
          
          {/* Service Info */}
          <div className="absolute bottom-16 left-0 right-0 text-center">
            <p className="font-display text-cream-100 text-lg mb-1">
              {program.serviceName || 'Service name'}
            </p>
            <p className="font-body text-cream-300 text-sm">
              {program.serviceDate && program.serviceTime 
                ? `${formatDate(program.serviceDate)} • ${program.serviceTime}`
                : 'Date and time will appear here'
              }
            </p>
            <p className="font-body text-cream-300 text-sm">
              {program.venue || 'Venue will appear here'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Inside Left - Page 2 (Obituary) */}
      <div className="w-full min-h-[11in] bg-cream-100 p-12">
        <h2 className="font-display text-2xl text-navy-800 text-center mb-8 
                       border-b-2 border-gold-400 pb-4">
          Obituary
        </h2>
        
        <div 
          className="font-body text-navy-700 leading-relaxed prose prose-navy max-w-none"
          contentEditable={editable}
          suppressContentEditableWarning
        >
          {program.obituary ? (
            <p>{program.obituary}</p>
          ) : (
            <p className="text-navy-400 italic">
              The obituary will appear here. Share their life story, achievements, and the impact they had on family and friends.
            </p>
          )}
        </div>
        
        {/* Family */}
        {((program.children && program.children.length > 0) || (program.siblings && program.siblings.length > 0) || program.spouse || program.parents) && (
          <div className="mt-12">
            <h3 className="font-display text-xl text-navy-800 mb-4">
              Left to Cherish Their Memory
            </h3>
            
            {program.spouse && (
              <p className="font-body text-navy-700 mb-2">
                <span className="font-medium">Spouse:</span> {program.spouse}
              </p>
            )}
            
            {program.children && program.children.length > 0 && (
              <p className="font-body text-navy-700 mb-2">
                <span className="font-medium">Children:</span>{' '}
                {program.children.join(', ')}
              </p>
            )}
            
            {program.siblings && program.siblings.length > 0 && (
              <p className="font-body text-navy-700 mb-2">
                <span className="font-medium">Siblings:</span>{' '}
                {program.siblings.join(', ')}
              </p>
            )}
            
            {program.parents && (
              <p className="font-body text-navy-700 mb-2">
                <span className="font-medium">Parents:</span> {program.parents}
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Inside Right - Page 3 (Order of Service) */}
      <div className="w-full min-h-[11in] bg-cream-100 p-12">
        <h2 className="font-display text-2xl text-navy-800 text-center mb-8 
                       border-b-2 border-gold-400 pb-4">
          Order of Service
        </h2>
        
        <div className="space-y-4">
          {program.timeline?.map((event, index) => (
            <div key={event.id} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-navy-800 text-cream-100 
                              flex items-center justify-center text-sm font-medium flex-shrink-0">
                {index + 1}
              </div>
              <div>
                <p className="font-body font-medium text-navy-800">
                  {event.title}
                </p>
                {event.description && (
                  <p className="font-body text-sm text-navy-600 italic">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {(!program.timeline || program.timeline.length === 0) && (
          <p className="text-center text-navy-400 italic py-8">
            Order of service will appear here. Add events in the program.timeline step to see them displayed.
          </p>
        )}
      </div>
      
      {/* Back Cover - Page 4 */}
      <div 
        className="w-full h-[11in] relative overflow-hidden flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #1a2744 0%, #273c5c 100%)',
        }}
      >
        {/* Photo collage */}
        {program.photos && program.photos.length > 1 && (
          <div className="grid grid-cols-2 gap-4 p-8 max-w-md">
            {program.photos?.slice(1, 5).map((photo) => (
              <div 
                key={photo.id}
                className="aspect-square rounded-lg overflow-hidden border-2 border-gold-500/30"
              >
                <img
                  src={photo.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Thank You Message */}
        <div className="text-center px-12 mt-8">
          <p className="font-display text-2xl text-cream-100 mb-4">
            Thank You
          </p>
          <p className="font-body text-cream-300 max-w-md">
            The family of {program.firstName || '[Name]'} {program.lastName || '[Last Name]'} wishes to express 
            their sincere gratitude for your love, prayers, and support during this time.
          </p>
        </div>
      </div>
    </div>
  );
}