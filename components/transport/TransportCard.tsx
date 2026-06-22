import { Users } from 'lucide-react';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { Separator } from '@/components/ui/shadcn/separator';
import type { TransportTrip } from '@/lib/transport-utils';
import AirlineLogo from '../flights/AirlineLogo';

interface TransportCardProps {
  trip: TransportTrip;
  index: number;
  onSelect: (id: number) => void;
  type: 'bus' | 'train';
}

export default function TransportCard({ trip, index, onSelect, type }: TransportCardProps) {
  const label = type === 'bus' ? 'اتوبوس' : 'قطار';
  
  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-md"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <CardContent className="flex items-stretch p-0">
        <div className="flex-1 p-5 lg:p-6">
          <div className="flex items-center gap-3 mb-5">
            <AirlineLogo airline={trip.company} size="lg" />
            <div className="min-w-0">
              <h3 className="text-base font-bold truncate">{trip.company}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{trip.tripNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">مبدا</p>
              <p className="text-lg font-bold">{trip.departureTime}</p>
              <p className="text-sm text-muted-foreground">{trip.origin}</p>
            </div>

            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-px flex-1 bg-border"></div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">{trip.duration}</div>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <div className="text-xs text-primary font-medium">{label}</div>
            </div>

            <div className="flex-1 text-left">
              <p className="text-xs text-muted-foreground mb-1">مقصد</p>
              <p className="text-lg font-bold">{trip.arrivalTime}</p>
              <p className="text-sm text-muted-foreground">{trip.destination}</p>
            </div>
          </div>

          {trip.features.length > 0 && (
            <>
              <Separator className="my-5" />
              <div className="flex flex-wrap gap-1.5">
                {trip.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-[11px] text-muted-foreground bg-muted px-2.5 py-1 rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-[200px] shrink-0 border-r bg-muted/40 flex flex-col items-center justify-center p-5 gap-3">
          <div className="text-center">
            <p className="text-[11px] text-muted-foreground mb-1">قیمت هر نفر</p>
            <p className="text-2xl font-bold text-primary leading-tight">
              {trip.price.toLocaleString('fa-IR')}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">تومان</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-status-success" />
            <span>{trip.availableSeats.toLocaleString('fa-IR')} صندلی</span>
          </div>

          <Button onClick={() => onSelect(trip.id)} className="w-full">
            رزرو بلیط
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

