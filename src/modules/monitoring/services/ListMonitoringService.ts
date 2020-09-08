import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IMonitoringRepository from '../repositories/IMonitoringRepository';
import Monitoring from '../infra/typeorm/entities/Monitoring';

@injectable()
class ListMonitoringService {
  constructor(
    @inject('MonitoringRepository')
    private monitoringRepository: IMonitoringRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Monitoring[]> {
    const cacheKey = 'monitoring-list';

    let monitoring = await this.cacheProvider.recover<Monitoring[]>(cacheKey);

    if (!monitoring) {
      monitoring = await this.monitoringRepository.findAll();

      await this.cacheProvider.save(cacheKey, monitoring);
    }

    return monitoring;
  }
}

export default ListMonitoringService;
