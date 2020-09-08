import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeMonitoringRepository from '../repositories/fakes/FakeMonitoringRepository';
import UpdateMonitoringService from './UpdateMonitoringService';

let fakeMonitoringRepository: FakeMonitoringRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateMonitoring: UpdateMonitoringService;

describe('UpdateMonitoring', () => {
  beforeEach(() => {
    fakeMonitoringRepository = new FakeMonitoringRepository();
    fakeCacheProvider = new FakeCacheProvider();

    updateMonitoring = new UpdateMonitoringService(
      fakeMonitoringRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update the monitoring', async () => {
    const monitoring = await fakeMonitoringRepository.create({
      name: 'test monitoring',
      teacher_id: 'teacher-id',
      user_id: 'user-id',
    });

    const updatedMonitoring = await updateMonitoring.execute({
      id: monitoring.id,
      name: 'test-changed-monitoring',
      isAvailable: false,
    });

    expect(updatedMonitoring.name).toBe('test-changed-monitoring');
    expect(updatedMonitoring.isAvailable).toBe(false);
  });
});
