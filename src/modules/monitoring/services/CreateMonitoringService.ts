import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IMonitoringRepository from '../repositories/IMonitoringRepository';

import Monitoring from '../infra/typeorm/entities/Monitoring';

interface IRequest {
  name: string;
  user_id: string;
  teacher_id: string;
  monitor_id?: string;
  isAvailable?: boolean;
  room?: string;
  schedule?: string;
  day?: string;
}

@injectable()
class CreateMonitoringService {
  constructor(
    @inject('MonitoringRepository')
    private monitoringRepository: IMonitoringRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    user_id,
    teacher_id,
    monitor_id,
    isAvailable,
    room,
    schedule,
    day,
  }: IRequest): Promise<Monitoring> {
    const monitoringExists = await this.monitoringRepository.findByName(name);

    if (monitoringExists) {
      throw new AppError('Monitoring already exists.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (user?.user_type !== 3 && user?.user_type !== 4) {
      throw new AppError(
        'Only Secretary and Coordinator able to create new Monitoring.',
      );
    }

    const teacher = await this.usersRepository.findById(teacher_id);

    if (!teacher) {
      throw new AppError('Teacher not found.');
    }

    if (monitor_id) {
      const monitor = await this.usersRepository.findById(monitor_id);

      if (!monitor) {
        throw new AppError('Monitor not found.');
      }

      const monitorAlreadyRegistered = await this.monitoringRepository.findByMonitorId(
        monitor_id,
      );

      if (monitorAlreadyRegistered) {
        throw new AppError(
          'You cannot create a new monitoring with a monitor that is already registered to a another monitoring',
        );
      }
    }

    const monitoring = await this.monitoringRepository.create({
      name,
      user_id,
      teacher_id,
      monitor_id,
      isAvailable,
      room,
      schedule,
      day,
    });

    await this.cacheProvider.invalidate('monitoring-list');

    return monitoring;
  }
}

export default CreateMonitoringService;
