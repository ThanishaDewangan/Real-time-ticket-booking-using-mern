import { useState, useEffect } from 'react';
import { useBookingStore } from '../store';

export function useBookingStatus(showId: string, seatId: string) {
  const [status, setStatus] = useState('available');
  const { seatStatus } = useBookingStore();

  useEffect(() => {
    const currentStatus = seatStatus[showId]?.[seatId]?.status || 'available';
    setStatus(currentStatus);

    // Clean up function
    return () => {
      setStatus('available');
    };
  }, [showId, seatId, seatStatus]);

  return status;
}