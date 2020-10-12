import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMonitoringService from '@modules/monitoring/services/CreateMonitoringService';
import ShowMonitoringService from '@modules/monitoring/services/ShowMonitoringService';
import ListMonitoringService from '@modules/monitoring/services/ListMonitoringService';
import UpdateMonitoringService from '@modules/monitoring/services/UpdateMonitoringService';
import DeleteMonitoringService from '@modules/monitoring/services/DeleteMonitoringService';

export default class MonitoringController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { monitoring_id } = request.params;

    const showMonitoring = container.resolve(ShowMonitoringService);

    const monitoring = await showMonitoring.execute({ monitoring_id });

    return response.json(classToClass(monitoring));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listMonitoring = container.resolve(ListMonitoringService);

    const monitorings = await listMonitoring.execute();

    return response.json(classToClass(monitorings));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      name,
      teacher_id,
      monitor_id,
      isAvailable,
      room,
      schedule,
      day,
    } = request.body;

    const createMonitoring = container.resolve(CreateMonitoringService);

    const monitoring = await createMonitoring.execute({
      name,
      user_id,
      teacher_id,
      monitor_id,
      isAvailable,
      room,
      schedule,
      day,
    });

    return response.json(classToClass(monitoring));
  }

  public async patch(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      teacher_id,
      monitor_id,
      isAvailable,
      room,
      schedule,
      day,
    } = request.body;

    const updateMonitoring = container.resolve(UpdateMonitoringService);

    const monitoring = await updateMonitoring.execute({
      id,
      name,
      teacher_id,
      monitor_id,
      isAvailable,
      room,
      schedule,
      day,
    });

    return response.json(classToClass(monitoring));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMonitoring = container.resolve(DeleteMonitoringService);

    await deleteMonitoring.execute({ id });

    return response.status(204).json({});
  }
}
