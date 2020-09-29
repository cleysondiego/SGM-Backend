import { injectable, inject } from 'tsyringe';

import Subject from '../infra/typeorm/entities/Subject';
import ISubjectRepository from '../repositories/ISubjectRepository';

@injectable()
class ShowMonitoringSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  public async execute(monitoring_id: string): Promise<Subject[]> {
    const subjects = await this.subjectRepository.findByMonitoring(
      monitoring_id,
    );

    return subjects;
  }
}

export default ShowMonitoringSubjectService;
