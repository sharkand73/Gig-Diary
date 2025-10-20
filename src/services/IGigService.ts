import { Gig } from '../models/Gig';

export interface IGigService {
  create(gig: Omit<Gig, 'id'>, signal?: AbortSignal): Promise<Gig>;
  getAll(signal?: AbortSignal): Promise<Gig[]>;
  getById(id: string, signal?: AbortSignal): Promise<Gig | null>;
  update(id: string, updatedGig: Omit<Gig, 'id'>, signal?: AbortSignal): Promise<Gig | null>;
  delete(id: string, signal?: AbortSignal): Promise<boolean>;
  getMappings(signal?: AbortSignal): Promise<any>;
}