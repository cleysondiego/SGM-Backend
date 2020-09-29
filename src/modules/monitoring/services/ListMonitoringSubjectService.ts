import { injectable, inject } from 'tsyringe';

import Subject from '../infra/typeorm/entities/Subject';
import ISubjectRepository from '../repositories/ISubjectRepository';

@injectable()
class ListMonitoringSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  public async execute(): Promise<Subject[]> {
    const subjects = await this.subjectRepository.findAll();

    return subjects;
  }
}

export default ListMonitoringSubjectService;
