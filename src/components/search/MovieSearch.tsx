import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Film, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { cities } from '../../lib/data';

interface SearchParams {
  city: string;
  date: Date;
  language?: string;
  genre?: string;
}

interface Props {
  onSearch: (params: SearchParams) => void;
}

export function MovieSearch({ onSearch }: Props) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    city: '',
    date: new Date(),
  });

  const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Malayalam', 'Kannada'];
  const genres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Horror'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select
            value={searchParams.language}
            onChange={(e) => setSearchParams({ ...searchParams, language: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Languages</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <select
            value={searchParams.genre}
            onChange={(e) => setSearchParams({ ...searchParams, genre: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <Button type="submit" className="w-full">
          <Film className="h-5 w-5 mr-2" />
          Search Movies
        </Button>
      </div>
    </form>
  );
}