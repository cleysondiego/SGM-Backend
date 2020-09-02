import Monitoring from '../infra/typeorm/entities/Monitoring';
import ICreateMonitoringDTO from '../dtos/ICreateMonitoringDTO';

export default interface IMonitoringRepository {
  findAll(): Promise<Monitoring[]>;
  findById(id: string): Promise<Monitoring | undefined>;
  findByName(name: string): Promise<Monitoring | undefined>;
  create(data: ICreateMonitoringDTO): Promise<Monitoring>;
  save(monitoring: Monitoring): Promise<Monitoring>;
}
