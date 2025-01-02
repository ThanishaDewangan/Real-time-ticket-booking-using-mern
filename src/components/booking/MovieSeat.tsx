import { memo } from 'react';
import { useAuthStore } from '../../lib/store';
import { SEAT_STATUS_COLORS } from '../../lib/constants/booking';
import type { SeatStatus } from '../../lib/types';

interface MovieSeatProps {
  seatId: string;
  status: SeatStatus;
  showId: string;
  onSeatClick: (seatId: string) => void;
}

export const MovieSeat = memo(({ seatId, status, showId, onSeatClick }: MovieSeatProps) => {
  const { user } = useAuthStore();
  
  const isCurrentUserSelection = status.status === 'selected' && 
    status.userId === user?.id;

  const getSeatColor = () => {
    switch (status.status) {
      case 'booked':
        return SEAT_STATUS_COLORS.booked;
      case 'processing':
        return status.userId === user?.id
          ? SEAT_STATUS_COLORS.processing.own
          : SEAT_STATUS_COLORS.processing.other;
      case 'selected':
        return isCurrentUserSelection 
          ? SEAT_STATUS_COLORS.selected.own
          : SEAT_STATUS_COLORS.selected.other;
      default:
        return SEAT_STATUS_COLORS.available;
    }
  };

  const getTooltip = () => {
    if (status.status === 'selected' && status.userName && status.userId !== user?.id) {
      return `Selected by ${status.userName}`;
    }
    if (status.status === 'processing' && status.userName && status.userId !== user?.id) {
      return `Being booked by ${status.userName}`;
    }
    if (status.status === 'booked') {
      return 'Seat booked';
    }
    return '';
  };

  return (
    <button
      disabled={status.status !== 'available' && !isCurrentUserSelection}
      onClick={() => onSeatClick(seatId)}
      title={getTooltip()}
      className={`
        w-8 h-8 rounded-t-lg text-xs font-medium
        ${getSeatColor()}
        transition-all duration-200
        disabled:opacity-100
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        relative
      `}
    >
      {seatId}
      {(status.status === 'processing' || (status.status === 'selected' && !isCurrentUserSelection)) && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="bg-gray-900 text-white text-xs py-1 px-2 rounded">
            {status.userName}
          </span>
        </div>
      )}
    </button>
  );
});

MovieSeat.displayName = 'MovieSeat';