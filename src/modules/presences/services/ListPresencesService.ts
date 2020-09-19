import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Presences from '../infra/typeorm/entities/Presences';
import IPresencesRepository from '../repositories/IPresencesRepository';

interface IRequest {
  monitoring_id: string;
}

@injectable()
class ListPresencesService {
  constructor(
    @inject('PresencesRepository')
    private presencesRepository: IPresencesRepository,
  ) {}

  public async execute({ monitoring_id }: IRequest): Promise<Presences[]> {
    const presences = await this.presencesRepository.findAllByMonitoringId(
      monitoring_id,
    );

    if (!presences) {
      throw new AppError('Monitoring not found.');
    }

    return presences;
  }
}

export default ListPresencesService;
