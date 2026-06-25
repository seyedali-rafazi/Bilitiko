"use client";

import { Users } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Separator } from "@/components/ui/shadcn/separator";
import FlightRouteTimeline from "@/components/flights/FlightRouteTimeline";
import type { TransportTrip } from "@/lib/types";
import AirlineLogo from "../flights/AirlineLogo";

interface TransportResultCardProps {
  trip: TransportTrip;
  index: number;
  onSelect: (id: number) => void;
  selectLabel?: string;
}

export default function TransportResultCard({
  trip,
  index,
  onSelect,
  selectLabel = "انتخاب و خرید",
}: TransportResultCardProps) {
  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-md"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <CardContent className="flex flex-col lg:flex-row lg:items-stretch p-0">
        <div className="flex-1 p-5 lg:p-6">
          <div className="flex items-center gap-3 mb-5">
            <AirlineLogo airline={trip.company} size="lg" />
            <div className="min-w-0">
              <h3 className="text-base font-bold truncate">{trip.company}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {trip.tripNumber}
              </p>
            </div>
          </div>

          <FlightRouteTimeline
            departureTime={trip.departureTime}
            arrivalTime={trip.arrivalTime}
            origin={trip.origin}
            destination={trip.destination}
            duration={trip.duration}
            stops={0}
          />

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

        <div className="lg:w-[200px] shrink-0 border-t lg:border-t-0 lg:border-r bg-muted/40 flex flex-row lg:flex-col items-center justify-between lg:justify-center p-5 gap-3">
          <div className="text-right lg:text-center">
            <p className="text-[11px] text-muted-foreground mb-1">
              قیمت هر نفر
            </p>
            <p className="text-2xl font-bold text-primary leading-tight">
              {trip.price.toLocaleString("fa-IR")}
            </p>
            <p className="text-[10px] text-muted-foreground">تومان</p>
            <div className="flex items-center gap-1 justify-end lg:justify-center mt-2 text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[11px]">{trip.availableSeats} صندلی</span>
            </div>
          </div>
          <Button onClick={() => onSelect(trip._id)} className="shrink-0">
            {selectLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
