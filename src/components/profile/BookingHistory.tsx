import { useState } from 'react';
import { useBookingHistory } from '../../lib/hooks/useBookingHistory';
import { useAuthStore } from '../../lib/store';
import { formatDate } from '../../lib/utils/date';
import { formatPrice } from '../../lib/utils/price';
import { Plane, Hotel, Train, Film, Music } from 'lucide-react';
import type { BookingHistoryItem } from '../../lib/hooks/useBookingHistory';

const typeIcons = {
  flight: Plane,
  hotel: Hotel,
  train: Train,
  movie: Film,
  event: Music,
} as const;

type BookingFilter = 'all' | 'upcoming' | 'past';

export function BookingHistory() {
  const { user } = useAuthStore();
  const { getBookingsByUser } = useBookingHistory();
  const [filter, setFilter] = useState<BookingFilter>('all');

  if (!user) return null;

  const bookings = getBookingsByUser(user.id);
  const now = Date.now();

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    const bookingDate = booking.bookingDate || now;
    const isUpcoming = bookingDate > now;
    return filter === 'upcoming' ? isUpcoming : !isUpcoming;
  });

  const getBookingTitle = (booking: BookingHistoryItem) => {
    const details = booking.details;
    switch (booking.type) {
      case 'flight':
        return `${details.from} to ${details.to}`;
      case 'hotel':
        return details.name;
      case 'train':
        return `${details.from} to ${details.to}`;
      case 'movie':
        return details.title;
      case 'event':
        return details.title;
      default:
        return 'Booking';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Booking History</h2>
        <div className="flex gap-2">
          {(['all', 'upcoming', 'past'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize
                ${
                  filter === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.map((booking) => {
          const Icon = typeIcons[booking.type] || Plane;
          const title = getBookingTitle(booking);
          
          return (
            <div
              key={booking.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-lg mr-4 ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-600'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-gray-500">
                      Booked on {formatDate(new Date(booking.bookingDate))}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatPrice(booking.price)}</p>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredBookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No bookings found for this filter
          </div>
        )}
      </div>
    </div>
  );
}