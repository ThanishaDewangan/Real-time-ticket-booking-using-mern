// Date utility functions
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function calculateDuration(departure: string, arrival: string): string {
  const [depHours, depMinutes] = departure.split(':').map(Number);
  const [arrHours, arrMinutes] = arrival.split(':').map(Number);
  
  let hours = arrHours - depHours;
  let minutes = arrMinutes - depMinutes;
  
  if (minutes < 0) {
    hours -= 1;
    minutes += 60;
  }
  
  return `${hours}h ${minutes}m`;
}