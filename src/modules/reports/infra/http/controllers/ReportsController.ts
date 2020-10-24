import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllPresences from '@modules/reports/services/ListAllPresences';

export default class ReportsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllPresences = container.resolve(ListAllPresences);

    const allPresences = await listAllPresences.execute();

    return response.json(allPresences);
  }
}
