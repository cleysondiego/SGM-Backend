import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMonitoringRepository from '../repositories/IMonitoringRepository';

import Monitoring from '../infra/typeorm/entities/Monitoring';

interface IRequest {
  name: string;
  user_id: string;
  teacher_id: string;
  monitor_id?: string;
}

@injectable()
class CreateMonitoringService {
  constructor(
    @inject('MonitoringRepository')
    private monitoringRepository: IMonitoringRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    user_id,
    teacher_id,
    monitor_id,
  }: IRequest): Promise<Monitoring> {
    const monitoringExists = await this.monitoringRepository.findByName(name);

    if (monitoringExists) {
      throw new AppError('Monitoring already exists.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (user?.user_type !== 3 && user?.user_type !== 4) {
      throw new AppError(
        'Only Secretary and Coordinator able to create new Monitoring',
      );
    }

    const monitoring = await this.monitoringRepository.create({
      name,
      user_id,
      teacher_id,
      monitor_id,
    });

    return monitoring;
  }
}

export default CreateMonitoringService;
