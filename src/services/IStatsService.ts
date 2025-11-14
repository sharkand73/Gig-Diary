import { Stats } from "../models/Stats";

export interface IStatsService {
    getStats(): Promise<Stats>;
}