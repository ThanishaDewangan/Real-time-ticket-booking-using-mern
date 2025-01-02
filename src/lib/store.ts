import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import type { SeatStatus } from './types';

// ... (keep existing User interface and AuthState)

interface BookingState {
  seatStatus: Record<string, Record<string, SeatStatus>>;
  startSeatSelection: (showId: string, seatId: string, userId: string, userName: string) => void;
  cancelSeatSelection: (showId: string, seatId: string, userId: string) => void;
  startSeatBooking: (showId: string, seatId: string, userId: string) => void;
  completeSeatBooking: (showId: string, seatId: string, userId: string) => void;
  cancelSeatBooking: (showId: string, seatId: string) => void;
  cleanupExpiredBookings: () => void;
}

// Selection timeout (30 seconds)
const SELECTION_TIMEOUT = 30 * 1000;
// Processing timeout (5 minutes)
const PROCESSING_TIMEOUT = 5 * 60 * 1000;

export const useBookingStore = create<BookingState>((set, get) => ({
  seatStatus: {},
  
  startSeatSelection: (showId, seatId, userId, userName) => {
    const currentStatus = get().seatStatus[showId]?.[seatId];
    
    if (!currentStatus || currentStatus.status === 'available') {
      set((state) => ({
        seatStatus: {
          ...state.seatStatus,
          [showId]: {
            ...state.seatStatus[showId],
            [seatId]: {
              id: seatId,
              status: 'selected',
              userId,
              userName,
              timestamp: Date.now()
            }
          }
        }
      }));

      // Show toast to other users
      if (currentStatus?.userId && currentStatus.userId !== userId) {
        toast(`Seat ${seatId} is being selected by ${userName}`, {
          icon: '👆',
          duration: 3000
        });
      }
      
      // Automatically cancel selection if not proceeded to booking
      setTimeout(() => {
        const currentState = get().seatStatus[showId]?.[seatId];
        if (currentState?.status === 'selected' && currentState.userId === userId) {
          get().cancelSeatSelection(showId, seatId, userId);
          toast.error('Seat selection timeout. Please try again.');
        }
      }, SELECTION_TIMEOUT);
    }
  },
  
  cancelSeatSelection: (showId, seatId, userId) => {
    const currentStatus = get().seatStatus[showId]?.[seatId];
    if (currentStatus?.status === 'selected' && currentStatus.userId === userId) {
      set((state) => ({
        seatStatus: {
          ...state.seatStatus,
          [showId]: {
            ...state.seatStatus[showId],
            [seatId]: {
              id: seatId,
              status: 'available'
            }
          }
        }
      }));

      toast(`Seat ${seatId} is now available`, {
        icon: '🔄',
        duration: 3000
      });
    }
  },
  
  startSeatBooking: (showId, seatId, userId) => {
    const currentStatus = get().seatStatus[showId]?.[seatId];
    
    if (currentStatus?.status === 'selected' && currentStatus.userId === userId) {
      set((state) => ({
        seatStatus: {
          ...state.seatStatus,
          [showId]: {
            ...state.seatStatus[showId],
            [seatId]: {
              ...currentStatus,
              status: 'processing',
              timestamp: Date.now()
            }
          }
        }
      }));

      toast(`Seat ${seatId} is being processed for booking by ${currentStatus.userName}`, {
        icon: '⏳',
        duration: 3000
      });
      
      // Automatically cancel booking if not completed within timeout
      setTimeout(() => {
        const currentState = get().seatStatus[showId]?.[seatId];
        if (currentState?.status === 'processing' && currentState.userId === userId) {
          get().cancelSeatBooking(showId, seatId);
          toast.error('Booking timeout. Please try again.');
        }
      }, PROCESSING_TIMEOUT);
    }
  },
  
  completeSeatBooking: (showId, seatId, userId) => {
    const currentStatus = get().seatStatus[showId]?.[seatId];
    
    if (currentStatus?.status === 'processing' && currentStatus.userId === userId) {
      set((state) => ({
        seatStatus: {
          ...state.seatStatus,
          [showId]: {
            ...state.seatStatus[showId],
            [seatId]: {
              id: seatId,
              status: 'booked',
              userId,
              userName: currentStatus.userName
            }
          }
        }
      }));

      toast.success(`Seat ${seatId} has been booked by ${currentStatus.userName}`, {
        duration: 3000
      });
    }
  },
  
  cancelSeatBooking: (showId, seatId) => {
    const currentStatus = get().seatStatus[showId]?.[seatId];
    set((state) => ({
      seatStatus: {
        ...state.seatStatus,
        [showId]: {
          ...state.seatStatus[showId],
          [seatId]: {
            id: seatId,
            status: 'available'
          }
        }
      }
    }));

    if (currentStatus?.status === 'processing') {
      toast(`Seat ${seatId} booking was cancelled and is now available`, {
        icon: '🔄',
        duration: 3000
      });
    }
  },
  
  cleanupExpiredBookings: () => {
    const now = Date.now();
    set((state) => {
      const newSeatStatus = { ...state.seatStatus };
      
      Object.entries(newSeatStatus).forEach(([showId, seats]) => {
        Object.entries(seats).forEach(([seatId, status]) => {
          if (status.timestamp) {
            if (
              (status.status === 'selected' && now - status.timestamp > SELECTION_TIMEOUT) ||
              (status.status === 'processing' && now - status.timestamp > PROCESSING_TIMEOUT)
            ) {
              newSeatStatus[showId][seatId] = {
                id: seatId,
                status: 'available'
              };
              
              toast(`Seat ${seatId} has been released due to timeout`, {
                icon: '⌛',
                duration: 3000
              });
            }
          }
        });
      });
      
      return { seatStatus: newSeatStatus };
    });
  }
}));