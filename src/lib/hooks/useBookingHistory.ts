import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Flight, Hotel, Train, Event } from '../types/models';

export interface BookingHistoryItem {
  id: string;
  type: 'flight' | 'hotel' | 'train' | 'movie' | 'event';
  status: 'confirmed' | 'cancelled' | 'completed';
  bookingDate: number;
  userId: string;
  details: Flight | Hotel | Train | Event;
  price: number;
}

interface BookingHistoryStore {
  bookings: BookingHistoryItem[];
  addBooking: (booking: Omit<BookingHistoryItem, 'id' | 'bookingDate'>) => void;
  updateBookingStatus: (id: string, status: BookingHistoryItem['status']) => void;
  getBookingsByUser: (userId: string) => BookingHistoryItem[];
}

export const useBookingHistory = create<BookingHistoryStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking) =>
        set((state) => ({
          bookings: [
            {
              ...booking,
              id: Math.random().toString(36).substring(7),
              bookingDate: Date.now(),
            },
            ...state.bookings,
          ],
        })),
      updateBookingStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        })),
      getBookingsByUser: (userId) =>
        get().bookings.filter((b) => b.userId === userId),
    }),
    {
      name: 'booking-history-storage',
    }
  )
);