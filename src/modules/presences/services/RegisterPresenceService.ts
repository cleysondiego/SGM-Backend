import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMonitoringRepository from '@modules/monitoring/repositories/IMonitoringRepository';
import { startOfHour } from 'date-fns';
import Presences from '../infra/typeorm/entities/Presences';
import IPresencesRepository from '../repositories/IPresencesRepository';

interface IRequest {
  user_id: string;
  student_registration: string;
}

@injectable()
class RegisterPresenceService {
  constructor(
    @inject('MonitoringRepository')
    private monitoringRepository: IMonitoringRepository,

    @inject('PresencesRepository')
    private presencesRepository: IPresencesRepository,
  ) {}

  public async execute({
    user_id,
    student_registration,
  }: IRequest): Promise<Presences> {
    const monitoring = await this.monitoringRepository.findByMonitorId(user_id);

    if (!monitoring) {
      throw new AppError('Monitoring not found for this user.');
    }

    const presenceDate = startOfHour(new Date());

    const havePresenceToday = await this.presencesRepository.findByDate({
      date: presenceDate,
      student_registration,
    });

    if (havePresenceToday) {
      throw new AppError('This student already has a presence');
    }

    const presence = await this.presencesRepository.create({
      monitor_id: user_id,
      student_registration,
      monitoring_id: monitoring.id,
      date: presenceDate,
    });

    return presence;
  }
}

export default RegisterPresenceService;
