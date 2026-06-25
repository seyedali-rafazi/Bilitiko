'use client';

import { Users } from 'lucide-react';
import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { Separator } from '@/components/ui/shadcn/separator';
import AirlineLogo from '@/components/flights/AirlineLogo';
import FlightRouteTimeline from '@/components/flights/FlightRouteTimeline';
import type { Flight } from '@/lib/types';

interface MobileFlightCardProps {
  flight: Flight;
  onSelect: (id: number) => void;
}

export default function MobileFlightCard({ flight, onSelect }: MobileFlightCardProps) {
  return (
    <Card className="lg:hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <AirlineLogo airline={flight.airline} size="sm" />
            <div className="min-w-0">
              <p className="font-bold text-sm truncate">{flight.airline}</p>
              <p className="text-[11px] text-muted-foreground">{flight.flightNumber}</p>
            </div>
          </div>
          <div className="text-left shrink-0 mr-2">
            <p className="text-base font-bold text-primary leading-tight">
              {flight.price.toLocaleString('fa-IR')}
            </p>
            <p className="text-[10px] text-muted-foreground">تومان</p>
          </div>
        </div>

        <Separator className="mb-3" />

        <div className="py-1 mb-3">
          <FlightRouteTimeline
            departureTime={flight.departureTime}
            arrivalTime={flight.arrivalTime}
            origin={flight.origin}
            destination={flight.destination}
            duration={flight.duration}
            stops={flight.stops}
            compact
          />
        </div>

        <Separator className="mb-3" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{flight.availableSeats.toLocaleString('fa-IR')} صندلی</span>
          </div>
          <Button size="sm" onClick={() => onSelect(flight._id)}>
            انتخاب
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
