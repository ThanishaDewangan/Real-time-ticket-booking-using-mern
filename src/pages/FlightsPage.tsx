import { useState } from 'react';
import { Calendar, MapPin, Clock, Plane } from 'lucide-react';
import { flights } from '../lib/data';
import { Button } from '../components/ui/Button';
import { FlightSearch } from '../components/search/FlightSearch';
import { PaymentModal } from '../components/payment/PaymentModal';
import { useAuthStore } from '../lib/store';
import { toast } from 'react-hot-toast';
import type { Flight } from '../lib/types';

export function FlightsPage() {
  const [searchResults, setSearchResults] = useState<Flight[]>(flights);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const { user } = useAuthStore();

  const handleSearch = (params: any) => {
    const filtered = flights.filter(flight => 
      flight.from.toLowerCase().includes(params.from.toLowerCase()) &&
      flight.to.toLowerCase().includes(params.to.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleBook = (flight: Flight) => {
    if (!user) {
      toast.error('Please login to book tickets');
      return;
    }
    setSelectedFlight(flight);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    if (selectedFlight) {
      // Update seat availability (in a real app, this would be an API call)
      const flightIndex = flights.findIndex(f => f.id === selectedFlight.id);
      if (flightIndex !== -1) {
        flights[flightIndex].seatsAvailable--;
      }

      toast.success('Flight booked successfully!');
      setShowPayment(false);
      setSelectedFlight(null);

      // Refresh the search results to show updated availability
      setSearchResults([...flights]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Flight Bookings</h1>
      
      <div className="mt-8">
        <FlightSearch onSearch={handleSearch} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6">
        {searchResults.map((flight) => (
          <div
            key={flight.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{flight.airline}</h3>
                <p className="text-sm text-gray-500">{flight.flightNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">₹{flight.price}</p>
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
                onClick={() => handleBook(flight)}
                disabled={flight.seatsAvailable === 0}
              >
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {showPayment && selectedFlight && (
        <PaymentModal
          amount={selectedFlight.price}
          onClose={() => {
            setShowPayment(false);
            setSelectedFlight(null);
          }}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}