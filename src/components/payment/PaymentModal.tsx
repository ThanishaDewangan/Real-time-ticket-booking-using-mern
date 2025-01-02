import { useState } from 'react';
import { CreditCard, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/utils/price';
import { useAuthStore } from '../../lib/store';
import { useBookingHistory } from '../../lib/hooks/useBookingHistory';
import { useNotifications } from '../../lib/hooks/useNotifications';

interface PaymentModalProps {
  amount: number;
  bookingDetails: any;
  bookingType: 'flight' | 'hotel' | 'train' | 'movie' | 'event';
  onClose: () => void;
  onComplete: () => void;
}

export function PaymentModal({ 
  amount, 
  bookingDetails,
  bookingType,
  onClose, 
  onComplete 
}: PaymentModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  
  const { user } = useAuthStore();
  const { addBooking } = useBookingHistory();
  const { addNotification } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to booking history
      if (user) {
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
      }

      onComplete();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        <p className="text-gray-600 mb-6">Amount to pay: {formatPrice(amount)}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={19}
                required
              />
              <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={5}
                  required
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={3}
                required
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={processing}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1"
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Pay Now'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}