import { injectable, inject } from 'tsyringe';
import { isUuid } from 'uuidv4';

import AppError from '@shared/errors/AppError';
import Monitoring from '../infra/typeorm/entities/Monitoring';
import IMonitoringRepository from '../repositories/IMonitoringRepository';

interface IRequest {
  monitoring_id: string;
}

@injectable()
class ShowMonitoringService {
  constructor(
    @inject('MonitoringRepository')
    private monitoringRepository: IMonitoringRepository,
  ) {}

  public async execute({ monitoring_id }: IRequest): Promise<Monitoring> {
    if (!isUuid(monitoring_id)) {
      throw new AppError('The ID must be UUID');
    }

    const monitoring = await this.monitoringRepository.findById(monitoring_id);

    if (!monitoring) {
      throw new AppError('Monitoring not found.');
    }

    return monitoring;
  }
}

export default ShowMonitoringService;
