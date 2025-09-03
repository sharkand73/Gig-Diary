import { Gig } from '../models/Gig';
import { IGigService } from './IGigService';
import { formatDate } from '../utilities/common';

class LocalGigService implements IGigService {
  private storageKey = 'gigs';

  async create(gig: Omit<Gig, 'id'>, signal?: AbortSignal): Promise<Gig> {
    return this.withTimeout(async () => {
      if (signal?.aborted) throw new Error('Operation aborted');
      
      const newGig: Gig = {
        ...gig,
        id: Date.now().toString(),
        isCash: false,
        datePaid: null,
        expenses: 0,
        mileage: 0,
        gigDate: formatDate(gig.leaveDate),
        isComplete: false,
        isFuture: new Date(gig.leaveDate) > new Date(),
        isPaid: false
      };
      
      const gigs = await this.getAll();
      gigs.push(newGig);
      localStorage.setItem(this.storageKey, JSON.stringify(gigs));
      
      return newGig;
    }, signal);
  }

  async getAll(signal?: AbortSignal): Promise<Gig[]> {
    return this.withTimeout(async () => {
      if (signal?.aborted) throw new Error('Operation aborted');
      
      const data = localStorage.getItem(this.storageKey);
      const allGigs = data ? JSON.parse(data) : [];
      return allGigs.map((gig: Gig) => ({ ...gig, isFuture: new Date(gig.leaveDate) > new Date() }));
    }, signal);
  }

  async getById(id: string, signal?: AbortSignal): Promise<Gig | null> {
    return this.withTimeout(async () => {
      if (signal?.aborted) throw new Error('Operation aborted');
      
      const data = localStorage.getItem(this.storageKey);
      const gigs: Gig[] = data ? JSON.parse(data) : [];
      const gig = gigs.find(g => g.id === id);
      return gig ? {...gig, isFuture: new Date(gig.leaveDate) > new Date()} : null;
    }, signal);
  }

  async update(id: string, updatedGig: Omit<Gig, 'id'>, signal?: AbortSignal): Promise<Gig | null> {
    return this.withTimeout(async () => {
      if (signal?.aborted) throw new Error('Operation aborted');
      
      const gigs = await this.getAll();
      const index = gigs.findIndex(gig => gig.id === id);
      
      if (index === -1) return null;
      
      gigs[index] = { ...updatedGig, id };
      localStorage.setItem(this.storageKey, JSON.stringify(gigs));
      
      return gigs[index];
    }, signal);
  }

  async delete(id: string, signal?: AbortSignal): Promise<boolean> {
    return this.withTimeout(async () => {
      if (signal?.aborted) throw new Error('Operation aborted');
      
      const gigs = await this.getAll();
      const filteredGigs = gigs.filter(gig => gig.id !== id);
      
      if (filteredGigs.length === gigs.length) return false;
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredGigs));
      return true;
    }, signal);
  }

  private async withTimeout<T>(operation: () => Promise<T>, signal?: AbortSignal, timeoutMs = 5000): Promise<T> {
    return Promise.race([
      operation(),
      new Promise<never>((_, reject) => {
        const timeout = setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
        signal?.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new Error('Operation aborted'));
        });
      })
    ]);
  }
}

export default new LocalGigService();