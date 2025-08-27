  import { IGigService } from './IGigService';
import LocalGigService from './LocalGigService';

class ServiceContainer {
  private static gigService: IGigService = LocalGigService;

  static getGigService(): IGigService {
    return this.gigService;
  }

  static setGigService(service: IGigService): void {
    this.gigService = service;
  }
}

export default ServiceContainer;