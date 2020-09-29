import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import Subject from '../infra/typeorm/entities/Subject';
import ISubjectRepository from '../repositories/ISubjectRepository';

interface IRequest {
  user_id: string;
  monitoring_id: string;
  url?: string;
  filename?: string;
}

@injectable()
class CreateSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    monitoring_id,
    url,
    filename,
  }: IRequest): Promise<Subject> {
    if (!url && !filename) {
      throw new AppError('You need to specify a URL or send a File');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.user_type !== 2) {
      throw new AppError('Only teachers can create new subjects');
    }

    const subject = await this.subjectRepository.create({
      monitoring_id,
      user_id,
      filename,
      url,
    });

    if (filename) {
      const file = await this.storageProvider.saveFile(filename);
      subject.file = file;
    }

    await this.subjectRepository.save(subject);

    return subject;
  }
}

export default CreateSubjectService;
