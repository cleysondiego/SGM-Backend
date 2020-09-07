import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMonitoringService from '@modules/monitoring/services/CreateMonitoringService';
import ShowMonitoringService from '@modules/monitoring/services/ShowMonitoringService';

export default class MonitoringController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { monitoring_id } = request.params;

    const showMonitoring = container.resolve(ShowMonitoringService);

    const monitoring = await showMonitoring.execute({ monitoring_id });

    return response.json(classToClass(monitoring));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, teacher_id, monitor_id } = request.body;

    const createMonitoring = container.resolve(CreateMonitoringService);

    const monitoring = await createMonitoring.execute({
      name,
      user_id,
      teacher_id,
      monitor_id,
    });

    return response.json(classToClass(monitoring));
  }
}
