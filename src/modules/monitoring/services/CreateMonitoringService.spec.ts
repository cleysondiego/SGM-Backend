import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeMonitoringRepository from '../repositories/fakes/FakeMonitoringRepository';
import CreateMonitoringService from './CreateMonitoringService';

let fakeMonitoringRepository: FakeMonitoringRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let createMonitoring: CreateMonitoringService;

describe('CreateMonitoring', () => {
  beforeEach(() => {
    fakeMonitoringRepository = new FakeMonitoringRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createMonitoring = new CreateMonitoringService(
      fakeMonitoringRepository,
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new monitoring', async () => {
    const secretary = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
      user_type: 4,
    });

    const coordinator = await fakeUsersRepository.create({
      email: 'coordinatordoe@example.com',
      name: 'Coordinator Doe',
      password: '123456',
      user_type: 3,
    });

    const teacher = await fakeUsersRepository.create({
      email: 'teacherdoe@example.com',
      name: 'Teacher Doe',
      password: '123456',
      user_type: 2,
    });

    const monitor = await fakeUsersRepository.create({
      email: 'monitordoe3@example.com',
      name: 'Monitor Doe',
      password: '123456',
      user_type: 1,
    });

    const monitoring1 = await createMonitoring.execute({
      name: 'test-monitoring',
      user_id: secretary.id,
      teacher_id: teacher.id,
      monitor_id: monitor.id,
    });

    const monitoring2 = await createMonitoring.execute({
      name: 'test-monitoring-2',
      user_id: coordinator.id,
      teacher_id: teacher.id,
    });

    expect(monitoring1).toHaveProperty('id');
    expect(monitoring2).toHaveProperty('id');
  });

  it('should not be able to create a new monitoring without user_type 3 or 4', async () => {
    const teacher = await fakeUsersRepository.create({
      email: 'teacherdoe@example.com',
      name: 'Teacher Doe',
      password: '123456',
      user_type: 2,
    });

    const monitor = await fakeUsersRepository.create({
      email: 'monitordoe3@example.com',
      name: 'Monitor Doe',
      password: '123456',
      user_type: 1,
    });

    await expect(
      createMonitoring.execute({
        name: 'test-monitoring',
        user_id: monitor.id,
        teacher_id: teacher.id,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createMonitoring.execute({
        name: 'test-monitoring-2',
        user_id: teacher.id,
        teacher_id: teacher.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new monitoring if teacher or monitor not exists', async () => {
    const coordinator = await fakeUsersRepository.create({
      email: 'coordinatordoe@example.com',
      name: 'Coordinator Doe',
      password: '123456',
      user_type: 3,
    });

    await expect(
      createMonitoring.execute({
        name: 'test-monitoring',
        user_id: coordinator.id,
        teacher_id: 'test-teacher-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    const teacher = await fakeUsersRepository.create({
      email: 'teacherdoe@example.com',
      name: 'Teacher Doe',
      password: '123456',
      user_type: 2,
    });

    await expect(
      createMonitoring.execute({
        name: 'test-monitoring',
        user_id: coordinator.id,
        teacher_id: teacher.id,
        monitor_id: 'test-monitor-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new monitoring when the monitor is already registered in another monitoring ', async () => {
    const coordinator = await fakeUsersRepository.create({
      email: 'coordinatordoe@example.com',
      name: 'Coordinator Doe',
      password: '123456',
      user_type: 3,
    });

    const teacher = await fakeUsersRepository.create({
      email: 'teacherdoe@example.com',
      name: 'Teacher Doe',
      password: '123456',
      user_type: 2,
    });

    const monitor = await fakeUsersRepository.create({
      email: 'monitordoe3@example.com',
      name: 'Monitor Doe',
      password: '123456',
      user_type: 1,
    });

    const monitoring = await createMonitoring.execute({
      name: 'test-monitoring',
      user_id: coordinator.id,
      teacher_id: teacher.id,
      monitor_id: monitor.id,
    });

    expect(monitoring).toHaveProperty('id');

    await expect(
      createMonitoring.execute({
        name: 'test-create-another-monitoring',
        user_id: coordinator.id,
        teacher_id: teacher.id,
        monitor_id: monitor.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
