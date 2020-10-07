import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import BeAMonitorService from '@modules/users/services/BeAMonitorService';

export default class MonitorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      monitoring_id,
      name,
      zip_code,
      street,
      neighborhood,
      city,
      state,
      email,
      phone,
      hours_available,
      agency,
      account,
    } = request.body;

    const beAMonitor = container.resolve(BeAMonitorService);

    const monitor = await beAMonitor.execute({
      monitoring_id,
      name,
      zip_code,
      street,
      neighborhood,
      city,
      state,
      email,
      phone,
      hours_available,
      agency,
      account,
    });

    return response.json(classToClass(monitor));
  }
}
