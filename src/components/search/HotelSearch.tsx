import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Building, Calendar, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { cities } from '../../lib/data';

interface SearchParams {
  city: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  rooms: number;
}

interface Props {
  onSearch: (params: SearchParams) => void;
}

export function HotelSearch({ onSearch }: Props) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    city: '',
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
    guests: 2,
    rooms: 1,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
          <label className="block text-sm font-medium text-gray-700">Check-in</label>
          <div className="mt-1 relative">
            <DatePicker
              selected={searchParams.checkIn}
              onChange={(date) => setSearchParams({ ...searchParams, checkIn: date || new Date() })}
              minDate={new Date()}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Check-out</label>
          <div className="mt-1 relative">
            <DatePicker
              selected={searchParams.checkOut}
              onChange={(date) => setSearchParams({ ...searchParams, checkOut: date || new Date() })}
              minDate={searchParams.checkIn}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Guests</label>
          <div className="mt-1 relative">
            <input
              type="number"
              min="1"
              max="10"
              value={searchParams.guests}
              onChange={(e) => setSearchParams({ ...searchParams, guests: parseInt(e.target.value) })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rooms</label>
          <div className="mt-1 relative">
            <input
              type="number"
              min="1"
              max="5"
              value={searchParams.rooms}
              onChange={(e) => setSearchParams({ ...searchParams, rooms: parseInt(e.target.value) })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Building className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Button type="submit" className="w-full">
          <Building className="h-5 w-5 mr-2" />
          Search Hotels
        </Button>
      </div>
    </form>
  );
}