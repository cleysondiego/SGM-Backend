import AppError from '@shared/errors/AppError';

import FakeMonitoringRepository from '../repositories/fakes/FakeMonitoringRepository';
import ShowMonitoringService from './ShowMonitoringService';

let fakeMonitoringRepository: FakeMonitoringRepository;

let listOneMonitoring: ShowMonitoringService;

describe('ShowMonitoring', () => {
  beforeEach(() => {
    fakeMonitoringRepository = new FakeMonitoringRepository();
    listOneMonitoring = new ShowMonitoringService(fakeMonitoringRepository);
  });

  it('should be able to list a monitoring', async () => {
    const monitoring1 = await fakeMonitoringRepository.create({
      name: 'test-monitoring',
      user_id: 'user-id-test-1',
      teacher_id: 'teacher-id-test-1',
      monitor_id: 'monitor-id-test-1',
    });

    const monitoring2 = await fakeMonitoringRepository.create({
      name: 'test-monitoring-2',
      user_id: 'user-id-test-2',
      teacher_id: 'teacher-id-test-2',
    });

    const listMonitoring1 = await listOneMonitoring.execute({
      monitoring_id: monitoring1.id,
    });

    const listMonitoring2 = await listOneMonitoring.execute({
      monitoring_id: monitoring2.id,
    });

    expect(listMonitoring1).toEqual(monitoring1);
    expect(listMonitoring2).toEqual(monitoring2);
  });

  it('should not be able to list a monitoring with invalid monitoring id', async () => {
    await expect(
      listOneMonitoring.execute({
        monitoring_id: 'invalid-monitoring-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
