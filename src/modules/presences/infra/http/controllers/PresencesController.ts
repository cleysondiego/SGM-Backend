import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import RegisterPresenceService from '@modules/presences/services/RegisterPresenceService';
import ListPresencesService from '@modules/presences/services/ListPresencesService';

export default class PresencesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { monitoring_id } = request.params;

    const listPresence = container.resolve(ListPresencesService);

    const presences = await listPresence.execute({
      monitoring_id,
    });

    return response.json(classToClass(presences));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { student_registration } = request.body;

    const registerPresence = container.resolve(RegisterPresenceService);

    const presence = await registerPresence.execute({
      student_registration,
      user_id,
    });

    return response.json(classToClass(presence));
  }
}
