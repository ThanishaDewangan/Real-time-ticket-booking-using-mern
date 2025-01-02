import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Music, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { cities } from '../../lib/data';

interface SearchParams {
  city: string;
  date: Date;
  type?: 'concert' | 'sports' | 'comedy' | 'festival';
}

interface Props {
  onSearch: (params: SearchParams) => void;
}

export function EventSearch({ onSearch }: Props) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    city: '',
    date: new Date(),
  });

  const eventTypes = [
    { value: 'concert', label: 'Concerts' },
    { value: 'sports', label: 'Sports' },
    { value: 'comedy', label: 'Comedy Shows' },
    { value: 'festival', label: 'Festivals' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <select
            value={searchParams.city}
            onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
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
          <label className="block text-sm font-medium text-gray-700">Event Type</label>
          <select
            value={searchParams.type}
            onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value as SearchParams['type'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Events</option>
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <Button type="submit" className="w-full">
          <Music className="h-5 w-5 mr-2" />
          Search Events
        </Button>
      </div>
    </form>
  );
}