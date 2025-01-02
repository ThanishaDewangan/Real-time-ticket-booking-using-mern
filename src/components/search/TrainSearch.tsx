import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Train, Calendar, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { cities } from '../../lib/data';

interface SearchParams {
  from: string;
  to: string;
  date: Date;
  passengers: number;
  class: 'SL' | '3A' | '2A' | '1A';
}

interface Props {
  onSearch: (params: SearchParams) => void;
}

export function TrainSearch({ onSearch }: Props) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: '',
    to: '',
    date: new Date(),
    passengers: 1,
    class: 'SL',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">From</label>
          <select
            value={searchParams.from}
            onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select station</option>
            {cities.map((city) => (
              city.trainStations?.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <select
            value={searchParams.to}
            onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select station</option>
            {cities.map((city) => (
              city.trainStations?.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <div className="mt-1 relative">
            <DatePicker
              selected={searchParams.date}
              onChange={(date) => setSearchParams({ ...searchParams, date: date || new Date() })}
              minDate={new Date()}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Class</label>
          <select
            value={searchParams.class}
            onChange={(e) => setSearchParams({ ...searchParams, class: e.target.value as SearchParams['class'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="SL">Sleeper (SL)</option>
            <option value="3A">AC 3 Tier (3A)</option>
            <option value="2A">AC 2 Tier (2A)</option>
            <option value="1A">AC First Class (1A)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Passengers</label>
          <div className="mt-1 relative">
            <input
              type="number"
              min="1"
              max="6"
              value={searchParams.passengers}
              onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Button type="submit" className="w-full">
          <Train className="h-5 w-5 mr-2" />
          Search Trains
        </Button>
      </div>
    </form>
  );
}