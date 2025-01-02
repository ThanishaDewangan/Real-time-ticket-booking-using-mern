import { useCallback } from 'react';
import { useAuthStore, useBookingStore } from '../store';
import { toast } from 'react-hot-toast';

export function useSeatManagement(showId: string) {
  const { user } = useAuthStore();
  const { 
    seatStatus,
    startSeatSelection,
    cancelSeatSelection,
    startSeatBooking,
    completeSeatBooking
  } = useBookingStore();

  const getSeatStatus = useCallback((seatId: string) => {
    return seatStatus[showId]?.[seatId] || { 
      id: seatId,
      status: 'available'
    };
  }, [showId, seatStatus]);

  const handleSeatClick = useCallback((seatId: string) => {
    if (!user) {
      toast.error('Please login to select seats');
      return;
    }

    const currentStatus = getSeatStatus(seatId);
    const isCurrentUserSelection = 
      currentStatus.status === 'selected' && 
      currentStatus.userId === user.id;

    if (currentStatus.status === 'available') {
      startSeatSelection(showId, seatId, user.id, user.name);
    } else if (isCurrentUserSelection) {
      cancelSeatSelection(showId, seatId, user.id);
    }
  }, [user, showId, getSeatStatus, startSeatSelection, cancelSeatSelection]);

  const initializeBooking = useCallback((seatIds: string[]) => {
    if (!user) return;
    seatIds.forEach(seatId => {
      startSeatBooking(showId, seatId, user.id);
    });
  }, [user, showId, startSeatBooking]);

  const completeBooking = useCallback((seatIds: string[]) => {
    if (!user) return;
    seatIds.forEach(seatId => {
      completeSeatBooking(showId, seatId, user.id);
    });
  }, [user, showId, completeSeatBooking]);

  return {
    getSeatStatus,
    handleSeatClick,
    initializeBooking,
    completeBooking
  };
}