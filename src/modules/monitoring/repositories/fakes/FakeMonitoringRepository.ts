import { uuid } from 'uuidv4';

import IMonitoringRepository from '@modules/monitoring/repositories/IMonitoringRepository';
import ICreateMonitoringDTO from '@modules/monitoring/dtos/ICreateMonitoringDTO';
import Monitoring from '../../infra/typeorm/entities/Monitoring';

class MonitoringRepository implements IMonitoringRepository {
  private monitorings: Monitoring[] = [];

  public async findAll(): Promise<Monitoring[]> {
    return this.monitorings;
  }

  public async findById(id: string): Promise<Monitoring | undefined> {
    const findMonitoring = this.monitorings.find(
      monitoring => monitoring.id === id,
    );

    return findMonitoring;
  }

  public async findByName(name: string): Promise<Monitoring | undefined> {
    const findMonitoring = this.monitorings.find(
      monitoring => monitoring.name === name,
    );

    return findMonitoring;
  }

  public async create({
    name,
    user_id,
    teacher_id,
    monitor_id,
  }: ICreateMonitoringDTO): Promise<Monitoring> {
    const monitoring = new Monitoring();

    Object.assign(monitoring, {
      id: uuid(),
      name,
      user_id,
      teacher_id,
      monitor_id,
    });

    this.monitorings.push(monitoring);

    return monitoring;
  }

  public async save(monitoring: Monitoring): Promise<Monitoring> {
    const findIndex = this.monitorings.findIndex(
      findMonitoring => findMonitoring.id === monitoring.id,
    );

    this.monitorings[findIndex] = monitoring;

    return monitoring;
  }
}

export default MonitoringRepository;
