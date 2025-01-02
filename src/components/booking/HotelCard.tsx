import { MapPin, Star, Wifi, Coffee, Dumbbell } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/utils/price';
import type { Hotel } from '../../lib/types';

const amenityIcons = {
  'WiFi': Wifi,
  'Restaurant': Coffee,
  'Gym': Dumbbell,
};

interface HotelCardProps {
  hotel: Hotel;
  onBook: (hotel: Hotel, roomType: { type: string; price: number }) => void;
}

export function HotelCard({ hotel, onBook }: HotelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-md">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{hotel.name}</h3>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span className="ml-1">{hotel.address}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex space-x-4">
            {hotel.amenities.slice(0, 3).map((amenity) => {
              const Icon = amenityIcons[amenity] || MapPin;
              return (
                <div key={amenity} className="flex items-center text-sm text-gray-500">
                  <Icon className="h-4 w-4" />
                  <span className="ml-1">{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h4 className="font-medium text-gray-900">Available Rooms</h4>
          {hotel.rooms.map((room) => (
            <div key={room.type} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">{room.type}</p>
                <p className="text-sm text-gray-500">{room.available} rooms left</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatPrice(room.price)}</p>
                <Button
                  size="sm"
                  onClick={() => onBook(hotel, room)}
                  disabled={room.available === 0}
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}