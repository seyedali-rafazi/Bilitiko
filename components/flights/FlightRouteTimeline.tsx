import { HiOutlineClock } from "react-icons/hi2";
import { TbPlane } from "react-icons/tb";
import { toPersianNum } from "@/lib/utils";

interface FlightRouteTimelineProps {
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  duration: string;
  stops: number;
  compact?: boolean;
}

export default function FlightRouteTimeline({
  departureTime,
  arrivalTime,
  origin,
  destination,
  duration,
  stops,
  compact = false,
}: FlightRouteTimelineProps) {
  const stopsLabel = stops === 0 ? "مستقیم" : `${toPersianNum(stops)} توقف`;
  const persianDeparture = toPersianNum(departureTime);
  const persianArrival = toPersianNum(arrivalTime);
  const persianDuration = toPersianNum(duration);

  if (compact) {
    return (
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="text-center shrink-0">
          <p className="text-lg font-bold text-neutral-gray8 tabular-nums">
            {persianDeparture}
          </p>
          <p className="text-[11px] text-neutral-gray6 truncate max-w-[56px]">
            {origin}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center gap-1 min-w-0 px-1">
          <span className="text-[10px] text-neutral-gray5">{stopsLabel}</span>
          <div className="w-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-blue shrink-0" />
            <div className="flex-1 h-px bg-neutral-gray3 relative">
              <TbPlane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-blue text-sm rotate-180" />
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-gray4 shrink-0" />
          </div>
          <div className="flex items-center gap-1 text-[10px] text-neutral-gray6">
            <HiOutlineClock className="text-xs" />
            <span>{persianDuration}</span>
          </div>
        </div>

        <div className="text-center shrink-0">
          <p className="text-lg font-bold text-neutral-gray8 tabular-nums">
            {persianArrival}
          </p>
          <p className="text-[11px] text-neutral-gray6 truncate max-w-[56px]">
            {destination}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5 flex-1">
      <div className="text-center shrink-0 w-20">
        <p className="text-2xl font-bold text-neutral-gray8 tabular-nums">
          {persianDeparture}
        </p>
        <p className="text-sm text-neutral-gray6 mt-0.5">{origin}</p>
      </div>

      <div className="flex-1 flex flex-col items-center gap-2 min-w-[120px]">
        <span className="text-xs text-neutral-gray5 bg-neutral-gray1 px-2.5 py-0.5 rounded-full">
          {stopsLabel}
        </span>
        <div className="w-full flex items-center">
          <span className="w-2 h-2 rounded-full bg-primary-blue shrink-0 ring-4 ring-primary-tint1" />
          <div className="flex-1 h-0.5 bg-gradient-to-l from-neutral-gray3 to-primary-tint5 mx-1 relative">
            <TbPlane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-blue text-lg rotate-180 bg-white px-1" />
          </div>
          <span className="w-2 h-2 rounded-full bg-neutral-gray4 shrink-0" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-gray6">
          <HiOutlineClock className="text-sm text-primary-blue" />
          <span>{persianDuration}</span>
        </div>
      </div>

      <div className="text-center shrink-0 w-20">
        <p className="text-2xl font-bold text-neutral-gray8 tabular-nums">
          {persianArrival}
        </p>
        <p className="text-sm text-neutral-gray6 mt-0.5">{destination}</p>
      </div>
    </div>
  );
}
