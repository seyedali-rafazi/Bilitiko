import { Users } from 'lucide-react';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { Separator } from '@/components/ui/shadcn/separator';
import AirlineLogo from '@/components/flights/AirlineLogo';
import FlightRouteTimeline from '@/components/flights/FlightRouteTimeline';
import type { Flight } from '@/lib/types';

interface FlightCardProps {
  flight: Flight;
  index: number;
  onSelect: (id: number) => void;
}

export default function FlightCard({ flight, index, onSelect }: FlightCardProps) {
  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-md"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <CardContent className="flex items-stretch p-0">
        <div className="flex-1 p-5 lg:p-6">
          <div className="flex items-center gap-3 mb-5">
            <AirlineLogo airline={flight.airline} size="lg" />
            <div className="min-w-0">
              <h3 className="text-base font-bold truncate">{flight.airline}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{flight.flightNumber}</p>
            </div>
          </div>

          <FlightRouteTimeline
            departureTime={flight.departureTime}
            arrivalTime={flight.arrivalTime}
            origin={flight.origin}
            destination={flight.destination}
            duration={flight.duration}
            stops={flight.stops}
          />

          {flight.features.length > 0 && (
            <>
              <Separator className="my-5" />
              <div className="flex flex-wrap gap-1.5">
                {flight.features.map((feature) => (
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
              {flight.price.toLocaleString('fa-IR')}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">تومان</p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-status-success" />
            <span>{flight.availableSeats.toLocaleString('fa-IR')} صندلی</span>
          </div>

          <Button onClick={() => onSelect(flight._id)} className="w-full">
            انتخاب پرواز
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
