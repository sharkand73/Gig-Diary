import { Gig } from '../models/Gig';
import { IGigService } from './IGigService';

class LocalGigService implements IGigService {
  private storageKey = 'gigs';

  async create(gig: Omit<Gig, 'id'>, signal?: AbortSignal): Promise<Gig> {
    return this.withTimeout(async () => {
      if (signal?.aborted) throw new Error('Operation aborted');
      
      const newGig: Gig = {
        ...gig,
        id: Date.now().toString()
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
      return data ? JSON.parse(data) : [];
    }, signal);
  }

  async getById(id: string): Promise<Gig | null> {
    const gigs = await this.getAll();
    return gigs.find(gig => gig.id === id) || null;
  }

  async update(id: string, updatedGig: Omit<Gig, 'id'>): Promise<Gig | null> {
    const gigs = await this.getAll();
    const index = gigs.findIndex(gig => gig.id === id);
    
    if (index === -1) return null;
    
    gigs[index] = { ...updatedGig, id };
    localStorage.setItem(this.storageKey, JSON.stringify(gigs));
    
    return gigs[index];
  }

  async delete(id: string): Promise<boolean> {
    const gigs = await this.getAll();
    const filteredGigs = gigs.filter(gig => gig.id !== id);
    
    if (filteredGigs.length === gigs.length) return false;
    
    localStorage.setItem(this.storageKey, JSON.stringify(filteredGigs));
    return true;
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