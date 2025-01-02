import { useState } from 'react';
import { useAuthStore } from '../store';
import { useBookingHistory } from './useBookingHistory';
import { useNotifications } from './useNotifications';
import { toast } from 'react-hot-toast';

interface PaymentOptions {
  amount: number;
  bookingType: 'flight' | 'hotel' | 'train' | 'movie' | 'event';
  bookingDetails: any;
}

export function usePayment() {
  const [processing, setProcessing] = useState(false);
  const { user } = useAuthStore();
  const { addBooking } = useBookingHistory();
  const { addNotification } = useNotifications();

  const processPayment = async ({ amount, bookingType, bookingDetails }: PaymentOptions) => {
    if (!user) {
      toast.error('Please login to continue');
      return false;
    }

    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add to booking history
      addBooking({
        type: bookingType,
        status: 'confirmed',
        userId: user.id,
        details: bookingDetails,
        price: amount
      });

      // Add notification
      addNotification({
        title: 'Booking Confirmed',
        message: `Your ${bookingType} booking has been confirmed. Thank you for booking with us!`,
        type: 'success'
      });

      toast.success('Payment successful');
      return true;
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      return false;
    } finally {
      setProcessing(false);
    }
  };

  return {
    processing,
    processPayment
  };
}