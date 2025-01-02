import { useState } from 'react';
import { Train as TrainIcon, Clock, MapPin } from 'lucide-react';
import { trains } from '../lib/data';
import { Button } from '../components/ui/Button';
import { TrainSearch } from '../components/search/TrainSearch';
import { PaymentModal } from '../components/payment/PaymentModal';
import { useAuthStore } from '../lib/store';
import { toast } from 'react-hot-toast';
import type { Train } from '../lib/types';

export function TrainsPage() {
  const [searchResults, setSearchResults] = useState<Train[]>(trains);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedClass, setSelectedClass] = useState<{ type: string; price: number } | null>(null);
  const { user } = useAuthStore();

  const handleSearch = (params: any) => {
    const filtered = trains.filter(train => 
      train.from.toLowerCase().includes(params.from.toLowerCase()) &&
      train.to.toLowerCase().includes(params.to.toLowerCase()) &&
      train.classes.some(cls => cls.type === params.class && cls.available >= params.passengers)
    );
    setSearchResults(filtered);
  };

  const handleBook = (train: Train, trainClass: { type: string; price: number }) => {
    if (!user) {
      toast.error('Please login to book tickets');
      return;
    }
    setSelectedTrain(train);
    setSelectedClass(trainClass);
    setIsBooking(true);
  };

  const handlePaymentComplete = () => {
    if (selectedTrain && selectedClass) {
      // Update seat availability (in a real app, this would be an API call)
      const trainIndex = trains.findIndex(t => t.id === selectedTrain.id);
      const classIndex = trains[trainIndex].classes.findIndex(c => c.type === selectedClass.type);
      if (classIndex !== -1) {
        trains[trainIndex].classes[classIndex].available--;
      }

      toast.success('Train tickets booked successfully!');
      setIsBooking(false);
      setSelectedTrain(null);
      setSelectedClass(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Train Tickets</h1>
      
      <div className="mt-8">
        <TrainSearch onSearch={handleSearch} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6">
        {searchResults.map((train) => (
          <div
            key={train.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <TrainIcon className="h-5 w-5 text-blue-500" />
                  <h3 className="ml-2 text-lg font-semibold">{train.name}</h3>
                </div>
                <p className="mt-1 text-sm text-gray-500">{train.trainNumber}</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="ml-2">{train.from}</span>
                </div>
                <div className="mt-1 flex items-center">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="ml-2">{train.departureTime}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-0.5 bg-gray-300"></div>
                <span className="text-sm text-gray-500">
                  {calculateDuration(train.departureTime, train.arrivalTime)}
                </span>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="ml-2">{train.to}</span>
                </div>
                <div className="mt-1 flex items-center justify-end">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="ml-2">{train.arrivalTime}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900">Available Classes</h4>
              <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {train.classes.map((cls) => (
                  <div
                    key={cls.type}
                    className="border rounded-md p-3 text-center"
                  >
                    <p className="font-medium">{cls.type}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {cls.available} seats
                    </p>
                    <p className="mt-1 font-medium">₹{cls.price}</p>
                    <Button
                      size="sm"
                      onClick={() => handleBook(train, cls)}
                      disabled={cls.available === 0}
                      className="mt-2 w-full"
                    >
                      Book
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isBooking && selectedTrain && selectedClass && (
        <PaymentModal
          amount={selectedClass.price}
          onClose={() => {
            setIsBooking(false);
            setSelectedTrain(null);
            setSelectedClass(null);
          }}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}

function calculateDuration(departure: string, arrival: string) {
  const [depHours, depMinutes] = departure.split(':').map(Number);
  const [arrHours, arrMinutes] = arrival.split(':').map(Number);
  
  let hours = arrHours - depHours;
  let minutes = arrMinutes - depMinutes;
  
  if (minutes < 0) {
    hours -= 1;
    minutes += 60;
  }
  
  if (hours < 0) {
    hours += 24;
  }
  
  return `${hours}h ${minutes}m`;
}