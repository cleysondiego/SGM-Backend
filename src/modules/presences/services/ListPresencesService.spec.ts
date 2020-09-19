// import AppError from '@shared/errors/AppError';

import FakePresencesRepository from '../repositories/fakes/FakePresencesRepository';
import ListPresencesService from './ListPresencesService';

let fakePresencesRepository: FakePresencesRepository;

let showPresences: ListPresencesService;

describe('ShowPresences', () => {
  beforeEach(() => {
    fakePresencesRepository = new FakePresencesRepository();
    showPresences = new ListPresencesService(fakePresencesRepository);
  });

  it('should be able to list a presences', async () => {
    const presence1 = await fakePresencesRepository.create({
      date: new Date(2022, 8, 20, 14, 0, 0),
      monitor_id: 'monitor-id',
      monitoring_id: 'monitoring-id',
      student_registration: '123.456.789-00',
    });

    const presence2 = await fakePresencesRepository.create({
      date: new Date(2022, 8, 20, 14, 0, 0),
      monitor_id: 'monitor-id',
      monitoring_id: 'monitoring-id',
      student_registration: '123.456.789-99',
    });

    const presence3 = await fakePresencesRepository.create({
      date: new Date(2022, 8, 20, 14, 0, 0),
      monitor_id: 'monitor-id',
      monitoring_id: 'monitoring-id',
      student_registration: '123.456.789-88',
    });

    const listPresences = await showPresences.execute({
      monitoring_id: 'monitoring-id',
    });

    expect(listPresences).toEqual([presence1, presence2, presence3]);
  });

  // it('should not be able to list a monitoring with invalid monitoring id', async () => {
  //   await expect(
  //     listOneMonitoring.execute({
  //       monitoring_id: 'invalid-monitoring-id',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
