import ICreateSubjectDTO from '@modules/monitoring/dtos/ICreateSubjectDTO';
import Subject from '@modules/monitoring/infra/typeorm/entities/Subject';
import { uuid } from 'uuidv4';
import ISubjectRepository from '../ISubjectRepository';

class FakeSubjectRepository implements ISubjectRepository {
  private subjects: Subject[] = [];

  public async findAll(): Promise<Subject[]> {
    return this.subjects;
  }

  public async findById(id: string): Promise<Subject | undefined> {
    const findSubject = this.subjects.find(subject => subject.id === id);

    return findSubject;
  }

  public async findByMonitoring(monitoring_id: string): Promise<Subject[]> {
    const findSubjects = this.subjects.filter(
      subject => subject.monitoring_id === monitoring_id,
    );

    return findSubjects;
  }

  public async create({
    monitoring_id,
    user_id,
    filename,
    url,
  }: ICreateSubjectDTO): Promise<Subject> {
    const subject = new Subject();

    Object.assign(subject, {
      id: uuid(),
      monitoring_id,
      user_id,
      filename,
      url,
    });

    this.subjects.push(subject);

    return subject;
  }

  public async save(subject: Subject): Promise<Subject> {
    const findIndex = this.subjects.findIndex(
      findSubject => findSubject.id === subject.id,
    );

    this.subjects[findIndex] = subject;

    return subject;
  }
}

export default FakeSubjectRepository;
