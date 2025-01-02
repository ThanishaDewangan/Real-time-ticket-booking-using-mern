import type { Flight, Hotel, Train, Event } from './models';

export interface SeatStatus {
  id: string;
  status: 'available' | 'selected' | 'processing' | 'booked';
  userId?: string;
  userName?: string;
  timestamp?: number;
}

export interface BookingHistoryItem {
  id: string;
  type: 'flight' | 'hotel' | 'train' | 'movie' | 'event';
  status: 'confirmed' | 'cancelled' | 'completed';
  bookingDate: number;
  userId: string;
  details: Flight | Hotel | Train | Event;
  price: number;
}