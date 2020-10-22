import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ReportsController from '../controllers/ReportsController';

const reportsRouter = Router();
const reportsController = new ReportsController();

reportsRouter.use(ensureAuthenticated);

reportsRouter.get(
  '/all/:monitoring_id',
  celebrate({
    [Segments.PARAMS]: {
      monitoring_id: Joi.string().required().uuid(),
    },
  }),
  reportsController.index,
);

export default reportsRouter;
