import { Event } from '../types';

export const events: Event[] = [
  {
    id: 'event1',
    title: 'Arijit Singh Live in Concert',
    type: 'concert',
    date: '2024-04-15',
    time: '19:00',
    venue: 'Jawaharlal Nehru Stadium',
    city: 'New Delhi',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14',
    description: 'Experience the magic of Arijit Singh live in concert',
    artists: ['Arijit Singh']
  },
  {
    id: 'event2',
    title: 'IPL 2024: MI vs CSK',
    type: 'sports',
    date: '2024-04-20',
    time: '19:30',
    venue: 'Wankhede Stadium',
    city: 'Mumbai',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
    description: 'Watch the epic clash between Mumbai Indians and Chennai Super Kings'
  },
  // Add more events
];