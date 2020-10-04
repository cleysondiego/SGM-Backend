import { getRepository, Repository } from 'typeorm';

import IMonitoringRepository from '@modules/monitoring/repositories/IMonitoringRepository';
import ICreateMonitoringDTO from '@modules/monitoring/dtos/ICreateMonitoringDTO';
import Monitoring from '../entities/Monitoring';

class MonitoringRepository implements IMonitoringRepository {
  private ormRepository: Repository<Monitoring>;

  constructor() {
    this.ormRepository = getRepository(Monitoring);
  }

  public async findAll(): Promise<Monitoring[]> {
    const allMonitoring = await this.ormRepository.find({
      relations: ['teacher'],
    });

    return allMonitoring;
  }

  public async findByMonitorId(id: string): Promise<Monitoring | undefined> {
    const monitoring = await this.ormRepository.findOne({
      where: { monitor_id: id },
      relations: ['teacher'],
    });

    return monitoring;
  }

  public async findById(id: string): Promise<Monitoring | undefined> {
    const monitoring = await this.ormRepository.findOne(id);

    return monitoring;
  }

  public async findByName(name: string): Promise<Monitoring | undefined> {
    const monitoring = await this.ormRepository.findOne({
      where: { name },
    });

    return monitoring;
  }

  public async create(data: ICreateMonitoringDTO): Promise<Monitoring> {
    const monitoring = this.ormRepository.create(data);

    await this.ormRepository.save(monitoring);

    return monitoring;
  }

  public async save(monitoring: Monitoring): Promise<Monitoring> {
    return this.ormRepository.save(monitoring);
  }
}

export default MonitoringRepository;
