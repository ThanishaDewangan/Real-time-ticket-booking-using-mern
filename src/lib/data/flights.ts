import { Flight } from '../types';

export const flights: Flight[] = [
  {
    id: 'AI101',
    airline: 'Air India',
    flightNumber: 'AI-101',
    from: 'New Delhi',
    to: 'Mumbai',
    departureTime: '06:00',
    arrivalTime: '08:15',
    price: 5200,
    seatsAvailable: 45,
    class: 'economy'
  },
  {
    id: 'UK835',
    airline: 'Vistara',
    flightNumber: 'UK-835',
    from: 'Mumbai',
    to: 'Bengaluru',
    departureTime: '10:30',
    arrivalTime: '12:15',
    price: 4800,
    seatsAvailable: 32,
    class: 'economy'
  },
  {
    id: '6E235',
    airline: 'IndiGo',
    flightNumber: '6E-235',
    from: 'Bengaluru',
    to: 'New Delhi',
    departureTime: '15:45',
    arrivalTime: '18:30',
    price: 6100,
    seatsAvailable: 28,
    class: 'economy'
  },
  {
    id: 'SG401',
    airline: 'SpiceJet',
    flightNumber: 'SG-401',
    from: 'Mumbai',
    to: 'New Delhi',
    departureTime: '19:20',
    arrivalTime: '21:45',
    price: 4500,
    seatsAvailable: 52,
    class: 'economy'
  },
  {
    id: 'AI202',
    airline: 'Air India',
    flightNumber: 'AI-202',
    from: 'New Delhi',
    to: 'Bengaluru',
    departureTime: '08:30',
    arrivalTime: '11:15',
    price: 5800,
    seatsAvailable: 38,
    class: 'economy'
  }
];