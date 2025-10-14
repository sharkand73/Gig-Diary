import { Gig } from '../models/Gig';
import { IGigService } from './IGigService';

class ApiGigService implements IGigService {
  
  private readonly baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
  
  async create(gig: Omit<Gig, 'id'>, signal?: AbortSignal): Promise<Gig> {
    
    const payload = JSON.stringify(gig);
    console.log(payload);
    const response = await fetch(`${this.baseUrl}/gigs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      signal
    });

    if (!response.ok) {
      throw new Error(`Failed to create gig: ${response.statusText}`);
    }

    return response.json();
  }

  async getAll(signal?: AbortSignal): Promise<Gig[]> {
    const response = await fetch(`${this.baseUrl}/gigs`, { signal });

    if (!response.ok) {
      throw new Error(`Failed to fetch gigs: ${response.statusText}`);
    }

    return response.json();
  }

  async getById(id: string, signal?: AbortSignal): Promise<Gig | null> {
    const response = await fetch(`${this.baseUrl}/gigs/${id}`, { signal });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch gig: ${response.statusText}`);
    }

    return response.json();
  }

  async update(id: string, updatedGig: Omit<Gig, 'id'>, signal?: AbortSignal): Promise<Gig | null> {
    const payload = JSON.stringify(updatedGig);
    console.log(payload);
    const response = await fetch(`${this.baseUrl}/gigs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      signal
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to update gig: ${response.statusText}`);
    }

    return response.json();
  }

  async delete(id: string, signal?: AbortSignal): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/gigs/${id}`, {
      method: 'DELETE',
      signal
    });

    if (response.status === 404) {
      return false;
    }

    if (!response.ok) {
      throw new Error(`Failed to delete gig: ${response.statusText}`);
    }

    return true;
  }
}

export default new ApiGigService();