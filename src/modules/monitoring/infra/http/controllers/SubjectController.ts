import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSubjectService from '@modules/monitoring/services/CreateSubjectService';
import ListMonitoringSubjectService from '@modules/monitoring/services/ListMonitoringSubjectService';
import ShowMonitoringSubjectService from '@modules/monitoring/services/ShowMonitoringSubjectService';

export default class SubjectController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { monitoring_id } = request.params;

    const showSubjects = container.resolve(ShowMonitoringSubjectService);

    const subjects = await showSubjects.execute(monitoring_id);

    return response.json(classToClass(subjects));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listSubjects = container.resolve(ListMonitoringSubjectService);

    const subjects = await listSubjects.execute();

    return response.json(classToClass(subjects));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { monitoring_id, url } = request.body;

    const createSubject = container.resolve(CreateSubjectService);

    const subject = await createSubject.execute({
      monitoring_id,
      user_id,
      url,
    });

    return response.json(classToClass(subject));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { monitoring_id } = request.params;

    const createSubject = container.resolve(CreateSubjectService);

    const user = await createSubject.execute({
      user_id: request.user.id,
      monitoring_id,
      filename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
