import { Movie, Theater } from '../types';

export const movies: Movie[] = [
  {
    id: 'movie1',
    title: 'Jawan',
    language: 'Hindi',
    genre: ['Action', 'Thriller'],
    duration: '2h 45m',
    rating: 'UA',
    releaseDate: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cast: ['Shah Rukh Khan', 'Nayanthara', 'Vijay Sethupathi'],
    description: 'A high-octane action thriller following a man\'s emotional journey and his quest for redemption.'
  },
  {
    id: 'movie2',
    title: 'Dunki',
    language: 'Hindi',
    genre: ['Drama', 'Comedy'],
    duration: '2h 41m',
    rating: 'UA',
    releaseDate: '2024-03-20',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cast: ['Shah Rukh Khan', 'Taapsee Pannu', 'Vicky Kaushal'],
    description: 'A heartwarming tale about friends who embark on a journey to fulfill their dreams.'
  },
  {
    id: 'movie3',
    title: 'Fighter',
    language: 'Hindi',
    genre: ['Action', 'Drama'],
    duration: '2h 46m',
    rating: 'UA',
    releaseDate: '2024-03-25',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    cast: ['Hrithik Roshan', 'Deepika Padukone', 'Anil Kapoor'],
    description: 'An action-packed aerial drama showcasing the valor of Indian Air Force pilots.'
  }
];

export const theaters: Theater[] = [
  {
    id: 'pvr-delhi',
    name: 'PVR Select Citywalk',
    city: 'New Delhi',
    location: 'Saket',
    screens: 7,
    amenities: ['Dolby Atmos', '4K Projection', 'Recliner Seats']
  },
  {
    id: 'inox-mumbai',
    name: 'INOX Megaplex',
    city: 'Mumbai',
    location: 'Lower Parel',
    screens: 11,
    amenities: ['IMAX', 'Dolby Atmos', '4K Projection', 'Recliner Seats']
  },
  {
    id: 'pvr-bangalore',
    name: 'PVR Forum Mall',
    city: 'Bangalore',
    location: 'Koramangala',
    screens: 9,
    amenities: ['4DX', 'Dolby Atmos', '4K Projection']
  }
];