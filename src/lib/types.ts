export interface City {
  id: string;
  name: string;
  state: string;
  airports?: string[];
  trainStations?: string[];
  movieTheaters?: string[];
  eventVenues?: string[];
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  seatsAvailable: number;
  class: 'economy' | 'business' | 'first';
}

export interface Train {
  id: string;
  trainNumber: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  classes: {
    type: 'SL' | '3A' | '2A' | '1A';
    available: number;
    price: number;
  }[];
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  rating: number;
  price: number;
  amenities: string[];
  images: string[];
  rooms: {
    type: string;
    price: number;
    available: number;
  }[];
}

export interface Movie {
  id: string;
  title: string;
  language: string;
  genre: string[];
  duration: string;
  rating: string;
  releaseDate: string;
  image: string;
  cast: string[];
  description: string;
}

export interface Theater {
  id: string;
  name: string;
  city: string;
  location: string;
  screens: number;
  amenities: string[];
}

export interface Event {
  id: string;
  title: string;
  type: 'concert' | 'sports' | 'comedy' | 'festival';
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number;
  image: string;
  description: string;
  artists?: string[];
}

export interface SeatStatus {
  id: string;
  status: 'available' | 'selected' | 'processing' | 'booked';
  userId?: string;
  userName?: string;
  timestamp?: number;
}