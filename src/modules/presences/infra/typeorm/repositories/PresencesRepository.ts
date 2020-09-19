import ICreatePresenceDTO from '@modules/presences/dtos/ICreatePresenceDTO';
import IFindPresenceByDateAndStudentRegistrationDTO from '@modules/presences/dtos/IFindPresenceByDateAndStudentRegistrationDTO';
import IPresencesRepository from '@modules/presences/repositories/IPresencesRepository';
import { getRepository, Repository } from 'typeorm';
import Presences from '../entities/Presences';

class PresencesRepository implements IPresencesRepository {
  private ormRepository: Repository<Presences>;

  constructor() {
    this.ormRepository = getRepository(Presences);
  }

  public async findByDate(
    data: IFindPresenceByDateAndStudentRegistrationDTO,
  ): Promise<Presences | undefined> {
    const presence = await this.ormRepository.findOne({
      where: {
        date: data.date,
        student_registration: data.student_registration,
      },
    });

    return presence;
  }

  public async findAllByMonitoringId(
    monitoring_id: string,
  ): Promise<Presences[]> {
    const presences = await this.ormRepository.find({
      where: {
        monitoring_id,
      },
    });

    return presences;
  }

  public async create(data: ICreatePresenceDTO): Promise<Presences> {
    const presence = this.ormRepository.create(data);

    await this.ormRepository.save(presence);

    return presence;
  }

  public async save(presence: Presences): Promise<Presences> {
    return this.ormRepository.save(presence);
  }
}

export default PresencesRepository;
