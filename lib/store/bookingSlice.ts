import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ContactInfo, Flight, Passenger, TransportTrip } from '../types';

export interface BookingState {
  flight: Flight | null;
  trip: TransportTrip | null;
  transportType: 'bus' | 'train' | null;
  passengers: Passenger[];
  contactInfo: ContactInfo;
}

export const initialBookingState: BookingState = {
  flight: null,
  trip: null,
  transportType: null,
  passengers: [],
  contactInfo: { email: '', phone: '' },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialBookingState,
  reducers: {
    selectFlight(state, action: PayloadAction<Flight>) {
      state.flight = action.payload;
      state.trip = null;
      state.transportType = null;
    },
    selectTransport(
      state,
      action: PayloadAction<{ trip: TransportTrip; transportType: 'bus' | 'train' }>
    ) {
      state.trip = action.payload.trip;
      state.transportType = action.payload.transportType;
      state.flight = null;
    },
    saveBooking(
      state,
      action: PayloadAction<{ passengers: Passenger[]; contactInfo: ContactInfo }>
    ) {
      state.passengers = action.payload.passengers;
      state.contactInfo = action.payload.contactInfo;
    },
    clearBooking() {
      return initialBookingState;
    },
    hydrateBooking(_state, action: PayloadAction<BookingState>) {
      return action.payload;
    },
  },
});

export const { selectFlight, selectTransport, saveBooking, clearBooking, hydrateBooking } =
  bookingSlice.actions;

export default bookingSlice.reducer;
