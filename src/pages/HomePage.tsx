import { Link } from 'react-router-dom';
import { Plane, Hotel, Train, Film, Music } from 'lucide-react';

const services = [
  {
    name: 'Flights',
    icon: Plane,
    description: 'Book domestic and international flights',
    href: '/flights',
    color: 'bg-blue-500',
  },
  {
    name: 'Hotels',
    icon: Hotel,
    description: 'Find and book hotels worldwide',
    href: '/hotels',
    color: 'bg-green-500',
  },
  {
    name: 'Trains',
    icon: Train,
    description: 'Reserve train tickets',
    href: '/trains',
    color: 'bg-yellow-500',
  },
  {
    name: 'Movies',
    icon: Film,
    description: 'Book movie tickets',
    href: '/movies',
    color: 'bg-purple-500',
  },
  {
    name: 'Events',
    icon: Music,
    description: 'Get tickets for live events',
    href: '/events',
    color: 'bg-pink-500',
  },
];

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Your One-Stop Booking Platform
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Book flights, hotels, trains, movies, and events - all in one place.
        </p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.name}
              to={service.href}
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div>
                <span
                  className={`inline-flex p-3 rounded-lg ${service.color} text-white`}
                >
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {service.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-blue-600 rounded-lg shadow-xl overflow-hidden">
        <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
          <div className="lg:self-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block">Create an account today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-200">
              Join thousands of users who book their entertainment and travel through our platform.
            </p>
            <Link
              to="/register"
              className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-blue-600 hover:bg-blue-50"
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}