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
}