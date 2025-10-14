import ApiGigService from './ApiGigService';
import { IGigService } from './IGigService';

class ServiceContainer {
  private static gigService: IGigService = ApiGigService;

  static getGigService(): IGigService {
    return this.gigService;
  }

  static setGigService(service: IGigService): void {
    this.gigService = service;
  }
}

export default ServiceContainer;