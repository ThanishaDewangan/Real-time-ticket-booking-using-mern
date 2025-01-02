import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Plane, Calendar, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { cities } from '../../lib/data';

interface SearchParams {
  from: string;
  to: string;
  date: Date;
  passengers: number;
}

interface Props {
  onSearch: (params: SearchParams) => void;
}

export function FlightSearch({ onSearch }: Props) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: '',
    to: '',
    date: new Date(),
    passengers: 1,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">From</label>
          <select
            value={searchParams.from}
            onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
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
            <option value="">Select city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
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
          <label className="block text-sm font-medium text-gray-700">Passengers</label>
          <div className="mt-1 relative">
            <input
              type="number"
              min="1"
              max="10"
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
          <Plane className="h-5 w-5 mr-2" />
          Search Flights
        </Button>
      </div>
    </form>
  );
}