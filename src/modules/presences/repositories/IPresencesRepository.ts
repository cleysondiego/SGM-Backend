import Presences from '../infra/typeorm/entities/Presences';
import ICreatePresenceDTO from '../dtos/ICreatePresenceDTO';
import IFindPresenceByDateAndStudentRegistrationDTO from '../dtos/IFindPresenceByDateAndStudentRegistrationDTO';

export default interface IPresencesRepository {
  findByDate(
    date: IFindPresenceByDateAndStudentRegistrationDTO,
  ): Promise<Presences | undefined>;
  findAllByMonitoringId(monitoring_id: string): Promise<Presences[]>;
  create(data: ICreatePresenceDTO): Promise<Presences>;
  save(presence: Presences): Promise<Presences>;
}
