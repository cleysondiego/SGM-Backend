import FakeMonitoringRepository from '@modules/monitoring/repositories/fakes/FakeMonitoringRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListMonitoringService from './ListMonitoringService';

let fakeMonitoringRepository: FakeMonitoringRepository;
let fakeCacheProvider: FakeCacheProvider;
let listMonitoring: ListMonitoringService;

describe('ListMonitoring', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeMonitoringRepository = new FakeMonitoringRepository();

    listMonitoring = new ListMonitoringService(
      fakeMonitoringRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the monitoring', async () => {
    const monitoring1 = await fakeMonitoringRepository.create({
      name: 'John Doe',
      teacher_id: 'teacher-id',
      user_id: 'user-id',
    });

    const monitoring2 = await fakeMonitoringRepository.create({
      name: 'John Trê',
      teacher_id: 'teacher-id-2',
      user_id: 'user-id-2',
    });

    const monitoring = await listMonitoring.execute();

    expect(monitoring).toEqual([monitoring1, monitoring2]);
  });
});
