import { Hotel } from '../types';

export const hotels: Hotel[] = [
  {
    id: 'taj-palace-delhi',
    name: 'Taj Palace',
    city: 'New Delhi',
    address: 'Diplomatic Enclave, Chanakyapuri',
    rating: 4.8,
    price: 12000,
    amenities: ['WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', '24/7 Room Service'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd'
    ],
    rooms: [
      { type: 'Deluxe', price: 12000, available: 15 },
      { type: 'Premium', price: 15000, available: 10 },
      { type: 'Suite', price: 25000, available: 5 }
    ]
  },
  {
    id: 'oberoi-mumbai',
    name: 'The Oberoi',
    city: 'Mumbai',
    address: 'Nariman Point',
    rating: 4.9,
    price: 15000,
    amenities: ['WiFi', 'Ocean View', 'Spa', 'Fine Dining', 'Bar', 'Gym', 'Butler Service'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'
    ],
    rooms: [
      { type: 'Luxury', price: 15000, available: 20 },
      { type: 'Premier', price: 18000, available: 15 },
      { type: 'Suite', price: 30000, available: 8 }
    ]
  },
  {
    id: 'leela-bangalore',
    name: 'The Leela Palace',
    city: 'Bengaluru',
    address: 'Old Airport Road',
    rating: 4.7,
    price: 13000,
    amenities: ['WiFi', 'Pool', 'Spa', 'Multiple Restaurants', 'Bar', 'Gym', 'Garden'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a'
    ],
    rooms: [
      { type: 'Deluxe', price: 13000, available: 25 },
      { type: 'Royal Club', price: 16000, available: 18 },
      { type: 'Suite', price: 28000, available: 10 }
    ]
  },
  {
    id: 'itc-kolkata',
    name: 'ITC Royal Bengal',
    city: 'Kolkata',
    address: 'JBS Haldane Avenue',
    rating: 4.6,
    price: 11000,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Business Center'],
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
    ],
    rooms: [
      { type: 'Tower', price: 11000, available: 30 },
      { type: 'Executive', price: 14000, available: 20 },
      { type: 'Suite', price: 24000, available: 12 }
    ]
  },
  {
    id: 'taj-chennai',
    name: 'Taj Coromandel',
    city: 'Chennai',
    address: 'Nungambakkam',
    rating: 4.7,
    price: 10000,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Conference Rooms'],
    images: [
      'https://images.unsplash.com/photo-1571003123176-b27a28f96fb5',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a'
    ],
    rooms: [
      { type: 'Luxury', price: 10000, available: 25 },
      { type: 'Executive', price: 13000, available: 15 },
      { type: 'Suite', price: 22000, available: 8 }
    ]
  }
];