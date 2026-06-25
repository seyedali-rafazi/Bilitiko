import { Users } from 'lucide-react';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { Separator } from '@/components/ui/shadcn/separator';
import type { TransportTrip } from '@/lib/transport-utils';
import AirlineLogo from '../flights/AirlineLogo';

interface MobileTransportCardProps {
  trip: TransportTrip;
  onSelect: (id: number) => void;
  type: 'bus' | 'train';
}

export default function MobileTransportCard({ trip, onSelect, type }: MobileTransportCardProps) {
  const label = type === 'bus' ? 'اتوبوس' : 'قطار';
  
  return (
    <Card className="lg:hidden overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AirlineLogo airline={trip.company} size="sm" />
            <div>
              <h3 className="text-sm font-bold">{trip.company}</h3>
              <p className="text-xs text-muted-foreground">{trip.tripNumber}</p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-lg font-bold text-primary">{trip.price.toLocaleString('fa-IR')}</p>
            <p className="text-xs text-muted-foreground">تومان</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-0.5">مبدا</p>
            <p className="text-base font-bold">{trip.departureTime}</p>
            <p className="text-xs text-muted-foreground">{trip.origin}</p>
          </div>

          <div className="flex-shrink-0 text-center px-2">
            <div className="text-xs text-muted-foreground mb-1">{trip.duration}</div>
            <div className="h-px w-12 bg-border mb-1"></div>
            <div className="text-xs text-primary font-medium">{label}</div>
          </div>

          <div className="flex-1 text-left">
            <p className="text-xs text-muted-foreground mb-0.5">مقصد</p>
            <p className="text-base font-bold">{trip.arrivalTime}</p>
            <p className="text-xs text-muted-foreground">{trip.destination}</p>
          </div>
        </div>

        {trip.features.length > 0 && (
          <>
            <Separator className="my-3" />
            <div className="flex flex-wrap gap-1.5 mb-3">
              {trip.features.map((feature) => (
                <span
                  key={feature}
                  className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md"
                >
                  {feature}
                </span>
              ))}
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-status-success" />
            <span>{trip.availableSeats.toLocaleString('fa-IR')} صندلی</span>
          </div>
          <Button onClick={() => onSelect(trip._id)} size="sm">
            رزرو بلیط
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

