import { useState, useEffect } from 'react';
import { useAuthStore } from '../lib/store';
import { SearchBar } from '../components/search/SearchBar';
import { MovieSeatMap } from '../components/booking/MovieSeatMap';
import { PaymentModal } from '../components/payment/PaymentModal';
import { useSeatManagement } from '../lib/hooks/useSeatManagement';
import { movies as movieData } from '../lib/data';
import { toast } from 'react-hot-toast';
import type { Movie } from '../lib/types';

export function MoviesPage() {
  const [movies, setMovies] = useState(movieData);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const { user } = useAuthStore();

  const showId = selectedMovie ? `${selectedMovie.id}-${selectedTime}` : '';
  const { initializeBooking, completeBooking } = useSeatManagement(showId);

  const showtimes = [
    '10:00 AM',
    '1:00 PM',
    '4:00 PM',
    '7:00 PM',
    '10:00 PM',
  ];

  useEffect(() => {
    // Reset selections when movie changes
    setSelectedTime('');
    setSelectedSeats([]);
  }, [selectedMovie]);

  const handleSearch = (query: string) => {
    const filtered = movieData.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
      movie.language.toLowerCase().includes(query.toLowerCase())
    );
    setMovies(filtered);
  };

  const handleSeatSelect = (seatId: string) => {
    if (!user) {
      toast.error('Please login to select seats');
      return;
    }

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      }
      if (prev.length >= 6) {
        toast.error('Maximum 6 seats allowed per booking');
        return prev;
      }
      return [...prev, seatId];
    });
  };

  const handleBooking = () => {
    if (!user || !selectedMovie || !selectedTime || selectedSeats.length === 0) {
      return;
    }

    initializeBooking(selectedSeats);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    if (!user || !selectedMovie || !selectedTime) return;

    completeBooking(selectedSeats);
    toast.success('Tickets booked successfully!');
    setShowPayment(false);
    setSelectedSeats([]);
    setSelectedMovie(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Now Showing</h1>
        <div className="w-96">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search movies by title, genre, or language..."
          />
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105"
            onClick={() => setSelectedMovie(movie)}
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{movie.title}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {movie.duration} • {movie.language} • {movie.rating}
              </p>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{movie.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {movie.genre.map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Showtime</h2>
          <div className="flex flex-wrap gap-4">
            {showtimes.map((time) => (
              <button
                key={time}
                className={`px-4 py-2 rounded-lg font-medium transition-colors
                  ${selectedTime === time
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>

          {selectedTime && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Seats</h2>
              <MovieSeatMap
                showId={`${selectedMovie.id}-${selectedTime}`}
                onSeatSelect={handleSeatSelect}
              />
              
              {selectedSeats.length > 0 && (
                <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium">
                        Selected Seats: {selectedSeats.sort().join(', ')}
                      </p>
                      <p className="text-gray-600">
                        Total: ₹{selectedSeats.length * 200}
                      </p>
                    </div>
                    <button
                      onClick={handleBooking}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {showPayment && (
        <PaymentModal
          amount={selectedSeats.length * 200}
          bookingType="movie"
          bookingDetails={{
            movie: selectedMovie,
            showtime: selectedTime,
            seats: selectedSeats,
          }}
          onClose={() => setShowPayment(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}