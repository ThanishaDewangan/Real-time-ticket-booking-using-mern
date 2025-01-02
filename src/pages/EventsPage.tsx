import { useState } from 'react';
import { useAuthStore } from '../lib/store';
import { SearchBar } from '../components/search/SearchBar';
import { EventCard } from '../components/booking/EventCard';
import { PaymentModal } from '../components/payment/PaymentModal';
import { events as eventData } from '../lib/data';
import { toast } from 'react-hot-toast';
import type { Event } from '../lib/types';

export function EventsPage() {
  const [events, setEvents] = useState(eventData);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const { user } = useAuthStore();

  const handleSearch = (query: string) => {
    const filtered = eventData.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.type.toLowerCase().includes(query.toLowerCase()) ||
      event.city.toLowerCase().includes(query.toLowerCase()) ||
      (event.artists && event.artists.some(artist => 
        artist.toLowerCase().includes(query.toLowerCase())
      ))
    );
    setEvents(filtered);
  };

  const handleBook = (event: Event) => {
    if (!user) {
      toast.error('Please login to book tickets');
      return;
    }
    setSelectedEvent(event);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    toast.success('Event tickets booked successfully!');
    setShowPayment(false);
    setSelectedEvent(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
        <div className="w-96">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search events by title, type, or city..."
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex gap-4 mb-8">
          {['all', 'concert', 'sports', 'comedy', 'festival'].map((type) => (
            <button
              key={type}
              onClick={() => {
                if (type === 'all') {
                  setEvents(eventData);
                } else {
                  setEvents(eventData.filter(event => event.type === type));
                }
              }}
              className="px-4 py-2 rounded-full text-sm font-medium capitalize
                hover:bg-blue-50 hover:text-blue-600 transition-colors
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onBook={handleBook}
            />
          ))}
        </div>
      </div>

      {showPayment && selectedEvent && (
        <PaymentModal
          amount={selectedEvent.price}
          onClose={() => {
            setShowPayment(false);
            setSelectedEvent(null);
          }}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}