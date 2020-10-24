import { injectable, inject } from 'tsyringe';

import IMonitoringRepository from '@modules/monitoring/repositories/IMonitoringRepository';
import IPresencesRepository from '@modules/presences/repositories/IPresencesRepository';

interface IPresencesByMonitoring {
  monitoring: string;
  presences: number;
}

@injectable()
class ListAllPresences {
  constructor(
    @inject('PresencesRepository')
    private presencesRepository: IPresencesRepository,

    @inject('MonitoringRepository')
    private monitoringRepository: IMonitoringRepository,
  ) {}

  public async execute(): Promise<IPresencesByMonitoring[]> {
    const monitorings = await this.monitoringRepository.findAll();

    const presences: IPresencesByMonitoring[] = [];

    let i;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < monitorings.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const allPresences = await this.presencesRepository.findAllByMonitoringId(
        monitorings[i].id,
      );

      const data: IPresencesByMonitoring = {} as IPresencesByMonitoring;

      data.monitoring = monitorings[i].name;
      data.presences = allPresences.length;

      presences.push(data);
    }

    return presences;
  }
}

export default ListAllPresences;
