import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMonitoringService from '@modules/monitoring/services/CreateMonitoringService';

export default class MonitoringController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, teacher_id, monitor_id } = request.body;

    const createUser = container.resolve(CreateMonitoringService);

    const user = await createUser.execute({
      name,
      user_id,
      teacher_id,
      monitor_id,
    });

    return response.json(classToClass(user));
  }
}
