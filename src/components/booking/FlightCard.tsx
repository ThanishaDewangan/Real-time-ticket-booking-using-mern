import { MapPin, Clock, Plane } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/utils/price';
import type { Flight } from '../../lib/types';

interface FlightCardProps {
  flight: Flight;
  onBook: (flight: Flight) => void;
}

export function FlightCard({ flight, onBook }: FlightCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{flight.airline}</h3>
          <p className="text-sm text-gray-500">{flight.flightNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{formatPrice(flight.price)}</p>
          <p className="text-sm text-gray-500">{flight.class}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="ml-2">{flight.from}</span>
          </div>
          <div className="mt-2 flex items-center">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="ml-2">{flight.departureTime}</span>
          </div>
        </div>
        
        <div className="flex-1 text-center">
          <div className="relative">
            <div className="border-t-2 border-gray-300 w-full absolute top-1/2 transform -translate-y-1/2"></div>
            <Plane className="h-5 w-5 mx-auto text-blue-500 relative z-10 bg-white" />
          </div>
          <span className="text-sm text-gray-500 mt-1 block">Direct</span>
        </div>
        
        <div className="flex-1 text-right">
          <div className="flex items-center justify-end">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="ml-2">{flight.to}</span>
          </div>
          <div className="mt-2 flex items-center justify-end">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="ml-2">{flight.arrivalTime}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {flight.seatsAvailable} seats available
        </p>
        <Button 
          onClick={() => onBook(flight)}
          disabled={flight.seatsAvailable === 0}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}