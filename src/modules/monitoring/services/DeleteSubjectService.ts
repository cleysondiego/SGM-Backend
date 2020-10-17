import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { injectable, inject } from 'tsyringe';
import ISubjectRepository from '../repositories/ISubjectRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteSubjectService {
  constructor(
    @inject('SubjectRepository')
    private subjectRepository: ISubjectRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const subject = await this.subjectRepository.findById(id);

    await this.subjectRepository.deleteById(id);

    if (subject?.file) {
      await this.storageProvider.deleteFile(subject.file);
    }
  }
}

export default DeleteSubjectService;
