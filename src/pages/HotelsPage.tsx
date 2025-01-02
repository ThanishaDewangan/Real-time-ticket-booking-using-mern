import { useState } from 'react';
import { MapPin, Star, Wifi, Coffee, Dumbbell } from 'lucide-react';
import { hotels } from '../lib/data';
import { Button } from '../components/ui/Button';
import { HotelSearch } from '../components/search/HotelSearch';
import { PaymentModal } from '../components/payment/PaymentModal';
import { useAuthStore } from '../lib/store';
import { toast } from 'react-hot-toast';
import type { Hotel } from '../lib/types';

const amenityIcons = {
  'WiFi': Wifi,
  'Restaurant': Coffee,
  'Gym': Dumbbell,
};

export function HotelsPage() {
  const [searchResults, setSearchResults] = useState<Hotel[]>(hotels);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{ type: string; price: number } | null>(null);
  const { user } = useAuthStore();

  const handleSearch = (params: any) => {
    const filtered = hotels.filter(hotel => 
      hotel.city.toLowerCase().includes(params.city.toLowerCase()) &&
      hotel.rooms.some(room => room.available >= params.rooms)
    );
    setSearchResults(filtered);
  };

  const handleBook = (hotel: Hotel, room: { type: string; price: number }) => {
    if (!user) {
      toast.error('Please login to book a room');
      return;
    }
    setSelectedHotel(hotel);
    setSelectedRoom(room);
    setIsBooking(true);
  };

  const handlePaymentComplete = () => {
    if (selectedHotel && selectedRoom) {
      // Update room availability (in a real app, this would be an API call)
      const hotelIndex = hotels.findIndex(h => h.id === selectedHotel.id);
      const roomIndex = hotels[hotelIndex].rooms.findIndex(r => r.type === selectedRoom.type);
      if (roomIndex !== -1) {
        hotels[hotelIndex].rooms[roomIndex].available--;
      }

      toast.success('Hotel room booked successfully!');
      setIsBooking(false);
      setSelectedHotel(null);
      setSelectedRoom(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Hotels</h1>
      
      <div className="mt-8">
        <HotelSearch onSearch={handleSearch} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
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
                      <p className="font-bold">₹{room.price}</p>
                      <Button
                        size="sm"
                        onClick={() => handleBook(hotel, room)}
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
        ))}
      </div>

      {isBooking && selectedHotel && selectedRoom && (
        <PaymentModal
          amount={selectedRoom.price}
          onClose={() => {
            setIsBooking(false);
            setSelectedHotel(null);
            setSelectedRoom(null);
          }}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}