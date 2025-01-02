import { City } from '../types';

export const cities: City[] = [
  {
    id: 'del',
    name: 'New Delhi',
    state: 'Delhi',
    airports: ['Indira Gandhi International Airport'],
    trainStations: ['New Delhi Railway Station', 'Delhi Junction', 'Hazrat Nizamuddin'],
    movieTheaters: ['PVR Select Citywalk', 'DLF Promenade'],
    eventVenues: ['Jawaharlal Nehru Stadium', 'India Gate Grounds']
  },
  {
    id: 'mum',
    name: 'Mumbai',
    state: 'Maharashtra',
    airports: ['Chhatrapati Shivaji International Airport'],
    trainStations: ['Chhatrapati Shivaji Terminus', 'Mumbai Central'],
    movieTheaters: ['PVR Phoenix', 'INOX Nariman Point'],
    eventVenues: ['DY Patil Stadium', 'Wankhede Stadium']
  },
  {
    id: 'blr',
    name: 'Bengaluru',
    state: 'Karnataka',
    airports: ['Kempegowda International Airport'],
    trainStations: ['KSR Bengaluru City Junction', 'Yeshwanthpur Junction'],
    movieTheaters: ['PVR Forum Mall', 'INOX Garuda'],
    eventVenues: ['Palace Grounds', 'Chinnaswamy Stadium']
  },
  // Add more cities as needed
];