import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

export default class ReportsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { monitoring_id } = request.params;

    return response.status(204).json({});
  }
}
