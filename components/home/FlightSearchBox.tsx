"use client";

import { useState } from "react";
import { FaExchangeAlt, FaPlane, FaSearch } from "react-icons/fa";
import Tabs from "@/components/ui/Tabs";
import Button from "@/components/ui/Button";
import PersianDatePicker from "@/components/ui/PersianDatePicker";
import { CITIES, FLIGHT_TYPE_OPTIONS } from "@/lib/constants";
import { useFlightSearch } from "@/hooks/useFlightSearch";
import { toPersianNum } from "@/lib/utils";
import type { SearchData, TripType } from "@/lib/types";

const tripTabs = [
  { id: "multi", label: "چند مسیره", icon: <FaPlane className="w-4 h-4" /> },
  {
    id: "roundtrip",
    label: "رفت و برگشت",
    icon: <FaPlane className="w-4 h-4" />,
  },
  { id: "oneway", label: "رفت", icon: <FaPlane className="w-4 h-4" /> },
];

export default function FlightSearchBox() {
  const [tripType, setTripType] = useState<TripType>("roundtrip");
  const [flightType, setFlightType] = useState("system");
  const { searchData, errors, swapCities, updateField, submitSearch } =
    useFlightSearch();

  const cityOptions = CITIES.map((c) => ({ value: c.code, label: c.name }));

  return (
    <div className="container mx-auto px-4 -mt-24 lg:-mt-28 relative z-20 mb-12">
      <div className="bg-white rounded-xl border border-neutral-gray2 search-box-shadow p-5 lg:p-6 max-w-[1226px] mx-auto">
        <Tabs
          tabs={tripTabs}
          activeTab={tripType}
          onChange={(id) => setTripType(id as TripType)}
          className="mb-5 pb-4 border-b border-neutral-gray2"
        />

        <div className="flex items-center justify-start gap-2 lg:gap-3 mb-5 flex-wrap">
          {FLIGHT_TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFlightType(opt.id)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                flightType === opt.id
                  ? "bg-primary-blue text-white"
                  : "bg-white border border-primary-shade1 text-primary-shade3 hover:border-primary-blue"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <form onSubmit={submitSearch} noValidate className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-1">
              <label className="field-label">مبدا</label>
              <select
                value={searchData.origin}
                onChange={(e) => updateField("origin", e.target.value)}
                className={`search-field appearance-none cursor-pointer ${errors.origin ? "border-status-error" : ""}`}
              >
                <option value="">انتخاب شهر</option>
                {cityOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.origin && (
                <p className="text-xs text-status-error mt-1">
                  {errors.origin}
                </p>
              )}
            </div>

            <div className="lg:col-span-1 relative">
              <label className="field-label">مقصد</label>
              <select
                value={searchData.destination}
                onChange={(e) => updateField("destination", e.target.value)}
                className={`search-field appearance-none cursor-pointer ${errors.destination ? "border-status-error" : ""}`}
              >
                <option value="">انتخاب شهر</option>
                {cityOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.destination && (
                <p className="text-xs text-status-error mt-1">
                  {errors.destination}
                </p>
              )}
              <button
                type="button"
                onClick={swapCities}
                aria-label="جابجایی مبدا و مقصد"
                className="absolute left-3 top-[calc(50%+10px)] -translate-y-1/2 w-8 h-8 bg-primary-tint1 border border-primary-blue rounded-full flex items-center justify-center hover:bg-primary-tint5 transition-colors z-10 hidden lg:flex"
              >
                <FaExchangeAlt className="text-primary-blue text-xs" />
              </button>
            </div>

            <div>
              <PersianDatePicker
                label="تاریخ رفت"
                value={searchData.departureDate}
                onChange={(value) => updateField("departureDate", value)}
                required
                disablePastDates
              />
              {errors.departureDate && (
                <p className="text-xs text-status-error mt-1">
                  {errors.departureDate}
                </p>
              )}
            </div>

            {tripType === "roundtrip" && (
              <div>
                <PersianDatePicker
                  label="تاریخ برگشت"
                  value={searchData.returnDate}
                  onChange={(value) => updateField("returnDate", value)}
                  minDate={searchData.departureDate}
                />
              </div>
            )}

            <div>
              <label className="field-label">مسافران</label>
              <select
                value={searchData.passengers}
                onChange={(e) =>
                  updateField("passengers", parseInt(e.target.value))
                }
                className="search-field appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>
                    {toPersianNum(num)} نفر
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label">کلاس پرواز</label>
              <select
                value={searchData.flightClass}
                onChange={(e) =>
                  updateField(
                    "flightClass",
                    e.target.value as SearchData["flightClass"],
                  )
                }
                className="search-field appearance-none cursor-pointer"
              >
                <option value="economy">اقتصادی</option>
                <option value="business">بیزینس</option>
                <option value="first">فرست کلاس</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg" className="min-w-[160px]">
              <FaSearch className="w-4 h-4" />
              <span>جستجو</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
