import { IStatsService } from "./IStatsService";
import { Stats } from "../models/Stats";

class StatsService implements IStatsService {

    private readonly baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

  async getStats(signal?: AbortSignal): Promise<Stats> {
    const response = await fetch(`${this.baseUrl}/stats`, { signal });

    if (!response.ok) {
      throw new Error(`Failed to fetch stats: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  }
}

export default new StatsService();