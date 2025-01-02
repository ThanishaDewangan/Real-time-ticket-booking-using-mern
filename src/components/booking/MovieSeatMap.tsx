import { useEffect } from 'react';
import { MovieSeat } from './MovieSeat';
import { SeatLegend } from './SeatLegend';
import { useSeatManagement } from '../../lib/hooks/useSeatManagement';
import { useBookingStore } from '../../lib/store';

interface MovieSeatMapProps {
  showId: string;
  onSeatSelect: (seatId: string) => void;
}

export function MovieSeatMap({ showId, onSeatSelect }: MovieSeatMapProps) {
  const { getSeatStatus, handleSeatClick } = useSeatManagement(showId);
  
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const seatsPerRow = 10;

  useEffect(() => {
    // Clean up expired bookings every minute
    const interval = setInterval(() => {
      useBookingStore.getState().cleanupExpiredBookings();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSeatSelection = (seatId: string) => {
    handleSeatClick(seatId);
    onSeatSelect(seatId);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="w-full bg-gray-800 h-8 rounded-lg mb-8 flex items-center justify-center text-white text-sm">
        Screen
      </div>
      
      <div className="grid gap-4">
        {rows.map((row) => (
          <div key={row} className="flex justify-center gap-2">
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seatId = `${row}${i + 1}`;
              const status = getSeatStatus(seatId);
              
              return (
                <MovieSeat
                  key={seatId}
                  seatId={seatId}
                  status={status}
                  showId={showId}
                  onSeatClick={handleSeatSelection}
                />
              );
            })}
          </div>
        ))}
      </div>

      <SeatLegend />
    </div>
  );
}