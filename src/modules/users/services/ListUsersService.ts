import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_type: string;
}

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_type }: IRequest): Promise<User[]> {
    if (!user_type) {
      const users = await this.usersRepository.findAll();

      return users;
    }

    const users = await this.usersRepository.findByUserType(user_type);

    return users;
  }
}

export default ListUsersService;
