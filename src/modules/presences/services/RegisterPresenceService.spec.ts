import AppError from '@shared/errors/AppError';

import FakeMonitoringRepository from '@modules/monitoring/repositories/fakes/FakeMonitoringRepository';
import FakePresencesRepository from '../repositories/fakes/FakePresencesRepository';

import RegisterPresenceService from './RegisterPresenceService';

let fakeMonitoringRepository: FakeMonitoringRepository;
let fakePresencesRepository: FakePresencesRepository;

let registerPresence: RegisterPresenceService;

describe('RegisterPresence', () => {
  beforeEach(() => {
    fakeMonitoringRepository = new FakeMonitoringRepository();
    fakePresencesRepository = new FakePresencesRepository();

    registerPresence = new RegisterPresenceService(
      fakeMonitoringRepository,
      fakePresencesRepository,
    );
  });

  it('should be able to register presence', async () => {
    await fakeMonitoringRepository.create({
      name: 'monitoring',
      teacher_id: 'teacher-id',
      user_id: 'user-id',
      isAvailable: true,
      monitor_id: 'monitor-id',
    });

    const response = await registerPresence.execute({
      user_id: 'monitor-id',
      student_registration: '1050481813000',
    });

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('student_registration');
  });

  it('should not be able to register presence if user_id is not monitor_id', async () => {
    await fakeMonitoringRepository.create({
      name: 'monitoring',
      teacher_id: 'teacher-id',
      user_id: 'user-id',
      isAvailable: true,
      monitor_id: 'monitor-id',
    });

    await expect(
      registerPresence.execute({
        user_id: 'user-id',
        student_registration: '1050481813000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to register presence to the same student_registration in the same day', async () => {
    await fakeMonitoringRepository.create({
      name: 'monitoring',
      teacher_id: 'teacher-id',
      user_id: 'user-id',
      isAvailable: true,
      monitor_id: 'monitor-id',
    });

    const response = await registerPresence.execute({
      user_id: 'monitor-id',
      student_registration: '1050481813000',
    });

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('student_registration');

    await expect(
      registerPresence.execute({
        user_id: 'monitor-id',
        student_registration: '1050481813000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
