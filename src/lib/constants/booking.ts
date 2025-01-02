export const SELECTION_TIMEOUT = 30 * 1000; // 30 seconds
export const PROCESSING_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export const SEAT_STATUS_COLORS = {
  available: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
  selected: {
    own: 'bg-blue-500 text-white hover:bg-blue-600',
    other: 'bg-orange-400 text-white cursor-not-allowed hover:bg-orange-500'
  },
  processing: {
    own: 'bg-yellow-400 text-yellow-900 cursor-not-allowed animate-pulse',
    other: 'bg-red-400 text-white cursor-not-allowed animate-pulse'
  },
  booked: 'bg-green-500 text-white cursor-not-allowed hover:bg-green-600'
};