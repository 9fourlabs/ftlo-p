import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProgramData } from '../MultiStepProgramForm';

interface ServiceStepProps {
  data: ProgramData;
  updateData: (data: Partial<ProgramData>) => void;
}

export function ServiceStep({ data, updateData }: ServiceStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Service Details</h2>
        <p className="text-muted-foreground">
          Provide information about the memorial service.
        </p>
      </div>

      <div>
        <Label htmlFor="serviceName">Service Type</Label>
        <Input
          id="serviceName"
          value={data.serviceName || ''}
          onChange={(e) => updateData({ serviceName: e.target.value })}
          placeholder="Memorial Service, Celebration of Life, Funeral Service, etc."
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="serviceDate">Service Date</Label>
          <Input
            id="serviceDate"
            type="date"
            value={data.serviceDate || ''}
            onChange={(e) => updateData({ serviceDate: e.target.value })}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="serviceTime">Service Time</Label>
          <Input
            id="serviceTime"
            type="time"
            value={data.serviceTime || ''}
            onChange={(e) => updateData({ serviceTime: e.target.value })}
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="venue">Venue Name</Label>
        <Input
          id="venue"
          value={data.venue || ''}
          onChange={(e) => updateData({ venue: e.target.value })}
          placeholder="St. Mary's Church, Riverside Funeral Home, etc."
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="venueAddress">Venue Address</Label>
        <Textarea
          id="venueAddress"
          value={data.venueAddress || ''}
          onChange={(e) => updateData({ venueAddress: e.target.value })}
          placeholder="123 Main Street&#10;City, State 12345"
          className="mt-2"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="officiant">Officiant</Label>
        <Input
          id="officiant"
          value={data.officiant || ''}
          onChange={(e) => updateData({ officiant: e.target.value })}
          placeholder="Pastor John Smith, Rabbi Sarah Cohen, etc."
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="additionalInfo">Additional Service Information</Label>
        <Textarea
          id="additionalInfo"
          value={data.additionalInfo || ''}
          onChange={(e) => updateData({ additionalInfo: e.target.value })}
          placeholder="Reception details, special instructions, dress code, etc."
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  );
}