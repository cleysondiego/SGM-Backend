import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import MonitoringController from '../controllers/MonitoringController';

const monitoringRouter = Router();
const monitoringController = new MonitoringController();

monitoringRouter.use(ensureAuthenticated);

monitoringRouter.get('/:monitoring_id', monitoringController.show);

monitoringRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      teacher_id: Joi.string().required().uuid(),
      monitor_id: Joi.string().uuid(),
    },
  }),
  monitoringController.create,
);

export default monitoringRouter;
