import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IMonitoringRepository from '@modules/monitoring/repositories/IMonitoringRepository';
import MonitoringRepository from '@modules/monitoring/infra/typeorm/repositories/MonitoringRepository';

import IPresencesRepository from '@modules/presences/repositories/IPresencesRepository';
import PresencesRepository from '@modules/presences/infra/typeorm/repositories/PresencesRepository';

import ISubjectRepository from '@modules/monitoring/repositories/ISubjectRepository';
import SubjectRepository from '@modules/monitoring/infra/typeorm/repositories/SubjectRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IMonitoringRepository>(
  'MonitoringRepository',
  MonitoringRepository,
);

container.registerSingleton<IPresencesRepository>(
  'PresencesRepository',
  PresencesRepository,
);

container.registerSingleton<ISubjectRepository>(
  'SubjectRepository',
  SubjectRepository,
);
