export interface Gig {
  id?: string;
  act: string;
  fee: number;
  leaveDate: string;
  returnDate: string;
  description: string;
  venue: string;
  postcode: string;
  instrument: 'Upright' | 'Electric';
  bookingDate: string;
  contact: string;
  calendarSync: boolean;
  isCash?: boolean;
  datePaid?: string | null;
  expenses?: number;
  mileage?: number;
  isComplete?: boolean;
  gigDate?: string; 
  isFuture?: boolean;
  isPaid?: boolean;
  isNextGig?: boolean;
}