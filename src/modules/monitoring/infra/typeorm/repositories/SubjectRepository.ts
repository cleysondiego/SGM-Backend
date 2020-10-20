import ICreateSubjectDTO from '@modules/monitoring/dtos/ICreateSubjectDTO';
import ISubjectRepository from '@modules/monitoring/repositories/ISubjectRepository';
import { getRepository, Repository } from 'typeorm';
import Subject from '../entities/Subject';

class SubjectRepository implements ISubjectRepository {
  private ormRepository: Repository<Subject>;

  constructor() {
    this.ormRepository = getRepository(Subject);
  }

  public async findAll(): Promise<Subject[]> {
    const subjects = await this.ormRepository.find();

    return subjects;
  }

  public async findById(id: string): Promise<Subject | undefined> {
    const subject = await this.ormRepository.findOne(id);

    return subject;
  }

  public async findByMonitoring(monitoring_id: string): Promise<Subject[]> {
    const subjects = await this.ormRepository.find({
      where: {
        monitoring_id,
      },
    });

    return subjects;
  }

  public async create(data: ICreateSubjectDTO): Promise<Subject> {
    const subject = await this.ormRepository.create(data);

    await this.ormRepository.save(subject);

    return subject;
  }

  public async save(subject: Subject): Promise<Subject> {
    return this.ormRepository.save(subject);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default SubjectRepository;
