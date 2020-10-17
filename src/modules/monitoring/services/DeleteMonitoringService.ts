import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IMonitoringRepository from '../repositories/IMonitoringRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteMonitoringService {
  constructor(
    @inject('MonitoringRepository')
    private monitoringRepository: IMonitoringRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.monitoringRepository.deleteById(id);

    await this.cacheProvider.invalidate('monitoring-list');
  }
}

export default DeleteMonitoringService;
