import { Calendar, Clock, MapPin, Music, Trophy, Mic } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatDate } from '../../lib/utils/date';
import { formatPrice } from '../../lib/utils/price';
import type { Event } from '../../lib/types';

const eventTypeIcons = {
  'concert': Music,
  'sports': Trophy,
  'comedy': Mic,
};

interface EventCardProps {
  event: Event;
  onBook: (event: Event) => void;
}

export function EventCard({ event, onBook }: EventCardProps) {
  const EventIcon = eventTypeIcons[event.type] || Music;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
          <p className="text-sm font-medium capitalize">{event.type}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="ml-1">{event.venue}, {event.city}</span>
            </div>
          </div>
          <EventIcon className="h-6 w-6 text-blue-500" />
        </div>
        
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span className="ml-1">{formatDate(new Date(event.date))}</span>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span className="ml-1">{event.time}</span>
          </div>
        </div>
        
        <p className="mt-4 text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>
        
        {event.artists && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-900">Artists:</p>
            <p className="mt-1 text-sm text-gray-500">
              {event.artists.join(', ')}
            </p>
          </div>
        )}
        
        <div className="mt-6 flex justify-between items-center">
          <p className="text-2xl font-bold">{formatPrice(event.price)}</p>
          <Button onClick={() => onBook(event)}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}