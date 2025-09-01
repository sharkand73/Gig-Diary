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
  calendarSync: boolean;
  isCash?: boolean;
  datePaid?: string | null;
  expenses?: number;
  mileage?: number;
  gigDate?: string;
  isComplete?: boolean;
  isFuture?: boolean;
  isPaid?: boolean;
}