import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Monitoring from '../infra/typeorm/entities/Monitoring';
import IMonitoringRepository from '../repositories/IMonitoringRepository';

interface IRequest {
  id: string;
  name?: string;
  teacher_id?: string;
  monitor_id?: string;
  isAvailable?: boolean;
}

@injectable()
class UpdateMonitoringService {
  constructor(
    @inject('MonitoringRepository')
    private monitoringRepository: IMonitoringRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    teacher_id,
    monitor_id,
    isAvailable = true,
  }: IRequest): Promise<Monitoring> {
    const monitoring = await this.monitoringRepository.findById(id);

    if (!monitoring) {
      throw new AppError('Monitoring not found.');
    }

    monitoring.name = name || monitoring.name;
    monitoring.teacher_id = teacher_id || monitoring.teacher_id;
    monitoring.monitor_id = monitor_id || monitoring.monitor_id;
    monitoring.isAvailable = isAvailable;

    await this.cacheProvider.invalidate('monitoring-list');

    return this.monitoringRepository.save(monitoring);
  }
}

export default UpdateMonitoringService;
