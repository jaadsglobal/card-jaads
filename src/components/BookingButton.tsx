import { CalendarDays } from 'lucide-react';
import { site } from '../config/site';
import { ActionButton } from './ActionButton';

export function BookingButton({ label = 'Reservar una reunión' }: { label?: string }) {
  return <ActionButton label={label} icon={<CalendarDays size={20} strokeWidth={1.6} />} href={site.bookingUrl} accent />;
}
