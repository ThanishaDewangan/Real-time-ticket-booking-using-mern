import { Train } from '../types';

export const trains: Train[] = [
  {
    id: '12952',
    trainNumber: '12952',
    name: 'Mumbai Rajdhani',
    from: 'New Delhi',
    to: 'Mumbai Central',
    departureTime: '16:25',
    arrivalTime: '08:15',
    price: 1500,
    classes: [
      { type: 'SL', available: 120, price: 1500 },
      { type: '3A', available: 80, price: 2200 },
      { type: '2A', available: 45, price: 3100 },
      { type: '1A', available: 20, price: 5200 }
    ]
  },
  {
    id: '12301',
    trainNumber: '12301',
    name: 'Howrah Rajdhani',
    from: 'New Delhi',
    to: 'Kolkata',
    departureTime: '16:50',
    arrivalTime: '09:55',
    price: 1800,
    classes: [
      { type: 'SL', available: 110, price: 1800 },
      { type: '3A', available: 75, price: 2500 },
      { type: '2A', available: 40, price: 3400 },
      { type: '1A', available: 15, price: 5500 }
    ]
  },
  {
    id: '12259',
    trainNumber: '12259',
    name: 'Duronto Express',
    from: 'Mumbai Central',
    to: 'New Delhi',
    departureTime: '15:30',
    arrivalTime: '07:00',
    price: 1600,
    classes: [
      { type: 'SL', available: 100, price: 1600 },
      { type: '3A', available: 70, price: 2300 },
      { type: '2A', available: 35, price: 3200 },
      { type: '1A', available: 18, price: 5300 }
    ]
  },
  {
    id: '12426',
    trainNumber: '12426',
    name: 'Bangalore Rajdhani',
    from: 'New Delhi',
    to: 'Bengaluru',
    departureTime: '20:15',
    arrivalTime: '06:40',
    price: 1700,
    classes: [
      { type: 'SL', available: 115, price: 1700 },
      { type: '3A', available: 85, price: 2400 },
      { type: '2A', available: 50, price: 3300 },
      { type: '1A', available: 22, price: 5400 }
    ]
  },
  {
    id: '12269',
    trainNumber: '12269',
    name: 'Chennai Duronto',
    from: 'Mumbai Central',
    to: 'Chennai Central',
    departureTime: '18:45',
    arrivalTime: '16:20',
    price: 1400,
    classes: [
      { type: 'SL', available: 125, price: 1400 },
      { type: '3A', available: 90, price: 2100 },
      { type: '2A', available: 55, price: 3000 },
      { type: '1A', available: 25, price: 5000 }
    ]
  },
  {
    id: '12303',
    trainNumber: '12303',
    name: 'Poorva Express',
    from: 'Howrah',
    to: 'New Delhi',
    departureTime: '14:30',
    arrivalTime: '10:45',
    price: 1300,
    classes: [
      { type: 'SL', available: 130, price: 1300 },
      { type: '3A', available: 95, price: 2000 },
      { type: '2A', available: 60, price: 2900 },
      { type: '1A', available: 28, price: 4800 }
    ]
  }
];