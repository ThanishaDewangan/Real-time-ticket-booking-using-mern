import { Train as TrainIcon, Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { calculateDuration } from '../../lib/utils/date';
import { formatPrice } from '../../lib/utils/price';
import type { Train } from '../../lib/types';

interface TrainCardProps {
  train: Train;
  onBook: (train: Train, trainClass: { type: string; price: number }) => void;
}

export function TrainCard({ train, onBook }: TrainCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
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
              <p className="mt-1 font-medium">{formatPrice(cls.price)}</p>
              <Button
                size="sm"
                onClick={() => onBook(train, cls)}
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
  );
}