import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import MonitoringController from '../controllers/MonitoringController';

const monitoringRouter = Router();
const monitoringController = new MonitoringController();

monitoringRouter.get('/', monitoringController.index);

monitoringRouter.use(ensureAuthenticated);

monitoringRouter.get('/:monitoring_id', monitoringController.show);

monitoringRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      teacher_id: Joi.string().uuid(),
      monitor_id: Joi.string().uuid(),
      isAvailable: Joi.boolean(),
      room: Joi.string().allow(''),
      schedule: Joi.string(),
      day: Joi.string(),
    },
  }),
  monitoringController.create,
);

monitoringRouter.patch(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      name: Joi.string(),
      teacher_id: Joi.string().uuid(),
      monitor_id: Joi.string().uuid(),
      isAvailable: Joi.boolean(),
      room: Joi.string().allow(''),
      schedule: Joi.string(),
      day: Joi.string(),
    },
  }),
  monitoringController.patch,
);

monitoringRouter.delete('/:id', monitoringController.delete);

export default monitoringRouter;
