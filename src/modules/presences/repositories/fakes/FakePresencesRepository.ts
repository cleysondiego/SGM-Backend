import { uuid } from 'uuidv4';

import ICreatePresenceDTO from '@modules/presences/dtos/ICreatePresenceDTO';
import IFindPresenceByDateAndStudentRegistrationDTO from '@modules/presences/dtos/IFindPresenceByDateAndStudentRegistrationDTO';
import { isEqual } from 'date-fns';
import Presences from '../../infra/typeorm/entities/Presences';
import IPresencesRepository from '../IPresencesRepository';

class FakePresencesRepository implements IPresencesRepository {
  private presences: Presences[] = [];

  public async findByDate(
    data: IFindPresenceByDateAndStudentRegistrationDTO,
  ): Promise<Presences | undefined> {
    const presencesByDate = this.presences.filter(presences =>
      isEqual(presences.date, data.date),
    );

    const presenceByStudentRegistration = presencesByDate.find(
      presence => presence.student_registration === data.student_registration,
    );

    return presenceByStudentRegistration;
  }

  public async findAllByMonitoringId(
    monitoring_id: string,
  ): Promise<Presences[]> {
    const presence = this.presences.filter(
      presences => presences.monitoring_id === monitoring_id,
    );

    return presence;
  }

  public async create({
    monitoring_id,
    student_registration,
    date,
    monitor_id,
  }: ICreatePresenceDTO): Promise<Presences> {
    const presence = new Presences();

    Object.assign(presence, {
      id: uuid(),
      monitoring_id,
      student_registration,
      date,
      monitor_id,
    });

    this.presences.push(presence);

    return presence;
  }

  public async save(presence: Presences): Promise<Presences> {
    const findIndex = this.presences.findIndex(
      findPresence => findPresence.id === presence.id,
    );

    this.presences[findIndex] = presence;

    return presence;
  }
}

export default FakePresencesRepository;
