import ApiGigService from './ApiGigService';
import { IGigService } from './IGigService';
import { IStatsService } from './IStatsService';
import StatsService from './StatsService';

class ServiceContainer {
  private static gigService: IGigService = ApiGigService;
  private static statsService: IStatsService = StatsService

  static getGigService(): IGigService {
    return this.gigService;
  }

  static getStatsService(): IStatsService {
    return this.statsService;
  }
}

export default ServiceContainer;