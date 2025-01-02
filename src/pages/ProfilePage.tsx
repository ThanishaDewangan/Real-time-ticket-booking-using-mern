import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { BookingHistory } from '../components/profile/BookingHistory';
import { ProfileSettings } from '../components/profile/ProfileSettings';
import { ProfileSidebar } from '../components/profile/ProfileSidebar';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'bookings' | 'settings'>('bookings');

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <ProfileSidebar 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <div className="col-span-12 md:col-span-9">
          {activeTab === 'bookings' ? (
            <BookingHistory />
          ) : (
            <ProfileSettings />
          )}
        </div>
      </div>
    </div>
  );
}