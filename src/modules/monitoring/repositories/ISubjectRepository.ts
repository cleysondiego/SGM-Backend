import Subject from '../infra/typeorm/entities/Subject';
import ICreateSubjectDTO from '../dtos/ICreateSubjectDTO';

export default interface ISubjectRepository {
  findAll(): Promise<Subject[]>;
  findByMonitoring(monitoring_id: string): Promise<Subject[]>;
  findById(id: string): Promise<Subject | undefined>;
  create(data: ICreateSubjectDTO): Promise<Subject>;
  save(subject: Subject): Promise<Subject>;
}
