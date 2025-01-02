import { User, CreditCard, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../lib/store';
import { useNavigate } from 'react-router-dom';

interface ProfileSidebarProps {
  activeTab: 'bookings' | 'settings';
  onTabChange: (tab: 'bookings' | 'settings') => void;
}

export function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center">
        <div className="inline-block p-3 bg-blue-100 rounded-full">
          <User className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-4 text-xl font-bold">{user?.name}</h2>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      <div className="mt-8 space-y-2">
        <button
          onClick={() => onTabChange('bookings')}
          className={`w-full px-4 py-2 text-left rounded-lg flex items-center ${
            activeTab === 'bookings'
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-gray-50'
          }`}
        >
          <CreditCard className="h-5 w-5 mr-3" />
          My Bookings
        </button>
        <button
          onClick={() => onTabChange('settings')}
          className={`w-full px-4 py-2 text-left rounded-lg flex items-center ${
            activeTab === 'settings'
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-gray-50'
          }`}
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </button>
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 hover:bg-red-50"
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}